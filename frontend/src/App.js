import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import * as sessionActions from './store/session'
import Navigation from './components/Navigation'
import CreateSpot from './components/CreateSpotForm'
import LandingPage from './components/LandingPage'
import SpotDetail from './components/SpotDetail'
import ManageSpots from './components/ManageSpots'
import TripsPage from './components/TripsPage'

function App () {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
  }, [dispatch])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
      <div className="content-container">
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route exact path='/spots/new'>
            <CreateSpot />
          </Route>
          <Route exact path='/spots/current'>
            <ManageSpots />
          </Route>
          <Route exact path='/spots/:spotId/edit'>
            <CreateSpot isEdit={true} />
          </Route>
          <Route exact path='/spots/:spotId'>
            <SpotDetail />
          </Route>
          <Route exact path='/trips'>
            <TripsPage />
          </Route>
        </Switch>
      </div>
      )}
    </>
  )
}

export default App
