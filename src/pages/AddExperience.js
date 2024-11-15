// AddExperience.js
import React, {useEffect, useState} from 'react';
import '../templates/AddExperience.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {handleLogOut, redirectIfNotAuthenticated} from "../handlers/authUtils"; // Import the logout function
import { handleJobApplicationClick } from "../handlers/navigationHandlers";
import {PATHS} from "../config/pageConfig"; // Import navigation handlers


function AddExperience() {
  const history = useHistory();
  const [loading, setLoading] = useState(true); // Initialize loading state
  useEffect(() => {
    redirectIfNotAuthenticated(history, setLoading);
  }, [history]);


  const [experience, setExperience] = useState({
    exp:  [
      {
        jobTitle: '',
        organizationName: '',
        startDate: '',
        endDate: '',
        jobDescription: '',
      },
    ],
    education: [
      {
        organizationName: '',
        startDate: '',
        endDate: '',
        fieldOfStudy: '',
        grade: 0,
        degree: '',
      },
    ],
  });

    // Handle the input changes for both experience and education
  const handleInputChange = (e, index, type, field) => {
    const updatedExperience = [...experience[type]];
    updatedExperience[index][field] = e.target.value;
    setExperience({
      ...experience,
      [type]: updatedExperience,
    });
  };

  const addExperience = async (index) => {
    const expData = experience.exp[index];
    // Prepare the data to be sent to the backend
    const data = {
      "experienceType": 'Employment',
      "organizationName": expData.organizationName,
      "employment": {
        "jobTitle": expData.jobTitle,
        "jobDescription": expData.jobDescription,
        "startDate": expData.startDate,
        "endDate": expData.endDate,
      }
    };

    try {
      const response = await axios.post('http://localhost:8000/api/v1/experiences', data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Include auth token if necessary
            withCredentials: true // include credentials in the request
        }
      });

    if (response.data.success) {
      // Display a success message or handle the response
      console.log('Experience saved successfully');
    } else {
      // Handle backend validation errors
      console.error('Failed to save experience', response.data.errors);
    }
  } catch (error) {
    console.error('Error saving experience:', error.message);
  }

  };

  const addEducation = async (index) => {
    const eduData = experience.education[index];

    // Validate and parse the "grade" field
    const grade = parseFloat(eduData.grade);
    if (isNaN(grade)) {
        console.error('Grade must be a valid number.');
        alert('Please enter a valid number for the grade.');
        return;
    }

    // Prepare the data to be sent to the backend
    const data = {
      "experienceType": 'Education',
      "organizationName": eduData.organizationName,
      "education": {
        "degree": eduData.degree,
        "fieldOfStudy": eduData.fieldOfStudy,
        "grade": eduData.grade,
        "startDate": eduData.startDate,
        "endDate": eduData.endDate,
      }
    };

    try {
      const response = await axios.post('http://localhost:8000/api/v1/experiences', data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Include auth token if necessary
            withCredentials: true // include credentials in the request
        }
      });

    if (response.data.success) {
      // Display a success message or handle the response
      console.log('Experience saved successfully');
    } else {
      // Handle backend validation errors
      console.error('Failed to save experience', response.data.errors);
    }
  } catch (error) {
    console.error('Error saving experience:', error.message);
  }


  };

  const handleViewEditExpClick = () => {
    history.push(PATHS.EXPERIENCE);
  }

  const handleAddExpClick = () => {
    history.push(PATHS.ADDEXPERIENCE);
  }

  const handleProfileClick = () => {
    history.push(PATHS.USER_PROFILE);
  };

  const handleApplicationClick = () => {
    history.push(PATHS.JOB_APPLICATION);
  }

  const handleLogoutClick = () => {
    handleLogOut(history);
  };

  return (
    <div className="profile-container">
      <nav className="profile-nav">
        <button type="profile" onClick={() => handleProfileClick(history)}>Profile</button>
        <button type = "experience">Experience</button>
        <button type="application" onClick={() => handleJobApplicationClick(history)}>Application</button>
        <button type="logout" onClick={() => handleLogOut(history)}>Log Out</button>
      </nav>

      <div className="profile-box">
        <form>
          <div className="input-row-view-edit-add">
                <button type="viewedit" onClick={() => handleViewEditExpClick(history)}>View/Edit Experience</button>
                <button type="add" onClick={() => handleAddExpClick(history)}>Add Experience</button>
            </div>
          <h2>Employment Experience</h2>
          {experience.exp.map((exp, index) => (
            <div key={index} className="experience-group">
              <div className="input-group">
                <label>Job Title</label>
                <input type="text"
                value={exp.jobTitle}
                onChange={(e) => handleInputChange(e, index, 'exp', 'jobTitle')}
                />
                <label>Organization Name</label>
                <input type="text"
                value={exp.organizationName}
                onChange={(e) => handleInputChange(e, index, 'exp', 'organizationName')} />
              </div>
              <div className="input-row">
                <div className="input-group">
                  <label>Start Date</label>
                  <input type="date"
                  value={exp.startDate}
                  onChange={(e) => handleInputChange(e, index, 'exp', 'startDate')}/>
                </div>
                <div className="input-group">
                  <label>End Date</label>
                  <input type="date"
                  value={exp.endDate}
                  onChange={(e) => handleInputChange(e, index, 'exp', 'endDate')}/>
                </div>
              </div>
              <div className="input-group">
                <label>Description</label>
                <textarea
                value={exp.jobDescription}
                onChange={(e) => handleInputChange(e, index, 'exp', 'jobDescription')}/>
              </div>
            </div>
          ))}
          <button type="button" className="add-button" onClick={addExperience}>
            + Add Experience
          </button>


          <h2>Education</h2>
          {experience.education.map((edu, index) => (
            <div key={index} className="education-group">
              <div className="input-group">
                <label>Organization Name</label>
                <input type="text"
                value={edu.organizationName}
                onChange={(e) => handleInputChange(e, index, 'education', 'organizationName')}/>
              </div>
              <div className="input-row">
                <div className="input-group">
                  <label>Start Date</label>
                  <input type="date"
                  value={edu.startDate}
                  onChange={(e) => handleInputChange(e, index, 'education', 'startDate')}/>
                </div>
                <div className="input-group">
                  <label>End Date</label>
                  <input type="date"
                  value={edu.endDate}
                  onChange={(e) => handleInputChange(e, index, 'education', 'endDate')}/>
                </div>
              </div>
              <div className="input-group">
                  <label>Field of Study</label>
                  <input type="text"
                  value={edu.fieldOfStudy}
                  onChange={(e) => handleInputChange(e, index, 'education', 'fieldOfStudy')}/>
                  <label>Grade</label>
                  <input type="text"
                  value={edu.grade}
                  onChange={(e) => handleInputChange(e, index, 'education', 'grade')}/>
                </div>
              <div className="input-group">
                <label>Degree</label>
                <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleInputChange(e, index, 'education', 'degree')}/>
              </div>
            </div>
          ))}
          <button type="button" className="add-button" onClick={addEducation}>
            + Add Education
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddExperience;
