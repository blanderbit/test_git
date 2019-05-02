import React from 'react';
import { Route, Switch } from "react-router-dom";

import './App.scss';
import './styles/index.scss'
import Root from './pages/Root/Root';
import Room1 from './pages/Rooms/Room1';
import Login from './pages/Login/Login';

function App() {
  let routes = (
    <Switch>
      <Route path="/sign-in" component={Login} />
      <Route path="/room1" component={Room1} />
      <Route exact path="/" component={Root} />
    </Switch>
  )
  return (
    <div>
      {routes}
    </div>
  );
}

export default App;
