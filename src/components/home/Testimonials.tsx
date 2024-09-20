import React,{ useMemo } from 'react'
import TestimonialCard from '../ui/TestimonialCard'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { useAppSelector } from '@/redux/hook'
import { useCurrentToken } from '@/redux/features/auth/authSlice'
import { isTokenExpired } from '@/utils/isTokenExpired'
import Overlay from './Overlay'
import { useGetAllReviewsQuery } from '@/redux/features/review/reviewApi'

const Testimonials: React.FC = () => {
    const token = useAppSelector(useCurrentToken)
    const expiredToken = isTokenExpired(token)

    const { data: reviews,isLoading,isError } = useGetAllReviewsQuery(undefined)

    const { avgRating,totalReviews,displayedReviews } = useMemo(() => {
        if (!reviews || !reviews.data) return { avgRating: 0,totalReviews: 0,displayedReviews: [] }

        const totalRating = reviews.data.reduce((sum,review) => sum + review.rating,0)
        const avgRating = totalRating / reviews.data.length
        const totalReviews = reviews.data.length
        const displayedReviews = reviews.data.slice(0,3) // Get the first 3 reviews

        return { avgRating,totalReviews,displayedReviews }
    },[reviews])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error loading reviews</div>
    }

    return (
        <div className='relative' >
            {expiredToken && <Overlay title={'Read trusted reviews from our customers'} />}
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

                            <Button
                                asChild
                                className='bg-foreground hover:bg-gray-200 hover:text-black text-white font-bold'
                            >
                                <Link to='#' className="font-medium"> Check all ratings and reviews </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                        {displayedReviews.map((review,index) => (
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

export default Testimonials