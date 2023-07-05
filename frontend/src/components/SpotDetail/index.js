import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as spotActions from '../../store/spot'

export default function SpotDetail () {
  const { spotId } = useParams()
  const dispatch = useDispatch()
  const spotById = useSelector(state => state.spots.singleSpot)

  const { name, city, state, country, price, avgStarRating, descriptions } = spotById;
  useEffect(() => {
    dispatch(spotActions.getSpotById(spotId))
  }, [dispatch])

  return (
    <>
      <div className='spot-detail spot-detail-container'>
        <div className='spot-header'>
          <h3 className='spot-name'>{name}</h3>
          <span className='spot-location'>{`${city}, ${state}, ${country}`}</span>
        </div>
        <div className='image-gallery'>
          {/* {SpotImages?.map(image => (
            <img src={image.url}></img>
          ))} */}
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
        </div>
      </div>
    </>
  )
}
