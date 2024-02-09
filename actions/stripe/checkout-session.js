"use server";
import { NextResponse } from "next/server";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";

import Stripe from "stripe";

const createUserWithStripeCustomerId = async (userEmail, stripeCustomerId) => {
  await db.user.create({
    data: {
      email: userEmail,
      stripeCustomerId: stripeCustomerId,
    },
  });
};
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

async function CreateStripeCheckoutSession(data) {
  try {
    const { userId, emailAddress, priceId, toolUrl, planType } = data;
    let existingUser;

    if (userId) {
      existingUser = await getUserById(userId);
    }

    if (!existingUser && emailAddress) {
      const stripeCustomer = await stripe.customers.create({
        email: emailAddress,
      });
      await createUserWithStripeCustomerId(emailAddress, stripeCustomer.id);
      existingUser = { id: null, stripeCustomerId: stripeCustomer.id };
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: existingUser.stripeCustomerId,
      line_items: [{ price: priceId, quantity: 1 }],
      discounts: [
        {
          coupon:
            planType === "Monthly"
              ? process.env.NEW_USER_MONTHLY_CUPON
              : process.env.NEW_USER_YEARLY_CUPON,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.NEXT_PUBLIC_APP_URL,
      subscription_data: {
        metadata: {
          UserId: existingUser.id,
          toolUrl: toolUrl,
          planType: planType,
        },
      },
    });

    if (!checkoutSession.url) {
      throw new Error("Could not create checkout session");
    }

    return {
      session: {
        id: checkoutSession.id,
        url: checkoutSession.url,
      },
    };
  } catch (error) {
    console.error("Failed to create Stripe checkout session:", error);

    return {
      error: {
        message: "Failed to initiate payment process. Please try again later.",
        details: error.message,
      },
    };
  }
}

export { CreateStripeCheckoutSession };
