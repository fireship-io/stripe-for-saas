'use server';

import { stripe } from "../../utils/stripe";


export async function createPortalSession(customerId: string) {
    const portalSession = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `http://localhost:3000`,
      });
  
      return { id: portalSession.id, url: portalSession.url };
}

