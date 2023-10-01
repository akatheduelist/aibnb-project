import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as spotActions from '../../store/spot'
import './SpotReservation.css'

export default function SpotReservation ({ spotId, sessionUser }) {
  const dispatch = useDispatch()
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in 'YYYY-MM-DD' format

  // RESERVATION FORM SUBMITED
  const handleSubmit = e => {
    e.preventDefault()
    
    const error = {}
    // FRONT END ERROR HANDLING
    if (!sessionUser) error.user = 'You must be logged in to make a booking'
    if (!startDate) error.checkin = 'Check-in date is required'
    if (!endDate) error.checkout = 'Checkout date is required'
    
    if(Object.keys(error).length) return window.alert(Object.values(error))

    // DISPATCH RESERVATION TO ACTION THUNK
    if (!Object.keys(error).length) {
      return dispatch(
        spotActions.postSpotBooking({ startDate, endDate, spotId })
      ).catch(async res => {
        const data = await res.json()
        if (data && data.errors) {
          return window.alert(Object.values(data.errors))
        }
      }).then(() => window.alert("Booking created successfully!"))
    }
  }

  return (
    <>
      <div className='spot-reservation-container'>
        <div className='spot-reservation-content'>
          <form className='spot-reservation-form' onSubmit={handleSubmit}>
            <label className='tiny bold'>
              CHECK-IN
              <input
                type='date'
                placeholder='Add date'
                name='startDate'
                min={currentDate}
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
              />
            </label>
            <label className='tiny bold'>
              CHECKOUT
              <input
                type='date'
                placeholder='Add date'
                name='endDate'
                min={startDate}
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
              />
            </label>
            {/* <label className='tiny bold'>
              GUESTS
              <select value={guests} onChange={e => setGuests(e.target.value)}>
                {[...Array(8)].map((guest, idx) => {
                  const numOfGuests = idx++
                  return (
                    <option value={numOfGuests} key={idx}>
                      {numOfGuests}
                    </option>
                  )
                })}
              </select>
            </label> */}
            <div>
              {/* <button className='red-button medium' type='submit'>Check availability</button> */}
              <button className='red-button medium' type='submit'>
                Reserve
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
