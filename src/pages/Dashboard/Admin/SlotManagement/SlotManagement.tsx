/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCreateSlotMutation,useGetSlotAvailabilityQuery,useUpdateSlotStatusMutation } from '@/redux/features/slot/slotApi'
import { useGetServicesQuery } from '@/redux/features/service/serviceApi'
import { useState,useEffect } from 'react'
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CardContent,CardHeader,CardTitle } from '@/components/ui/card'
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
import { Input } from '@/components/ui/input'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

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
    const [date,setDate] = useState<Date>()

    const [createSlot,{ isLoading: isCreating,error: createSlotError }] = useCreateSlotMutation()
    const { data: availableSlots,isLoading: slotsLoading,} = useGetSlotAvailabilityQuery({})
    const { data: services,isLoading: servicesLoading } = useGetServicesQuery({})
    const [updateSlotStatus] = useUpdateSlotStatusMutation()

    console.log(createSlotError)

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
        const formattedDate = date ? format(date,"yyyy-MM-dd") : ''
        const slotData = {
            ...newSlot,
            date: formattedDate
        }
        console.log("newSlot",slotData)
        try {
            const result = await createSlot(slotData).unwrap()
            console.log(result)
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


    if (createSlotError) {
        const error = createSlotError as FetchBaseQueryError | SerializedError;

        if ('status' in error) {
            // This is a FetchBaseQueryError
            if (typeof error.data === 'object' && error.data && 'message' in error.data) {
                toast.error(error.data.message as string);
            } else {
                toast.error('An error occurred while creating the slot.');
            }
        } else {
            // This is a SerializedError
            toast.error(error.message || 'An error occurred while creating the slot.');
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


    return (
        <div className="w-full max-w-screen-2xl mx-auto text-white relative">

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
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date,"PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
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
                    {
                        services ? <div className="relative">
                            {(slotsLoading || servicesLoading) && <Loading />}
                            {Object.keys(groupedSlots).length === 0 ? (
                                <p className="text-center text-gray-500">No slots available at the moment.</p>
                            ) : (
                                Object.entries(groupedSlots).map(([serviceId,{ serviceName,slots }]) => (
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
                                                    {
                                                        slots ? <TableBody>
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
                                                        </TableBody> : <div>No slots available at the moment.</div>
                                                    }
                                                </Table>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div> : <div>No Service available at the moment.</div>
                    }

                </div>
            </CardContent>
        </div>
    )
}