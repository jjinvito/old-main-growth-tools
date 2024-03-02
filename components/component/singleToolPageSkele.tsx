import { Skeleton } from "@/components/ui/skeleton"

export default function SingleToolPageSkeleton() {
  return (
    <div key="1" className="space-y-4 w-full">
      <Skeleton className="h-6 w-32 rounded-md" />
      <div className="flex items-center space-x-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-md" />
      </div>
      <Skeleton className="h-4 w-64 rounded-md" />
      <Skeleton className="h-8 w-full rounded-md" />
      <Skeleton className="h-40 w-full rounded-md" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 rounded-md" />
          <Skeleton className="h-20 w-full rounded-md" />
          <Skeleton className="h-4 w-36 rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 rounded-md" />
          <Skeleton className="h-20 w-full rounded-md" />
          <Skeleton className="h-4 w-36 rounded-md" />
        </div>
      </div>
      <Skeleton className="h-20 w-full rounded-md" />
      <div className="flex justify-between">
        <Skeleton className="h-10 w-40 rounded-md" />
        <Skeleton className="h-10 w-24 rounded-md" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-48 rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-3/4 rounded-md" />
        <Skeleton className="h-4 w-2/3 rounded-md" />
      </div>
      <Skeleton className="h-10 w-full rounded-md" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <Skeleton className="h-6 w-32 rounded-md" />
          <Skeleton className="h-20 w-full rounded-md" />
          <Skeleton className="h-4 w-48 rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-6 w-32 rounded-md" />
          <Skeleton className="h-20 w-full rounded-md" />
          <Skeleton className="h-4 w-48 rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-6 w-32 rounded-md" />
          <Skeleton className="h-20 w-full rounded-md" />
          <Skeleton className="h-4 w-48 rounded-md" />
        </div>
      </div>
      <Skeleton className="h-10 w-full rounded-md" />
      <div className="flex justify-between">
        <Skeleton className="h-10 w-40 rounded-md" />
        <Skeleton className="h-10 w-24 rounded-md" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-48 rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
        </div>
        <Skeleton className="h-10 w-40 rounded-md" />
      </div>
    </div>
  )
}
