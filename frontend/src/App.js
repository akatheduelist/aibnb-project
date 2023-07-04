import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import CreateSpot from "./components/CreateSpotForm";
import LandingPage from "./components/LandingPage";
import SpotDetail from "./components/SpotDetail";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch>
        <Route exact path="/"><LandingPage /></Route>
        <Route exact path="/spots/new"><CreateSpot /></Route>
        <Route exact path="/spots/:spotId"><SpotDetail /></Route>
      </Switch>}
    </>
  );
}

export default App;
