import React, { useState, useEffect } from 'react'
import * as reviewActions from '../../store/review'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'

export default function DeleteReviewModal ({ spotId }) {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})
  const { closeModal } = useModal()

  // const handleSubmit = e => {
  //   e.preventDefault()
  //   setErrors({})
  //   const error = {}

  //   console.log('DELETE SPOT BUTTON => ', id)
  //   return dispatch(spotActions.deleteSpot(id))
  //     .then(closeModal)
  //     .catch(async res => {
  //       const data = await res.json()
  //       console.log('DELETE SPOT Data => ', data)
  //       if (data && data.errors) {
  //         setErrors(error)
  //       }
  //     })
  // }

  const handleSubmit = reviewId => {
    dispatch(reviewActions.delReview(reviewId)).then(() =>
      dispatch(reviewActions.getSpotReviews(spotId))
    )
  }

  return (
    <div className='delete-spot'>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this spot from the listings?</p>
      <button onClick={handleSubmit}>Yes (Delete Spot)</button>
      <button onClick={closeModal}>No (Keep Spot)</button>
    </div>
  )
}
