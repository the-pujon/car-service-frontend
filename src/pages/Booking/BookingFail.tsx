import { useCreateTransactionMutation } from '@/redux/features/transaction/transactionApi'
import React,{ useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const BookingFail: React.FC = () => {
    const navigate = useNavigate()
    const [createTransaction] = useCreateTransactionMutation()

    useEffect(() => {
        const pendingBookingData = localStorage.getItem('pendingBooking')
        if (pendingBookingData) {
            const bookingData = JSON.parse(pendingBookingData)
            const transactionData = {
                customer: bookingData.customer,
                service: bookingData.service,
                amount: bookingData.service.price,
                status: 'failed',
                transactionId: `T-${Date.now()}-${bookingData.customer}-${bookingData.service}`
            }
            createTransaction(transactionData)
                .unwrap()
                .then(() => {
                    localStorage.removeItem('pendingBooking')
                    toast.error('Payment failed')
                    navigate('/services')
                })
                .catch((error) => {
                    console.error('Failed to create transaction:',error)
                })
        }
    },[createTransaction, navigate])

    return (
        <div>
            <h1>Booking Failed</h1>
            <p>Redirecting to services page...</p>
        </div>
    )
}

export default BookingFail