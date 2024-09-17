/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCreateSlotMutation,useGetSlotAvailabilityQuery,useUpdateSlotStatusMutation } from '@/redux/features/slot/slotApi'
import { useGetServicesQuery } from '@/redux/features/service/serviceApi'
import { useState,useEffect } from 'react'
import { Card,CardContent,CardHeader,CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { ChevronDown,ChevronRight } from 'lucide-react'
import { toast } from 'sonner'
import Loading from '@/components/ui/Loading'
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

type GroupedSlots = {
    [serviceId: string]: {
        serviceName: string;
        slots: Slot[];
    };
};

export default function SlotManagement() {
    const [groupedSlots,setGroupedSlots] = useState<GroupedSlots>({})
    const [expandedServices,setExpandedServices] = useState<Set<string>>(new Set())
    const [newSlot,setNewSlot] = useState<NewSlot>({
        service: '',
        date: '',
        startTime: '',
        endTime: '',
        isBooked: 'available'
    })

    const [createSlot,{ isLoading: isCreating }] = useCreateSlotMutation()
    const { data: availableSlots,isLoading: slotsLoading,error: slotsError } = useGetSlotAvailabilityQuery({})
    const { data: services,isLoading: servicesLoading,error: servicesError } = useGetServicesQuery({})
    const [updateSlotStatus] = useUpdateSlotStatusMutation()

    useEffect(() => {
        if (availableSlots) {
            const grouped = availableSlots.data.reduce((acc: GroupedSlots,slot: Slot) => {
                const serviceId = slot.service._id;
                if (!acc[serviceId]) {
                    acc[serviceId] = {
                        serviceName: slot.service.name,
                        slots: []
                    };
                }
                acc[serviceId].slots.push(slot);
                return acc;
            },{});
            setGroupedSlots(grouped);
        }
    },[availableSlots])

    const handleCreateSlot = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await createSlot(newSlot).unwrap()
            toast.success('Slot created successfully')
            setNewSlot({
                service: '',
                date: '',
                startTime: '',
                endTime: '',
                isBooked: 'available'
            })
        } catch (err) {
            toast.error('Failed to create slot')
        }
    }

    const handleUpdateSlotStatus = async (slotId: string,newStatus: 'available' | 'cancelled') => {
        const toastId = toast.loading('Updating slot status...');
        try {
            const result = await updateSlotStatus({ id: slotId,isBooked: newStatus }).unwrap();
            if (result.success) {
                toast.success('Slot status updated successfully',{ id: toastId });
            } else {
                toast.error(`Failed to update slot status: ${result.message}`,{ id: toastId });
            }
        } catch (err) {
            console.error('Error updating slot status:',err);
            toast.error('An error occurred. Please try again later.',{ id: toastId });
        }

    }

    const toggleServiceExpansion = (serviceId: string) => {
        setExpandedServices(prev => {
            const newSet = new Set(prev);
            if (newSet.has(serviceId)) {
                newSet.delete(serviceId);
            } else {
                newSet.add(serviceId);
            }
            return newSet;
        });
    }

    //if (slotsLoading || servicesLoading) return <div>Loading...</div>
    if (slotsError || servicesError) return <div>Error: An error occurred</div>

    return (
        <div className="w-full max-w-screen-2xl mx-auto text-white relative">
            {
                slotsLoading || servicesLoading && <Loading />
            }
            <CardHeader>
                <CardTitle className='text-3xl font-semibold'>Slot Management</CardTitle>
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
                                    {services?.data.map((service: TService) => (
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
                    <Button type="submit" disabled={isCreating}>
                        {isCreating ? 'Creating...' : 'Create Slot'}
                    </Button>
                </form>

                <div className="mt-8">
                    <h2 className="text-3xl font-semibold mb-4">Available Slots by Service</h2>
                    <p className="mb-4 text-sm">Click on a service to view or manage its slots.</p>
                    {Object.entries(groupedSlots).map(([serviceId,{ serviceName,slots }]) => (
                        <div key={serviceId} className="mb-4 border rounded-lg overflow-hidden">
                            <Button
                                variant="ghost"
                                className="w-full justify-between p-4 text-left"
                                onClick={() => toggleServiceExpansion(serviceId)}
                            >
                                <span>{serviceName} ({slots.length} slots)</span>
                                {expandedServices.has(serviceId) ? <ChevronDown /> : <ChevronRight />}
                            </Button>
                            {expandedServices.has(serviceId) && (
                                <div className="p-4">
                                    <p className="mb-2">Manage slots for {serviceName}:</p>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Time</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {slots.map((slot) => (
                                                <TableRow key={slot._id}>
                                                    <TableCell>{slot.date}</TableCell>
                                                    <TableCell>{`${slot.startTime} - ${slot.endTime}`}</TableCell>
                                                    <TableCell>{slot.isBooked}</TableCell>
                                                    <TableCell>
                                                        {slot.isBooked === 'booked' ? (
                                                            <span className="text-gray-500">Booked</span>
                                                        ) : (
                                                            <Select
                                                                onValueChange={(value) => handleUpdateSlotStatus(slot._id,value as 'available' | 'cancelled')}
                                                                defaultValue={slot.isBooked}
                                                            >
                                                                <SelectTrigger className="w-[180px]">
                                                                    <SelectValue placeholder="Select status" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="available">Available</SelectItem>
                                                                    <SelectItem value="canceled">Canceled</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </div>
    )
}