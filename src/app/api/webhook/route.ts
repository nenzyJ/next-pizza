import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '../../../../prisma/prisma';
import { OrderStatus } from '@prisma/client';
import { sendEmail } from '@/lib/send-email';
import { EmailTemplate } from '@/components/shared/email-template/PayOrder';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed.', err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const orderId = Number(session.metadata?.order_id);
      
        const order = await prisma.order.update({
            where: {
            id: orderId,
            },
            data: {
            status: OrderStatus.SUCCEEDED,
            },
        });
        
        // Send email asynchronously without blocking the webhook response
        sendEmail(
            order.email,
            'Next Pizza / Order #' + order.id,
            EmailTemplate({ orderId: order.id, totalAmount: order.totalAmount, paymentUrl: 'https://nextjs.org/' })
        ).catch((emailError) => {
            console.error('Failed to send order confirmation email:', emailError);
        });

    } catch (error) {
      console.error('Error updating order:', error);
      return new NextResponse('Internal Server Error', { status: 500 });
    }
  }

  return new NextResponse(null, { status: 200 });
}
