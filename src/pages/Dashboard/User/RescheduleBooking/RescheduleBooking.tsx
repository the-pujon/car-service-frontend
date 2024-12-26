/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, isBefore, startOfDay } from "date-fns";
import {
  useGetUserBookingsQuery,
  useCancelBookingMutation,
  useRescheduleBookingMutation,
} from "@/redux/features/bookings/bookingApi";
import { useGetSlotAvailabilityQuery } from "@/redux/features/slot/slotApi";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Loading from "@/components/ui/Loading";

const RescheduleBooking = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isRescheduling, setIsRescheduling] = useState(false);

  const { data: bookingsData, isLoading: isBookingsLoading } = useGetUserBookingsQuery(undefined);
  const [cancelBooking] = useCancelBookingMutation();
  const [rescheduleBooking] = useRescheduleBookingMutation();

  const { data: slots, isLoading: isSlotsLoading } = useGetSlotAvailabilityQuery(
    {
      date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
      serviceId: selectedBooking?.service?._id,
    },
    { skip: !selectedDate || !selectedBooking }
  );

  const [upcomingBookings, setUpcomingBookings] = useState<any[]>([]);

  useEffect(() => {
    if (bookingsData?.data) {
      const now = new Date();
      const upcoming = bookingsData.data.filter((booking: any) => {
        const bookingDate = new Date(`${booking.slot.date} ${booking.slot.startTime}`);
        return bookingDate > now;
      });
      setUpcomingBookings(upcoming);
    }
  }, [bookingsData]);

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await cancelBooking(bookingId).unwrap();
      toast.success("Booking cancelled successfully");
    } catch (error) {
      toast.error("Failed to cancel booking");
    }
  };

  const handleRescheduleBooking = async () => {
    if (!selectedSlot || !selectedBooking) {
      toast.error("Please select a new time slot");
      return;
    }

    try {
      await rescheduleBooking({
        bookingId: selectedBooking._id,
        slotId: selectedSlot,
      }).unwrap();
      toast.success("Booking rescheduled successfully");
      setIsRescheduling(false);
      setSelectedBooking(null);
      setSelectedSlot(null);
    } catch (error) {
      toast.error("Failed to reschedule booking");
    }
  };

  const isPastDate = (date: Date) => {
    return isBefore(startOfDay(date), startOfDay(new Date()));
  };

  if (isBookingsLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Manage Your Bookings</h2>

      {upcomingBookings.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-gray-500">No upcoming bookings found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {upcomingBookings.map((booking) => (
            <Card key={booking._id}>
              <CardHeader>
                <CardTitle>{booking.service.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <p>Date: {booking.slot.date}</p>
                    <p>Time: {booking.slot.startTime}</p>
                    <p>Price: ${booking.service.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedBooking(booking);
                        setIsRescheduling(true);
                      }}
                    >
                      Reschedule
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">Cancel Booking</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to cancel this booking? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>No, keep it</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleCancelBooking(booking._id)}
                          >
                            Yes, cancel it
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {isRescheduling && selectedBooking && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Reschedule Booking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold mb-4">Select New Date</h3>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => isPastDate(date)}
                  className="rounded-md border"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Available Time Slots</h3>
                {isSlotsLoading ? (
                  <Loading />
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {slots?.data?.map((slot: any) => (
                      <Button
                        key={slot._id}
                        variant={selectedSlot === slot._id ? "default" : "outline"}
                        onClick={() => setSelectedSlot(slot._id)}
                        disabled={slot.isBooked !== "available"}
                      >
                        {slot.startTime}
                      </Button>
                    ))}
                  </div>
                )}
                <div className="mt-4 flex gap-2">
                  <Button
                    onClick={handleRescheduleBooking}
                    disabled={!selectedSlot}
                  >
                    Confirm Reschedule
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsRescheduling(false);
                      setSelectedBooking(null);
                      setSelectedSlot(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RescheduleBooking;