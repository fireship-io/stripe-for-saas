import { NextResponse } from 'next/server';
import { stripe } from '@/utils/stripe';
import { supabaseAdmin } from '@/utils/supabaseServer';
import { randomBytes } from 'crypto';

export async function POST(request: Request) {
    try {

        // Check if the user is logged in
        const token = request.headers.get('Authorization')?.split('Bearer ')[1];
        if (!token) {
            throw 'missing auth token';
        }

        const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);

        if (!user || userError) {
            throw 'supabase auth error';
        }

        // Check the user's active_plan status in the stripe_customers table
        const { data: customer, error: fetchError } = await supabaseAdmin
            .from('stripe_customers')
            .select('*')
            .eq('user_id', user.id)
            .single();

        if (!customer || !customer.subscription_id || fetchError) {
            throw 'Please subscribe to a plan to download the image.';
        }

        // Create a new record in the downloads table
        const { image } = await request.json();
        await supabaseAdmin
            .from('downloads')
            .insert({ user_id: user.id, image });

        await supabaseAdmin
            .from('stripe_customers')
            .update({ total_downloads: customer.total_downloads + 1})
            .eq('user_id', user.id)

        const subscription = await stripe.subscriptions.retrieve(customer.subscription_id);
        const subscriptionItem = subscription.items.data[0];
        const usageRecord = await stripe.subscriptionItems.createUsageRecord(
            subscriptionItem.id,
            {
                quantity: 1,
                timestamp: 'now',
                action: "increment"
            },
            {
                idempotencyKey: randomBytes(16).toString('hex')
            }
        );

        console.log(usageRecord);


        return NextResponse.json({ message: 'Usage record created successfully!', total_downloads: customer.total_downloads + 1 }, { status: 200 });


    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: error }, { status: 500 });
    }
}