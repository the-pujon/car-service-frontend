import { useCreateBookingMutation } from '@/redux/features/bookings/bookingApi'
import { useCreateTransactionMutation } from '@/redux/features/transaction/transactionApi'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const BookingSuccess: React.FC = () => {
    const navigate = useNavigate()
    const [isProcessing, setIsProcessing] = useState(false)
    const [createBooking] = useCreateBookingMutation()
    const [createTransaction] = useCreateTransactionMutation()
    const processedRef = useRef(false)

    useEffect(() => {
        const processBooking = async () => {
            const pendingBookingData = localStorage.getItem('pendingBooking')
            
            if (!pendingBookingData || isProcessing || processedRef.current) {
                navigate('/services')
                return
            }

            try {
                setIsProcessing(true)
                processedRef.current = true
                const bookingData = JSON.parse(pendingBookingData)
                
                const transactionData = {
                    customer: bookingData.customer,
                    service: bookingData.serviceId,
                    amount: bookingData.amount,
                    status: 'success',
                    transactionId: `T-${Date.now()}-${bookingData.customer}-${bookingData.serviceId}`
                }

                await createTransaction(transactionData).unwrap()
                toast.success('Payment successful')
                
                await createBooking(bookingData).unwrap()
                localStorage.removeItem('pendingBooking')
                toast.success('Booking successful')
                navigate('/services')
            } catch (error) {
                console.error('Booking process failed:', error)
                toast.error('Something went wrong')
                navigate('/services')
            } finally {
                setIsProcessing(false)
            }
        }

        processBooking()

        // Cleanup function
        return () => {
            processedRef.current = false
        }
    }, [])

    return (
        <div className='wrapper h-screen flex flex-col justify-center items-center'>
            <h1 className='text-2xl font-bold'>Booking Successful!</h1>
            <p className='text-lg'>Processing your booking...</p>
        </div>
    )
}

export default BookingSuccess