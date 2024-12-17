/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, isBefore, startOfDay } from "date-fns";
import {
  Clock,
  DollarSign,
  Car,
  Droplets,
  Shield,
  Sparkles,
  Star,
  StarHalf,
  MessageCircle,
} from "lucide-react";
import { useGetServiceByIdQuery } from "@/redux/features/service/serviceApi";
import { useGetSlotAvailabilityQuery } from "@/redux/features/slot/slotApi";
import Loading from "@/components/ui/Loading";
import { useNavigate } from "react-router-dom";
import {
  useAddServiceReviewMutation,
  useGetServiceReviewsByServiceIDQuery,
} from "@/redux/features/serviceReview/serviceReviewApi";
// import { useAppSelector } from '@/redux/hooks'
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format as formatDate } from "date-fns";
import { Input } from "@/components/ui/input";

interface IReview {
  _id: string;
  rating: number;
  review: string;
  name: string;
  createdAt: string;
}

export default function ServiceDetails() {
  const { id } = useParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    data: service,
    isLoading: isServiceLoading,
    isError: isServiceError,
    error: serviceError,
  } = useGetServiceByIdQuery(id);
  const {
    data: slots,
    isLoading: isSlotsLoading,
    isError: isSlotsError,
    error: slotsError,
  } = useGetSlotAvailabilityQuery(
    {
      date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
      serviceId: id,
    },
    { skip: !selectedDate }
  );

  const { data: reviews, isLoading: isReviewsLoading } =
    useGetServiceReviewsByServiceIDQuery(id);
  console.log("reviews", reviews);
  const [addReview] = useAddServiceReviewMutation();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [name, setName] = useState("");
  const user = "pujondas@gmail.com";

  console.log(id);

  console.log(slots);

  useEffect(() => {
    setSelectedSlot(null);
  }, [selectedDate]);

  if (isServiceError) {
    console.error("serviceError", serviceError);
  }

  if (isSlotsError) {
    console.error("slotsError", slotsError);
  }

  if (isServiceLoading || isSlotsLoading)
    return (
      <div className="h-screen relative">
        <Loading />
      </div>
    );

  const handleBooking = () => {
    if (selectedSlot && id) {
      navigate(`/booking/${id}/${selectedSlot}`);
    } else {
      alert("Please select a time slot before booking.");
    }
  };

  const isPastDate = (date: Date) => {
    return isBefore(startOfDay(date), startOfDay(new Date()));
  };

  const handleSubmitReview = async () => {
    if (!user) {
      toast.error("Please login to submit a review");
      return;
    }
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    console.log("rating", rating);
    console.log("reviewText", reviewText);
    console.log("id", id);
    console.log("user", user);
    try {
      await addReview({
        rating,
        review: reviewText,
        service: id,
        user: user,
        name: user,
      }).unwrap();
      toast.success("Review submitted successfully");
      setRating(0);
      setReviewText("");
    } catch (error) {
      toast.error("Failed to submit review");
    }
  };

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
              <Badge className="mb-2" variant="secondary">
                <DollarSign className="w-4 h-4 mr-2" /> {service.data.price}
              </Badge>
              <CardTitle className="text-2xl md:text-3xl font-bold text-white mb-2">
                {service.data.name}
              </CardTitle>
              <CardDescription className="text-gray-200 text-sm md:text-base">
                {service.data.description}
              </CardDescription>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6">
          <div className="flex flex-col lg:flex-row w-full justify-between gap-8">
            <div className="lg:sticky lg:top-4 lg:self-start">
              <h4 className="text-lg font-semibold mt-6 mb-2 text-white">
                Service Description
              </h4>
              <div className="text-sm md:text-base">
                {service.data.description}
              </div>
              <div>
                <h4 className="text-lg font-semibold mt-6 mb-2 text-white">
                  Service Includes
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 mb-4 gap-2">
                  {service?.data?.benefits.map(
                    (benefit: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <Sparkles className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    )
                  )}
                </ul>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Service Details
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-500" />
                    <span className="text-sm">
                      <strong>Duration:</strong> {service.data.duration}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-blue-500" />
                    <span className="text-sm">
                      <strong>Price:</strong> {service.data.price}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Car className="w-5 h-5 mr-2 text-blue-500" />
                    <span className="text-sm">
                      <strong>Suitable for:</strong>{" "}
                      {service.data.suitableFor.join(", ")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-4 lg:self-start mt-8 lg:mt-0">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Select a Date
                </h3>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => isPastDate(date)}
                  className="rounded-md border shadow p-3 bg-primary-foreground/30 mx-auto"
                />
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Available Time Slots
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {selectedDate
                    ? format(selectedDate, "MMMM d, yyyy")
                    : "Please select a date"}
                </p>
                {selectedDate ? (
                  slots &&
                  !isSlotsError &&
                  slots.data &&
                  slots.data.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {slots.data.map((slot: any) => (
                        <Button
                          key={slot._id}
                          variant={
                            slot.isBooked === "available"
                              ? selectedSlot === slot._id
                                ? "default"
                                : "outline"
                              : "ghost"
                          }
                          onClick={() =>
                            slot.isBooked === "available" &&
                            setSelectedSlot(slot._id)
                          }
                          disabled={slot.isBooked !== "available"}
                          className={`w-full ${
                            slot.isBooked !== "available"
                              ? "bg-gray-100 text-gray-400"
                              : ""
                          }`}
                        >
                          {slot.startTime}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 w-full md:w-64 text-sm">
                      No slots available for this date. Please select another
                      date.
                    </p>
                  )
                ) : (
                  <p className="text-gray-400">
                    Please select a date to view available slots.
                  </p>
                )}
              </div>
              <Button
                className="w-full mt-6 bg-foreground text-white hover:bg-black"
                size="lg"
                disabled={!selectedSlot || isPastDate(selectedDate!)}
                onClick={handleBooking}
              >
                {selectedSlot ? "Book This Service" : "Select a Time Slot"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 wrapper mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Side: Rating Stats & Review Form */}
          <div className="lg:col-span-5">
            <div
              className="space-y-8 lg:sticky lg:top-44"
              style={{ maxHeight: "calc(100vh - 4rem)", overflowY: "auto" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-6"
              >
                <h3 className="text-3xl font-bold mb-2 text-white ">
                  Customer Reviews
                </h3>
                <p className="text-gray-400">
                  What our customers say about this service
                </p>
              </motion.div>
              {/* Average Rating Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-primary-foreground/20 p-6 rounded-2xl backdrop-blur-sm flex flex-col items-center"
              >
                <div className="text-5xl font-bold text-white mb-2">
                  {service.data.rating.toFixed(1)}
                </div>
                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 ${
                        star <= service.data.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-400"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-400">
                  Based on {reviews?.data?.length || 0} reviews
                </p>

                <div className="w-full mt-3 space-y-2">
                  {[5, 4, 3, 2, 1].map((num) => {
                    const count =
                      reviews?.data?.filter((r: IReview) => r.rating === num)
                        .length || 0;
                    const total = reviews?.data?.length || 1;
                    const percentage = (count / total) * 100;
                    return (
                      <div key={num} className="flex items-center gap-2">
                        <span className="text-sm text-gray-400 w-3">{num}</span>
                        <Star className="w-4 h-4 text-yellow-400" />
                        <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1, delay: num * 0.1 }}
                            className="h-full bg-yellow-400"
                          />
                        </div>
                        <span className="text-sm text-gray-400 w-8">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Review Form */}
              {user && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-primary-foreground/30 to-primary-foreground/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <MessageCircle className="w-5 h-5 text-blue-500" />
                    </div>
                    <h4 className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Write a Review
                    </h4>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.div
                        key={star}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="relative group"
                      >
                        <Star
                          className={`w-8 h-8 cursor-pointer transition-all duration-300 ${
                            star <= rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-400 group-hover:text-yellow-400/50"
                          }`}
                          onClick={() => setRating(star)}
                        />
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: star <= rating ? 1 : 0 }}
                          className="absolute inset-0 bg-yellow-400/20 rounded-full blur-lg -z-10"
                        />
                      </motion.div>
                    ))}
                  </div>
                  <Input
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                    placeholder="Name"
                    className="mb-4 bg-primary-foreground/20 border-white/10 focus:border-blue-500/50 transition-all rounded-xl resize-none "
                  />
                  <Textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your experience..."
                    className="mb-4 bg-primary-foreground/20 border-white/10 focus:border-blue-500/50 transition-all rounded-xl resize-none h-24"
                  />
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Button
                      onClick={handleSubmitReview}
                      className="w-full mt-6 bg-foreground text-white hover:bg-black"
                    >
                      Submit Review
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Side: User Reviews */}
          <div className="lg:col-span-7" style={{ minHeight: "100vh" }}>
            <AnimatePresence>
              <div className="space-y-4">
                {!isReviewsLoading &&
                  reviews?.data?.map((review: IReview, index: number) => (
                    <motion.div
                      key={review._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-gradient-to-br from-primary-foreground/30 to-primary-foreground/10 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-white/10 hover:border-white/20"
                    >
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-10 w-10 ring-2 ring-blue-500/20">
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${review.name}`}
                          />
                          <AvatarFallback>
                            {review.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-white truncate">
                              {review.name}
                            </h4>
                            <span className="text-xs text-gray-400 bg-primary-foreground/30 px-2 py-0.5 rounded-full">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= review.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-400"
                                }`}
                              />
                            ))}
                            <span className="ml-2 text-xs bg-yellow-400/10 text-yellow-400 px-2 py-0.5 rounded-full">
                              {review.rating} out of 5
                            </span>
                          </div>
                          <p className="text-gray-200 text-sm leading-relaxed">
                            {review.review}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                {!isReviewsLoading && reviews?.data?.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 bg-primary-foreground/20 backdrop-blur-sm rounded-xl border border-white/10"
                  >
                    <Star className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h4 className="text-xl font-semibold text-gray-300 mb-2">
                      No Reviews Yet
                    </h4>
                    <p className="text-gray-400 max-w-md mx-auto text-sm">
                      Be the first to share your experience!
                    </p>
                  </motion.div>
                )}
              </div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center wrapper mb-5 px-4">
        <h3 className="text-2xl font-semibold mb-4 text-white">
          Why Choose Our Premium Car Wash?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-primary-foreground">
            <CardHeader>
              <Droplets className="w-10 h-10 text-blue-500 mb-2" />
              <CardTitle>Eco-Friendly Products</CardTitle>
            </CardHeader>
            <CardContent>
              We use environmentally safe cleaning solutions that are tough on
              dirt but gentle on your car's finish.
            </CardContent>
          </Card>
          <Card className="bg-primary-foreground">
            <CardHeader>
              <Shield className="w-10 h-10 text-blue-500 mb-2" />
              <CardTitle>Paint Protection</CardTitle>
            </CardHeader>
            <CardContent>
              Our washing techniques and products help preserve your car's
              paint, maintaining its value over time.
            </CardContent>
          </Card>
          <Card className="bg-primary-foreground">
            <CardHeader>
              <Sparkles className="w-10 h-10 text-blue-500 mb-2" />
              <CardTitle>Attention to Detail</CardTitle>
            </CardHeader>
            <CardContent>
              We go beyond the surface, ensuring every nook and cranny of your
              vehicle is thoroughly cleaned.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
