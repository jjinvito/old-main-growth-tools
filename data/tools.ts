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

export const getToolById = async (toolId: string) => {
  const tool = await db.tool.findUnique({
    where: { id: toolId }, // Corrected the where clause
    include: {
      category: true,
      tier: true,
      deals: true,
    },
  });
  return tool;
};
