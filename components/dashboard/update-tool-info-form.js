"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
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

export default function UpdateToolInfo() {
  const [priceType, setPriceType] = useState("");
  const [category, setCategory] = useState("");
  const [tierCategory, setTierCategory] = useState("");

  const [featureCount, setFeatureCount] = useState(3);
  const [useCases, setUseCases] = useState(1);

  const handleAddFeature = () => {
    if (featureCount < 6) {
      setFeatureCount((prevCount) => prevCount + 1);
    }
  };

  const handleUseCases = () => {
    if (useCases < 3) {
      setUseCases((prevCount) => prevCount + 1);
    }
  };

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <hr />
            <div>
              <label
                className="block text-sm font-semibold mb-1 "
                htmlFor="name"
              >
                Name
              </label>
              <Input id="name" placeholder="Name" />
            </div>
            <div>
              <label
                className="block text-sm font-semibold mb-1 "
                htmlFor="short-description"
              >
                Short Description
              </label>
              <Textarea
                id="short-description"
                placeholder="e.g. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
                className="drop-shadow-xl rounded-xl h-[150px] resize-none"
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold mb-1 "
                htmlFor="description"
              >
                Description
              </label>
              <Textarea
                id="description"
                placeholder="e.g. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
                className="drop-shadow-xl rounded-xl h-[150px] resize-none	"
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold mb-1 "
                htmlFor="website"
              >
                Website
              </label>
              <Input id="website" placeholder="https://" />
              <p className="text-xs text-gray-500 mt-1">
                Must include "https://"
              </p>
            </div>
            <div>
              <label
                className="block text-sm font-semibold mb-5 "
                htmlFor="logo"
              >
                Logo
              </label>
              <div className="h-14 w-10">
                <input type="file" id="actual-btn" hidden />
                <label
                  htmlFor="actual-btn"
                  className="p-2 rounded-full border-2 border-black flex justify-center items-center w-24 gap-2 cursor-pointer"
                >
                  Logo
                  <IoCloudUploadOutline />
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
                    $4.99 <span className="line-through text-dull"> $10</span> /
                    monthly
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
                    $4.99 <span className="line-through text-dull"> $10</span> /
                    monthly
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
                className="block text-sm font-semibold mb-1 "
                htmlFor="key-features"
              >
                Key Features
              </label>
              <div className="space-y-3">
                {[...Array(featureCount)].map((_, index) => (
                  <Input
                    key={index}
                    placeholder="e.g. Sed ut perspiciatis unde omnis iste natus"
                  />
                ))}
                {featureCount < 6 && (
                  <button
                    className="text-sm font-medium text-DBlue"
                    onClick={handleAddFeature}
                  >
                    Add Key Features +
                  </button>
                )}
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-semibold mb-1 "
                htmlFor="use-cases"
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
                  className="block text-sm font-semibold mb-1 "
                  htmlFor="price"
                >
                  Price
                </label>
                <Select
                  className="rounded-full border-2 p-4 drop-shadow-xl"
                  onValueChange={setPriceType}
                >
                  <SelectTrigger id="price">
                    <SelectValue placeholder="Select Price Type" />
                  </SelectTrigger>
                  <SelectContent value={priceType} position="popper">
                    {PriceType.map((price) => (
                      <SelectItem key={price.id} value={price.id}>
                        {price.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {priceType === "amount" && (
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
              <div>
                <label
                  className="block text-sm font-semibold mb-1"
                  htmlFor="tool-category"
                >
                  Category
                </label>
                <Select
                  className="rounded-full border-2 p-4 drop-shadow-xl"
                  onValueChange={setCategory}
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
              </div>
            </div>
            <div>
              <div>
                <label
                  className="block text-sm font-semibold mb-1"
                  htmlFor="tier-category"
                >
                  Tier Category
                </label>
                <Select
                  className="rounded-full border-2 p-4 drop-shadow-xl"
                  onValueChange={setTierCategory}
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
              </div>
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
      </div>
    </div>
  );
}
