import { LucideIcon } from "lucide-react";

export function ServiceMetric({ icon: Icon,label,value }: { icon: LucideIcon; label: string; value: string }) {
    return (
        <div className="flex justify-between items-center bg-background rounded-md p-3">
            <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{label}</span>
            </div>
            <span className="font-medium">{value}</span>
        </div>
    );
}