// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Landing from './Landing';
import UserProfile from './UserProfile';
import Application from './Application';
import Registration from './Registration';
import Login from './Login';
import Error from './Error';

function App() {
  return (
    <Router basename = "/hire-wire-front-end">
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/userprofile">
          <UserProfile />
        </Route>
        <Route exact path="/application">
          <Application />
        </Route>
        <Route exact path="/registration">
          <Registration />
        </Route>
        <Route exact path="/error">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
