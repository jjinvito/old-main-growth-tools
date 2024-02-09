import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";
import Stripe from "stripe";
import { db } from "./lib/db";
import { Subscription } from "@prisma/client";
// import { UserRole } from "@prisma/client";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    createUser: async ({ user }) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2023-10-16",
      });
      await stripe.customers
        .create({
          email: user.email!,
          name: user.name!,
        })
        .then(async (customer) => {
          return db?.user.update({
            where: { id: user.id },
            data: {
              stripeCustomerId: customer.id,
            },
          });
        });
    },
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async session({ session, token }: { session: any; token?: any }) {
      const existingUser = await getUserById(token.sub, {
        subscriptions: true,
      });
      if (token.sub && session.user && existingUser) {
        session.user.id = token.sub;
        session.user.isActive = existingUser.isActive;
        session.user.stripeCustomerId = existingUser.stripeCustomerId;
        if (existingUser && "subscriptions" in existingUser) {
          session.user.subscriptions = (
            existingUser.subscriptions as Subscription[]
          ).map((subscription) => ({
            toolUrl: subscription.toolUrl,
            isActive: subscription.isActive,
            planType: subscription.planType,
            stripeSubscriptionId: subscription.stripeSubscriptionId,
            endDate: subscription.endDate.toISOString(), // Convert Date to ISO string for serialization
          }));
        } else {
          // If no subscriptions, ensure we still assign an empty array
          session.user.subscriptions = [];
        }
      }
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig, // Place the spread operator here within the object
});
