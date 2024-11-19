import React, { useEffect, useState } from "react";
import axiosInstance from '../utils/setupInstance';
import { useHistory } from 'react-router-dom';
import NavBar from "../component/NavBar";
import Education from "../component/Education";
import Employment from "../component/Employment";
import { redirectIfNotAuthenticated } from "../handlers/authUtils";
import formatExperience from "../utils/formatExperience";
import '../templates/Experience.css';

const Experience = () => {
  const history = useHistory();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [experiences, setExperiences] = useState({ employments: [], educations: [] });

  useEffect(() => {
    redirectIfNotAuthenticated(history, setUserLoggedIn);
  }, [history]);

  useEffect(() => {
    getExperiences();
  }, []);

  const getExperiences = async () => {
    try {
      const experienceList = await axiosInstance.get('/experiences', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        withCredentials: true,
      });
      console.log(experienceList.data.experiences)
      const formatedExperience = formatExperience(experienceList.data.experiences);
      setLoading(false);
      setExperiences(formatedExperience);
    } catch (error) {
      console.error("Failed to fetch experiences:", error);
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <NavBar />
      <div className="profile-box">
        { !loading && (<form>
          <Employment experiences={experiences} setExperiences={setExperiences} getExperiences={getExperiences} />
          <Education experiences={experiences} setExperiences={setExperiences} getExperiences={getExperiences} />
        </form>)}
      </div>
    </div>
  );
}

export default Experience;
