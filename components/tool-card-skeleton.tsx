import { Skeleton } from "@/components/ui/skeleton"

export function ToolCardSkeleton() {
  return (
    <div className="max-w-sm rounded-lg border  p-4 shadow-md dark:border-gray-800">
      <div className="flex justify-between">
        <Skeleton className="h-6 w-20 rounded" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <Skeleton className="mt-4 h-40 w-full rounded-lg" />
      <div className="mt-4 space-y-2">
        <Skeleton className="h-6 w-32 rounded" />
        <Skeleton className="h-4 w-48 rounded" />
      </div>
    </div>
  )
}
