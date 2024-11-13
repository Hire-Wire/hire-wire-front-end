// Experience.js
import React, {useEffect, useState} from 'react';
import '../templates/Experience.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {handleLogOut, redirectIfNotAuthenticated} from "../handlers/authUtils"; // Import the logout function
import { handleJobApplicationClick } from "../handlers/navigationHandlers";
import {PATHS} from "../config/pageConfig"; // Import navigation handlers


function Experience() {
  const history = useHistory();
  const [loading, setLoading] = useState(true); // Initialize loading state
  useEffect(() => {
    redirectIfNotAuthenticated(history, setLoading);
  }, [history]);


  const [experience, setExperience] = useState({
    exp:  [
      {
        jobTitle: 'Software Engineer',
        organizationName: 'Company Inc.',
        startDate: '2020-01-01',
        endDate: '2022-12-31',
        jobDescription: 'Worked as a software engineer handling front-end tasks.',
      },
    ],
    education: [
      {
        organizationName: 'University of Example',
        startDate: '2016-09-01',
        endDate: '2020-06-15',
        fieldOfStudy: 'Computer Science',
        grade: '3.0/4.0',
        degree: 'Bachelor of Science in Computer Science.',
      },
    ],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/v1/experiences', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token for authorization
            withCredentials: true, // Include credentials 
          },
        });

        if (response.data.success) {
          setExperience(response.data.experiences); // Update state with the fetched experiences
        } else {
          console.error('Failed to fetch experiences:', response.data.message);
        }
      } catch (err) {
        setError('Failed to load experiences');
        console.error('Error fetching experiences:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExperience(); // Call the function when the component mounts
  }, []); // Empty dependency array means this runs only once when the component mounts

  // Add new experience
  const addExperience = () => {
    setExperience({
      ...experience,
      exp: [
        ...experience.exp,
        { jobTitle: '', organizationName: '', startDate: '', endDate: '', jobDescription: '' },
      ],
    });
  };

  // Remove an experience entry
  const removeExperience = (index) => {
    const updatedExperience = [...experience.exp];
    updatedExperience.splice(index, 1);
    setExperience({ ...experience, exp: updatedExperience });
  };

  // Add new education
  const addEducation = () => {
    setExperience({
      ...experience,
      education: [
        ...experience.education,
        { organizationName: '', startDate: '', endDate: '', fieldOfStudy:'', grade:'', degree: '' },
      ],
    });
  };

  // Remove an education entry
  const removeEducation = (index) => {
    const updatedEducation = [...experience.education];
    updatedEducation.splice(index, 1);
    setExperience({ ...experience, education: updatedEducation });
  };

    // Handle the input changes for both experience and education
  const handleInputChange = (e, index, type, field) => {
    const updatedExperience = [...experience[type]];
    updatedExperience[index][field] = e.target.value;
    setExperience({
      ...experience,
      [type]: updatedExperience,
    });
  };

  const handleSaveEmploymentExperienceClick = async (index) => {
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

  const handleSaveEducationClick = async (index) => {
    const eduData = experience.education[index];
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
              <button
                type="button"
                className="remove-button"
                onClick={() => removeExperience(index)}
              >
                - Remove Experience
              </button>
              <button type="button"
              className="save-button"
              onClick={ () => handleSaveEmploymentExperienceClick(index)}>
              Save Changes
              </button>
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
              <button
                type="button"
                className="remove-button"
                onClick={() => removeEducation(index)}
              >
                - Remove Education
              </button>
              <button type="button"
              className="save-button"
              onClick={ () => handleSaveEducationClick(index)}>
              Save Changes
              </button>
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

export default Experience;
