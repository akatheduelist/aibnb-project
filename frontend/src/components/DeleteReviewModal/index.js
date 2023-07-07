import React, { useState, useEffect } from 'react'
import * as reviewActions from '../../store/review'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'

export default function DeleteReviewModal({ review }) {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})
  const { closeModal } = useModal()

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors({})
    const error = {};

    return dispatch(reviewActions.delReview(review))
    .then(closeModal)
    .catch(async res => {
      const data = await res.json()
      if (data && data.errors) {
        setErrors(error)
      }
    })
  }

  return (
    <div className='delete-spot'>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this review?</p>
      <button onClick={handleSubmit}>Yes (Delete Review)</button>
      <button onClick={closeModal}>No (Keep Review)</button>
    </div>
  )
}
