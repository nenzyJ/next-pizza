import { cn } from '@/lib/utils';
import React from 'react';
import { Container } from './Container';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer className={cn("bg-secondary/30", className)}>
      <Container className="pt-8 pb-8 mt-7">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/pizza-logo.svg" alt="Logo" width={35} height={35} />
              <h1 className="text-xl uppercase font-black">Dovas Pizza</h1>
            </Link>
            <p className="text-gray-500">
              Taste that brings us together. Fresh ingredients, unique recipes, and fast delivery.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="p-2 rounded-full bg-white hover:bg-primary/10 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white hover:bg-primary/10 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white hover:bg-primary/10 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white hover:bg-primary/10 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Navigation - Company */}
          <div className="flex flex-col gap-3">
             <h3 className="font-bold uppercase tracking-wide mb-1">Company</h3>
             <Link href="#" className="text-gray-500 hover:text-primary transition-colors">About Us</Link>
             <Link href="#" className="text-gray-500 hover:text-primary transition-colors">Our Team</Link>
             <Link href="#" className="text-gray-500 hover:text-primary transition-colors">Careers</Link>
             <Link href="#" className="text-gray-500 hover:text-primary transition-colors">Blog</Link>
          </div>

          {/* Navigation - Help */}
          <div className="flex flex-col gap-3">
             <h3 className="font-bold uppercase tracking-wide mb-1">Help</h3>
             <Link href="#" className="text-gray-500 hover:text-primary transition-colors">Delivery</Link>
             <Link href="#" className="text-gray-500 hover:text-primary transition-colors">Payment</Link>
             <Link href="#" className="text-gray-500 hover:text-primary transition-colors">Contacts</Link>
             <Link href="#" className="text-gray-500 hover:text-primary transition-colors">FAQ</Link>
          </div>

          {/* Download App / Contacts */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold uppercase tracking-wide mb-1">Contacts</h3>
             <p className="text-gray-500">+1 (234) 567-890</p>
             <p className="text-gray-500">info@dovaspizza.com</p>
             
             <div className="mt-4 flex flex-col gap-2">
               <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 w-fit hover:opacity-80 transition-opacity">
                 <span className="text-xs text-left">
                    <div className="leading-none text-[10px] text-gray-300">Download on the</div>
                    <div className="text-sm font-bold">App Store</div>
                 </span>
               </button>
             </div>
          </div>
        </div>
      </Container>

      {/* Bottom Bar - Full Width Border */}
      <div className="border-t border-gray-100 py-8">
         <Container className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
           <p>© {new Date().getFullYear()} Nenzy Pizza. All rights reserved.</p>
           <div className="flex gap-6">
              <Link href="#" className="hover:text-primary">Privacy Policy</Link>
              <Link href="#" className="hover:text-primary">Terms of Service</Link>
              <Link href="#" className="hover:text-primary">Cookies</Link>
           </div>
         </Container>
      </div>
    </footer>
  );
};
