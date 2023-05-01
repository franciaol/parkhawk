import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ParkingSpaces from "./pages/ParkingSpaces";
import ParkingSpaceDetail from "./pages/ParkingSpaceDetail";
import AddParking from "./pages/AddParking";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" children={<Home />} />
          <Route exact path="/profile" children={<Profile />} />
          <Route exact path="/parkingSpaces" children={<ParkingSpaces />} />
          <Route exact path="/addParking" children={<AddParking />} />
          <Route
            exact
            path="/parkingSpaces/:id"
            children={<ParkingSpaceDetail />}
          />
        </Switch>
      </div>
    </Router>
  );
}
