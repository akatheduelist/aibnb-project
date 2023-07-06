import { csrfFetch } from './csrf'

const READ_ALL_SPOTS = 'spot/getAllSpots'
const READ_SPOT_BY_ID = 'spot/getSpotById'

const SET_SPOT = 'spot/setSpot'
const DELETE_SPOT = 'spot/removeSpot'

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

const setSpot = spot => {
  console.log('Dispatch to setSpot => SENT!')
  return {
    type: SET_SPOT,
    payload: spot
  }
}

const removeSpot = spotId => {
  return {
    type: DELETE_SPOT
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

// Updating spot does not need an action or reducer becuase we are not going to update
// the state. We will let the getSpotById fetch the new state after update has run.
// Try with standard middleware, remove thunk callback?
export const putSpotById =
  ({ id, country, address, city, state, description, title, price }) =>
  async dispatch => {
    const res = await csrfFetch(`/api/spots/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        country,
        address,
        city,
        state,
        description,
        name: title,
        price
      })
    })

    if (res.ok) {
      const data = await res.json()
      return data;
    }
  }

export const createSpot =
  ({ country, address, city, state, description, title, price }) =>
  //REMEBER SPOTS AND IMAGes have associations on the backend and may need to create an images thunk
  // Might not need to go to reducer
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

export const deleteSpot = spotId => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE'
  })
  console.log('DELETE SPOT BY ID => THUNK =>', res.status)

  if (res.ok) {
    const data = await res.json()
    dispatch(removeSpot(spotId))
  }
  // return response;
}

// REDUCER
const initialState = { allSpots: {}, singleSpot: {} }

export default function spotReducer (state = initialState, action) {
  switch (action.type) {
    case READ_ALL_SPOTS: {
      const newState = { ...state, allSpots: { ...state.allSpots } }
      action.spots.forEach(spot => {
        newState.allSpots[spot.id] = spot
      })
      return newState
    }
    case READ_SPOT_BY_ID: {
      return { ...state, allSpots: {...state.allSpots}, singleSpot: action.spot }
    }
    case SET_SPOT:
      const newState = { ...state }
      console.log('SET_SPOT REDUCER => HIT!')
      newState.singleSpot = action.payload
      console.log('SET_SPOT REDUCER => newState => ', newState)
      return newState
    default:
      return state
  }
}
