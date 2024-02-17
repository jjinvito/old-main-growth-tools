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

export const ToolSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  shortDescription: z.string().min(1, {
    message: "Short Description is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  website: z.string().url({
    message: "Valid website URL is required",
  }),
  // price: z.number().optional(),
  // pricingType: z.nativeEnum(PriceType),
  pricingType: priceTypeIdSchema,
  // customPricingInfo: z.string().optional(),
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
  // keyFeatures: z.array(z.string().min(1, { message: "Feature cannot be empty" })).min(1, { message: "At least one key feature is required" }),
  // useCases: z.array(z.string()).min(1).max(3),
  // deals: z.string().optional(),
});
