'use client'

import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { format,isBefore,startOfDay } from 'date-fns'
import { Clock,DollarSign,Car,Droplets,Shield,Sparkles } from 'lucide-react'
import { useGetServiceByIdQuery } from '@/redux/features/service/serviceApi'
import { useGetSlotAvailabilityQuery } from '@/redux/features/slot/slotApi'
import Loading from '@/components/ui/Loading'
import { useNavigate } from 'react-router-dom'

export default function ServiceDetails() {
    const { id } = useParams<{ id: string }>()
    const [selectedDate,setSelectedDate] = useState<Date | undefined>(new Date())
    const [selectedSlot,setSelectedSlot] = useState<string | null>(null)
    const navigate = useNavigate()

    const { data: service,isLoading: isServiceLoading,isError: isServiceError } = useGetServiceByIdQuery(id)
    const { data: slots,isLoading: isSlotsLoading,isError: isSlotsError } = useGetSlotAvailabilityQuery({
        date: selectedDate ? format(selectedDate,'yyyy-MM-dd') : '',
        serviceID: id
    },{ skip: !selectedDate })

    useEffect(() => {
        setSelectedSlot(null)
    },[selectedDate])

    if (isServiceLoading || isSlotsLoading) return <div className='h-screen relative'><Loading /></div>
    if (isServiceError || isSlotsError) return <div className="text-center py-10">Error loading service details</div>

    const handleBooking = () => {
        if (selectedSlot && id) {
            navigate(`/booking/${id}/${selectedSlot}`)
        } else {
            alert('Please select a time slot before booking.')
        }
    }

    const isPastDate = (date: Date) => {
        return isBefore(startOfDay(date),startOfDay(new Date()))
    }

    return (
        <div className="min-h-screen relative">
            <div className="wrapper mx-auto overflow-hidden shadow-lg">
                <div className="relative h-[20rem] md:h-[30rem] overflow-hidden">
                    <img
                        src={service.data.image}
                        alt={service.data.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
                        <div className="p-4 md:p-6">
                            <Badge className="mb-2" variant="secondary"><DollarSign className="w-4 h-4 mr-2" /> {service.data.price}</Badge>
                            <CardTitle className="text-2xl md:text-3xl font-bold text-white mb-2">{service.data.name}</CardTitle>
                            <CardDescription className="text-gray-200 text-sm md:text-base">{service.data.description}</CardDescription>
                        </div>
                    </div>
                </div>

                <div className="p-4 md:p-6">
                    <div className="flex flex-col lg:flex-row w-full justify-between gap-8">
                        <div className='lg:sticky lg:top-4 lg:self-start'>
                            <h4 className="text-lg font-semibold mt-6 mb-2 text-white">Service Description</h4>
                            <div className="text-sm md:text-base">{service.data.description}</div>
                            <div>
                                <h4 className="text-lg font-semibold mt-6 mb-2 text-white">Service Includes</h4>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 mb-4 gap-2">
                                    {service?.data?.benefits.map((benefit,index) => (
                                        <li key={index} className="flex items-center">
                                            <Sparkles className="w-4 h-4 mr-2 text-blue-500" />
                                            <span className="text-sm">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                                <h3 className="text-xl font-semibold mb-2 text-white">Service Details</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <Clock className="w-5 h-5 mr-2 text-blue-500" />
                                        <span className="text-sm"><strong>Duration:</strong> {service.data.duration}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <DollarSign className="w-5 h-5 mr-2 text-blue-500" />
                                        <span className="text-sm"><strong>Price:</strong> {service.data.price}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Car className="w-5 h-5 mr-2 text-blue-500" />
                                        <span className="text-sm"><strong>Suitable for:</strong> {service.data.suitableFor.join(', ')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='lg:sticky lg:top-4 lg:self-start mt-8 lg:mt-0'>
                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-white">Select a Date</h3>
                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    disabled={(date) => isPastDate(date)}
                                    className="rounded-md border shadow p-3 bg-primary-foreground/30 mx-auto"
                                />
                            </div>
                            <div className="mt-8">
                                <h3 className="text-xl font-semibold mb-4 text-white">Available Time Slots</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    {selectedDate ? format(selectedDate,'MMMM d, yyyy') : 'Please select a date'}
                                </p>
                                {selectedDate ? (
                                    slots && !isSlotsError && slots.data && slots.data.length > 0 ? (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {slots.data.map((slot) => (
                                                <Button
                                                    key={slot._id}
                                                    variant={slot.isBooked === 'available' ? (selectedSlot === slot._id ? 'default' : 'outline') : 'ghost'}
                                                    onClick={() => slot.isBooked === 'available' && setSelectedSlot(slot._id)}
                                                    disabled={slot.isBooked !== 'available'}
                                                    className={`w-full ${slot.isBooked !== 'available' ? 'bg-gray-100 text-gray-400' : ''}`}
                                                >
                                                    {slot.startTime}
                                                </Button>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-400 w-full md:w-64 text-sm">No slots available for this date. Please select another date.</p>
                                    )
                                ) : (
                                    <p className="text-gray-400">Please select a date to view available slots.</p>
                                )}
                            </div>
                            <Button
                                className="w-full mt-6 bg-foreground text-white hover:bg-black"
                                size="lg"
                                disabled={!selectedSlot || isPastDate(selectedDate!)}
                                onClick={handleBooking}
                            >
                                {selectedSlot ? 'Book This Service' : 'Select a Time Slot'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 text-center wrapper mb-5 px-4">
                <h3 className="text-2xl font-semibold mb-4 text-white">Why Choose Our Premium Car Wash?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-primary-foreground">
                        <CardHeader>
                            <Droplets className="w-10 h-10 text-blue-500 mb-2" />
                            <CardTitle>Eco-Friendly Products</CardTitle>
                        </CardHeader>
                        <CardContent>
                            We use environmentally safe cleaning solutions that are tough on dirt but gentle on your car's finish.
                        </CardContent>
                    </Card>
                    <Card className="bg-primary-foreground">
                        <CardHeader>
                            <Shield className="w-10 h-10 text-blue-500 mb-2" />
                            <CardTitle>Paint Protection</CardTitle>
                        </CardHeader>
                        <CardContent>
                            Our washing techniques and products help preserve your car's paint, maintaining its value over time.
                        </CardContent>
                    </Card>
                    <Card className="bg-primary-foreground">
                        <CardHeader>
                            <Sparkles className="w-10 h-10 text-blue-500 mb-2" />
                            <CardTitle>Attention to Detail</CardTitle>
                        </CardHeader>
                        <CardContent>
                            We go beyond the surface, ensuring every nook and cranny of your vehicle is thoroughly cleaned.
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}