"use server";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import Stripe from "stripe";

const createUserWithStripeCustomerId = async (userEmail, stripeCustomerId) => {
  const user = await db.user.create({
    data: {
      email: userEmail,
      stripeCustomerId: stripeCustomerId,
    },
  });

  return user;
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

async function CreateStripeCheckoutSession(data) {
  const session = await auth();
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
      const user = await createUserWithStripeCustomerId(
        emailAddress,
        stripeCustomer.id
      );
      existingUser = { id: user.id, stripeCustomerId: stripeCustomer.id };
    }

    try {
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
        success_url: !session?.user
          ? `${process.env.NEXT_PUBLIC_APP_URL}/auth/signup?session_id={CHECKOUT_SESSION_ID}`
          : `${process.env.NEXT_PUBLIC_APP_URL}/billing`,
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
          message:
            "Failed to initiate payment process. Please try again later.",
          details: error.message,
        },
      };
    }
  } catch (error) {
    console.error("Failed to authenticate session:", error);

    return {
      error: {
        message: "Failed to authenticate session. Please try again later.",
        details: error.message,
      },
    };
  }
}

export { CreateStripeCheckoutSession };
