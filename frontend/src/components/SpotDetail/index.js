import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import DeleteReviewModal from '../DeleteReviewModal'
import * as spotActions from '../../store/spot'
import * as reviewActions from '../../store/review'

export default function SpotDetail () {
  const { spotId } = useParams()
  const dispatch = useDispatch()
  const {
    name,
    city,
    state,
    country,
    price,
    avgStarRating,
    descriptions,
    SpotImages
  } = useSelector(state => state.spots.singleSpot)
  const reviewsBySpotId = Object.values(
    useSelector(state => state.reviews.spot)
  )
  const { id } = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(spotActions.getSpotById(spotId))
    dispatch(reviewActions.getSpotReviews(spotId))
  }, [dispatch])

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

        <hr />

        <div className='spot-footer'>
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
      </div>
      <div>
        <h1>Reviews</h1>
        {reviewsBySpotId?.map(review => (
          <>
            <h3>{review.User.firstName}</h3>
            <div>{review.createdAt}</div>
            <div>{review.review}</div>
            <div>
              {review.userId === id ? (
                <>
                  <OpenModalMenuItem
                    itemText='Delete'
                    modalComponent={<DeleteReviewModal reviewId={review.id} />}
                  />
                </>
              ) : null}
            </div>
          </>
        ))}
      </div>
    </>
  )
}
