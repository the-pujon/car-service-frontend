import { TooltipProps } from "recharts";

export function CustomTooltip({ active,payload,label }: TooltipProps<number,string>) {
    if (active && payload && payload.length) {
        return (
            <div className="bg-background p-2 border border-border rounded-lg shadow-lg">
                <p className="text-foreground">{`${label}: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
}