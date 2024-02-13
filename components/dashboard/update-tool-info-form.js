import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IoCloudUploadOutline } from "react-icons/io5";

import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CardHeader, CardContent, Card } from "@/components/ui/card";

export default function UpdateToolInfo() {
  return (
    <div className="bg-white p-8 overflow-y-scroll w-[88vw] customFont">
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
            <div>
              <label
                className="block text-sm font-semibold mb-1 "
                htmlFor="deals"
              >
                Deals
              </label>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Lifetime 50% off</Badge>
                <p className="text-sm">$49.99 / monthly</p>
                <p className="text-xs text-gray-500">You save $50.01</p>
                <Button variant="outline">Create new</Button>
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-semibold mb-1 "
                htmlFor="key-features"
              >
                Key Features
              </label>
              <div className="space-y-3">
                <Input placeholder="e.g. Sed ut perspiciatis unde omnis iste natus" />
                <Input placeholder="e.g. Sed ut perspiciatis unde omnis iste natus" />
                <Input placeholder="e.g. Sed ut perspiciatis unde omnis iste natus" />
                <button className="text-sm font-medium text-DBlue">
                  {" "}
                  Add Key Features +
                </button>
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-semibold mb-1 "
                htmlFor="use-cases"
              >
                Use Cases
              </label>
              <Input
                id="use-cases"
                placeholder="e.g. Sed ut perspiciatis unde omnis iste natus"
              />
              <button className="text-sm font-medium text-DBlue">
                Add Key Features +
              </button>
            </div>
            <div>
              <label
                className="block text-sm font-semibold mb-1 "
                htmlFor="price"
              >
                Price
              </label>
              <div className="flex flex-col items-start gap-5">
                <div className="flex w-full relative">
                  <Input className="" placeholder="0.00" />
                  <div className=" absolute right-20 top-0 h-[54px] w-[2px] bg-gray-300"></div>
                  <span className="absolute right-8 top-4  font-medium text-gray-600 border-s-indigo-500">
                    USD
                  </span>
                </div>

                <div className="flex justify-center items-center">
                  <Checkbox id="free" />
                  <label
                    className="text-sm font-medium ml-2 text-muted"
                    htmlFor="free"
                  >
                    Free
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-semibold mb-1 "
                htmlFor="category"
              >
                Category
              </label>
              <Select className="rounded-full border-2 p-4 drop-shadow-xl">
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                </SelectContent>
              </Select>
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
