"use server"
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import Stripe from "stripe";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid Fields!",
    };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: "Email already in use!",
    };
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16",
  });

  try {
    const customer = await stripe.customers.create({
      email,
      name,
    });

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        stripeCustomerId: customer.id,
      },
    });

    return { success: "User Registered Successfully!" };
  } catch (error : any) {
    console.error("Error creating customer:", error);
    return { error: "Error creating customer", detailedError: error.message };
  }
};
