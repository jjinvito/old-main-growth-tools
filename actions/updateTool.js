"use server";
import { ToolSchema } from "@/schemas";
import { db } from "@/lib/db";

export const updateTool = async (toolId, toolData) => {
  const validatedFields = ToolSchema.safeParse(toolData);

  console.log("Validated fields for update:", validatedFields.data);

  if (!validatedFields.success) {
    console.error("Validation failed for update", validatedFields.error);
    return {
      error: "Invalid Fields!",
      details: validatedFields.error.issues,
    };
  }

  try {
    const data = validatedFields.data;
    const updatedTool = await db.tool.update({
      where: { id: toolId },
      data: {
        ...data,
        deals: {
          upsert: data.deals.map((deal) => ({
            where: { id: deal.id },
            update: deal,
            create: deal,
          })),
        },
      },
      include: {
        deals: true,
      },
    });
    return { success: "Tool Updated Successfully!", tool: updatedTool };
  } catch (error) {
    console.error("Error updating tool", error);
    return { error: "Something went wrong! Please try again." };
  }
};
