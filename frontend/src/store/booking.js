import { csrfFetch } from './csrf'

const READ_BOOKINGS = 'booking/readBookings'

// ACTIONS
const readBookings = bookings => {
  return {
    type: READ_BOOKINGS,
    bookings
  }
}

// ACTION THUNK MIDDLEWARE
export const getBookings = () => async dispatch => {
  const res = await csrfFetch(`/api/bookings/current`)

  if (res.ok) {
    const data = await res.json()
    dispatch(readBookings(data.Bookings))
  }
}

// export const delBooking = booking => async dispatch => {
//   const res = await csrfFetch(`/api/bookings/${booking.id}`, {
//     method: 'DELETE'
//   })

//   if (res.ok) {
//     const data = await res.json()
//     dispatch(getBookings(booking.userId))
//     dispatch(getSpotById(booking.userId))
//     return data
//   }
// }

// export const postBooking =
//   ({ booking, starRating, userId }) =>
//   async dispatch => {
//     const res = await csrfFetch(`/api/bookings/${userId}/bookings`, {
//       method: 'POST',
//       body: JSON.stringify({
//         booking,
//         stars: starRating
//       })
//     })

//     if (res.ok) {
//       const data = await res.json()
//       dispatch(getBookings(data.userId))
//       dispatch(getSpotById(data.userId))
//       return data
//     }
//   }

// REDUCER
const initialState = {}

export default function bookingReducer (state = initialState, action) {
  switch (action.type) {
    case READ_BOOKINGS: {
        return { ...state, ...action.bookings }
    }
    default:
      return state
  }
}
