import React,{ useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const BookingFail: React.FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.removeItem('pendingBooking')
        navigate('/services')
    },[navigate])

    return (
        <div>
            <h1>Booking Failed</h1>
            <p>Redirecting to services page...</p>
        </div>
    )
}

export default BookingFail