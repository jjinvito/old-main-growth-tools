import Stripe from "stripe";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2023-10-16",
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;
const webhookHandler = async (req: NextRequest) => {
  const session = await auth();
  console.log("Webhook sESSIONS--------------", session?.user);
  try {
    const buf = await req.text();
    const sig = req.headers.get("stripe-signature")!;

    let event: Stripe.Event;

    try {
      console.log("🔐 Webhook secret:", webhookSecret);
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      // On error, log and return the error message.
      if (err! instanceof Error) console.log(err);
      console.log(`❌ Error message: ${errorMessage}`);

      return NextResponse.json(
        {
          error: {
            message: `Webhook Error: ${errorMessage}`,
          },
        },
        { status: 400 }
      );
    }

    // Successfully constructed event.
    console.log("✅ Success:", event.id);

    // getting to the data we want from the event
    const subscription = event.data.object as Stripe.Subscription;
    const subscriptionId = subscription.id;
    const toolUrl = subscription.metadata.toolUrl;
    const userID = subscription.metadata.UserId;

    switch (event.type) {
      //case "customer.subscription.created":
      case "invoice.payment_succeeded":
        await db.user.update({
          where: {
            stripeCustomerId: subscription.customer as string,
          },
          data: {
            isActive: true,
          },
        });
        await db.subscription.create({
          data: {
            userId: userID, // Assuming you have the userId
            stripeSubscriptionId: subscription.id,
            toolUrl: toolUrl, // This is now correctly placed
            isActive: true, // You might adjust this based on your logic
          },
        });
        break;
      case "customer.subscription.deleted":
        await db.user.update({
          where: {
            stripeCustomerId: subscription.customer as string,
          },
          data: {
            isActive: false,
          },
        });
        break;

      default:
        console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
        break;
    }

    // Return a response to acknowledge receipt of the event.
    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json(
      {
        error: {
          message: `Method Not Allowed`,
        },
      },
      { status: 405 }
    ).headers.set("Allow", "POST");
  }
};

export { webhookHandler as POST };
