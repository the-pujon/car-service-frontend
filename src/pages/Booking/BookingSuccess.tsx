import { useCreateBookingMutation } from '@/redux/features/bookings/bookingApi'
import { useCreateTransactionMutation } from '@/redux/features/transaction/transactionApi'
import React,{ useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const BookingSuccess: React.FC = () => {
    const navigate = useNavigate()
    const [createBooking,{ error }] = useCreateBookingMutation()
    const [createTransaction,{ error: transactionError }] = useCreateTransactionMutation()

    console.log(error)
    console.log(transactionError)

    useEffect(() => {
        const pendingBookingData = localStorage.getItem('pendingBooking')
        if (pendingBookingData) {
            const bookingData = JSON.parse(pendingBookingData)
            const transactionData = {
                customer: bookingData.customer,
                service: bookingData.serviceId,
                amount: bookingData.amount,
                status: 'success',
                transactionId: `T-${Date.now()}-${bookingData.customer}-${bookingData.service}`
            }
            createTransaction(transactionData)
                .unwrap()
                .then(() => {
                    toast.success('Payment successful')
                    createBooking(bookingData)
                        .unwrap()
                        .then(() => {
                            localStorage.removeItem('pendingBooking')
                            toast.success('Booking successful')
                            navigate('/services')
                        })
                        .catch((error) => {
                            console.error('Failed to create booking:',error)
                        })
                })
                .catch((error) => {
                    console.error('Failed to create transaction:',error)
                })
        } else {    
            navigate('/services')
        }
    },[createBooking, createTransaction, navigate])

    return (
        <div className='wrapper h-screen flex flex-col justify-center items-center'>
            <h1 className='text-2xl font-bold'>Booking Successful!</h1>
            <p className='text-lg'>Processing your booking...</p>
        </div>
    )
}

export default BookingSuccess