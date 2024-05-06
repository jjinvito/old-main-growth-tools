"use server";
import { ToolSchema } from "@/schemas";
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

      // Identify deals to delete directly using a query to minimize data transfer and processing
      const clientDealIds = clientDeals
        .filter((deal) => deal.id)
        .map((deal) => deal.id);
      await prisma.deal.deleteMany({
        where: {
          toolId: toolId,
          NOT: {
            id: { in: clientDealIds },
          },
        },
      });

      // Batch create/update operations
      // Assuming Prisma doesn't support createOrUpdate directly, split operations
      const updates = clientDeals
        .filter((deal) => deal.id)
        .map((deal) =>
          prisma.deal.update({
            where: { id: deal.id },
            data: { ...deal, toolId: toolId },
          })
        );
      const creates = clientDeals
        .filter((deal) => !deal.id)
        .map((deal) =>
          prisma.deal.create({
            data: { ...deal, toolId: toolId },
          })
        );

      // Execute all updates and creates in parallel, cautiously
      await Promise.all([...updates, ...creates]);

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
