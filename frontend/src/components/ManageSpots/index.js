import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getAllSpots } from '../../store/spot'
import './ManageSpots.css'

export default function ManageSpots () {
  const history = useHistory()
  const dispatch = useDispatch()
  const allSpots = Object.values(
    useSelector(state => (state.spots.allSpots ? state.spots.allSpots : []))
  )

  const currentSpots = []
  currentSpots.push(allSpots.find(spot => spot.ownerId === 1))

  console.log('MANAGE SPOTS => CURRENT SPOTS => ', currentSpots)

  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch])

  return (
    <>
      <div className='manage-spots header'>
        <h3>Manage Your Spots</h3>
        <button>Create a New Spot</button>
      </div>

      <div className='landing-page landing-page-container'>
        {currentSpots?.map(
          ({ id, name, city, state, avgRating, price, previewImage }) => (
            <>
              <div
                className='landing-page card-container'
                onClick={e => history.push(`/spots/${id}`)}
              >
                <div>
                  <img
                    className='card-img'
                    src={previewImage}
                    title={name}
                    alt={name}
                  />
                </div>
                <div className='card-details'>
                  <span className='medium city-state'>{`${city}, ${state}`}</span>
                  <span className='regular avg-rating'>
                    <i class='fa-solid fa-star fa-xs' />
                    {` ${avgRating !== 'NaN' ? avgRating : 'New'}`}
                  </span>
                </div>
                <div className='card-price'>
                  <span className='medium'>{`$${price} `}</span>
                  <span>night</span>
                </div>
                <div className='card-update-delete'>
                  <span>
                    <button>Update</button>
                  </span>
                  <span>
                    <button>Delete</button>
                  </span>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </>
  )
}
