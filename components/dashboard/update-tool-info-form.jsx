"use client";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import {
  PriceType,
  ToolCategories,
  TierCategories,
} from "@/data/constantValues";
import { ToolSchema } from "@/schemas";
import { cn } from "@/lib/utils";

import InputField from "./formComponents/InputField";
import KeyFeaturesFieldArray from "@/components/dashboard/formComponents/KeyFeaturesFieldArray";
import TextAreaField from "./formComponents/TextAreaField";
import UseCasesFieldArray from "./formComponents/UseCasesFieldArray";
import SelectField from "./formComponents/SelectField";
import ScreenshotsUpload from "./formComponents/ScreenshotsUpload";
import LogoUpload from "./formComponents/logoUpload";
import Deals from "./formComponents/deals";
import PreviewCard from "./formComponents/previewCard";
import { publishTool } from "@/actions/publishTool";

export default function UpdateToolInfo() {
  const [SelectedPriceType, setSelectedPriceType] = useState("");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ToolSchema),
    defaultValues: {
      deals: [
        {
          title: "LifeTime 50% off",
          price: "$4.99",
          originalPrice: "$10",
          validity: "monthly",
          savings: "You save $5.01",
          link: "https://enterLinkHere/forAboveButton",
        },
      ],
    },
  });

  const {
    fields: keyFeaturesFields,
    append: keyFeaturesAppend,
    remove: keyFeaturesRemove,
  } = useFieldArray({
    control,
    name: "keyFeatures",
  });

  const {
    fields: useCasesFields,
    append: useCasesAppend,
    remove: useCasesRemove,
  } = useFieldArray({
    control,
    name: "useCases",
  });

  const {
    fields: dealFields,
    append: dealAppend,
    remove: dealRemove,
  } = useFieldArray({
    control,
    name: "deals",
  });

  console.log("error", errors);

  const onSubmit = async (data) => {
    let formData = { ...data };
    if (formData.pricingType !== "amount") {
      delete formData.priceAmount;
    }
    publishTool(formData);
  };

  useEffect(() => {
    useCasesAppend("");
    keyFeaturesAppend("");
  }, [useCasesAppend, keyFeaturesAppend]);

  return (
    <div className="bg-white p-8 overflow-y-scroll w-full customFont">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 ">
          Post your tool to a global audience
        </h1>
        <p className="mb-8 text-lg text-gray-600 w-[60%]">
          We're always looking for the most innovative tools to share with our
          audience. Use our form to submit yours today.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <hr />
              <InputField
                id="name"
                error={errors.name}
                register={register}
                name="name"
                placeholder="Name"
              />
              <TextAreaField
                name="shortDescription"
                id="shortDescription"
                error={errors.shortDescription}
                register={register}
                placeholder="Short Description"
              />
              <TextAreaField
                name="description"
                id="description"
                error={errors.description}
                register={register}
                placeholder="Description"
                className="resize-y"
              />
              <div>
                <InputField
                  id="website"
                  error={errors.website}
                  register={register}
                  name="website"
                  placeholder="Website"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Must include "https://"
                </p>
              </div>
              <LogoUpload />
              <ScreenshotsUpload />

              <Deals
                fields={dealFields}
                remove={dealRemove}
                append={dealAppend}
                register={register}
                setValue={setValue}
              />

              <KeyFeaturesFieldArray
                fields={keyFeaturesFields}
                remove={keyFeaturesRemove}
                append={keyFeaturesAppend}
                register={register}
                errors={errors}
              />

              <UseCasesFieldArray
                fields={useCasesFields}
                register={register}
                remove={useCasesRemove}
                append={useCasesAppend}
                errors={errors}
              />

              <div>
                <div className="flex flex-col items-start gap-5">
                  <label
                    className={cn(
                      "block text-sm font-semibold mb-1 ",
                      errors.pricingType && "text-red-500"
                    )}
                    htmlFor="price"
                  >
                    {errors.pricingType
                      ? errors.pricingType.message == "Required"
                        ? "Price Type is required"
                        : " "
                      : "Pricing Type"}
                  </label>

                  <SelectField
                    name="pricingType"
                    control={control}
                    options={PriceType}
                    placeholder="Select Price Type"
                    setSelectedType={setSelectedPriceType}
                  />

                  {SelectedPriceType === "amount" && (
                    <>
                      <div className="flex w-full relative">
                        <Input
                          {...register("priceAmount", {
                            required:
                              SelectedPriceType === "amount"
                                ? "Amount is required"
                                : false,
                            pattern: {
                              value: /^\d+(\.\d{1,2})?$/,
                              message: "Invalid amount format",
                            },
                          })}
                          className=""
                          placeholder="0.00"
                        />
                        <div className="absolute right-20 top-0 h-[54px] w-[2px] bg-gray-300"></div>
                        <span className="absolute right-8 top-4 font-medium text-gray-600">
                          USD
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-red-500">
                          {errors.priceAmount && errors.priceAmount.message}{" "}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div>
                <label
                  className={cn(
                    "block text-sm font-semibold mb-1",
                    errors.category && "text-red-500"
                  )}
                  htmlFor="tool-category"
                >
                  {errors.category
                    ? errors.category.message == "Required"
                      ? "Category is required"
                      : " "
                    : "Category"}
                </label>

                <SelectField
                  name="category"
                  control={control}
                  options={ToolCategories}
                  placeholder="Select Category"
                />
              </div>
              <div>
                <label
                  className={cn(
                    "block text-sm font-semibold mb-1",
                    errors.tierId && "text-red-500"
                  )}
                  htmlFor="tool-category"
                >
                  {errors.tierId
                    ? errors.tierId.message == "Required"
                      ? "Tier Category is required"
                      : " "
                    : "Tier Category"}
                </label>

                <SelectField
                  name="tierId"
                  control={control}
                  options={TierCategories}
                  placeholder="Tier Category"
                />
              </div>
              <button
                className="px-2 py-4 rounded-full w-full flex gap-2 justify-center bg-black text-white disabled:opacity-50 font-bold"
                type="submit"
              >
                Publish
              </button>
            </div>
            <PreviewCard />
          </div>
        </form>
      </div>
    </div>
  );
}
