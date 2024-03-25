# Stripe for SaaS Node.js Project

This project demonstrates fullstack metered billing subscriptions payments with Hono


## How to Run It

Run the Next.js app:

```
git clone <this-repo>
npm install
npm run dev
```

Create a `.env` file in the root directory and update the following environment variables:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

Install the Stripe CLI for webhooks and run it locally

```
stripe listen -e checkout.session.completed --forward-to http://localhost:3000/webhook 
```
