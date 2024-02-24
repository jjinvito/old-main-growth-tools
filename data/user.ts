"use server";
import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (
  id: string | undefined,
  includeOptions?: any
) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      include: includeOptions,
    });
    return user;
  } catch (error) {
    console.error("Failed to fetch user by ID:", error);
    return null;
  }
};
