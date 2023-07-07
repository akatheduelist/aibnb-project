import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import DeleteReviewModal from '../DeleteReviewModal'
import PostReviewModal from '../PostReviewModal'
import * as spotActions from '../../store/spot'
import * as reviewActions from '../../store/review'

export default function SpotDetail () {
  const { spotId } = useParams()
  const dispatch = useDispatch()
  const [loggedIn, setLoggedIn] = useState(null)
  const [reviewedBefore, setReviewedBefore] = useState(null)
  const [reviewable, setReviewable] = useState(null)
  const [spotOwner, setSpotOwner] = useState(null)
  const {
    name,
    city,
    state,
    country,
    price,
    avgStarRating,
    descriptions,
    SpotImages,
    Owner
  } = useSelector(state => state.spots.singleSpot)
  const reviewsBySpotId = Object.values(
    useSelector(state => state.reviews.spot)
  )
  const currentUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(spotActions.getSpotById(spotId))
    dispatch(reviewActions.getSpotReviews(spotId))
  }, [dispatch])

  // CAN YOU REVIEW?
  useEffect(() => {
    if (currentUser !== null) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
    if (
      loggedIn === true &&
      reviewsBySpotId.filter(review => review.userId === currentUser.id)
        .length > 0
    ) {
      setReviewedBefore(true)
    } else {
      setReviewedBefore(false)
    }
    if (loggedIn && Owner.id === currentUser.id) {
      setSpotOwner(true)
    } else {
      setSpotOwner(false)
    }
    if (loggedIn === true && reviewedBefore === false && spotOwner === false) {
      setReviewable(true)
    } else {
      setReviewable(false)
    }
    console.log('REVIEWABLE => ', reviewable)
  })

  return (
    <>
      <div className='spot-detail spot-detail-container'>
        <div className='spot-header'>
          <h3 className='spot-name'>{name}</h3>
          <span className='spot-location'>{`${city}, ${state}, ${country}`}</span>
        </div>
        <div className='image-gallery'>
          {SpotImages?.map(image => (
            <img src={image.url}></img>
          ))}
        </div>
        <div className='spot-description'>
          <h3>{`Hosted By`}</h3>
          <p>{descriptions}</p>
        </div>
        <div className='spot-reservation'>
          <div>
            <span>{`$${price} night`}</span>
            // ==TODO== Newly posted review should update the star rating
            <span>
              <i className='fa-solid fa-star' />
              {` ${avgStarRating !== 'NaN' ? avgStarRating : 'New'}`}
            </span>
            {reviewsBySpotId.length >= 1 ? (
              <>
                <span>&#183;</span>
                <span>
                  {reviewsBySpotId.length === 1
                    ? `1 Review`
                    : `${reviewsBySpotId.length} Reviews`}
                </span>
              </>
            ) : null}
          </div>
          <div>
            <button onClick={e => window.alert('Feature coming soon')}>
              Reserve
            </button>
          </div>
        </div>
      </div>

      <hr />

      <div className='spot-footer'>
        // ==TODO== Newly posted review should update the star rating
        <span>
          <i className='fa-solid fa-star' />
          {` ${avgStarRating !== 'NaN' ? avgStarRating : 'New'}`}
        </span>
        <span>&#183;</span>
        <span>
          {reviewsBySpotId.length === 1
            ? `1 Review`
            : `${reviewsBySpotId.length} Reviews`}
        </span>
      </div>
      <div>
        {reviewable ? (
          <button>
            <OpenModalMenuItem
              itemText='Post Your Review'
              modalComponent={<PostReviewModal />}
            />
          </button>
        ) : null}
      </div>

      <div>
        <h1>Reviews</h1>
        // ==TODO== Newly posted reviews should show up at the top of the review
        list
        {reviewsBySpotId.map(review => (
          <div>
            <h3>{review.User.firstName}</h3>
            // ==TODO== format date for review
            <div>{review.createdAt}</div>
            <div>{review.review}</div>
            <div>
              {loggedIn && review.userId === currentUser.id ? (
                <button>
                  <OpenModalMenuItem
                    itemText='Delete'
                    modalComponent={<DeleteReviewModal review={review} />}
                  />
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
