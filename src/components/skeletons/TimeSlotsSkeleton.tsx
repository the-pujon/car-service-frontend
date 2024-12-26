import { Skeleton } from "@/components/ui/skeleton";

export const TimeSlotsSkeleton = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-2">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Skeleton key={i} className="h-10 w-full" />
      ))}
    </div>
  </div>
); 