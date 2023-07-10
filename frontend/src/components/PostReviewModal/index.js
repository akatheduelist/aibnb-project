import React, { useState, useEffect } from 'react'
import * as reviewActions from '../../store/review'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'

export default function PostReviewModal ({spotId}) {
  const dispatch = useDispatch()
  const [review, setReview] = useState('')
  const [starRating, setStarRating] = useState(0)
  const [errors, setErrors] = useState({})
  const { closeModal } = useModal()

  useEffect(() => {
    const error = {}

    if (!review) error.review = 'Review cannot be blank'
    if (review.length > 1 && review.length < 10)
      error.review = 'Review must be more than 10 characters'
    if (!starRating) error.starRating = 'Star rating cannot be blank'

    setErrors(error)
  }, [review, starRating])

  // ==TODO== After modal closes and re-opens it should reset any errors, empty inputs, and button disabled
  const handleSubmit = e => {
    e.preventDefault()
    const error = {}

    if (!Object.keys(errors).length) {
      return dispatch(reviewActions.postReview({ review, starRating, spotId }))
      .then(closeModal())
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) {
          error.failure = data.errors
          setErrors(error);
        }
      })
    }
  }

  return (
    <div className='modal-container'>
      <form onSubmit={handleSubmit}>
      <h2>How was your stay?</h2>
      {errors.length && errors}
        <textarea
          placeholder='Leave your review here...'
          name='review'
          rows='8'
          cols='40'
          value={review}
          onChange={e => setReview(e.target.value)}
        />
        <label>
          <span className='medium validation-errors'>{errors.review}</span>
        </label>
        <div className='star-rating'>
          {[...Array(5)].map((star, idx) => {
            idx += 1
            return (
              <button
                type='button'
                key={idx}
                className={idx <= starRating ? 'red-button-small on' : 'off'}
                onClick={() => setStarRating(idx)}
                onMouseEnter={() => setStarRating(idx)}
                onMouseLeave={() => setStarRating(idx)}
              >
                <span className='star'>&#9733;</span>
              </button>
            )
          })}
        </div>
        <label>
          {/* <span>{starRating}</span> */}
        </label>
        <button className="red-button" type='submit' disabled={errors.review || errors.stars}>
          Submit Your Review
        </button>
      </form>
    </div>
  )
}
