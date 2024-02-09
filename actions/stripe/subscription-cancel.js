"use server"

import Stripe from "stripe";
import { getUserById } from "@/data/user";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export const CancelSubscription = async (userId, stripeSubscriptionId) => {
  
  const existingUser = await getUserById(userId);
  
  if (!existingUser) {
    throw new Error("User not found.");
  }

  try {
    const subscription = await stripe.subscriptions.cancel(stripeSubscriptionId);
    return { success: true, message: 'Subscription cancelled successfully.' };
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    return { success: false, message: error.message };
  }
};