import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
//import { motion } from 'framer-motion'
import { Clock,DollarSign,Car,Droplets,Shield,Sparkles } from 'lucide-react'
//import { useState } from 'react'
import image1 from "@/assets/Image/Services/Auto Detailing.jpg"

// Mock data for the selected service
const selectedService = {
    id: 1,
    name: 'Premium Car Wash & Detailing',
    description: 'Give your car the royal treatment with our premium wash and detailing service. We use eco-friendly products and advanced techniques to make your vehicle shine like new.',
    duration: '90 minutes',
    price: '$49.99',
    image: image1,
    benefits: [
        'Exterior hand wash and dry',
        'Interior vacuuming and cleaning',
        'Tire and rim detailing',
        'Dashboard and console polishing',
        'Window and mirror cleaning',
        'Air freshener application'
    ],
    suitableFor: ['All vehicle types','Regular maintenance','Special occasions'],
}

// Mock data for available time slots
const getAvailableTimeSlots = (date: Date) => {
    const slots = [
        '08:00 AM','09:30 AM','11:00 AM','12:30 PM',
        '02:00 PM','03:30 PM','05:00 PM','06:30 PM'
    ]
    const bookedSlots = date.getDate() % 2 === 0 ? ['09:30 AM','02:00 PM'] : ['11:00 AM','03:30 PM']
    return slots.map(slot => ({ time: slot,isAvailable: !bookedSlots.includes(slot) }))
}

export default function CarWashServicePage() {
    const [selectedDate,setSelectedDate] = useState<Date | undefined>(new Date())
    const [selectedSlot,setSelectedSlot] = useState<string | null>(null)
    const availableTimeSlots = selectedDate ? getAvailableTimeSlots(selectedDate) : []

    console.log(selectedDate,selectedSlot)

    return (
        <div className=" min-h-screen">
            <div className="wrapper mx-auto overflow-hidden shadow-lg">
                <div className="relative h-[30rem] overflow-hidden">
                    <img
                        src={selectedService.image}
                        alt={selectedService.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
                        <div className="p-6">
                            <Badge className="mb-2" variant="secondary">{selectedService.duration}</Badge>
                            <CardTitle className="text-3xl font-bold text-white mb-2">{selectedService.name}</CardTitle>
                            <CardDescription className="text-gray-200">{selectedService.description}</CardDescription>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex w-full justify-between gap-8">
                        <div className=''>
                            <h4 className="text-lg font-semibold mt-6 mb-2 text-white">Service Description</h4>
                            <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit repellendus tempore esse magni, sunt labore distinctio consequuntur odio libero alias doloremque animi eveniet porro error deleniti, magnam similique aliquam voluptates ullam maiores reprehenderit maxime iste. Harum eaque omnis, nisi illo dignissimos maiores quod quos optio ratione! Architecto minima hic rerum ut. Accusantium veritatis, doloribus quod veniam perferendis fugit exercitationem, aut blanditiis dolorem reiciendis, voluptas voluptatibus vitae nobis. Fuga, consequatur architecto placeat corporis modi sed corrupti obcaecati. Exercitationem molestiae delectus odio nostrum totam ad cupiditate nulla quod quia consequatur veritatis debitis provident, officiis aliquid magnam vitae impedit libero perspiciatis quibusdam eos deserunt natus et id. Laboriosam id quo officia, repudiandae officiis voluptatum ullam saepe, aliquam error deleniti ea odit optio sint nisi velit dolorum quaerat, asperiores unde dolorem voluptatibus recusandae. Eum saepe impedit quas minus quod, ad hic. Delectus, vel nihil iure quaerat esse repellendus placeat. Exercitationem aut repellat sequi quae temporibus omnis blanditiis tenetur modi? Ducimus perspiciatis, veritatis aspernatur autem reprehenderit est corporis voluptatem id magni veniam voluptatibus mollitia? Esse sed non consequatur suscipit, ab reiciendis quaerat blanditiis nesciunt perferendis deleniti vel cum voluptate fugit et ratione quo dolorum soluta eos quod animi aliquid. Quod tenetur hic sunt impedit sapiente? Laboriosam, nesciunt. Sequi amet voluptates minima nisi placeat? Nostrum, maxime recusandae fugiat facere magnam cumque veniam illum minus ipsa ea ipsam optio modi autem praesentium, eum nesciunt labore ab reiciendis deleniti asperiores? Ex laudantium sunt dolor magnam quaerat doloremque iure sed dolorem? Iste aut ad asperiores vero ab veniam odit at alias nesciunt beatae dolorem earum magnam ullam quo non praesentium voluptatem reprehenderit, pariatur aliquam saepe veritatis! Odit, officia. Neque rerum nulla dicta laudantium provident porro animi cum, voluptate repellat. Debitis, molestiae doloribus enim eaque optio consequuntur! Facilis dignissimos error vero nihil quisquam! Nobis, ratione asperiores in laborum dolore eos.</div>
                            <div>
                                <div>
                                    <h4 className="text-lg font-semibold mt-6 mb-2 text-white">Service Includes</h4>
                                    <ul className="grid grid-cols-2 mb-4 gap-2">
                                        {selectedService.benefits.map((benefit,index) => (
                                            <li key={index} className="flex items-center">
                                                <Sparkles className="w-4 h-4 mr-2 text-blue-500" />
                                                <span className="text-sm">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 text-white">Service Details</h3>
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <Clock className="w-5 h-5 mr-2 text-blue-500" />
                                            <span><strong>Duration:</strong> {selectedService.duration}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <DollarSign className="w-5 h-5 mr-2 text-blue-500" />
                                            <span><strong>Price:</strong> {selectedService.price}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Car className="w-5 h-5 mr-2 text-blue-500" />
                                            <span><strong>Suitable for:</strong> {selectedService.suitableFor.join(', ')}</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* times */}
                        <div className='sticky top-0'>
                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-white">Select a Date</h3>
                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    className="rounded-md border shadow p-3 bg-primary-foreground/30"
                                />
                            </div>
                            <div className="mt-8">
                                <h3 className="text-xl font-semibold mb-4 text-white">Available Time Slots</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    {selectedDate ? format(selectedDate,'MMMM d, yyyy') : 'Please select a date'}
                                </p>
                                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                                    {availableTimeSlots.map((slot,index) => (
                                        //<motion.div
                                        //  key={index}
                                        //  whileHover={{ scale: 1.05 }}
                                        //  whileTap={{ scale: 0.95 }}
                                        //>
                                        <Button
                                            key={index}
                                            variant={slot.isAvailable ? (selectedSlot === slot.time ? 'default' : 'outline') : 'ghost'}
                                            onClick={() => slot.isAvailable && setSelectedSlot(slot.time)}
                                            disabled={!slot.isAvailable}
                                            className={`w-full ${!slot.isAvailable ? 'bg-gray-100 text-gray-400' : ''}`}
                                        >
                                            {slot.time}
                                        </Button>
                                        //</motion.div>
                                    ))}
                                </div>
                            </div>
                            {/*<div className=" p-6">*/}
                            <Button
                                className="w-full mt-3 bg-foreground text-white hover:bg-black"
                                size="lg"
                                disabled={!selectedSlot}
                                onClick={() => alert(`Booking confirmed for ${selectedService.name} on ${format(selectedDate!,'MMMM d, yyyy')} at ${selectedSlot}`)}
                            >
                                {selectedSlot ? 'Book This Service' : 'Select a Time Slot'}
                            </Button>
                            {/*</div>*/}
                        </div>
                    </div>

                </div>

            </div>
            <div className="mt-8 text-center wrapper mb-5">
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