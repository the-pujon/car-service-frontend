/* eslint-disable @typescript-eslint/no-explicit-any */
import React,{ useMemo } from 'react'
import { motion } from 'framer-motion'
import TestimonialCard from '../ui/TestimonialCard'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
// import { useAppSelector } from '@/redux/hook'
// import { useCurrentToken } from '@/redux/features/auth/authSlice'
// import { isTokenExpired } from '@/utils/isTokenExpired'
// import Overlay from './Overlay'
import { useGetAllReviewsQuery } from '@/redux/features/review/reviewApi'

const Testimonials: React.FC = () => {
    // const token = useAppSelector(useCurrentToken)
    // const expiredToken = isTokenExpired(token)

    const { data: reviews,isLoading,isError } = useGetAllReviewsQuery(undefined)

    const { avgRating,totalReviews,displayedReviews } = useMemo(() => {
        if (!reviews || !reviews.data) return { avgRating: 0,totalReviews: 0,displayedReviews: [] }

        const totalRating = reviews.data.reduce((sum: number,review: any) => sum + review.rating,0)
        const avgRating = totalRating / reviews.data.length
        const totalReviews = reviews.data.length
        const displayedReviews = reviews.data.slice(0,3)

        return { avgRating,totalReviews,displayedReviews }
    },[reviews])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20,opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
            },
        },
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error loading reviews</div>
    }

    return (
        <div className='relative'>
            <motion.section
                className="wrapper py-16 sm:py-24 md:py-32"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className="mx-auto">
                    <motion.div className="flex flex-col md:flex-row md:items-end md:justify-between" variants={itemVariants}>
                        <div className="max-w-xl mb-8 md:mb-0">
                            <motion.h2
                                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-white"
                                variants={itemVariants}
                            >
                                Read trusted reviews from our customers
                            </motion.h2>

                            <motion.p
                                className="mt-4 sm:mt-6 max-w-lg leading-relaxed text-gray-300"
                                variants={itemVariants}
                            >
                                Our customers share their experiences and insights about our services. Read their stories and find out why they choose us.
                            </motion.p>
                        </div>

                        <motion.div className='flex flex-col items-start md:items-end' variants={itemVariants}>
                            <motion.div className='flex items-center py-4' variants={itemVariants}>
                                <Star className='text-foreground' size={60} />
                                <p className='text-3xl sm:text-4xl md:text-5xl font-bold'>
                                    {avgRating.toFixed(1)} <sub className='font-normal text-sm sm:text-base md:text-lg tracking-wider'>({totalReviews} customers)</sub>
                                </p>
                            </motion.div>

                            <Button
                                asChild
                                className='bg-foreground hover:bg-gray-200 hover:text-black text-white font-bold w-full md:w-auto'
                            >
                                <Link to='/review' className="font-medium"> Check all ratings and reviews </Link>
                            </Button>
                        </motion.div>
                    </motion.div>

                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            </motion.section>
        </div>
    )
}

export default Testimonials