import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { TReview } from "@/types/reviewType";

interface RecentReviewsProps {
    reviews: TReview[];
}

export function RecentReviews({ reviews }: RecentReviewsProps) {
    const recentReviews = reviews.slice(0,5);

    return (
        <Card className="col-span-1">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Recent Reviews</CardTitle>
                        <CardDescription>Latest customer feedback</CardDescription>
                    </div>
                    <Badge variant="outline">
                        {reviews.length} total
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {recentReviews.map((review) => (
                        <div
                            key={review._id}
                            className="bg-card hover:bg-accent transition-colors p-4 rounded-lg"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold">{review.name}</h4>
                                <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span>{review.rating.toFixed(1)}</span>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{review.message}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}