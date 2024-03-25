import { NextResponse } from 'next/server';
import { stripe } from '@/utils/stripe';

// Embedded Sessions

export async function POST(request: Request) {
    try {
        const { priceId } = await request.json();

        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',

            payment_method_types: ['card'],
            line_items: [
                {
                    // base subscription
                    price: priceId,
                },
                {
                    // one-time setup fee
                    price: 'price_1OtHdOBF7AptWZlcPmLotZgW',
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            return_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
        });

        return NextResponse.json({ id: session.id, client_secret: session.client_secret });
    } catch (error: any) {
      console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// For embedded sessions
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get('session_id');

        if (!sessionId) {
            return NextResponse.json({ message: 'Missing session_id' }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId!);

        return NextResponse.json({ session });
    } catch (error: any) {
      console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}