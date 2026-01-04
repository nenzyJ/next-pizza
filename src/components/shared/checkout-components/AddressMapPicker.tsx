"use client";

import React, { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";

// Fix for default marker icon in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface AddressMapPickerProps {
  onAddressSelect: (address: string, lat: number, lng: number) => void;
  initialPosition?: [number, number];
}

// Component to handle map clicks
function LocationMarker({ 
  position, 
  setPosition, 
  onAddressSelect 
}: { 
  position: [number, number] | null;
  setPosition: (pos: [number, number]) => void;
  onAddressSelect: (address: string, lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      
      // Reverse geocode to get address
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
      )
        .then((res) => res.json())
        .then((data) => {
          const address = data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
          onAddressSelect(address, lat, lng);
        })
        .catch((err) => {
          console.error("Reverse geocoding error:", err);
          onAddressSelect(`${lat.toFixed(6)}, ${lng.toFixed(6)}`, lat, lng);
        });
    },
  });

  return position ? <Marker position={position} draggable={true} eventHandlers={{
    dragend: (e) => {
      const marker = e.target;
      const { lat, lng } = marker.getLatLng();
      setPosition([lat, lng]);
      
      // Reverse geocode on drag
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
      )
        .then((res) => res.json())
        .then((data) => {
          const address = data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
          onAddressSelect(address, lat, lng);
        })
        .catch((err) => {
          console.error("Reverse geocoding error:", err);
          onAddressSelect(`${lat.toFixed(6)}, ${lng.toFixed(6)}`, lat, lng);
        });
    }
  }} /> : null;
}

// Component to add search control
function SearchControl() {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new (GeoSearchControl as any)({
      provider,
      style: "bar",
      showMarker: false,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
      searchLabel: "Enter address",
    });

    map.addControl(searchControl);

    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return null;
}

export const AddressMapPicker: React.FC<AddressMapPickerProps> = ({
  onAddressSelect,
  initialPosition = [50.4501, 30.5234], // Kyiv, Ukraine as default
}) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>(initialPosition);
  const hasLoadedLocation = React.useRef(false);

  // Get user's current location only once on mount
  useEffect(() => {
    if (hasLoadedLocation.current) return;
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const userPos: [number, number] = [latitude, longitude];
          setMapCenter(userPos);
          setPosition(userPos);
          hasLoadedLocation.current = true;
          
          // Get initial address
          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
          )
            .then((res) => res.json())
            .then((data) => {
              const address = data.display_name || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
              onAddressSelect(address, latitude, longitude);
            })
            .catch((err) => {
              console.error("Initial geocoding error:", err);
            });
        },
        (error) => {
          console.log("Geolocation error:", error.message);
          hasLoadedLocation.current = true;
        }
      );
    }
  }, []);

  const handleSetPosition = useCallback((pos: [number, number]) => {
    setPosition(pos);
  }, []);

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden border border-gray-200">
      <MapContainer
        center={mapCenter}
        zoom={13}
        className="w-full h-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker 
          position={position} 
          setPosition={handleSetPosition}
          onAddressSelect={onAddressSelect}
        />
        <SearchControl />
      </MapContainer>
    </div>
  );
};
