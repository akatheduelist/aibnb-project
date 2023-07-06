import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import * as spotActions from '../../store/spot'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import DeleteSpotModal from '../DeleteSpotModal'
import './ManageSpots.css'

export default function ManageSpots () {
  const history = useHistory()
  const dispatch = useDispatch()
  const allSpots = Object.values(useSelector(state => state.spots.allSpots))
  const { id } = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(spotActions.getAllSpots())
  }, [dispatch])

  const currentSpots = []
  if (allSpots.length) {
    currentSpots.push(allSpots.find(spot => spot.ownerId === id))
  }

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
                    <i className='fa-solid fa-star fa-xs' />
                    {` ${avgRating !== 'NaN' ? avgRating : 'New'}`}
                  </span>
                </div>
                <div className='card-price'>
                  <span className='medium'>{`$${price} `}</span>
                  <span>night</span>
                </div>
              </div>
              <div className='card-update-delete'>
                <span>
                  <button onClick={e => history.push(`/spots/${id}/edit`)}>
                    Update
                  </button>
                </span>
                <span>
                  <OpenModalMenuItem
                    itemText='Delete'
                    modalComponent={<DeleteSpotModal id={id} />}
                  />
                </span>
              </div>
            </>
          )
        )}
      </div>
    </>
  )
}
