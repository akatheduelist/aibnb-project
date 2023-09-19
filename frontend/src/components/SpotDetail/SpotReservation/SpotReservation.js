import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as reservationActions from '../../../store/reservation'
import './SpotReservation.css'

export default function SpotReservation ({ spotId, userId }) {
  const dispatch = useDispatch()
  const [checkin, setCheckin] = useState(new Date())
  const [checkout, setCheckout] = useState(new Date())
  const [guests, setGuests] = useState(1)
  const [errors, setErrors] = useState({})

  // RESERVATION FORM SUBMITED
  const handleSubmit = async e => {
    e.preventDefault()
    
    // FRONT END ERROR HANDLING
    const error = {}
    if (!checkin) error.country = 'Check-in date is required'
    if (!checkout) error.address = 'Checkout date is required'
    if (!guests) error.city = 'Guest is required'
    setErrors(errors)
    console.log("ERRORS", errors)
    if (!Object.keys(errors).length) {
    //   const res = await dispatch(
    //     reservationActions.postReservation({
    //       checkin,
    //       checkout,
    //       guests,
    //       spotId,
    //       userId
    //     })
    //   )
    //   if (!res.errors) setErrors(res.errors)
    console.log({
        checkin,
        checkout,
        guests,
        spotId,
        userId
      })
    }
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
                name='checkin'
                value={checkin}
                onChange={e => setCheckin(e.target.value)}
              />
            </label>
            <label className='tiny bold'>
              CHECKOUT
              <input
                type='date'
                placeholder='Add date'
                name='checkout'
                value={checkout}
                onChange={e => setCheckout(e.target.value)}
              />
            </label>
            <label className='tiny bold'>
              GUESTS
              <select value={guests} onChange={e => setGuests(e.target.value)}>
                {[...Array(8)].map((guest, idx) => {
                  return <option value={idx + 1} key={idx}>{idx + 1}</option>
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
