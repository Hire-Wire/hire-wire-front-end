// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './Landing';
import UserProfile from './UserProfile';
import Application from './Application';
import Login from './Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/landing">
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
      </Switch>
    </Router>
  );
}

export default App;
