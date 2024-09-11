import { useState } from 'react'
//import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Car,Calendar,Clock,CheckCircle,Droplets } from 'lucide-react'
import { SubmitHandler,useForm } from 'react-hook-form'
//import { motion } from 'framer-motion'

// Mock data for the selected service and time slot
const selectedService = {
    name: 'Premium Car Wash & Detailing',
    price: '$49.99',
    duration: '90 minutes',
    date: 'July 15, 2023',
    time: '02:00 PM',
    features: ['Exterior Hand Wash','Interior Vacuuming','Tire Shine','Window Cleaning']
}

type FormValues = {
    name: string
    email: string
}

export default function Booking() {
    const { register,handleSubmit,formState: { isSubmitting } } = useForm<FormValues>()
    const [isLoading,setIsLoading] = useState(false)

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setIsLoading(true)

        const bookingData = {
            ...data,
            service: selectedService
        }

        // Simulate payment processing and API call
        await new Promise(resolve => setTimeout(resolve,2000))

        // Handle successful submission (e.g., redirect or show a success message)
        // router.push('/booking-success') // Uncomment if using router

        console.log('Booking Data:',bookingData) // Replace with actual API call
    }


    return (
        <div className="min-h-[90vh] wrapper py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/*<motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >*/}
                <h1 className="text-4xl font-extrabold text-center mb-8 text-white">Complete Your Booking</h1>
                <p className="text-center text-gray-300 mb-12">You're just a few steps away from a sparkling clean car!</p>
                {/*</motion.div>*/}

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Side: Selected Service Details */}
                    {/*<motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >*/}
                    <Card className="bg-background shadow-lg overflow-hidden">
                        <CardHeader className="bg-primary-foreground text-white p-6">
                            <CardTitle className="text-2xl flex items-center">
                                <Car className="w-6 h-6 mr-2" />
                                Your Selected Service
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Droplets className="w-6 h-6 mr-3 text-foreground" />
                                        <div>
                                            <p className="font-semibold text-lg">{selectedService.name}</p>
                                            <p className="text-sm text-gray-300">{selectedService.duration}</p>
                                        </div>
                                    </div>
                                    <span className="text-2xl font-bold text-foreground">{selectedService.price}</span>
                                </div>
                                <Separator />
                                <div className="flex items-center">
                                    <Calendar className="w-6 h-6 mr-3 text-foreground" />
                                    <p>{selectedService.date}</p>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="w-6 h-6 mr-3 text-foreground" />
                                    <p>{selectedService.time}</p>
                                </div>
                                <Separator />
                                <div>
                                    <h3 className="font-semibold mb-2">Service Includes:</h3>
                                    <ul className="grid grid-cols-2 gap-2">
                                        {selectedService.features.map((feature,index) => (
                                            <li key={index} className="flex items-center">
                                                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                                <span className="text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    {/*</motion.div>*/}

                    {/* Right Side: Booking Form */}
                    {/*<motion.div
                        initial={{ opacity: 0,x: 20 }}
                        animate={{ opacity: 1,x: 0 }}
                        transition={{ duration: 0.5,delay: 0.4 }}
                    >*/}
                    <Card className="bg-background shadow-lg">
                        <CardHeader className="p-6">
                            <CardTitle className="text-2xl text-white">Your Information</CardTitle>
                            <CardDescription>Please fill in your details to complete the booking.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-sm font-medium text-gray-300">Full Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="John Doe"
                                            {...register('name',{ required: true })}
                                            className="w-full p-3"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm font-medium text-gray-300">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            {...register('email',{ required: true })}
                                            className="w-full p-3"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="datetime" className="text-sm font-medium text-gray-300">Selected Date & Time</Label>
                                        <Input
                                            id="datetime"
                                            value={`${selectedService.date} at ${selectedService.time}`}
                                            disabled
                                            className="w-full p-3 "
                                        />
                                    </div>
                                </div>
                                <CardFooter className="flex justify-end mt-8 px-0">
                                    <Button
                                        type="submit"
                                        className="w-full bg-foreground hover:bg-white text-white hover:text-black font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                                        disabled={isLoading || isSubmitting}
                                    >
                                        {isLoading ? 'Processing...' : 'Pay Now'}
                                    </Button>
                                </CardFooter>
                            </form>
                        </CardContent>
                    </Card>
                    {/*</motion.div>*/}
                </div>
            </div>
        </div>
    )
}