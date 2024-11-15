// ViewEditExperience.js
import React, { useEffect, useState } from 'react';
import '../templates/ViewEditExperience.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { handleLogOut, redirectIfNotAuthenticated } from "../handlers/authUtils";
import { PATHS } from "../config/pageConfig";

function ViewEditExperience() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [experience, setExperience] = useState({ exp: [], education: [] });

  useEffect(() => {
    // Redirect if not authenticated
    redirectIfNotAuthenticated(history, setLoading);
  }, [history]);

  // Fetch experiences when the component mounts
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/experiences', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        // Log the entire response to inspect the structure
        console.log('API response:', response.data);
  
        if (response.data.success && response.data.experiences) {
          const experiences = response.data.experiences;
          console.log('Processed experiences:', experiences);
  
          let employmentExperiences = [];
          let educationExperiences = [];
  
          experiences.forEach(experience => {
            console.log('Experience item:', experience);
  
            // For Employments, add the organizationName directly to the experience object
            if (experience.Employments && experience.Employments.length > 0) {
              experience.Employments.forEach(emp => {
                // Push organizationName into the employment experience
                employmentExperiences.push({
                  ...emp, // All other properties of employment
                  organizationName: experience.organizationName, // Add organizationName here
                });
              });
            }
  
            // For Education, add the organizationName directly to the experience object
            if (experience.Education && experience.Education.length > 0) {
              experience.Education.forEach(edu => {
                // Push organizationName into the education experience
                educationExperiences.push({
                  ...edu, // All other properties of education
                  organizationName: experience.organizationName, // Add organizationName here
                });
              });
            }
          });
  
          console.log('Employment experiences:', employmentExperiences);
          console.log('Education experiences:', educationExperiences);
  
          // Set the state with the updated experiences
          setExperience({
            exp: employmentExperiences,
            education: educationExperiences,
          });
        } else {
          console.error('Error in response:', response.data.errors);
        }
      } catch (error) {
        console.error('Error fetching experiences:', error.message);
      }
    };
  
    fetchExperiences();
  }, []);
  

  const formatDate = (date) => {
    if (!date) return '';
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
    const day = String(parsedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Format to YYYY-MM-DD
  };

  const handleInputChange = (e, index, type, field) => {
    const updatedExperience = [...experience[type]];
    updatedExperience[index][field] = e.target.value;
    setExperience({ ...experience, [type]: updatedExperience });
  };

  const removeExperience = async (id, type) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/v1/experiences/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        setExperience(prevState => ({
          ...prevState,
          [type]: prevState[type].filter(item => item.id !== id), 
        }));
      } else {
        console.error('Failed to delete experience:', response.data.errors);
      }
    } catch (error) {
      console.error('Error deleting experience:', error.message);
    }
  };

  const handleSaveChanges = async (index, type) => {
    const experienceData = experience[type][index];
    const id = experienceData.id;

    const data = {
      experienceType: type === 'exp' ? 'Employment' : 'Education',
      organizationName: experienceData.organizationName,
      [type]: type === 'exp' ? {
        jobTitle: experienceData.jobTitle,
        jobDescription: experienceData.jobDescription,
        startDate: experienceData.startDate,
        endDate: experienceData.endDate,
      } : {
        degree: experienceData.degree,
        fieldOfStudy: experienceData.fieldOfStudy,
        grade: experienceData.grade,
        startDate: experienceData.startDate,
        endDate: experienceData.endDate,
      }
    };

    try {
      const response = await axios.put(`http://localhost:8000/api/v1/experiences/${id}`, data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        console.log('Experience updated successfully');
      } else {
        console.error('Failed to update experience:', response.data.errors);
      }
    } catch (error) {
      console.error('Error updating experience:', error.message);
    }
  };

  const handleProfileClick = () => history.push(PATHS.USER_PROFILE);
  const handleJobApplicationClick = () => history.push(PATHS.JOB_APPLICATION);
  const handleViewEditExpClick = () => history.push(PATHS.EXPERIENCE);
  const handleAddExpClick = () => history.push(PATHS.ADDEXPERIENCE);
  const handleLogoutClick = () => handleLogOut(history);

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
            {experience.exp.map((exp, index) => (
              <div key={exp.id || `${exp.organizationName}-${exp.startDate}`} className="experience-group">  {/* Fallback to unique key */}
                <div className="input-group">
                  <label>Job Title</label>
                  <input
                    type="text"
                    value={exp.jobTitle}
                    onChange={(e) => handleInputChange(e, index, 'exp', 'jobTitle')}
                  />
                  <label>Organization Name</label>
                  <input
                    type="text"
                    value={exp.organizationName || ''}
                    onChange={(e) => handleInputChange(e, index, 'exp', 'organizationName')}
                  />
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label>Start Date</label>
                    <input
                      type="date"
                      value={formatDate(exp.startDate)}
                      onChange={(e) => handleInputChange(e, index, 'exp', 'startDate')}
                    />
                  </div>
                  <div className="input-group">
                    <label>End Date</label>
                    <input
                      type="date"
                      value={formatDate(exp.endDate)}
                      onChange={(e) => handleInputChange(e, index, 'exp', 'endDate')}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label>Description</label>
                  <textarea
                    value={exp.jobDescription}
                    onChange={(e) => handleInputChange(e, index, 'exp', 'jobDescription')}
                  />
                </div>
                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removeExperience(exp.id, 'exp')}
                >
                  - Remove Experience
                </button>
                <button
                  type="button"
                  className="save-button"
                  onClick={() => handleSaveChanges(index, 'exp')}
                >
                  Save Changes
                </button>
              </div>
            ))}

            <h2>Education</h2>
            {experience.education.map((edu, index) => (
              <div key={edu.id || `${edu.organizationName}-${edu.startDate}`} className="education-group">  {/* Fallback to unique key */}
                <div className="input-group">
                  <label>Organization Name</label>
                  <input
                    type="text"
                    value={edu.organizationName || ''}
                    onChange={(e) => handleInputChange(e, index, 'education', 'organizationName')}
                  />
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label>Start Date</label>
                    <input
                      type="date"
                      value={formatDate(edu.startDate)}
                      onChange={(e) => handleInputChange(e, index, 'education', 'startDate')}
                    />
                  </div>
                  <div className="input-group">
                    <label>End Date</label>
                    <input
                      type="date"
                      value={formatDate(edu.endDate)}
                      onChange={(e) => handleInputChange(e, index, 'education', 'endDate')}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label>Field of Study</label>
                  <input
                    type="text"
                    value={edu.fieldOfStudy || ''}
                    onChange={(e) => handleInputChange(e, index, 'education', 'fieldOfStudy')}
                  />
                  <label>Grade</label>
                  <input
                    type="text"
                    value={edu.grade || ''}
                    onChange={(e) => handleInputChange(e, index, 'education', 'grade')}
                  />
                </div>
                <div className="input-group">
                  <label>Degree</label>
                  <input
                    type="text"
                    value={edu.degree || ''}
                    onChange={(e) => handleInputChange(e, index, 'education', 'degree')}
                  />
                </div>
                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removeExperience(edu.id, 'education')}
                >
                  - Remove Education
                </button>
                <button
                  type="button"
                  className="save-button"
                  onClick={() => handleSaveChanges(index, 'education')}
                >
                  Save Changes
                </button>
              </div>
            ))}

        </form>
      </div>
    </div>
  );
}

export default ViewEditExperience;
 