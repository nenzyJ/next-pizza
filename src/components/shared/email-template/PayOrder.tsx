import * as React from 'react';

interface EmailTemplateProps {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export function EmailTemplate({ orderId, totalAmount, paymentUrl }: EmailTemplateProps) {
  return (
    <div>
      <h1>Order #{orderId}!</h1>

      <p>Total Amount: ${totalAmount}. <a href={paymentUrl}>Pay Now</a></p>
    </div>
  );
}