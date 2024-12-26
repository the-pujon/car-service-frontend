import { Skeleton } from "@/components/ui/skeleton";

export const PageHeaderSkeleton = () => (
  <div className="space-y-2">
    <Skeleton className="h-8 w-48" />
    <Skeleton className="h-4 w-64" />
  </div>
); 