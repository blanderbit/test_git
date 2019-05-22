import React from 'react';
import { Route, Switch } from "react-router-dom";

import './App.scss';
import './styles/index.scss'
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import SignUp from './pages/SignUp/SignUp';
import Hall from './pages/Hall/Hall';

function App() {
  let routes = (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/sign-in" component={Login} />
      <Route path="/hall/:hall_id" component={Hall} />
    </Switch>
  )
  return (
    <div>
      {routes}
    </div>
  );
}

export default App;
