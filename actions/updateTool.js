"use server";
import { ToolSchema } from "@/schemas";
import { PrismaClientKnownRequestError } from "@prisma/client";
import { db } from "@/lib/db";

export const updateTool = async (toolId, toolData) => {
  const validatedFields = ToolSchema.safeParse(toolData);

  if (!validatedFields.success) {
    console.error("Validation failed for update", validatedFields.error);
    return {
      error: "Invalid Fields!",
      details: validatedFields.error.issues,
    };
  }

  try {
    const { deals, ...restOfToolData } = validatedFields.data;

    const result = await db.$transaction(async (prisma) => {
      const updatedTool = await prisma.tool.update({
        where: { id: toolId },
        data: { ...restOfToolData },
        include: { deals: true },
      });

      await prisma.deal.deleteMany({ where: { toolId: toolId } });

      const updatedDeals = await prisma.deal.createMany({
        data: deals.map((deal) => ({ ...deal, toolId })),
      });

      return { tool: updatedTool, deals: updatedDeals };
    });

    return { success: "Tool Updated Successfully!", result };
  } catch (error) {
    console.error("Error updating tool", error);
    if (error instanceof PrismaClientKnownRequestError) {
    }
    return { error: "Something went wrong! Please try again." };
  }
};
