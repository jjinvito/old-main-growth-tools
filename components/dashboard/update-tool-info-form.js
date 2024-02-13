import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { CardHeader, CardContent, Card } from "@/components/ui/card"

export default function UpdateToolInfo() {
  return (
    <div className="bg-white p-8 overflow-y-scroll w-[88vw]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Post your tool to a global audience</h1>
        <p className="mb-8 text-sm text-gray-600">
          We're always looking for the most innovative tools to share with our audience. Use our form to submit yours
          today.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Name
              </label>
              <Input id="name" placeholder="Name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="short-description">
                Short Description
              </label>
              <Textarea
                id="short-description"
                placeholder="e.g. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="description">
                Description
              </label>
              <Textarea
                id="description"
                placeholder="e.g. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="website">
                Website
              </label>
              <Input id="website" placeholder="https://" />
              <p className="text-xs text-gray-500 mt-1">Must include "https://"</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="logo">
                Logo
              </label>
              <Button variant="outline">Upload</Button>
              <p className="text-xs text-gray-500 mt-1">png, jpg formats. 5mb max</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="deals">
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
              <label className="block text-sm font-medium mb-1" htmlFor="key-features">
                Key Features
              </label>
              <div className="space-y-2">
                <Input placeholder="e.g. Sed ut perspiciatis unde omnis iste natus" />
                <Input placeholder="e.g. Sed ut perspiciatis unde omnis iste natus" />
                <Input placeholder="e.g. Sed ut perspiciatis unde omnis iste natus" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="use-cases">
                Use Cases
              </label>
              <Textarea id="use-cases" placeholder="e.g. Sed ut perspiciatis unde omnis iste natus" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="price">
                Price
              </label>
              <div className="flex items-center">
                <Input className="w-24" placeholder="0.00" />
                <Select>
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="USD" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="usd">USD</SelectItem>
                    <SelectItem value="eur">EUR</SelectItem>
                  </SelectContent>
                </Select>
                <Checkbox id="free" />
                <label className="text-sm font-medium ml-2" htmlFor="free">
                  Free
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="category">
                Category
              </label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>Publish</Button>
          </div>
          <div>
            <Card className="w-full">
              <CardHeader>
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold">Title</h2>
                  <p className="text-sm text-gray-500">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
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
  )
}
