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
import { motion, AnimatePresence } from "framer-motion";
import { BookingSkeleton, TimeSlotsSkeleton, PageHeaderSkeleton } from "@/components/skeletons";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3
    }
  }
};

const RescheduleBooking = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isRescheduling, setIsRescheduling] = useState(false);

  const { data: bookingsData, isLoading: isBookingsLoading } = useGetUserBookingsQuery(undefined);
  const [cancelBooking] = useCancelBookingMutation();
  const [rescheduleBooking] = useRescheduleBookingMutation();

  const { data: slots, isLoading: isSlotsLoading, error: slotsError } = useGetSlotAvailabilityQuery(
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

  useEffect(() => {
    setSelectedSlot(null);
  }, [selectedDate]);

  useEffect(() => {
    if (!slots?.data || slots.data.length === 0) {
      setSelectedSlot(null);
    }
  }, [slots]);

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
    return (
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="p-4 space-y-6"
      >
        <PageHeaderSkeleton />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <BookingSkeleton key={i} />
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-4 space-y-6"
    >
      <motion.h2 
        variants={itemVariants}
        className="text-2xl font-bold mb-4"
      >
        Manage Your Bookings
      </motion.h2>

      <AnimatePresence mode="wait">
        {upcomingBookings.length === 0 ? (
          <motion.div
            key="no-bookings"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-gray-500">No upcoming bookings found</p>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div 
            key="bookings-list"
            variants={containerVariants}
            className="grid gap-4"
          >
            {upcomingBookings.map((booking, index) => (
              <motion.div
                key={booking._id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ delay: index * 0.1 }}
              >
                <Card>
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
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSelectedBooking(booking);
                              setIsRescheduling(true);
                            }}
                          >
                            Reschedule
                          </Button>
                        </motion.div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button variant="destructive">Cancel Booking</Button>
                            </motion.div>
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
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isRescheduling && selectedBooking && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Reschedule Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-lg font-semibold mb-4">Select New Date</h3>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => isPastDate(date)}
                      className="rounded-md border"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-lg font-semibold mb-4">Available Time Slots</h3>
                    {isSlotsLoading ? (
                      <TimeSlotsSkeleton />
                    ) : (
                      <>
                        {(!slots?.data || slots.data.length === 0 || slotsError) && selectedDate ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center p-6 bg-primary-foreground/20 rounded-lg border border-primary/10"
                          >
                            <p className="text-gray-400">
                              No slots available for {format(selectedDate, "MMMM d, yyyy")}. 
                              Please select another date.
                            </p>
                          </motion.div>
                        ) : !selectedDate ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center p-6 bg-primary-foreground/20 rounded-lg border border-primary/10"
                          >
                            <p className="text-gray-400">
                              Please select a date to view available slots.
                            </p>
                          </motion.div>
                        ) : (
                          <motion.div 
                            className="grid grid-cols-2 gap-2"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            {slots.data.map((slot: any, index: number) => (
                              <motion.div
                                key={slot._id}
                                variants={itemVariants}
                                transition={{ delay: index * 0.05 }}
                              >
                                <Button
                                  variant={selectedSlot === slot._id ? "default" : "outline"}
                                  onClick={() => setSelectedSlot(slot._id)}
                                  disabled={slot.isBooked !== "available"}
                                  className="w-full"
                                >
                                  {slot.startTime}
                                </Button>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </>
                    )}
                    <motion.div 
                      className="mt-4 flex gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          onClick={handleRescheduleBooking}
                          disabled={!selectedSlot}
                        >
                          Confirm Reschedule
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RescheduleBooking;