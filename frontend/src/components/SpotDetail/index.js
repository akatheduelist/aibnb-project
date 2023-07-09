import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dateFormat from 'dateformat'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import DeleteReviewModal from '../DeleteReviewModal'
import PostReviewModal from '../PostReviewModal'
import * as spotActions from '../../store/spot'
import * as reviewActions from '../../store/review'
import './SpotDetail.css'

export default function SpotDetail () {
  const { spotId } = useParams()
  const dispatch = useDispatch()
  const [loggedIn, setLoggedIn] = useState(null)
  const [reviewedBefore, setReviewedBefore] = useState(null)
  const [reviewable, setReviewable] = useState(null)
  const [spotOwner, setSpotOwner] = useState(null)
  const [defaultImage, setDefaultImage] = useState('')
  const [noReviews, setNoReviews] = useState(true)
  const [starRating, setStarRating] = useState(0)
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

  // SET DEFAULT IMAGE
  useEffect(() => {
    SpotImages.length
      ? setDefaultImage(SpotImages?.find(image => image.preview === true).url)
      : setDefaultImage('https://http.cat/404')
  })

  // NO REVIEWS YET?
  useEffect(() => {
    !reviewsBySpotId.length ? setNoReviews(true) : setNoReviews(false)
  })

  // UPDATE STAR RATING
  useEffect(() => {
    avgStarRating > 1 || avgStarRating < 5
      ? setStarRating(avgStarRating)
      : setStarRating(0)
  })

  return (
    <>
      {console.log("<== RETURN ==>", defaultImage)}
      <div className='spot-detail page-container'>
        <div className='spot-detail details-container'>
          <div className='spot-header'>
            <h2 className='spot-name'>{name}</h2>
            <span className='spot-location medium'>{`${city}, ${state}, ${country}`}</span>
          </div>
          <div className='image-gallery'>
            <img className='image default-image' src={defaultImage} />
            {SpotImages?.map(image => (
              <img className='image spot-images' src={image.url}></img>
            ))}
          </div>
          <div className='spot-description-container'>
            <div className='spot-description'>
              <h2>{`Hosted By ${Owner.firstName} ${Owner.lastName}`}</h2>
              <p>{descriptions}</p>
            </div>
            <div className='spot-reservation'>
              <div className='spot-price'>
                <div>
                  <span className='bold'>{`$${price}`}</span>
                  <span className="small medium"> night</span>
                </div>
                <div>
                  <span className="small medium">
                    <i className='fa-solid fa-star' />
                    {` ${starRating !== 0 ? starRating : 'New'}`}
                  </span>
                  {reviewsBySpotId.length >= 1 ? (
                    <>
                      <span className="mid-dot medium">&#183;</span>
                      <span className="small medium">
                        {reviewsBySpotId.length === 1
                          ? `1 Review`
                          : `${reviewsBySpotId.length} Reviews`}
                      </span>
                    </>
                  ) : null}
                </div>
              </div>
              <div>
                <button
                  className='red-button medium'
                  onClick={e => window.alert('Feature coming soon')}
                >
                  Reserve
                </button>
              </div>
            </div>
          </div>
          <hr />
        </div>
        <div className='reviews-container details-container'>
          <div className='spot-detail reviews-header bold'>
            <span>
              <i className='fa-solid fa-star' />
              {` ${starRating !== 0 ? starRating : 'New'}`}
            </span>
            <span className="mid-dot bold">&#183;</span>
            <span>
              {reviewsBySpotId.length === 1
                ? `1 Review`
                : `${reviewsBySpotId.length} Reviews`}
            </span>
          </div>
          <div className="post-review">
            {reviewable ? (
              <button className="grey-button">
                <OpenModalMenuItem
                  itemText='Post Your Review'
                  modalComponent={<PostReviewModal spotId={spotId} />}
                />
              </button>
            ) : null}
            {noReviews ? <p className="standard medium">Be the first to post a review</p> : null}
          </div>

          {reviewsBySpotId?.toReversed().map(review => (
            <div>
              <h3>{review.User.firstName}</h3>
              <div>{dateFormat(review.createdAt, 'mmmm yyyy')}</div>
              <div>{review.review}</div>
              <div>
                {loggedIn && review.userId === currentUser.id ? (
                  <button className="grey-button">
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
      </div>
    </>
  )
}
