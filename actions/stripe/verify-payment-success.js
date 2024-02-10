"use server";
import Stripe from "stripe";

export const verifyPaymentSuccess = async (session_id) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });

  if (!session_id) {
    return { success: false, error: "Session ID is missing." };
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.payment_status === "paid") {
      return {
        success: true,
        email: session.customer_details.email,
        message: "Payment verified successfully.",
      };
    } else {
      return { success: false, error: "Payment status is not paid." };
    }
  } catch (error) {
    console.error("Failed to verify session", error);
    return { success: false, error: "Failed to verify session." };
  }
};
