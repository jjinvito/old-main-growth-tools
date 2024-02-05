"use server";
import { NextResponse } from "next/server";
import { getUserById } from "@/data/user";

import Stripe from "stripe";

export async function POST(req) {
  const body = await req.json();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });

  const userId = body.userId;
  const existingUser = await getUserById(userId);

  if (!existingUser) {
    return NextResponse.json(
      {
        error: {
          code: "no-access",
          message: "User not found.",
        },
      },
      { status: 401 }
    );
  }

  // Create the checkout session
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: existingUser?.stripeCustomerId,
    line_items: [
      {
        price: body.priceId,
        quantity: 1,
      },
    ],
    // success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
    success_url:
      process.env.NEXT_PUBLIC_APP_URL + `?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: process.env.NEXT_PUBLIC_APP_URL,
    // cancel_url: "http://localhost:3000/cancel",
    subscription_data: {
      metadata: {
        UserId: userId,
        toolUrl: body.toolUrl,
      },
      // trial_period_days: 14,
    },
  });

  if (!checkoutSession.url) {
    return NextResponse.json(
      {
        error: {
          code: "stripe-error",
          message: "Could not create checkout session",
        },
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ session: checkoutSession }, { status: 200 });
}
