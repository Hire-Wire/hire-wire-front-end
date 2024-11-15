// AddExperience.js
import React, { useEffect, useState } from 'react';
import '../templates/AddExperience.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { handleLogOut, redirectIfNotAuthenticated } from "../handlers/authUtils"; // Import the logout function
import { handleJobApplicationClick } from "../handlers/navigationHandlers";
import { PATHS } from "../config/pageConfig"; // Import navigation handlers

function AddExperience() {
  const history = useHistory();
  const [loading, setLoading] = useState(true); // Initialize loading state
  useEffect(() => {
    redirectIfNotAuthenticated(history, setLoading);
  }, [history]);

  // Initial state for experience and education fields
  const initialState = {
    exp: {
      jobTitle: '',
      organizationName: '',
      startDate: '',
      endDate: '',
      jobDescription: '',
    },
    education: {
      organizationName: '',
      startDate: '',
      endDate: '',
      fieldOfStudy: '',
      grade: 0,
      degree: '',
    },
  };

  const [experience, setExperience] = useState(initialState);

  // Handle the input changes for both experience and education
  const handleInputChange = (e, type, field) => {
    setExperience({
      ...experience,
      [type]: {
        ...experience[type],
        [field]: e.target.value,
      },
    });
  };

  const addExperience = async () => {
    const expData = experience.exp;
    const data = {
      experienceType: 'Employment',
      organizationName: expData.organizationName,
      employment: {
        jobTitle: expData.jobTitle,
        jobDescription: expData.jobDescription,
        startDate: expData.startDate,
        endDate: expData.endDate,
      }
    };

    try {
      const response = await axios.post('http://localhost:8000/api/v1/experiences', data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        console.log('Experience saved successfully');
        
        // Clear the form fields after successful submission
        setExperience(initialState);
      } else {
        console.error('Failed to save experience', response.data.errors);
      }
    } catch (error) {
      console.error('Error saving experience:', error.message);
    }
  };

  const addEducation = async () => {
    const eduData = experience.education;

    // Validate and parse the "grade" field
    const grade = parseFloat(eduData.grade);
    if (isNaN(grade)) {
      console.error('Grade must be a valid number.');
      alert('Please enter a valid number for the grade.');
      return;
    }

    const data = {
      experienceType: 'Education',
      organizationName: eduData.organizationName,
      education: {
        degree: eduData.degree,
        fieldOfStudy: eduData.fieldOfStudy,
        grade: eduData.grade,
        startDate: eduData.startDate,
        endDate: eduData.endDate,
      }
    };

    try {
      const response = await axios.post('http://localhost:8000/api/v1/experiences', data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        console.log('Education saved successfully');
        
        // Clear the form fields after successful submission
        setExperience(initialState);
      } else {
        console.error('Failed to save education', response.data.errors);
      }
    } catch (error) {
      console.error('Error saving education:', error.message);
    }
  };

  const handleViewEditExpClick = () => {
    history.push(PATHS.EXPERIENCE);
  };

  const handleAddExpClick = () => {
    history.push(PATHS.ADDEXPERIENCE);
  };

  const handleProfileClick = () => {
    history.push(PATHS.USER_PROFILE);
  };

  const handleApplicationClick = () => {
    history.push(PATHS.JOB_APPLICATION);
  };

  const handleLogoutClick = () => {
    handleLogOut(history);
  };

  return (
    <div className="profile-container">
      <nav className="profile-nav">
        <button type="profile" onClick={handleProfileClick}>Profile</button>
        <button type="experience" onClick={handleViewEditExpClick}>Experience</button>
        <button type="application" onClick={handleJobApplicationClick}>Application</button>
        <button type="logout" onClick={handleLogoutClick}>Log Out</button>
      </nav>

      <div className="profile-box">
        <form>
          <div className="input-row-view-edit-add">
            <button type="viewedit" onClick={handleViewEditExpClick}>View/Edit Experience</button>
            <button type="add" onClick={handleAddExpClick}>Add Experience</button>
          </div>

          <h2>Employment Experience</h2>
          <div className="experience-group">
            <div className="input-group">
              <label>Job Title</label>
              <input type="text"
                value={experience.exp.jobTitle}
                onChange={(e) => handleInputChange(e, 'exp', 'jobTitle')}
              />
              <label>Organization Name</label>
              <input type="text"
                value={experience.exp.organizationName}
                onChange={(e) => handleInputChange(e, 'exp', 'organizationName')}
              />
            </div>
            <div className="input-row">
              <div className="input-group">
                <label>Start Date</label>
                <input type="date"
                  value={experience.exp.startDate}
                  onChange={(e) => handleInputChange(e, 'exp', 'startDate')}
                />
              </div>
              <div className="input-group">
                <label>End Date</label>
                <input type="date"
                  value={experience.exp.endDate}
                  onChange={(e) => handleInputChange(e, 'exp', 'endDate')}
                />
              </div>
            </div>
            <div className="input-group">
              <label>Description</label>
              <textarea
                value={experience.exp.jobDescription}
                onChange={(e) => handleInputChange(e, 'exp', 'jobDescription')}
              />
            </div>
          </div>
          <button type="button" className="add-button" onClick={addExperience}>
            + Add Experience
          </button>

          <h2>Education</h2>
          <div className="education-group">
            <div className="input-group">
              <label>Organization Name</label>
              <input type="text"
                value={experience.education.organizationName}
                onChange={(e) => handleInputChange(e, 'education', 'organizationName')}
              />
            </div>
            <div className="input-row">
              <div className="input-group">
                <label>Start Date</label>
                <input type="date"
                  value={experience.education.startDate}
                  onChange={(e) => handleInputChange(e, 'education', 'startDate')}
                />
              </div>
              <div className="input-group">
                <label>End Date</label>
                <input type="date"
                  value={experience.education.endDate}
                  onChange={(e) => handleInputChange(e, 'education', 'endDate')}
                />
              </div>
            </div>
            <div className="input-group">
              <label>Field of Study</label>
              <input type="text"
                value={experience.education.fieldOfStudy}
                onChange={(e) => handleInputChange(e, 'education', 'fieldOfStudy')}
              />
              <label>Grade</label>
              <input type="text"
                value={experience.education.grade}
                onChange={(e) => handleInputChange(e, 'education', 'grade')}
              />
            </div>
            <div className="input-group">
              <label>Degree</label>
              <input
                type="text"
                value={experience.education.degree}
                onChange={(e) => handleInputChange(e, 'education', 'degree')}
              />
            </div>
          </div>
          <button type="button" className="add-button" onClick={addEducation}>
            + Add Education
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddExperience;
