import { Skeleton } from "@/components/ui/skeleton";

export function ToolCardSkeleton() {
  return (
    <>
      <tr>
        <th scope="col" className="px-6 py-3">
          <Skeleton className="h-12 w-12 rounded-full" />
        </th>
        <th scope="col" className="px-6 py-3">
          <Skeleton className="h-4 w-32" />
        </th>
        <th scope="col" className="px-6 py-3">
          <Skeleton className="h-4 w-16" />
        </th>
        <th scope="col" className="px-6 py-3">
          <Skeleton className="h-4 w-24" />
        </th>
        <th scope="col" className="px-6 py-3">
          <Skeleton className="h-4 w-10" />
        </th>
        <th scope="col" className="px-6 py-3">
          <div className="flex space-x-4">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-4" />
          </div>
        </th>
      </tr>
    </>
  );
}
