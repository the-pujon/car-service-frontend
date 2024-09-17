
import { useState,useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card,CardContent,CardHeader,CardTitle } from '@/components/ui/card'
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from '@/components/ui/table'
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type TService = {
    _id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    isDeleted: boolean;
    image: string;
}

type Slot = {
    _id: string
    service: TService
    date: string
    startTime: string
    endTime: string
    isBooked: 'available' | 'booked' | 'cancelled'
}

type SlotData = {
    success: boolean
    statusCode: number
    message: string
    data: Slot[]
}

type NewSlot = {
    service: string
    date: string
    startTime: string
    endTime: string
    isBooked: 'available' | 'booked' | 'canceled'
}

export default function SlotManagement() {
    const [slots,setSlots] = useState<Slot[]>([])
    const [services,setServices] = useState<TService[]>([])
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState<string | null>(null)
    const [newSlot,setNewSlot] = useState<NewSlot>({
        service: '',
        date: '',
        startTime: '',
        endTime: '',
        isBooked: 'available'
    })

    useEffect(() => {
        fetchSlots()
        fetchServices()
    },[])

    const fetchSlots = async () => {
        setLoading(true)
        try {
            // In a real application, replace this with an actual API call
            const response: SlotData = {
                success: true,
                statusCode: 200,
                message: "Available slots retrieved successfully",
                data: [
                    // ... (paste the sample data here)
                ]
            }
            setSlots(response.data)
        } catch (err) {
            setError('Failed to fetch slots')
        } finally {
            setLoading(false)
        }
    }

    const fetchServices = async () => {
        try {
            // In a real application, replace this with an actual API call
            const sampleServices: TService[] = [
                {
                    _id: '1',
                    name: 'Car Wash',
                    description: 'Professional car washing service',
                    price: 50,
                    duration: 60,
                    isDeleted: false,
                    image: 'https://example.com/car-wash.jpg'
                },
                {
                    _id: '2',
                    name: 'Bangla Wash',
                    description: 'Eiusmod mollit ad co',
                    price: 103,
                    duration: 39,
                    isDeleted: false,
                    image: 'https://i.ibb.co/KDpV0GZ/hero8.jpg'
                },
                // Add more sample services as needed
            ]
            setServices(sampleServices)
        } catch (err) {
            setError('Failed to fetch services')
        }
    }

    const updateSlotStatus = async (slotId: string,newStatus: 'available' | 'cancelled') => {
        // In a real application, make an API call to update the slot status
        setSlots(prevSlots =>
            prevSlots.map(slot =>
                slot._id === slotId ? { ...slot,isBooked: newStatus } : slot
            )
        )
    }

    const handleCreateSlot = async (e: React.FormEvent) => {
        e.preventDefault()
        // In a real application, make an API call to create the new slot
        console.log('Creating new slot:',newSlot)
        // Reset the form after submission
        setNewSlot({
            service: '',
            date: '',
            startTime: '',
            endTime: '',
            isBooked: 'available'
        })
        // Optionally, refetch the slots to include the new one
        // await fetchSlots()
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>Slot Management</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleCreateSlot} className="space-y-4 mb-8">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="service">Service</Label>
                            <Select
                                value={newSlot.service}
                                onValueChange={(value) => setNewSlot({ ...newSlot,service: value })}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                                <SelectContent>
                                    {services.map((service) => (
                                        <SelectItem key={service._id} value={service._id}>
                                            {service.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="date">Date</Label>
                            <Input
                                id="date"
                                type="date"
                                value={newSlot.date}
                                onChange={(e) => setNewSlot({ ...newSlot,date: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="startTime">Start Time</Label>
                            <Input
                                id="startTime"
                                type="time"
                                value={newSlot.startTime}
                                onChange={(e) => setNewSlot({ ...newSlot,startTime: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="endTime">End Time</Label>
                            <Input
                                id="endTime"
                                type="time"
                                value={newSlot.endTime}
                                onChange={(e) => setNewSlot({ ...newSlot,endTime: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <Button type="submit">Create Slot</Button>
                </form>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Service</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {slots.map((slot) => (
                            <TableRow key={slot._id}>
                                <TableCell>{slot.service.name}</TableCell>
                                <TableCell>{slot.date}</TableCell>
                                <TableCell>{`${slot.startTime} - ${slot.endTime}`}</TableCell>
                                <TableCell>{slot.isBooked}</TableCell>
                                <TableCell>
                                    {slot.isBooked === 'booked' ? (
                                        <span className="text-gray-500">Cannot modify</span>
                                    ) : (
                                        <Select
                                            onValueChange={(value) => updateSlotStatus(slot._id,value as 'available' | 'cancelled')}
                                            defaultValue={slot.isBooked}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="available">Available</SelectItem>
                                                <SelectItem value="cancelled">Cancelled</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}