import { useParams } from 'react-router-dom'
import { getSpotById } from '../../store/spot'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function SpotDetail () {
  const { spotId } = useParams()
  const dispatch = useDispatch()
  const spotById = useSelector(state => state.spots.singleSpot)

  useEffect(() => {
    dispatch(getSpotById(spotId))
  }, [dispatch])

  if (spotById) {
    var {
      name,
      city,
      state,
      country,
      descriptions,
      price,
      avgStarRating,
      Owner: { firstName, lastName },
      SpotImages
    } = spotById
  }

  console.log('DETAILS PAGE => CURRENT SPOT => ', SpotImages)
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
          <h3>{`Hosted By ${firstName} ${lastName}`}</h3>
          <p>{descriptions}</p>
        </div>
        <div className='spot-reservation'>
          <div>
            <span>{`$${price} night`}</span>
            <span>
              <i class='fa-solid fa-star' />
              {` ${avgStarRating !== 'NaN' ? avgStarRating : 'New'}`}
            </span>
          </div>
          <div>
            <button onClick={(e) => window.alert("Feature coming soon")}>Reserve</button>
          </div>
        </div>

        <hr />

        <div className='spot-footer'>
          <span>
            <i class='fa-solid fa-star' />
            {` ${avgStarRating !== 'NaN' ? avgStarRating : 'New'}`}
          </span>
        </div>
      </div>
    </>
  )
}
