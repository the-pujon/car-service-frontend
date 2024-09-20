import { useCreateBookingMutation } from '@/redux/features/bookings/bookingApi'
import React,{ useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
//import { useCreateBookingMutation } from '@/redux/features/booking/bookingApi'

const BookingSuccess = () => {
    const navigate = useNavigate()
    const [createBooking] = useCreateBookingMutation()

    useEffect(() => {
        const pendingBookingData = localStorage.getItem('pendingBooking')
        if (pendingBookingData) {
            const bookingData = JSON.parse(pendingBookingData)
            createBooking(bookingData)
                .unwrap()
                .then(() => {
                    localStorage.removeItem('pendingBooking')
                    navigate('/services')
                })
                .catch((error) => {
                    console.error('Failed to create booking:',error)
                    // Handle error (show error message to user)
                })
        } else {
            navigate('/services')
        }
    },[createBooking,navigate])

    return (
        <div>
            <h1>Booking Successful!</h1>
            <p>Processing your booking...</p>
        </div>
    )
}

export default BookingSuccess