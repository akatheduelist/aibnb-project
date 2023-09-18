import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import * as spotActions from '../../store/spot'
import './LandingPage.css'

export default function LandingPage () {
  const history = useHistory()
  const dispatch = useDispatch()
  const allSpots = Object.values(useSelector(state => state.spots.allSpots))

  useEffect(() => {
    dispatch(spotActions.getAllSpots())
  }, [dispatch])

  return (
    <>
      <div className='landing-page page-container'>
        <div className='header'></div>
        {allSpots?.map(
          ({ id, name, city, state, avgRating, price, previewImage }) => (
            <>
              <div
                className='landing-page card-container'
                onClick={e => history.push(`/spots/${id}`)}
              >
                <div>
                  <img
                    className='image card-img'
                    src={previewImage}
                    title={name}
                    alt={name}
                  />
                </div>
                <div className='card-details'>
                  <span className='medium city-state'>{`${city}, ${state}`}</span>
                  <span className='regular avg-rating'>
                    <i className='fa-solid fa-star fa-xs' />
                    {` ${avgRating !== 'NaN' ? avgRating : 'New'}`}
                  </span>
                </div>
                <div className='card-price'>
                  <span className='medium'>{`$${price} `}</span>
                  <span>night</span>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </>
  )
}
