import React from 'react';
import { Route, Switch } from "react-router-dom";

import './App.scss';
import './styles/index.scss'
import Room1 from './pages/Rooms/Room1';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  let routes = (
    <Switch>
      <Route path="/sign-in" component={Login} />
      <Route path="/room1" component={Room1} />
      <Route exact path="/" component={Dashboard} />
    </Switch>
  )
  return (
    <div>
      {routes}
    </div>
  );
}

export default App;
