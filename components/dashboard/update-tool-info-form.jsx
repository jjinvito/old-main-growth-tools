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
import { useTransition } from "react";
import { useSelector } from "react-redux";
import { fetchUserById } from "@/lib/redux/features/user/userSlice";
import { useSession } from "next-auth/react";

import { updateTool } from "@/actions/updateTool";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";
import { fetchToolById } from "@/lib/redux/features/tools/singleToolSlice";

export default function UpdateToolInfo() {
  const [SelectedPriceType, setSelectedPriceType] = useState("");
  const [isPending, startTransition] = useTransition();
  const selectedSubscriptionId = useSelector(
    (state) => state.subscriptions.selectedSubscriptionId
  );
  const toolsData = useSelector((state) => state?.tool?.item);

  const searchParams = useSearchParams();

  const session = useSession();

  const dispatch = useDispatch();

  const toolId = searchParams.get("id");
  const action = searchParams.get("action");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
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

  const getButtonText = () => {
    if (isPending) {
      return action === "edit" ? "Updating..." : "Publishing...";
    } else {
      return action === "edit" ? "Update" : "Publish";
    }
  };

  const preFillFieldsWithData = () => {
    console.log("toolsdata", toolsData);
    setValue("name", toolsData.name);
    setValue("shortDescription", toolsData.shortDescription);
    setValue("description", toolsData.description);
    setValue("website", toolsData.website);
    setValue("logoUrl", toolsData.logoUrl);
    setValue("primaryScreenshot", toolsData.primaryScreenshot);
    setValue("screenshots", toolsData.screenshots);
    setValue("keyFeatures", toolsData.keyFeatures);
    setValue("useCases", toolsData.useCases);
    setValue("deals", toolsData.deals);
    setValue("pricingType", toolsData.pricingType);
    setValue("price", toolsData.price);
    setValue("categoryId", toolsData.categoryId);
    setValue("tierId", toolsData.tierId);

    const pricingType = toolsData.pricingType;
    setValue("pricingType", pricingType);
    setSelectedPriceType(pricingType);
  };
  const onSubmit = async (data) => {
    let formData = { ...data };
    if (formData.pricingType !== "AMOUNT") {
      delete formData.price;
    }
    startTransition(() => {
      if (action == "edit") {
        updateTool(toolId, formData).then((data) => {
          toast.error(data?.error);
          toast.success(data?.success);
          data?.success && reset();
          if (data?.success) {
            reset();
            dispatch(fetchUserById(session.data?.user?.id));
          }
        });
      } else {
        publishTool(formData, selectedSubscriptionId).then((data) => {
          toast.error(data?.error);
          toast.success(data?.success);
          data?.success && reset();
          if (data?.success) {
            reset();
            dispatch(fetchUserById(session.data?.user?.id));
          }
        });
      }
    });
  };

  useEffect(() => {
    if (toolId && action === "edit" && !toolsData) {
      dispatch(fetchToolById(toolId));
    }
    useCasesAppend("");
    keyFeaturesAppend("");
  }, [, useCasesAppend, keyFeaturesAppend, toolId, action, dispatch]);

  useEffect(() => {
    if (toolsData && action === "edit") {
      preFillFieldsWithData();
    }
  }, [toolsData, action]);

  return (
    <div className="bg-white p-8 h-full customFont dark:bg-black overflow-y-auto xl:mt-0 mt-20 flex justify-center">
      <div className="lg:max-w-[980px] ">
        {action === "edit" ? (
          <h1 className="text-3xl font-extrabold mb-6 dark:text-white">
            Edit your tool
          </h1>
        ) : (
          <h1 className="text-3xl font-extrabold mb-6 dark:text-white">
            Post your tool to a global audience
          </h1>
        )}
        {action === "edit" ? (
          <p className="mb-8 text-lg text-gray-600 w-[60%] ">
            Keep Your Tool Up-to-Date and Maximize Its Impact. Use our form to
            update your tool's details and ensure it meets the evolving needs of
            our audience.
          </p>
        ) : (
          <p className="mb-8 text-lg text-gray-600 w-[60%] ">
            We're always looking for the most innovative tools to share with our
            audience. Use our form to submit yours today.
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12  ">
            <div className="lg:col-span-2 space-y-6">
              <hr className="text-gray-600" />
              <InputField
                id="name"
                error={errors.name}
                register={register}
                name="name"
                placeholder="Name"
                disabled={isPending}
              />
              <TextAreaField
                name="shortDescription"
                id="shortDescription"
                error={errors.shortDescription}
                register={register}
                placeholder="Short Description"
                disabled={isPending}
              />
              <TextAreaField
                name="description"
                id="description"
                error={errors.description}
                register={register}
                placeholder="Description"
                className="resize-y"
                disabled={isPending}
              />
              <div>
                <InputField
                  id="website"
                  error={errors.website}
                  register={register}
                  name="website"
                  placeholder="Website"
                  disabled={isPending}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Must include "https://"
                </p>
              </div>
              <LogoUpload errors={errors} setValue={setValue} watch={watch} />
              <ScreenshotsUpload
                errors={errors}
                setValue={setValue}
                watch={watch}
                action={action}
              />

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
                <div className="flex flex-col items-start gap-5 ">
                  <label
                    className={cn(
                      "block text-sm font-semibold mb-1 dark:text-white",
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

                  {SelectedPriceType === "AMOUNT" && (
                    <>
                      <div className="flex w-full relative">
                        <Input
                          {...register("price", {
                            required:
                              SelectedPriceType === "amount"
                                ? "Amount is required"
                                : false,
                            valueAsNumber: true,
                            pattern: {
                              value: /^\d+(\.\d{1,2})?$/,
                              message: "Invalid amount format",
                            },
                          })}
                          type="text"
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
                          {errors.price && errors.price.message}{" "}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div>
                <label
                  className={cn(
                    "block text-sm font-semibold mb-1 dark:text-white",
                    errors.categoryId && "text-red-500"
                  )}
                  htmlFor="tool-category"
                >
                  {errors.categoryId
                    ? errors.categoryId.message == "Required"
                      ? "Category is required"
                      : " "
                    : "Category"}
                </label>

                <SelectField
                  name="categoryId"
                  control={control}
                  options={ToolCategories}
                  placeholder="Select Category"
                />
              </div>
              <div>
                <label
                  className={cn(
                    "block text-sm font-semibold mb-1 dark:text-white",
                    errors.tierId && "text-red-500"
                  )}
                  htmlFor="tier-category"
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
                className={cn(
                  "px-2 py-4 rounded-full w-full flex gap-2 justify-center bg-black text-white disabled:opacity-50 font-bold dark:border-dark-500 dark:text-white dark:bg-dark-600 dark:hover:bg-dark-500",
                  isPending && "cursor-not-allowed opacity-50"
                )}
                type="submit"
              >
                {getButtonText()}
              </button>
            </div>
            <PreviewCard watch={watch} />
          </div>
        </form>
      </div>
    </div>
  );
}
