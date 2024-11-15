import React from "react";
import { useHistory, useLocation } from 'react-router-dom';
import {PATHS} from "../config/pageConfig";
import {handleLogOut} from "../handlers/authUtils";

const NavBar = () => {
  const history = useHistory();
  const location = useLocation();
  
  const NavigateTo = (path) => {
    if(location.pathname === path) return;
    history.push(path);
  };

  return (
    <nav className="profile-nav">
      <button type="profile" onClick={() => NavigateTo(PATHS.USER_PROFILE)}>Profile</button>
      <button type = "experience" onClick={() => NavigateTo(PATHS.EXPERIENCE)} >Experience</button>
      <button type="application" onClick={() => NavigateTo(PATHS.JOB_APPLICATION)}>Application</button>
      <button type="logout" onClick={() => handleLogOut(history)}>Log Out</button>
    </nav>
  );
};

export default NavBar;
