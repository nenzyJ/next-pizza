"use client";

import { Textarea } from "@/components/ui/textarea";
import { WhiteBlock } from "../WhiteBlock";
import { FormInput } from "../form/FormInput";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import dynamic from "next/dynamic";
import { MapPin, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Dynamic import to prevent SSR issues with Leaflet
const AddressMapPicker = dynamic(
  () => import("./AddressMapPicker").then((mod) => ({ default: mod.AddressMapPicker })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] rounded-lg border border-gray-200 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading map...</p>
      </div>
    ),
  }
);

interface Props {
    className?: string;
}

export const AddressForm: React.FC<Props> = ({ className }) => {
   const { register, formState: { errors }, setValue, watch } = useFormContext();
   const [showMap, setShowMap] = useState(false);
   const addressValue = watch("address");

   const handleAddressSelect = (address: string, lat: number, lng: number) => {
     setValue("address", address, { shouldValidate: true, shouldDirty: true });
     console.log("Selected coordinates:", { lat, lng });
   };

    return (
        <WhiteBlock
            title="3. Shipping Address"
            className=""
            contentClassName=""
          >
            <div className="flex flex-col gap-4 md:gap-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <label className="text-sm font-medium">
                    {showMap ? "Selected Address" : "Address"}
                  </label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowMap(!showMap)}
                    className="flex items-center gap-2 text-xs md:text-sm"
                  >
                    {showMap ? (
                      <>
                        <Edit3 className="w-3 h-3 md:w-4 md:h-4" />
                        Enter Manually
                      </>
                    ) : (
                      <>
                        <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                        Select on Map
                      </>
                    )}
                  </Button>
                </div>
                
                {!showMap && (
                  <FormInput
                    label=""
                    name="address"
                    className="text-sm md:text-base"
                    placeholder="Enter your address"
                  />
                )}
                
                {showMap && (
                  <div className="space-y-3">
                    <AddressMapPicker 
                      onAddressSelect={handleAddressSelect}
                    />
                    {addressValue && (
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs md:text-sm text-gray-600 mb-1">Selected Address:</p>
                        <p className="text-xs md:text-sm font-medium">{addressValue}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <Textarea
               {...register("comment")}
                placeholder="Comment to order"
                rows={5}
                className="text-sm md:text-base"
              />
            </div>
          </WhiteBlock>
    )
}
