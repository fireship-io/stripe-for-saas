"use client";

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

export default function CheckoutReturn() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    fetch(`/api/embedded-checkout?session_id=${sessionId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setSession(data.session);
      });
  }, []);

  if (session?.status === 'open') {
    return (
      redirect('/')
    )
  }

  if (session?.status === 'complete') {
    return (
      <section id="success">
        <p>
          We appreciate your business! Your Stripe customer ID is: {session.customer}.
        </p>
      </section>
    )
  }

  return null;
}