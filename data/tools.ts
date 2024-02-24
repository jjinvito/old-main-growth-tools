"use server";

import { db } from "@/lib/db";

export const getTools = async () => {
  const tools = await db.tool.findMany({
    include: {
      category: true,
      tier: true,
      deals: true,
    },
  });
  return tools;
};
