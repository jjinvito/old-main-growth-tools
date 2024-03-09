"use server";
import { ToolSchema } from "@/schemas";
import { PrismaClientKnownRequestError, Prisma } from "@prisma/client";
import { db } from "@/lib/db";

export const updateTool = async (toolId, toolData) => {
  const validatedFields = ToolSchema.safeParse(toolData);

  if (!validatedFields.success) {
    console.error("Validation failed for update:", validatedFields.error);
    return {
      error: "Invalid fields",
      details: validatedFields.error.issues,
    };
  }

  try {
    const { deals: clientDeals, ...restOfToolData } = validatedFields.data;
    const updateData = {
      ...restOfToolData,
      price:
        restOfToolData.pricingType === "AMOUNT" ? restOfToolData.price : null,
    };

    const result = await db.$transaction(async (prisma) => {
      const updatedTool = await prisma.tool.update({
        where: { id: toolId },
        data: updateData,
      });

      const existingDeals = await prisma.deal.findMany({
        where: { toolId: toolId },
      });

      const dealsToDelete = existingDeals
        .filter(
          (existingDeal) =>
            !clientDeals.some((deal) => deal.id === existingDeal.id)
        )
        .map((deal) => deal.id);

      await prisma.deal.deleteMany({
        where: { id: { in: dealsToDelete } },
      });

      for (const deal of clientDeals) {
        if (deal.id) {
          await prisma.deal.update({
            where: { id: deal.id },
            data: { ...deal, toolId: toolId },
          });
        } else {
          await prisma.deal.create({
            data: { ...deal, toolId: toolId },
          });
        }
      }

      return prisma.tool.findUnique({
        where: { id: toolId },
        include: { deals: true },
      });
    });

    return { success: "Tool Updated Successfully!", tool: result };
  } catch (error) {
    console.error("Error updating tool:", error);
    return { error: "Something went wrong! Please try again." };
  }
};
