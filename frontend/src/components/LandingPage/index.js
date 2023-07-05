import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getAllSpots } from '../../store/spot'
import testImg from '../../images/testspot.jpg'
import './LandingPage.css'

export default function LandingPage () {
  const history = useHistory()
  const dispatch = useDispatch()
  const allSpots = Object.values(
    useSelector(state => (state.spots.allSpots ? state.spots.allSpots : []))
  )
  console.log('Landing Page ALL SPOTS => ', allSpots)

  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch])

  return (
    <>
      <div className='landing-page landing-page-container'>
        {allSpots?.map(
          ({ id, name, city, state, avgRating, price, previewImage }) => (
            <>
              <div
                className='landing-page card-container'
                onClick={e => history.push(`/spots/${id}`)}
              >
                <div>
                  <img
                    className='card-img'
                    src={testImg}
                    title={name}
                    alt={name}
                  />
                </div>
                <div className='card-details'>
                  <span>{`${city}, ${state}`}</span>
                  <span className='avg-rating'>
                    <i class='fa-solid fa-star' />
                    {` ${avgRating !== 'NaN' ? avgRating : 'New'}`}
                  </span>
                </div>
                <div className='card-price'>
                  <span>{`$${price} night`}</span>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </>
  )
}
