// UserProfile.js
import React, { useState } from 'react';
import './UserProfile.css';

function UserProfile() {
  // Default values for the user profile
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Smith',
    phoneNumber: '123-456-7890',
    email: 'john.doe@example.com',
    experience: [
      {
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
        description: 'Bachelor of Science in Computer Science.',
      },
    ],
  });

  // Add new experience
  const addExperience = () => {
    setProfile({
      ...profile,
      experience: [
        ...profile.experience,
        { organizationName: '', startDate: '', endDate: '', description: '' },
      ],
    });
  };

  // Remove an experience entry
  const removeExperience = (index) => {
    const updatedExperience = [...profile.experience];
    updatedExperience.splice(index, 1);
    setProfile({ ...profile, experience: updatedExperience });
  };

  // Add new education
  const addEducation = () => {
    setProfile({
      ...profile,
      education: [
        ...profile.education,
        { schoolName: '', startDate: '', endDate: '', description: '' },
      ],
    });
  };

  // Remove an education entry
  const removeEducation = (index) => {
    const updatedEducation = [...profile.education];
    updatedEducation.splice(index, 1);
    setProfile({ ...profile, education: updatedEducation });
  };

  return (
    <div className="profile-container">
      <nav className="profile-nav">
        <span>Profile</span>
        <span>Applications</span>
        <span>Log Out</span>
      </nav>

      <div className="profile-box">
        <h2>User Profile</h2>
        <form>
          <div className="input-row">
            <div className="input-group">
              <label>First Name</label>
              <input type="text" defaultValue={profile.firstName} />
            </div>
            <div className="input-group">
              <label>Last Name</label>
              <input type="text" defaultValue={profile.lastName} />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label>Phone Number</label>
              <input type="text" defaultValue={profile.phoneNumber} />
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <input type="email" defaultValue={profile.email} />
            </div>
          </div>

          <h2>Experience</h2>
          {profile.experience.map((exp, index) => (
            <div key={index} className="experience-group">
              <div className="input-group">
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
            </div>
          ))}
          <button type="button" className="add-button" onClick={addExperience}>
            + Add Experience
          </button>

          <h2>Education</h2>
          {profile.education.map((edu, index) => (
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

export default UserProfile;
