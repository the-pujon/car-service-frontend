/* eslint-disable @typescript-eslint/no-explicit-any */
import React,{ useMemo } from 'react'

import { Star } from 'lucide-react'

import { useGetAllReviewsQuery } from '@/redux/features/review/reviewApi'
import TestimonialCard from '@/components/ui/TestimonialCard'
import Loading from '@/components/ui/Loading'

const Review: React.FC = () => {

    const { data: reviews,isLoading } = useGetAllReviewsQuery(undefined)

    const { avgRating,totalReviews,displayedReviews } = useMemo(() => {
        if (!reviews || !reviews.data) return { avgRating: 0,totalReviews: 0,displayedReviews: [] }


        const totalRating = reviews.data.reduce((sum: number,review: any) => sum + review.rating,0)
        const avgRating = totalRating / reviews.data.length
        const totalReviews = reviews.data.length
        const displayedReviews = reviews.data

        return { avgRating,totalReviews,displayedReviews }
    },[reviews])





    return (
        <div className='relative' >
            {
                isLoading && <Loading />
            }
            <section className="wrapper py-32">
                <div className="mx-auto">
                    <div className="md:flex md:items-end md:justify-between">
                        <div className="max-w-xl">
                            <h2 className="text-4xl font-bold tracking-wide text-white sm:text-5xl">
                                Read trusted reviews from our customers
                            </h2>

                            <p className="mt-6 max-w-lg leading-relaxed text-gray-300">
                                Our customers share their experiences and insights about our services. Read their stories and find out why they choose us.
                            </p>
                        </div>

                        <div className='flex flex-col items-end'>
                            <div className='flex items-center py-4'>
                                <Star className='text-foreground' size={100} />
                                <p className='text-5xl font-bold'>
                                    {avgRating.toFixed(1)} <sub className='font-normal text-lg tracking-wider'>({totalReviews} customers)</sub>
                                </p>
                            </div>


                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                        {displayedReviews.map((review: any,index: number) => (
                            <TestimonialCard
                                key={index}
                                rating={review.rating}
                                name={review.name}
                                message={review.message}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Review