# Stripe for SaaS with Next.js & Supabase

This project demonstrates fullstack metered billing subscriptions payments with Stipe, Next.js, and Supabase. 


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

NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SECRET_KEY=
```

Install the Stripe CLI for webhooks and run it locally

```
stripe listen -e customer.subscription.updated,customer.subscription.deleted,checkout.session.completed --forward-to http://localhost:3000/api/webhook 
```

Create the necessary Supabase tables from the SQL editor:

```sql
create table
  public.stripe_customers (
    id uuid not null default uuid_generate_v4 (),
    user_id uuid not null,
    stripe_customer_id text not null,
    total_downloads integer null default 0,
    plan_active boolean not null default false,
    plan_expires bigint null,
    subscription_id text null,
    constraint stripe_customers_pkey primary key (id),
    constraint stripe_customers_stripe_customer_id_key unique (stripe_customer_id),
    constraint stripe_customers_user_id_fkey foreign key (user_id) references auth.users (id)
  ) tablespace pg_default;

create table
  public.downloads (
    id uuid not null default uuid_generate_v4 (),
    user_id uuid not null,
    ts timestamp without time zone null default now(),
    image text null,
    constraint downloads_pkey primary key (id),
    constraint downloads_user_id_fkey foreign key (user_id) references auth.users (id)
  ) tablespace pg_default;
```


Enable Supabase Email auth with the "confirm email" option set to false.