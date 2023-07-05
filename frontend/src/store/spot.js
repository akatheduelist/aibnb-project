import { csrfFetch } from './csrf'

const SET_SPOT = 'spot/setSpot'
const REMOVE_SPOT = 'spot/removeSpot'
const GET_ALL_SPOTS = 'spot/getAllSpots'
const GET_SPOT_BY_ID = 'spot/getSpotById'

// ACTIONS
const setSpot = spot => {
  console.log('Dispatch to setSpot => SENT!')
  return {
    type: SET_SPOT,
    payload: spot
  }
}

const removeSpot = () => {
  return {
    type: REMOVE_SPOT
  }
}

const readSpotById = spot => {
  console.log('READ SPOT BY ID => ACTION => HIT!')
  return {
    type: GET_SPOT_BY_ID,
    spot
  }
}

const loadSpots = spots => {
  console.log('ACTION GET_ALL_SPOTS => SENT!')
  return {
    type: GET_ALL_SPOTS,
    spots
  }
}

// ACTION THUNK MIDDLEWARE
export const getAllSpots = () => async dispatch => {
  const res = await fetch('/api/spots')
  console.log('GET ALL SPOTS => FETCH')

  if (res.ok) {
    console.log('RESPONSE OK')
    const data = await res.json()
    console.log('RESPONSE DATA', data.Spots)
    dispatch(loadSpots(data.Spots))
    return data.Spots
  }
}

export const getSpotById = spotId => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}`)
  console.log('GET SPOT BY ID => THUNK FETCH => ', res.status)

  if (res.ok) {
    const data = await res.json()
    console.log('GET SPOT BY ID => THUNK RES => ', data)
    dispatch(readSpotById(data))
    return data
  }
}

export const createSpot =
  ({ country, address, city, state, description, title, price }) =>
  async dispatch => {
    console.log('createSpot THUNK => HIT!')

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
    const data = await res.json()
    console.log('createSpot THUNK => Database Respsonse => ', data)
    dispatch(setSpot(data))
    return console.log('THUNK RETURN', res)
  }

export const deleteSpot = () => async dispatch => {
  // return response;
}

// REDUCER
const initialState = {}

export default function spotReducer (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SPOTS: {
      const newState = { ...state, allSpots: {} }
      action.spots.forEach(spot => {
        newState.allSpots[spot.id] = spot
      })
      console.log('GET_ALL_SPOTS REDUCER HIT! =>', newState)
      return newState
    }
    case GET_SPOT_BY_ID: {
      const newState = { ...state, singleSpot: {} }
      newState.singleSpot = action.spot
      console.log('GET_SPOT_BY_ID => REDUCER => ', newState)
      return newState
    }
    case SET_SPOT:
      const newState = { ...state, singleSpot: {} }
      console.log('SET_SPOT REDUCER => HIT!')
      newState.singleSpot = action.payload
      console.log('SET_SPOT REDUCER => newState => ', newState)
      return newState
    default:
      return state
  }
}
