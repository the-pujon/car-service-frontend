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
import Overlay from './Overlay'
import { useCreateReviewMutation } from '@/redux/features/review/reviewApi'
import { toast } from 'sonner'

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
            const response = await createReview(data).unwrap()
            toast.success('Review submitted successfully!')
            reset() // Reset form after successful submission
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

    return (
        <div className='wrapper pb-32'>
            <div className='flex flex-col lg:flex-row items-center'>
                <div className='w-full'>
                    <p className='text-6xl capitalize max-w-3xl tracking-wide font-bold'>Feel free to say what you think about us</p>
                    <p className='text-sm pt-2 text-gray-300'>
                        Give us your valuable ratings and tell us our mistakes or how can we improve
                    </p>
                    <img src={feedback} className='w-[35rem] z-20' alt="" />
                </div>
                <div className='w-full lg:w-1/2 relative'>
                    {
                        expiredToken && <Overlay title={'Want to give feedback?'} />
                    }

                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-5'>
                        <div className='max-w-sm'>
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
                            {errors.rating && <div>Rating is required.</div>}
                        </div>
                        <Input className='backdrop-blur-sm' required type="name" placeholder="Name" id="name" {...register('name',{ required: true })} />
                        {errors.name && <div>Name is required.</div>}
                        <Input className='backdrop-blur-sm' required type="email" placeholder="Email" id="email" {...register('email',{ required: true })} />
                        {errors.email && <div>Email is required.</div>}
                        <Textarea className='backdrop-blur-sm' rows={8} placeholder="Type your message here." id="message" {...register('message',{ required: true })} />
                        {errors.message && <div>Message is required.</div>}

                        <Button type="submit" className='button hover:bg-white' disabled={isLoading}>
                            {isLoading ? 'Submitting...' : 'Submit review'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Review