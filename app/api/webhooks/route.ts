import Stripe from "stripe";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});
const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

const addTime = (
  startDate: Date,
  amount: number,
  type: "months" | "years"
): Date => {
  const newDate = new Date(startDate);
  if (type === "months") {
    newDate.setMonth(newDate.getMonth() + amount);
  } else if (type === "years") {
    newDate.setFullYear(newDate.getFullYear() + amount);
  }
  return newDate;
};

async function checkActiveSubsctiptions(userID: string) {
  const activeSubscriptions = await db.subscription.findMany({
    where: {
      userId: userID,
      isActive: true,
    },
  });

  if (activeSubscriptions.length === 0) {
    await db.user.update({
      where: { id: userID },
      data: { isActive: false },
    });
    console.log(
      `User ${userID} set to inactive due to no active subscriptions.`
    );
  }
}

const handleSubscriptionCreated = async (subscription: any) => {
  try {
    const { toolUrl, UserId: userID, planType } = subscription.metadata;
    const endDate =
      planType === "Monthly"
        ? addTime(new Date(), 1, "months")
        : addTime(new Date(), 1, "years");

    const userUpdateResult = await db.user.update({
      where: { stripeCustomerId: subscription.customer as string },
      data: { isActive: true },
    });

    const subscriptionCreateResult = await db.subscription.create({
      data: {
        userId: userID,
        stripeSubscriptionId: subscription.id,
        toolUrl,
        isActive: true,
        planType,
        endDate,
      },
    });
  } catch (error) {
    console.error("Failed to handle subscription creation:", error);
    throw error;
  }
};

const handleSubscriptionDeleted = async (stripeSubscriptionId: string) => {
  const subscription = await db.subscription.findUnique({
    where: { stripeSubscriptionId },
  });

  if (!subscription) {
    throw new Error("Subscription not found");
  }

  await db.subscription.delete({
    where: { id: subscription.id },
  });
  await checkActiveSubsctiptions(subscription.userId);
};

const handleCustomerDeleted = async (stripeCustomerId: any) => {
  const user = await db.user.findUnique({
    where: { stripeCustomerId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await db.user.delete({
    where: { id: user.id },
  });
};

async function handleSubscriptionUpdated(stripeEventData: any) {
  try {
    const {
      id: stripeSubscriptionId,
      current_period_end: currentPeriodEnd,
      items,
      status,
    } = stripeEventData;

    if (!items.data.length) {
      throw new Error("Subscription items are empty.");
    }
    const firstItem = items?.data?.[0];

    if (!firstItem) {
      throw new Error("No subscription items found.");
    }

    const interval = firstItem.price?.recurring?.interval;

    if (!interval) {
      throw new Error("Plan interval details are missing.");
    }
    const endDate = new Date(currentPeriodEnd * 1000);
    const planType = interval === "year" ? "Annual" : "Monthly";
    const isActive = status === "active";

    const updatedSubscription = await db.subscription.update({
      where: {
        stripeSubscriptionId: stripeSubscriptionId,
      },
      data: {
        endDate: endDate,
        planType: planType,
        isActive: isActive,
      },
    });
  } catch (error) {
    console.error("Failed to update subscription:", error);
    throw error;
  }
}

async function handlePaymentFailed(invoice: any) {
  try {
    const customerId = invoice.customer;
    const subscriptionId = invoice.subscription;
    const amountDue = invoice.amount_due / 100;
    const currency = invoice.currency.toUpperCase();

    const user = await db.user.findUnique({
      where: { stripeCustomerId: customerId },
    });

    if (!user) {
      console.error("User not found for customerId:", customerId);
      return;
    }

    console.log(
      `Notifying user ${user.id} about payment failure for ${amountDue} ${currency}.`
    );

    await db.subscription.update({
      where: { stripeSubscriptionId: subscriptionId },
      data: { isActive: false },
    });

    await checkActiveSubsctiptions(user.id);
  } catch (error) {
    console.error("Failed to handle payment failure:", error);
    throw error;
  }
}

const webhookHandler = async (req: NextRequest): Promise<NextResponse> => {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  try {
    const payload = await req.text();
    const sig = req.headers.get("stripe-signature")!;
    const event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);

    switch (event.type) {
      // case 'invoice.payment_succeeded':
      // case 'invoice.payment_failed':
      case "customer.subscription.created":
        await handleSubscriptionCreated(event.data.object as any);
        break;
      case "invoice.payment_failed":
        await handlePaymentFailed(event.data.object as any);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(
          (event.data.object as Stripe.Subscription).id
        );
        break;
      case "customer.deleted":
        await handleCustomerDeleted((event.data.object as any).id);
        break;
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object as any);
        break;
      default:
        console.warn(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(`Webhook Error: ${errorMessage}`);
    return NextResponse.json(
      { error: { message: `Webhook Error: ${errorMessage}` } },
      { status: 400 }
    );
  }
};

export { webhookHandler as POST };
