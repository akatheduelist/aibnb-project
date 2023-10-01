import { useEffect } from 'react'
import * as bookingActions from '../../store/booking'
import { useDispatch, useSelector } from 'react-redux'
import './TripsPage.css'

export default function TripsPage () {
  const dispatch = useDispatch()
  const bookings = Object.values(useSelector(state => state.bookings))

  useEffect(() => {
    dispatch(bookingActions.getBookings())
  }, [dispatch])

  function getMonthFromString (dateString) {
    const date = new Date(dateString)
    return date.toLocaleString('default', { month: 'short' })
  }

  function getDayFromString (dateString) {
    const date = new Date(dateString)
    return date.toLocaleString('default', { day: 'numeric' })
  }

  function getYearFromString (dateString) {
    const date = new Date(dateString)
    return date.toLocaleString('default', { year: 'numeric' })
  }

  return (
    <>
      <h1>Trips</h1>
      <h3>Upcoming reservations</h3>
      {bookings?.map(({ id, startDate, endDate, Spot }) => (
        <div key={id} className='upcoming-booking-card'>
          <div className='upcoming-booking-text'>
            <div className='upcoming-booking-title'>
              <span>{Spot?.name}</span>
              <span>Entire home hosted by {Spot?.ownerId}</span>
            </div>
            <div className='upcoming-booking-info'>
              <div className='upcoming-booking-date'>
                <span>{getMonthFromString(startDate)}</span>
                <span>
                  {getDayFromString(startDate)} - {getDayFromString(endDate)}
                </span>
                <span>{getYearFromString(endDate)}</span>
              </div>
              <div className='upcoming-booking-address'>
                <span>{Spot?.address}</span>
                <span>{Spot?.city}, {Spot?.state}</span>
                <span>{Spot?.country}</span>
              </div>
            </div>
          </div>
          <div>
            <img src={Spot?.previewImage} />
          </div>
        </div>
      ))}
    </>
  )
}
