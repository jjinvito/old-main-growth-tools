import * as z from "zod";
import {
  TierCategories,
  PriceType,
  ToolCategories,
} from "@/data/constantValues";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is Required",
  }),
});

const priceTypeIdSchema = z.enum(PriceType.map((pt) => pt.id));


const itemWordCountValidator = (maxWords) => {
  return (value) => {
    if (value.trim().length === 0) {
      return false;
    }
    const wordCount = value.split(/\s+/).filter(Boolean).length;
    return wordCount <= maxWords;
  };
};

export const ToolSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  shortDescription: z
    .string()
    .min(1, "Short Description is required")
    .refine(itemWordCountValidator(15), {
      message: "Short Description must be no more than 15 words",
    }),
  description: z
    .string()
    .min(1, "Description is required")
    .refine(itemWordCountValidator(150), {
      message: "Description must be no more than 150 words",
    }),
  website: z.string().url({
    message: "Valid website URL is required",
  }),
  pricingType: priceTypeIdSchema,
  category: z
    .string()
    .min(1, "Category is required.")
    .refine(
      (val) => ToolCategories.map((category) => category.id).includes(val),
      {
        message: "Invalid category selected.",
      }
    ),
  tierId: z
    .string()
    .min(1, "Tier category is required.")
    .refine((val) => TierCategories.map((tier) => tier.id).includes(val), {
      message: "Invalid tier category selected.",
    }),
  keyFeatures: z
    .array(
      z
        .string()
        .min(1, "Key Feature cannot be empty")
        .refine(
          itemWordCountValidator(
            15,
            "Each Key Feature must be no more than 15 words"
          ),
          {
            message: "Each Key Feature must be no more than 15 words",
          }
        )
    )
    .min(3, "At least 3 Key Features are required")
    .max(6, "No more than 6 Key Features are allowed"),
  useCases: z
    .array(
      z
        .string()
        .min(1, "Use Case cannot be empty")
        .refine(
          itemWordCountValidator(
            25,
            "Each Use Case must be no more than 25 words"
          ),
          {
            message: "Each Use Case must be no more than 25 words",
          }
        )
    )
    .min(1, "At least 1 Use Case is required")
    .max(3, "No more than 3 Use Cases are allowed"),
});
