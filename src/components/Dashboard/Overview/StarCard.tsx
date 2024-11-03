import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

export interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    color: string;
}

export function StatCard({ title,value,icon: Icon,trend,color }: StatCardProps) {
    return (
        <Card className={`bg-${color}/10 hover:bg-${color}/20 transition-all duration-300 hover:shadow-lg`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <div className={`p-2 rounded-full bg-${color}/20`}>
                    <Icon className={`h-4 w-4 text-${color}`} />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {trend && (
                    <div className="flex items-center mt-2 text-sm">
                        <span className={`text-${color}`}>{trend}</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}