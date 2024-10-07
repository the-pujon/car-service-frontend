import { useCreateBookingMutation } from '@/redux/features/bookings/bookingApi'
import React,{ useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const BookingSuccess: React.FC = () => {
    const navigate = useNavigate()
    const [createBooking,{ error }] = useCreateBookingMutation()

    console.log(error)

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
        <div className='wrapper h-screen flex flex-col justify-center items-center'>
            <h1 className='text-2xl font-bold'>Booking Successful!</h1>
            <p className='text-lg'>Processing your booking...</p>
        </div>
    )
}

export default BookingSuccess