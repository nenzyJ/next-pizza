"use client";

import { Container, Title } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function SuccessPage() {
  return (
    <Container className="flex flex-col items-center justify-center mt-40">
      <div className="flex flex-col items-center gap-6 text-center w-[500px]">
        <CheckCircle className="w-20 h-20 text-green-500" />
        <Title text="Order Successfully Placed!" size="lg" className="font-extrabold" />
        
        <p className="text-gray-400 text-lg">
          Thank you for your purchase. We have received your order and are preparing it. 
          You will receive a confirmation email shortly.
        </p>

        <div className="flex gap-4 mt-6">
          <Link href="/">
            <Button variant="outline" className="text-gray-500">
              Return to Home
            </Button>
          </Link>

        </div>
      </div>
    </Container>
  );
}
