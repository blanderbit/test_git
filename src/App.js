import React from 'react';
import { Route, Switch} from "react-router-dom";

import './App.scss';
import './styles/index.scss'
import Root from './pages/Root/Root';

function App() {
  let routes = (
    <Switch>
      
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
