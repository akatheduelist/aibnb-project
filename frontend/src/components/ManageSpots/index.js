import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import * as spotActions from '../../store/spot'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import DeleteSpotModal from '../DeleteSpotModal'
import './ManageSpots.css'

export default function ManageSpots () {
  const history = useHistory()
  const dispatch = useDispatch()
  const allSpots = Object.values(useSelector(state => state.spots.allSpots))
  const currentUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(spotActions.getAllSpots())
  }, [dispatch])

  if (allSpots.length > 1) {
    var currentSpots = allSpots.filter(spot => spot.ownerId === currentUser.id)
  }

  return (
    <>
      <div className='page-container'>
        <div className='header'>
          <h3>Manage Your Spots</h3>
          {currentSpots.length <= 1 ? <button
            className='grey-button'
            onClick={() => history.push('/spots/new')}
          >
            Create a New Spot
          </button> : null}
        </div>
        {currentSpots?.map(
          ({ id, name, city, state, avgRating, price, previewImage }) => (
            <>
              <div
                className='card-container'
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
                <div className='card-update-delete'>
                  <button
                    className='grey-button'
                    onClick={e => {
                      e.stopPropagation()
                      history.push(`/spots/${id}/edit`)
                    }}
                  >
                    Update
                  </button>
                  <button className='grey-button' onClick={e => e.stopPropagation()}>
                    <OpenModalMenuItem
                      itemText='Delete'
                      modalComponent={<DeleteSpotModal id={id} />}
                    />
                  </button>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </>
  )
}
