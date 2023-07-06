import { csrfFetch } from "./csrf";

const READ_REVIEWS_BY_SPOT_ID = 'review/readSpotReviews'
const DELETE_REVIEW_BY_ID = 'review/deleteReview'

// ACTIONS
const readSpotReviews = reviews => {
  return {
    type: READ_REVIEWS_BY_SPOT_ID,
    reviews
  }
}

// const deleteReview = reviewId => {
//   return {
//     type: DELETE_REVIEW_BY_ID,
//     reviewId
//   }
// }

// ACTION THUNK MIDDLEWARE
export const getSpotReviews = spotId => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`)

  if (res.ok) {
    const data = await res.json();
    dispatch(readSpotReviews(data.Reviews))
  }
}

export const delReview = reviewId => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE"
  })

  if (res.ok) {
    const data = await res.json();
    return data
  }
}

// REDUCER
const initialState = { spot: {} };

export default function reviewReducer (state = initialState, action) {
  switch (action.type) {
    case READ_REVIEWS_BY_SPOT_ID: {
      const newState = { ...state, spot: {} };
      action.reviews.forEach(review => {
        newState.spot[review.id] = review;
      });
      return newState
    }
    default:
      return state;
  }
}
