import { Rating,ThinStar } from '@smastrom/react-rating'
import { useForm,SubmitHandler,Controller } from "react-hook-form"
import '@smastrom/react-rating/style.css'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import feedback from "@/assets/icons/Feedback-rafiki.png"
import { useAppSelector } from '@/redux/hook'
import { isTokenExpired } from '@/utils/isTokenExpired'
import { useCurrentToken } from '@/redux/features/auth/authSlice'
import { useCreateReviewMutation } from '@/redux/features/review/reviewApi'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

type Inputs = {
    name: string
    email: string
    message: string
    rating: number
}

const Review = () => {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<Inputs>({
        mode: 'onBlur',
        defaultValues: {
            name: '',
            email: '',
            message: '',
            rating: 0,
        },
    });

    const token = useAppSelector(useCurrentToken)
    const expiredToken = isTokenExpired(token)

    const [createReview,{ isLoading }] = useCreateReviewMutation()
 

    //form submitting
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            await createReview(data).unwrap()
            toast.success('Review submitted successfully!')
            reset()
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error('Failed to submit review. Please try again.')
        }
    }

    const myStyles = {
        itemShapes: ThinStar,
        activeFillColor: '#0435BE',
        itemStrokeWidth: 1,
        inactiveStrokeColor: '#0435BE',
        activeStrokeColor: '#0435BE'
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20,opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    }

    if(expiredToken){
        return null
    }

    return (
        <motion.div
            className='wrapper pb-16 md:pb-24 lg:pb-32'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className='flex flex-col lg:flex-row items-center gap-8 lg:gap-16'>
                <motion.div className='w-full lg:w-1/2' variants={itemVariants}>
                    <motion.p
                        className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl capitalize max-w-3xl tracking-wide font-bold'
                        variants={itemVariants}
                    >
                        Feel free to say what you think about us
                    </motion.p>
                    <motion.p
                        className='text-sm pt-2 text-gray-300'
                        variants={itemVariants}
                    >
                        Give us your valuable ratings and tell us our mistakes or how can we improve
                    </motion.p>
                    <motion.img
                        src={feedback}
                        className='w-full max-w-[35rem] mx-auto mt-8 lg:mt-12 z-20'
                        alt=""
                        variants={itemVariants}
                    />
                </motion.div>
                <motion.div className='w-full lg:w-1/2 relative' variants={itemVariants}>
                    {/* {
                        expiredToken && <Overlay title={'Want to give feedback?'} />
                    } */}

                    <motion.form
                        onSubmit={handleSubmit(onSubmit)}
                        className='flex flex-col gap-4 sm:gap-6 p-4 sm:p-5'
                        variants={itemVariants}
                    >
                        <motion.div className='max-w-sm mx-auto w-full' variants={itemVariants}>
                            <Controller
                                control={control}
                                name="rating"
                                rules={{
                                    validate: (rating) => rating > 0,
                                }}
                                render={({ field: { onChange,onBlur,value } }) => (
                                    <Rating
                                        value={value}
                                        isRequired
                                        onChange={onChange}
                                        visibleLabelId="rating_label"
                                        onBlur={onBlur}
                                        itemStyles={myStyles}
                                    />
                                )}
                            />
                            {errors.rating && <div className="text-red-500 text-sm mt-1">Rating is required.</div>}
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <Input className='backdrop-blur-sm' required type="name" placeholder="Name" id="name" {...register('name',{ required: true })} />
                            {errors.name && <div className="text-red-500 text-sm mt-1">Name is required.</div>}
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <Input className='backdrop-blur-sm' required type="email" placeholder="Email" id="email" {...register('email',{ required: true })} />
                            {errors.email && <div className="text-red-500 text-sm mt-1">Email is required.</div>}
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <Textarea className='backdrop-blur-sm' rows={6} placeholder="Type your message here." id="message" {...register('message',{ required: true })} />
                            {errors.message && <div className="text-red-500 text-sm mt-1">Message is required.</div>}
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Button type="submit" className='button hover:bg-white w-full sm:w-auto' disabled={isLoading}>
                                {isLoading ? 'Submitting...' : 'Submit review'}
                            </Button>
                        </motion.div>
                    </motion.form>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Review