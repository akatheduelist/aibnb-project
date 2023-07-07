import React, { useState, useEffect } from 'react'
import * as reviewActions from '../../store/review'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'

export default function PostReviewModal () {
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

    console.log('STAR RATING => ', starRating)
    setErrors(error)
  }, [review, starRating])

  // ==TODO== After modal closes and re-opens it should reset any errors, empty inputs, and button disabled
  const handleSubmit = e => {
    e.preventDefault()

    if (!Object.keys(errors).length) {
      return dispatch(reviewActions.postReview(review))
        .then(closeModal)
        .catch(async res => {
          const data = await res.json()
          if (data && data.errors) {
            console.log('SERVER ERROR!! => ', data.error)
            setErrors(data.errors)
          }
        })
    }
  }

  return (
    <div className='delete-spot'>
      <h1>How was your stay?</h1>
      // If a server error occurs show it under the title
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder='Leave your review here...'
          name='review'
          rows='4'
          cols='50'
          value={review}
          onChange={e => setReview(e.target.value)}
        />
        <label>
          {/* <span className='validation-errors'>{errors.review}</span> */}
        </label>
        <div className='post-review star-rating'>
          {[...Array(5)].map((star, idx) => {
            idx += 1
            return (
              <button
                type='button'
                key={idx}
                className={idx <= starRating ? 'on' : 'off'}
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
          <span>{starRating}</span>
        </label>
        <button type='submit' disabled={errors.review || errors.stars}>
          Submit Your Review
        </button>
      </form>
    </div>
  )
}
