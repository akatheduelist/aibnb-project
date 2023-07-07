import { csrfFetch } from './csrf'

const READ_ALL_SPOTS = 'spot/getAllSpots'
const READ_SPOT_BY_ID = 'spot/getSpotById'

// ACTIONS
const readAllSpots = spots => {
  return {
    type: READ_ALL_SPOTS,
    spots
  }
}

const readSpotById = spot => {
  return {
    type: READ_SPOT_BY_ID,
    spot
  }
}

// ACTION THUNK MIDDLEWARE
export const getAllSpots = () => async dispatch => {
  const res = await fetch('/api/spots')

  if (res.ok) {
    const data = await res.json()
    return dispatch(readAllSpots(data.Spots))
  }
}
export const getSpotById = spotId => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}`)

  if (res.ok) {
    const data = await res.json()
    return dispatch(readSpotById(data))
  }
}

export const postSpot =
  ({ country, address, city, state, description, title, price }) =>
  async dispatch => {
    const res = await csrfFetch('/api/spots', {
      method: 'POST',
      body: JSON.stringify({
        country,
        address,
        city,
        state,
        lat: '-33.85660618894459',
        lng: '151.21529669767847',
        description,
        name: title,
        price
      })
    })

    if (res.ok) {
      const data = await res.json()
      dispatch(getAllSpots())
      return data;
    }
  }

export const putSpotById =
  ({
    id,
    country,
    address,
    city,
    state,
    lat,
    lng,
    description,
    title,
    price
  }) =>
  async dispatch => {
    const res = await csrfFetch(`/api/spots/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        country,
        address,
        city,
        state,
        lat,
        lng,
        description,
        name: title,
        price
      })
    })

    if (res.ok) {
      const data = await res.json()
      return data
    }
  }

export const deleteSpot = spotId => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE'
  })

  if (res.ok) {
    const data = await res.json()
    dispatch(getAllSpots())
  }
}

// REDUCER
const initialState = { allSpots: {}, singleSpot: { Owner: {}, SpotImages: [] } }

export default function spotReducer (state = initialState, action) {
  switch (action.type) {
    case READ_ALL_SPOTS: {
      const newState = { ...state, allSpots: {} }
      action.spots.forEach(spot => {
        newState.allSpots[spot.id] = spot
      })
      return newState
    }
    case READ_SPOT_BY_ID: {
      return {
        ...state,
        allSpots: { ...state.allSpots },
        singleSpot: action.spot
      }
    }
    default:
      return state
  }
}
