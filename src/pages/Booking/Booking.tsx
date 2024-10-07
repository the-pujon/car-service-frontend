import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Car,Calendar,Clock,CheckCircle,Droplets } from 'lucide-react'
import { SubmitHandler,useForm,Controller } from 'react-hook-form'
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from '@/components/ui/select'
import { useGetServiceByIdQuery } from '@/redux/features/service/serviceApi'
import { useGetSlotByIdQuery } from '@/redux/features/slot/slotApi'
import Loading from '@/components/ui/Loading'

type FormValues = {
    vehicleType: string
    vehicleBrand: string
    vehicleModel: string
    manufacturingYear: number
    registrationPlate: string
    serviceId: string
    slotId: string
}

const vehicleTypes = [
    "car",
    "truck",
    "SUV",
    "van",
    "motorcycle",
    "bus",
    "electricVehicle",
    "hybridVehicle",
    "bicycle",
    "tractor"
]

export default function Booking() {
    const { serviceId,slotId } = useParams<{ serviceId: string,slotId: string }>()
    const { register,control,handleSubmit,setValue,formState: { isSubmitting } } = useForm<FormValues>()
    const [isLoading,setIsLoading] = useState(false)

    const { data: service,isLoading: isServiceLoading } = useGetServiceByIdQuery(serviceId)
    const { data: slot,isLoading: isSlotLoading } = useGetSlotByIdQuery(slotId)

    useEffect(() => {
        if (serviceId && slotId) {
            setValue('serviceId',serviceId)
            setValue('slotId',slotId)
        }
    },[serviceId,slotId,setValue])

    const onSubmit: SubmitHandler<FormValues> = async (formData) => {
        setIsLoading(true);
        try {
            // Save form data to local storage
            localStorage.setItem('pendingBooking',JSON.stringify({
                ...formData,
                serviceId,
                slotId,
            }));

            // Set a flag to indicate that we're expecting a redirect
            localStorage.setItem('expectingRedirect','true');

            const payload = new URLSearchParams({
                store_id: 'aamarpaytest',
                signature_key: 'dbb74894e82415a2f7ff0ec3a97e4183',
                cus_name: 'Customer Name', // Replace with actual customer name if available
                cus_email: 'example@gmail.com', // Replace with actual customer email if available
                cus_phone: '01870******', // Replace with actual customer phone if available
                amount: service?.data.price.toString() || '10',
                currency: 'BDT',
                tran_id: Date.now().toString(),
                desc: `Booking for ${service?.data.name}`,
                success_url: 'http://localhost:5000/api/booking-success',
                fail_url: 'http://localhost:5000/api/booking-failed',
                cancel_url: 'http://localhost:5173/',
                type: 'json'
            })

            const response = await fetch('https://sandbox.aamarpay.com/index.php',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: payload
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const result = await response.json()

            if (result.payment_url) {
                window.location.href = result.payment_url
            } else {
                throw new Error('No payment URL received')
            }
        } catch (error) {
            console.error('Payment initiation failed:',error)
            // Handle the error (show an error message to the user)
        } finally {
            setIsLoading(false)
        }
    }

    if (isServiceLoading || isSlotLoading) {
        return <div className='h-screen relative'><Loading /></div>
    }

    if (!service || !slot) {
        return <div>Error: Service or slot not found</div>
    }

    return (
        <div className="min-h-[90vh] wrapper py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center mb-8 text-white">Complete Your Booking</h1>
                <p className="text-center text-gray-300 mb-12">You're just a few steps away from a sparkling clean car!</p>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Side: Selected Service Details */}
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
                                            <p className="font-semibold text-lg">{service.data.name}</p>
                                            <p className="text-sm text-gray-300">{service.data.duration}</p>
                                        </div>
                                    </div>
                                    <span className="text-2xl font-bold text-foreground">${service.data.price}</span>
                                </div>
                                <Separator />
                                <div className="flex items-center">
                                    <Calendar className="w-6 h-6 mr-3 text-foreground" />
                                    <p>{new Date(slot.data.date).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="w-6 h-6 mr-3 text-foreground" />
                                    <p>{slot.data.startTime}</p>
                                </div>
                                <Separator />
                                <div>
                                    <h3 className="font-semibold mb-2">Service Includes:</h3>
                                    <ul className="grid grid-cols-2 gap-2">
                                        {service.data.benefits.map((feature: string,index: number) => (
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

                    {/* Right Side: Booking Form */}
                    <Card className="bg-background shadow-lg">
                        <CardHeader className="p-6">
                            <CardTitle className="text-2xl text-white">Your Information</CardTitle>
                            <CardDescription>Please fill in your details to complete the booking.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="vehicleType" className="text-sm font-medium text-gray-300">Vehicle Type</Label>
                                        <Controller
                                            name="vehicleType"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select vehicle type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {vehicleTypes.map((type) => (
                                                            <SelectItem key={type} value={type}>
                                                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="vehicleBrand" className="text-sm font-medium text-gray-300">Vehicle Brand</Label>
                                        <Input
                                            id="vehicleBrand"
                                            placeholder="e.g., Toyota"
                                            {...register('vehicleBrand',{ required: true })}
                                            className="w-full p-3"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="vehicleModel" className="text-sm font-medium text-gray-300">Vehicle Model</Label>
                                        <Input
                                            id="vehicleModel"
                                            placeholder="e.g., Camry"
                                            {...register('vehicleModel',{ required: true })}
                                            className="w-full p-3"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="manufacturingYear" className="text-sm font-medium text-gray-300">Manufacturing Year</Label>
                                        <Input
                                            id="manufacturingYear"
                                            type="number"
                                            placeholder="e.g., 2020"
                                            {...register('manufacturingYear',{ required: true,valueAsNumber: true })}
                                            className="w-full p-3"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="registrationPlate" className="text-sm font-medium text-gray-300">Registration Plate</Label>
                                        <Input
                                            id="registrationPlate"
                                            placeholder="e.g., ABC123"
                                            {...register('registrationPlate',{ required: true })}
                                            className="w-full p-3"
                                        />
                                    </div>
                                    <input type="hidden" {...register('serviceId')} />
                                    <input type="hidden" {...register('slotId')} />
                                </div>
                                <CardFooter className="flex justify-end mt-8 px-0">
                                    <Button
                                        type="submit"
                                        className="w-full bg-foreground hover:bg-white text-white hover:text-black font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                                        disabled={isLoading || isSubmitting}
                                    >
                                        {isLoading ? 'Processing...' : 'Confirm Booking'}
                                    </Button>
                                </CardFooter>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}