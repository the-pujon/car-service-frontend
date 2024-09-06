import { Rating,ThinStar } from '@smastrom/react-rating'
import { useForm,SubmitHandler,Controller } from "react-hook-form"
import '@smastrom/react-rating/style.css'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import feedback from "@/assets/icons/Feedback-rafiki.png"

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

    //form submitting
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        alert(JSON.stringify(data,undefined,2));
    }


    const myStyles = {
        itemShapes: ThinStar,
        activeFillColor: '#0435BE',
        //inactiveFillColor: '#fbf1a9',

        itemStrokeWidth: 1,
        inactiveStrokeColor: '#0435BE',
        activeStrokeColor: '#0435BE'
    }

    return (
        <div className='wrapper py-32'>
            <div className='flex items-center'>
                <div className='w-full'>

                    <p className='text-6xl capitalize max-w-3xl tracking-wide font-bold'>Feel free to say what you think about us</p>
                    <p className='text-sm pt-2 text-gray-300'>
                        Give us your valuable ratings and tell us our mistakes or how can we improve
                    </p>
                    <img src={feedback} className='w-[35rem] z-20' alt="" />
                </div>
                <div className='w-1/2'>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
                        <div className='max-w-sm'>
                            {/*<div id="rating_label"></div>*/}
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
                        <Input className='backdrop-blur-sm' required type="email" placeholder="Email" id="name" {...register('email',{ required: true })} />
                        {errors.email && <div>Email is required.</div>}
                        <Textarea className='backdrop-blur-sm' rows={8} placeholder="Type your message here." id="message" {...register('message',{ required: true })} />




                        <Button type="submit" className='button'>
                            Submit review
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Review