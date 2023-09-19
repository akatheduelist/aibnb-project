import { csrfFetch } from './csrf'
import { getSpotById } from './spot'

const READ_RESERVATIONS = 'reservation/readSpotReservations'

// ACTIONS
const readSpotReservations = reservations => {
  return {
    type: READ_RESERVATIONS,
    reservations
  }
}

// ACTION THUNK MIDDLEWARE
export const getSpotReservations = spotId => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}/reservations`)

  if (res.ok) {
    const data = await res.json()
    dispatch(readSpotReservations(data.reservations))
  }
}

export const delReservation = reservation => async dispatch => {
  const res = await csrfFetch(`/api/reservations/${reservation.id}`, {
    method: 'DELETE'
  })

  if (res.ok) {
    const data = await res.json()
    dispatch(getSpotReservations(reservation.spotId))
    dispatch(getSpotById(reservation.spotId))
    return data
  }
}

export const postReservation =
  ({ checkin, checkout, guests, spotId, userId }) =>
  async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/reservations`, {
      method: 'POST',
      body: JSON.stringify({
        checkin,
        checkout,
        guests,
        spotId,
        userId,
      })
    })

    if (res.ok) {
      const data = await res.json()
    //   dispatch(getSpotReservations(data.spotId))
      dispatch(getSpotById(data.spotId))
      return data
    }
  }

// REDUCER
const initialState = { spot: {} }

export default function reservationReducer (state = initialState, action) {
  switch (action.type) {
    case READ_RESERVATIONS: {
      const newState = { ...state, spot: {} }
      action.reservations.forEach(reservation => {
        newState.spot[reservation.id] = reservation
      })
      return newState
    }
    default:
      return state
  }
}
