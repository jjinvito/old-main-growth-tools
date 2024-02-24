"use server";
import { ToolSchema } from "@/schemas";
import { db } from "@/lib/db";

export const publishTool = async (toolData, subscriptionId) => {
  const validatedFields = ToolSchema.safeParse(toolData);

  console.log("Validated fields:", validatedFields.data);

  if (!validatedFields.success) {
    console.error("Validation failed", validatedFields.error);
    return {
      error: "Invalid Fields!",
      details: validatedFields.error.issues,
    };
  }
  try {
    const data = validatedFields.data;

    const tool = await db.tool.create({
      data: {
        ...data,
        subscriptionId: subscriptionId,
        deals: {
          create: data.deals,
        },
      },
      include: {
        deals: true,
      },
    });
    return { success: "Tool Updated Success!" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};
