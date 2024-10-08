import { Button } from '@/components/ui/button';
import React from 'react';
import Google from "@/assets/icons/Google";
import Github from '@/assets/icons/Github';
import { UserPlus } from 'lucide-react';
import { SubmitHandler,useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Link,useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Loading from '@/components/ui/Loading';
import { useAppDispatch } from '@/redux/hook';
import { setUser } from '@/redux/features/auth/authSlice';
import { useSigninMutation } from '@/redux/features/auth/authApi';
import signinImage from '@/assets/Auth/Signin.png';

type Inputs = {
    email: string;
    password: string;
};

const SignIn: React.FC = () => {

    const navigate = useNavigate();
    const [signin,{ isLoading,isError,error }] = useSigninMutation();
    const dispatch = useAppDispatch();
    const { register,handleSubmit,formState: { errors } } = useForm<Inputs>({
        mode: 'onBlur',
        defaultValues: {
            email: 'web@programming-hero1.com',
            password: 'ph-password',
        },
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const toastId = toast.loading('Logging in');

        try {

            const res = await signin(data).unwrap();
            dispatch(setUser({ user: res.data,token: res.token }));
            toast.success('Successfully Logged in',{ id: toastId,duration: 2000 });
            navigate('/#testimonials');


        } catch (err) {
            console.error(err)
            toast.error('Something went wrong',{ id: toastId,duration: 2000 });
        }
    };


    if (isError) {
        console.error(error);
        const apiError = error as { data?: { message?: string } };
        toast.error(apiError.data?.message || "Something went wrong");
    }

    return (
        <div className="relative min-h-screen bg-background text-gray-900 flex justify-center">
            {isLoading && <Loading />}
            <div className="max-w-screen-xl m-0 sm:m-10 bg-primary-foreground shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 pt-24">
                    <div>
                        <p className='text-white text-center text-5xl font-bold'>Car Service</p>
                    </div>
                    <div className="mt-0 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
                        <div className="w-full flex-1 mt-8">
                            <div className="flex flex-col items-center">
                                <button
                                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-background text-gray-200 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                                >
                                    <div className="bg-white p-2 rounded-full">
                                        <Google />
                                    </div>
                                    <span className="ml-4">Sign Up with Google</span>
                                </button>

                                <button
                                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-background text-gray-200 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5"
                                >
                                    <div className="bg-white p-1 rounded-full">
                                        <Github />
                                    </div>
                                    <span className="ml-4">Sign Up with GitHub</span>
                                </button>
                            </div>

                            <div className="my-12 border-b text-center">
                                <div className="leading-none px-2 inline-block text-sm text-gray-200 tracking-wide font-medium transform translate-y-1/2">
                                    Or sign up with e-mail
                                </div>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xs">
                                <Input className='backdrop-blur-sm my-2 text-white' required type="email" placeholder="Email" id="name" {...register('email',{ required: true })} />
                                {errors.email && <div>Email is required.</div>}
                                <Input className='backdrop-blur-sm text-white' required type="password" placeholder="Password" id="password" {...register('password',{ required: true })} />
                                {errors.password && <div>Password is required.</div>}
                                <Button
                                    className="mt-5 tracking-wide font-semibold bg-foreground text-gray-100 w-full py-4 rounded-lg hover:text-black hover:bg-white transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                >
                                    <UserPlus />
                                    <span className="ml-3">Sign In</span>
                                </Button>
                                <p className="mt-6 text-xs text-gray-600 text-center">
                                    I agree to abide by Car Service's{' '}
                                    <a href="#" className="border-b border-gray-500 border-dotted">
                                        Terms of Service
                                    </a>{' '}
                                    and its{' '}
                                    <a href="#" className="border-b border-gray-500 border-dotted">
                                        Privacy Policy
                                    </a>
                                </p>
                                <p className="text-sm text-gray-600 text-center">
                                    Don't have an account?{' '}
                                    <Link to="/auth/signup" className="font-medium text-primary-600 hover:underline">
                                        Sign up
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-primary-foreground text-center hidden lg:flex">
                    <div
                        className="m-12 xl:m-16 w-11/12 bg-contain bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                `url(${signinImage})`,
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
