import React from 'react';
import { Route, Switch} from "react-router-dom";

import './App.scss';
import GreenRoom from './pages/GreenRoom/GreenRoom';
import SignInForm from './containers/SignInForm/SignInForm';

function App() {
  let routes = (
    <Switch>
      <Route path="/" component={GreenRoom} />
      <Route path="/green-room" component={GreenRoom} />
      <Route path="/yellow-room" component={GreenRoom} />
      <Route path="/blue-room" component={GreenRoom} />
      <Route path="/sign-in" component={SignInForm} />
      <Route path="/sign-up" component={GreenRoom} />
    </Switch>
  )
  return (
    <div>
      {routes}
    </div>
  );
}

export default App;
