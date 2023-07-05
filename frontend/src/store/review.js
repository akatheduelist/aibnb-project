import { csrfFetch } from "./csrf";

const READ_REVIEWS_BY_SPOT_ID = 'review/readSpotReviews'

// ACTIONS
const readSpotReviews = (reviews) => {
  return {
    type: READ_REVIEWS_BY_SPOT_ID,
    reviews
  }
}

// ACTION THUNK MIDDLEWARE
export const getSpotReviews = spotId => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
  console.log('GET_REVIEWS_BY_SPOT_ID => THUNK => ', res.status)

  if (res.ok) {
    const data = await res.json();
    console.log('GET_REVIEWS_BY_SPOT_ID => RES =>', data)
    dispatch(readSpotReviews(data))
  }
}

// REDUCER
const initialState = { spot: {} };
export default function reviewReducer(state = initialState, action) {
  switch (action.type) {
    case READ_REVIEWS_BY_SPOT_ID: {
      console.log("SPOT REVIEWS => ", action.reviews.Reviews)
      const newState = { ...state, spot: { ...state.spot } }
      action.reviews.Reviews.forEach(review => {
        newState.spot[review.id] = review
      });
      return newState
    }
    default:
      return state;
  }
}
