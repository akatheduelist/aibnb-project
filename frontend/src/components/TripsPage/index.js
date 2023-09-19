import { useEffect } from "react"
import * as bookingActions from "../../store/booking"
import { useDispatch, useSelector } from "react-redux"

export default function TripsPage() {
    const dispatch = useDispatch()
    const bookings = useSelector(state => state.bookings)
    
    useEffect(() => {
        dispatch(bookingActions.getBookings())
    }, [dispatch])

    return (
        <>
            Trips page
            {console.log(Object.values(bookings))}
        </>
    )
} 