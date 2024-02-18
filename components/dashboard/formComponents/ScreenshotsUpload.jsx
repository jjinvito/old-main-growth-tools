import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ScreenshotsUpload = () => {
  return (
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
  );
};

export default ScreenshotsUpload;
