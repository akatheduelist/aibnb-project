import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as spotActions from '../../../store/spot'
import './SpotReservation.css'

export default function SpotReservation ({ spotId, userId }) {
  const dispatch = useDispatch()
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [guests, setGuests] = useState(1)
  const [errors, setErrors] = useState({})

  // RESERVATION FORM SUBMITED
  const handleSubmit = e => {
    e.preventDefault()

    // FRONT END ERROR HANDLING
    const error = {}
    // if (!startDate) error.country = 'Check-in date is required'
    // if (!endDate) error.address = 'Checkout date is required'
    // if (!guests) error.city = 'Guest is required'
    // setErrors(error)

    // DISPATCH RESERVATION TO ACTION THUNK
    return dispatch(spotActions.postSpotBooking({ startDate, endDate, guests, spotId }))
    .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) {
            setErrors(data.message)
            window.alert(data.message)
        }
    });
  }

  return (
    <>
      <div className='spot-reservation-container'>
        SpotReservation
        <div className='spot-reservation-content'>
          <form className='spot-reservation-form' onSubmit={handleSubmit}>
            <label className='tiny bold'>
              CHECK-IN
              <input
                type='date'
                placeholder='Add date'
                name='startDate'
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
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
              />
            </label>
            <label className='tiny bold'>
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
            </label>
            <button type='submit'>Check availability</button>
          </form>
        </div>
      </div>
    </>
  )
}
