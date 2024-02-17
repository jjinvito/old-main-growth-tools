"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { GoTrash } from "react-icons/go";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import * as z from "zod";
import {
  PriceType,
  ToolCategories,
  TierCategories,
} from "@/data/constantValues";

import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import Link from "next/link";
import { ToolSchema } from "@/schemas";
import { cn } from "@/lib/utils";

export default function UpdateToolInfo() {
  const [SelectedPriceType, setSelectedPriceType] = useState("");
  const [category, setCategory] = useState("");
  const [tierCategory, setTierCategory] = useState("");

  const [featureCount, setFeatureCount] = useState(3);
  const [useCases, setUseCases] = useState(1);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    // resolver: zodResolver(ToolSchema),
  });

  function validateKeyFeature(value) {
    if (!value || value.trim() === "") {
      return "Key feature cannot be empty.";
    }

    // Add other validation rules like minimum length, special characters, etc.

    return null; // No error if all rules pass
  }

  const handleAddFeature = () => {
    if (fields.length < 6) {
      const newValue = ""; // Or a default value you prefer
      const error = validateKeyFeature(newValue);
      if (!error) {
        append(null);
      } else {
        // Handle validation error, e.g., display an error message
      }
    }
  };

  const handleUseCases = () => {
    if (useCases < 3) {
      setUseCases((prevCount) => prevCount + 1);
    }
  };

  // const onFileChange = (event) => {
  //   setValue("logo", event.target.files[0]);
  // };

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "keyFeatures",
  });

  console.log("error", errors);

  const onSubmit = async (data) => {
    console.log("yessss");
    console.log(data);
    console.log("keyFeatures=", typeof data.keyFeatures[0]);
  };

  useEffect(() => {
    // This ensures append is only called when the component mounts and not on subsequent updates
    if (fields.length < 3) {
      for (let i = fields.length; i < 3; i++) {
        append(" ");
      }
    }
  }, [append]);
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
              <div>
                <label
                  className={cn(
                    "block text-sm font-semibold mb-1 ",
                    errors.name && "text-red-500"
                  )}
                  htmlFor="name"
                >
                  {errors.name ? errors.name.message : "Name"}
                </label>
                <Input id="name" {...register("name")} placeholder="Name" />
                {/* <span className="text-red-500 p-3">error message</span> */}
              </div>
              <div>
                <label
                  className={cn(
                    "block text-sm font-semibold mb-1 ",
                    errors.shortDescription && "text-red-500"
                  )}
                  htmlFor="shortDescription"
                >
                  {errors.shortDescription
                    ? errors.shortDescription.message
                    : "Short Description"}
                </label>
                <Textarea
                  name="shortDescription"
                  id="short-description"
                  placeholder="e.g. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
                  {...register("shortDescription")}
                  className="drop-shadow-xl rounded-xl h-[150px] resize-none"
                />
                {/* <span className="text-red-700">{errors.shortDescription}</span> */}
              </div>
              <div>
                <label
                  className={cn(
                    "block text-sm font-semibold mb-1 ",
                    errors.description && "text-red-500"
                  )}
                  htmlFor="description"
                >
                  {errors.description
                    ? errors.description.message
                    : "Short Description"}
                </label>
                <Textarea
                  {...register("description")}
                  name="description"
                  id="description"
                  placeholder="e.g. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
                  className="drop-shadow-xl rounded-xl h-[150px] resize-none	"
                />
                {/* <span className="text-red-700">{errors.description}</span> */}
              </div>
              <div>
                <label
                  className={cn(
                    "block text-sm font-semibold mb-1 ",
                    errors.website && "text-red-500"
                  )}
                  htmlFor="website"
                >
                  {errors.website ? errors.website.message : "Website"}
                </label>
                <Input
                  id="website"
                  {...register("website")}
                  placeholder="https://"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Must include "https://"
                </p>
              </div>
              <div>
                <div>
                  <label
                    htmlFor="logo"
                    className="block text-sm font-semibold mb-5"
                  >
                    Logo
                  </label>
                  <input type="file" id="logo" hidden />
                  {
                    //onChange={onFileChange}
                  }
                  <label
                    htmlFor="logo"
                    className="p-2 rounded-full border-2 border-black flex justify-center items-center w-24 gap-2 cursor-pointer"
                  >
                    Logo <IoCloudUploadOutline />
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  png, jpg formats. 5mb max
                </p>
              </div>

              <div className="w-full max-w-sm space-y-2">
                <div className="flex items-center space-x-2">
                  <label htmlFor="screenshot" className="font-semibold">
                    Screenshot
                  </label>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    PNG or JPEG up to 10MB
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Input accept="image/*" id="screenshot" type="file" />
                  <Button size="sm">Upload</Button>
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-1 "
                  htmlFor="deals"
                >
                  Deals
                </label>

                <div className="flex gap-10">
                  <div className="flex flex-col justify-start gap-1 h-[156px] w-[295px] p-5 border rounded-lg drop-shadow-xl bg-white">
                    <h1 className="font-bold">LifeTime 50% off</h1>
                    <p className="text-muted text-sm">
                      $4.99 <span className="line-through text-dull"> $10</span>{" "}
                      / monthly
                    </p>
                    <span
                      className="
                 font-medium text-acentGreen p-2 border rounded-lg w-[132px]"
                    >
                      You save $5.01
                    </span>
                    <Link className="text-DBlue font-medium text-sm" href="#">
                      Click to learn more
                    </Link>
                  </div>
                  <div className="flex flex-col justify-start gap-1 h-[156px] w-[295px] p-5 border rounded-lg drop-shadow-xl bg-white">
                    <h1 className="font-bold">-25% off</h1>
                    <p className="text-muted text-sm">
                      $4.99 <span className="line-through text-dull"> $10</span>{" "}
                      / monthly
                    </p>
                    <span
                      className="
                 font-medium text-acentGreen p-2 border rounded-lg w-[132px] text-sm"
                    >
                      You save $3.99
                    </span>
                    <Link className="text-DBlue font-medium text-sm" href="#">
                      Click to learn more
                    </Link>
                  </div>
                </div>

                {/* <div className="flex items-center space-x-2">
                <Badge variant="secondary">Lifetime 50% off</Badge>
                <p className="text-sm">$49.99 / monthly</p>
                <p className="text-xs text-gray-500">You save $50.01</p>
                <Button variant="outline">Create new</Button>
              </div> */}
              </div>
              <div>
                <label
                  className={cn(
                    "block text-sm font-semibold mb-1 ",
                    errors.keyFeatures && "text-red-500"
                  )}
                  htmlFor="keyFeatures"
                >
                  {errors.keyFeatures
                    ? errors.keyFeatures.message
                    : "Key Features"}
                </label>
                <div className="space-y-3">
                  {/* {[...Array(featureCount)].map((_, index) => (
                    <Input
                      {...register(`keyFeatures[` + index + `]`)}
                      name={`keyFeatures[` + index + `]`}
                      key={index}
                      placeholder="e.g. Sed ut perspiciatis unde omnis iste natus"
                    />
                  ))} */}
                  {fields.map((field, index) => (
                    <div key={field.id} className="space-y-3">
                      {index >= 3 ? (
                        <>
                          <div className="flex w-full relative">
                            <Input
                              key={field.id}
                              {...register(`keyFeatures[${index}]`)}
                              defaultValue={field.value}
                              placeholder="e.g. Sed ut perspiciatis unde omnis iste natus"
                            />

                            <button
                              className="absolute right-8 top-5  font-bold text-sm border-s-indigo-500 text-black cursor-pointer"
                              type="button"
                              onClick={() => remove(index)}
                            >
                              <GoTrash />
                            </button>
                          </div>
                        </>
                      ) : (
                        <Input
                          key={field.id}
                          {...register(`keyFeatures[${index}]`)}
                          defaultValue={field.value}
                          placeholder="e.g. Sed ut perspiciatis unde omnis iste natus"
                        />
                      )}
                    </div>
                  ))}

                  {fields.length < 6 && (
                    <button
                      className="text-sm font-medium text-DBlue"
                      type="button"
                      // onClick={() => append({ keyFeature: "" })}
                      // onClick={() => append("")}
                      // onClick={() => append({ keyFeature: "" })}
                      onClick={() => append('')}
                    >
                      Add Key Feature
                    </button>
                  )}

                  {/* {featureCount < 6 && (
                    <button
                      className="text-sm font-medium text-DBlue"
                      onClick={handleAddFeature}
                    >
                      Add Key Features +
                    </button>
                  )} */}
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-semibold mb-1 "
                  htmlFor="useCases"
                >
                  Use Cases
                </label>
                {/* <Input
                id="use-cases"
                placeholder="e.g. Sed ut perspiciatis unde omnis iste natus"
              />
              <button className="text-sm font-medium text-DBlue"
              onClick={handleUseCases}
              > */}
                <div className="space-y-3">
                  {[...Array(useCases)].map((_, index) => (
                    <Input
                      {...register(`useCases[` + index + `]`)}
                      name={`useCases[` + index + `]`}
                      key={index}
                      placeholder="e.g. Sed ut perspiciatis unde omnis iste natus"
                    />
                  ))}
                  {useCases < 3 && (
                    <button
                      className="text-sm font-medium text-DBlue"
                      onClick={handleUseCases}
                    >
                      Add Key Features +
                    </button>
                  )}
                </div>
              </div>
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
                  <Controller
                    name="pricingType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        className={`rounded-full border-2 p-4 drop-shadow-xl ${
                          errors.pricingType ? "border-red-500" : ""
                        }`}
                        onValueChange={(val) => {
                          field.onChange(val); // Update the form state
                          setSelectedPriceType(val); // Update the local state
                        }}
                        value={field.value}
                      >
                        <SelectTrigger id="price">
                          <SelectValue placeholder="Select Price Type" />
                        </SelectTrigger>
                        <SelectContent value={field.value} position="popper">
                          {PriceType.map((price, index) => (
                            <SelectItem key={index} value={price.id}>
                              {price.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />

                  {SelectedPriceType === "amount" && (
                    <div className="flex w-full relative">
                      <Input className="" placeholder="0.00" />
                      <div className=" absolute right-20 top-0 h-[54px] w-[2px] bg-gray-300"></div>
                      <span className="absolute right-8 top-4  font-medium text-gray-600 border-s-indigo-500">
                        USD
                      </span>
                    </div>
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
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select
                      className="rounded-full border-2 p-4 drop-shadow-xl"
                      onValueChange={(val) => field.onChange(val)}
                      value={field.value}
                    >
                      <SelectTrigger id="tool-category">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {ToolCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
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
                <Controller
                  name="tierId" // Make sure this matches the name used in your Zod schema
                  control={control}
                  render={({ field }) => (
                    <Select
                      className="rounded-full border-2 p-4 drop-shadow-xl"
                      onValueChange={(val) => field.onChange(val)}
                      value={field.value}
                    >
                      <SelectTrigger id="tier-category">
                        <SelectValue placeholder="Tier Category" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {TierCategories.map((tier) => (
                          <SelectItem key={tier.id} value={tier.id}>
                            {tier.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <button
                className="px-2 py-4 rounded-full w-full flex gap-2 justify-center bg-black text-white disabled:opacity-50"
                type="submit"
              >
                Publish
              </button>
            </div>
            <div>
              <Card className="w-full">
                <CardHeader>
                  <div className="space-y-1">
                    <h2 className="text-lg font-semibold">Title</h2>
                    <p className="text-sm text-gray-500">
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium.
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <img
                    alt="Card preview"
                    className="w-full h-auto mb-2"
                    height="200"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "300/200",
                      objectFit: "cover",
                    }}
                    width="300"
                  />
                  <Button variant="secondary">Deal</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
