// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import UserProfile from './pages/UserProfile';
import Experience from './pages/Experience';
import AddExperience from './pages/AddExperience';
import JobApplication from './pages/JobApplication';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Error from './pages/Error';
import { PATHS } from './config/pageConfig'; // Import PATHS

function App() {
  return (
      <Router basename="/hire-wire-front-end">
        <Switch>
          <Route exact path={PATHS.HOME}>
            <Landing />
          </Route>
          <Route exact path={PATHS.LOGIN}>
            <Login />
          </Route>
          <Route exact path={PATHS.USER_PROFILE}>
            <UserProfile />
          </Route>
          <Route exact path={PATHS.EXPERIENCE}>
            <Experience />
          </Route>
          <Route exact path={PATHS.ADDEXPERIENCE}>
            <AddExperience />
          </Route>
          <Route exact path={PATHS.JOB_APPLICATION}>
            <JobApplication />
          </Route>
          <Route exact path={PATHS.REGISTRATION}>
            <Registration />
          </Route>
          <Route exact path={PATHS.ERROR}>
            <Error />
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
