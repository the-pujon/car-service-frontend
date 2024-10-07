

import { useState,useEffect } from "react"

export function ServiceSlotCountdown({ date,time }: { date: string,time: string }) {
    const [timeLeft,setTimeLeft] = useState({ days: 0,hours: 0,minutes: 0,seconds: 0 })

    useEffect(() => {
        const calculateTimeLeft = () => {
            const bookingDate = new Date(`${date}T${time}`)
            const now = new Date()
            const difference = bookingDate.getTime() - now.getTime()

            if (difference > 0) {
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                }
            }

            return { days: 0,hours: 0,minutes: 0,seconds: 0 }
        }

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft())
        },1000)

        return () => clearInterval(timer)
    },[date,time])

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const formatTime = (value: number) => value.toString().padStart(2,'0')

    return (
        <div className="text-center">
            <p className="text-sm font-medium mb-1">Time until booking:</p>
            <div className="flex justify-center space-x-2">
                <TimeUnit value={timeLeft.days} label="Days" />
                <TimeUnit value={timeLeft.hours} label="Hours" />
                <TimeUnit value={timeLeft.minutes} label="Minutes" />
                <TimeUnit value={timeLeft.seconds} label="Seconds" />
            </div>
        </div>
    )
}

function TimeUnit({ value,label }: { value: number,label: string }) {
    return (
        <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">{value.toString().padStart(2,'0')}</span>
            <span className="text-xs">{label}</span>
        </div>
    )
}