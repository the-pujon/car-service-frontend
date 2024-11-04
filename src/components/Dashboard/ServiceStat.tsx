export function ServiceStat({ label,value }: { label: string; value: string | number }) {
    return (
        <div className="bg-background rounded-md p-3">
            <div className="text-sm text-muted-foreground mb-1">{label}</div>
            <div className="font-semibold text-lg">{value}</div>
        </div>
    );
}