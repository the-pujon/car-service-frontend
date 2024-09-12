import { Badge } from '@/components/ui/badge'
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from '@/components/ui/card'
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from '@/components/ui/select'
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from '@/components/ui/table'
import React,{ useState } from 'react'

const SlotManagement = () => {
    const [slots,setSlots] = useState([
        { id: 1,service: "Haircut",date: "2023-06-15",time: "10:00 AM",status: "AVAILABLE" },
        { id: 2,service: "Manicure",date: "2023-06-15",time: "11:00 AM",status: "BOOKED" },
        { id: 3,service: "Pedicure",date: "2023-06-15",time: "2:00 PM",status: "AVAILABLE" },
    ])

    const handleUpdateSlotStatus = (id,newStatus) => {
        const updatedSlots = slots.map((slot) =>
            slot.id === id ? { ...slot,status: newStatus } : slot
        )
        setSlots(updatedSlots)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Slot Management</CardTitle>
                <CardDescription>Manage your service slots</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Service</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {slots.map((slot) => (
                            <TableRow key={slot.id}>
                                <TableCell>{slot.service}</TableCell>
                                <TableCell>{slot.date}</TableCell>
                                <TableCell>{slot.time}</TableCell>
                                <TableCell>
                                    <Badge variant={slot.status === "AVAILABLE" ? "default" : "destructive"}>
                                        {slot.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {slot.status !== "BOOKED" && (
                                        <Select
                                            onValueChange={(value) => handleUpdateSlotStatus(slot.id,value)}
                                            defaultValue={slot.status}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Update status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="AVAILABLE">Available</SelectItem>
                                                <SelectItem value="CANCELLED">Cancelled</SelectItem>
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

export default SlotManagement