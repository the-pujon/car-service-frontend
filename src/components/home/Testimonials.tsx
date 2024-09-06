import React from 'react'
import TestimonialCard from '../ui/TestimonialCard'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'

const Testimonials = () => {
    return (
        <div>
            <section className="wrapper pt-32">
                <div className="mx-auto">
                    <div className="md:flex md:items-end md:justify-between">
                        <div className="max-w-xl">
                            <h2 className="text-4xl font-bold tracking-wide text-white sm:text-5xl">
                                Read trusted reviews from our customers
                            </h2>

                            <p className="mt-6 max-w-lg leading-relaxed text-gray-300">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur praesentium natus
                                sapiente commodi. Aliquid sunt tempore iste repellendus explicabo dignissimos placeat,
                                autem harum dolore reprehenderit quis! Quo totam dignissimos earum.
                            </p>
                        </div>

                        <div className='flex flex-col items-end'>
                            <div className='flex items-center py-4'>
                                <Star className='text-foreground' size={100} /> <p className='text-5xl font-bold'>4.5 <sub className='font-normal text-lg tracking-wider'>(23 customers)</sub> </p>
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
                        <TestimonialCard rating={3} name='Pujon Das' message={"Lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem"} />
                        <TestimonialCard rating={3} name='Pujon Das' message={"Lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem"} />
                        <TestimonialCard rating={3} name='Pujon Das' message={"Lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem"} />

                    </div>
                </div>
            </section>
        </div>
    )
}

export default Testimonials