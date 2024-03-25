'use client';

import { createPortalSession } from './portalAction';
import { supabase } from '@/utils/supabaseClient';

export default function PortalButton() {
  const handleClick = async () => {
    try {

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw 'Please log in to manage your billing.';
      }

      const { data: customer, error: fetchError } = await supabase
      .from('stripe_customers')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single();
    
      const { id, url } = await createPortalSession(customer?.stripe_customer_id);

      window.location.href = url;

    } catch (error) {
      console.error('Failed to create billing portal session:', error);
    }
  }

  return (
    <>
      <h2>Manage Billing</h2>
      <p>Clicking this button create a new Stripe Billing Portal session</p>
      <button className="btn btn-primary btn-outline my-3" onClick={handleClick}>
        Manage Billing
      </button>
    </>
  );
}