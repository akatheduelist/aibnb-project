import { csrfFetch } from './csrf'
import { getSpotById } from './spot'

const READ_REVIEWS_BY_SPOT_ID = 'review/readSpotReviews'

// ACTIONS
const readSpotReviews = reviews => {
  return {
    type: READ_REVIEWS_BY_SPOT_ID,
    reviews
  }
}

// ACTION THUNK MIDDLEWARE
export const getSpotReviews = spotId => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`)

  if (res.ok) {
    const data = await res.json()
    dispatch(readSpotReviews(data.Reviews))
  }
}

export const delReview = review => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${review.id}`, {
    method: 'DELETE'
  })

  if (res.ok) {
    const data = await res.json()
    dispatch(getSpotReviews(review.spotId))
    dispatch(getSpotById(review.spotId))
    return data
  }
}

export const postReview =
  ({ review, starRating, spotId }) =>
  async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: 'POST',
      body: JSON.stringify({
        review,
        stars: starRating
      })
    })

    if (res.ok) {
      const data = await res.json()
      dispatch(getSpotReviews(data.spotId))
      dispatch(getSpotById(data.spotId))
      return data
    }
  }

// REDUCER
const initialState = { spot: {} }

export default function reviewReducer (state = initialState, action) {
  switch (action.type) {
    case READ_REVIEWS_BY_SPOT_ID: {
      const newState = { ...state, spot: {} }
      action.reviews.forEach(review => {
        newState.spot[review.id] = review
      })
      return newState
    }
    default:
      return state
  }
}
