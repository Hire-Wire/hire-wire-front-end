// Experience.js
import React, { useState } from 'react';
import './Experience.css';
import { useHistory } from 'react-router-dom';

function Experience() {
  const [experience, setExperience] = useState({
    exp:  [
      {
        jobTitle: 'Software Engineer',
        organizationName: 'Company Inc.',
        startDate: '2020-01-01',
        endDate: '2022-12-31',
        description: 'Worked as a software engineer handling front-end tasks.',
      },
    ],
    education: [
      {
        schoolName: 'University of Example',
        startDate: '2016-09-01',
        endDate: '2020-06-15',
        study: 'Computer Science',
        grade: '3.0/4.0',
        description: 'Bachelor of Science in Computer Science.',
      },
    ],
  });

  // Add new experience
  const addExperience = () => {
    setExperience({
      ...experience,
      exp: [
        ...experience.exp,
        { jobTitle: '', organizationName: '', startDate: '', endDate: '', description: '' },
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
        { schoolName: '', startDate: '', endDate: '', study:'', grade:'', description: '' },
      ],
    });
  };

  // Remove an education entry
  const removeEducation = (index) => {
    const updatedEducation = [...experience.education];
    updatedEducation.splice(index, 1);
    setExperience({ ...experience, education: updatedEducation });
  };

  const handleSaveEmploymentExperienceClick = () => {
    
  }

  const handleSaveEducationClick = () => {
    
  }

  const history = useHistory();

  const handleProfileClick = () => {
    history.push('/userprofile');
  };

  const handleApplicationClick = () => {
    history.push('/application');
  }

  const handleLogOut = () => {
    history.push('/');
  }

  return (
    <div className="profile-container">
      <nav className="profile-nav">
        <button type = "profile" onClick = {handleProfileClick}> Profile  </button>
        <button type = "experience">Experience</button>
        <button type = "application" onClick = {handleApplicationClick}> Application</button>
        <button type = "logout" onClick = {handleLogOut}> Log Out</button>
      </nav>

      <div className="profile-box">
        <form>
          <h2>Employment Experience</h2>
          {experience.exp.map((exp, index) => (
            <div key={index} className="experience-group">
              <div className="input-group">
                <label>Job Title</label>
                <input type="text" defaultValue={exp.jobTitle} />
                <label>Organization Name</label>
                <input type="text" defaultValue={exp.organizationName} />
              </div>
              <div className="input-row">
                <div className="input-group">
                  <label>Start Date</label>
                  <input type="date" defaultValue={exp.startDate} />
                </div>
                <div className="input-group">
                  <label>End Date</label>
                  <input type="date" defaultValue={exp.endDate} />
                </div>
              </div>
              <div className="input-group">
                <label>Description</label>
                <textarea defaultValue={exp.description} />
              </div>
              <button
                type="button"
                className="remove-button"
                onClick={() => removeExperience(index)}
              >
                - Remove Experience
              </button>
              <button type="button" className="save-button" onClick={handleSaveEmploymentExperienceClick}>
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
                <label>School Name</label>
                <input type="text" defaultValue={edu.schoolName} />
              </div>
              <div className="input-row">
                <div className="input-group">
                  <label>Start Date</label>
                  <input type="date" defaultValue={edu.startDate} />
                </div>
                <div className="input-group">
                  <label>End Date</label>
                  <input type="date" defaultValue={edu.endDate} />
                </div>
              </div>
              <div className="input-group">
                  <label>Field of Study</label>
                  <input type="text" defaultValue={edu.study} />
                  <label>Grade</label>
                  <input type="text" defaultValue={edu.grade} />
                </div>
              <div className="input-group">
                <label>Description</label>
                <textarea defaultValue={edu.description} />
              </div>
              <button
                type="button"
                className="remove-button"
                onClick={() => removeEducation(index)}
              >
                - Remove Education
              </button>
              <button type="button" className="save-button" onClick={handleSaveEducationClick}>
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
