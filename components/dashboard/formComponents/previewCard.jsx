import React from "react";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const PreviewCard = () => {
  return (
    <Card className="w-full h-96">
      <CardHeader>
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Title</h2>
          <p className="text-sm text-gray-500">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium.
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
  );
};

export default PreviewCard;
