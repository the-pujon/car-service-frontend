import React from 'react'
import TestimonialCard from '../ui/TestimonialCard'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'

const Testimonials = () => {
    return (
        <div>
            {/*
  Heads up! 👋

  This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
*/}

            <section className="">
                <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                    <div className="md:flex md:items-end md:justify-between">
                        <div className="max-w-xl">
                            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
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
                        {/*<blockquote className="flex h-full flex-col justify-between bg-white p-6 shadow-sm sm:p-8">
                            <div>
                                <div className="flex gap-0.5 text-green-500">
                                    <svg
                                        className="size-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                        />
                                    </svg>

                                    <svg
                                        className="size-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                        />
                                    </svg>

                                    <svg
                                        className="size-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                        />
                                    </svg>

                                    <svg
                                        className="size-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                        />
                                    </svg>

                                    <svg
                                        className="size-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                        />
                                    </svg>
                                </div>

                                <div className="mt-4">
                                    <p className="text-2xl font-bold text-rose-600 sm:text-3xl">Stayin' Alive</p>

                                    <p className="mt-4 leading-relaxed text-gray-700">
                                        No, Rose, they are not breathing. And they have no arms or legs … Where are they? You
                                        know what? If we come across somebody with no arms or legs, do we bother resuscitating
                                        them? I mean, what quality of life do we have there?
                                    </p>
                                </div>
                            </div>

                            <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6">
                                &mdash; Michael Scott
                            </footer>
                        </blockquote>*/}
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