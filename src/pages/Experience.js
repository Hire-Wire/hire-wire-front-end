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
  const [experience, setExperience] = useState({
    exp:  [],
    education: [],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    redirectIfNotAuthenticated(history, setLoading);
    const fetchExperience = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/v1/experiences', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token for authorization
            withCredentials: true, // Include credentials 
          },
        });
        const experiences = response.data?.experiences || [];
        // Separate the employment and education data into two different arrays
        const employmentExperience = experiences.filter(exp => exp.experienceType === 'Employment');
        const educationExperience = experiences.filter(exp => exp.experienceType === 'Education');
  
        // Now set the state with these separated arrays
        setExperience({
          exp: employmentExperience, // Employment experiences
          education: educationExperience, // Education experiences

        });
        } 
       catch (err) {
        setError('Failed to load experiences');
        console.error('Error fetching experiences:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExperience(); // Call the function when the component mounts
  }, []); // Empty dependency array means this runs only once when the component mounts

  // Add new employment
  const addEmployment = () => {
   // Add a new blank employment record
   const newEmployment = {
    experienceType: "Employment",
    organizationName: '',
    employment: {
      jobTitle: '',
      jobDescription: '',
      startDate: '',
      endDate: '',
    }
  };

  setExperience(prevExperience => ({
    ...prevExperience,
    exp: [...prevExperience.exp, 
      {experienceType: newEmployment.experienceType, 
      organizationName: newEmployment.organizationName, 
      Employments : [newEmployment.employment]}]
  }));
  };

  // Add new education
  const addEducation = () => {
     // Add a new blank education record
  const newEducation = {
    experienceType: "Education",
    organizationName: '',
    education: {
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
    }
  };

  setExperience(prevExperience => ({
    ...prevExperience,
    education: [...prevExperience.education, 
      { experienceType: newEducation.experienceType, 
      organizationName: newEducation.organizationName, 
      Education: [newEducation.education]}]
  }));
  };

  // Remove an experience entry
  const removeEmployment = (index) => {
    const updatedExperience = [...experience.exp];
    updatedExperience.splice(index, 1);
    setExperience({ ...experience, exp: updatedExperience });
  };



  // Remove an education entry
  const removeEducation = (index) => {
    const updatedEducation = [...experience.education];
    updatedEducation.splice(index, 1);
    setExperience({ ...experience, education: updatedEducation });
  };

    // Handle the input changes for both experience and education
    const handleInputChange = (e, index, type, field, subIndex) => {
      // Make a copy of the experience array (either 'exp' or 'education')
      const updatedExperience = [...experience[type]];
    
      if (subIndex !== undefined) {
        // Handle nested fields inside 'Employments' or 'Education'
        updatedExperience[index][type === 'exp' ? 'Employments' : 'Education'][subIndex][field] = e.target.value;
      } else {
        // Handle direct fields in 'exp' or 'education'
        updatedExperience[index][field] = e.target.value;
      }
    
      // Update the state
      setExperience({
        ...experience,
        [type]: updatedExperience,
      });
    };

  const handleSaveEmploymentExperienceClick = async (index) => {
    const expData = experience.exp[index];
    const expId = expData.id; // Check if `id` exists to determine if it's an existing record

    // Prepare the data to be sent to the backend
    const data = {
      "experienceType": 'Employment',
      "organizationName": expData.organizationName,
      "employment": expData.Employments,
    };

    try {
      let response; 
      if (expId) {
          // Existing experience - use PUT
      response = await axios.put(`http://localhost:8000/api/v1/experiences/${expId}`, data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include auth token
          withCredentials: true // Include credentials in the request
        }
      });
      }
      else {

        console.log("New Employment Data: ", data);
            // New experience - use POST
      response = await axios.post('http://localhost:8000/api/v1/experiences', data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include auth token
          withCredentials: true // Include credentials in the request
        }
      });
      }
        // If the experience was created (POST), update the state to include the new experience
        if (response.data.success) {
          const updatedExp = [...experience.exp];  // Copy the current experience array
          if (!expId) {
            // If it's a new experience, add it to the array
            updatedExp.push(response.data.experience);  // experience is returned from the API

          } else {
            // If it's an existing experience, update the specific item
            updatedExp[index] = response.data.updatedExperience;  // `updatedExperience` is returned from the backend
          }
          // Update the state with the modified array
          setExperience({ ...experience, exp: updatedExp });
        
          console.log(response.data.experience ? 'Experience created successfully' : 'Experience updated successfully');
        }
       else {
        // Handle backend validation errors
        console.error('Failed to save experience', response.data.errors);
      }
    } catch (error) {
      console.error('Error saving experience:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request error:', error.request);
      } else {
        console.error('General error:', error.message);
      }

    }
  };

  const handleSaveEducationClick = async (index) => {
    const eduData = experience.education[index];
    const eduId = eduData.id; // Check if `id` exists to determine if it's an existing record
    // Prepare the data to be sent to the backend
    const data = {
      "experienceType": 'Education',
      "organizationName": eduData.organizationName,
      "education": eduData.Education
    };

    try {

      let response; 

      if (eduId) {
         // Existing education - use PUT
      response = await axios.put(`http://localhost:8000/api/v1/experiences/${eduId}`, data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include auth token
          withCredentials: true // Include credentials in the request
        }
      });

      }
      else {
          // New education - use POST
      response = await axios.post('http://localhost:8000/api/v1/experiences', data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include auth token
          withCredentials: true // Include credentials in the request
        }
      });
      }


      if (response.data.success) {
        // Directly copy the array without deep copy
      let updatedEducation = [...experience.education];  // Simple shallow copy

     // Modify the array 
     if (!eduId) {
      // Check if new education data is valid before adding
      if (response.data.experience) {
        updatedEducation.push(response.data.experience);
      } else {
        console.error("New education data is undefined:", response.data.experience);
      }
    } else {
      // Check if updated education data is valid before updating
      if (response.data.updatedExperience) {
        updatedEducation[index] = response.data.updatedExperience;
      } else {
        console.error("Updated education data is undefined:", response.data.updatedExperience);
      }
    }
        // Update the state with the modified array
        setExperience({ ...experience, education: updatedEducation });
      
        console.log(response.data.experience ? 'Education created successfully' : 'Education updated successfully');
      } else {
        // Handle backend validation errors
        console.error('Failed to save education', response.data.errors);
      }
    } catch (error) {
      console.error('Error saving education:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request error:', error.request);
      } else {
        console.error('General error:', error.message);
      }
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

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Add leading zero
    const day = String(d.getDate()).padStart(2, '0'); // Add leading zero
    return `${year}-${month}-${day}`;
  };


  return (
    <div className="profile-container">
      <nav className="profile-nav">
        <button type="profile" onClick={() => handleProfileClick(history)}>Profile</button>
        <button type="experience">Experience</button>
        <button type="application" onClick={() => handleJobApplicationClick(history)}>Application</button>
        <button type="logout" onClick={() => handleLogOut(history)}>Log Out</button>
      </nav>
  
      <div className="profile-box">
        <form>
          <h2>Employment Experience</h2>
          {loading ? (
            <p>Loading employment experiences...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            // Check if the 'exp' array exists and has data
            Array.isArray(experience.exp) && experience.exp.length === 0 ? (
              <div className="experience-group">
              <div className="input-group">
                <label>Job Title</label>
                <input
                  type="text"
                  value={''}  // Blank input
                  onChange={(e) => handleInputChange(e, 0, 'exp', 'jobTitle')}
                />
                <label>Organization Name</label>
                <input
                  type="text"
                  value={''}  // Blank input
                  onChange={(e) => handleInputChange(e, 0, 'exp', 'organizationName')}
                />
              </div>
              <div className="input-row">
                <div className="input-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={''}  // Blank input
                    onChange={(e) => handleInputChange(e, 0, 'exp', 'startDate')}
                  />
                </div>
                <div className="input-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={''}  // Blank input
                    onChange={(e) => handleInputChange(e, 0, 'exp', 'endDate')}
                  />
                </div>
              </div>
              <div className="input-group">
                <label>Description</label>
                <textarea
                  value={''}  // Blank input
                  onChange={(e) => handleInputChange(e, 0, 'exp', 'jobDescription')}
                />
              </div>
            </div>
            ) : (
              experience.exp.map((expItem, index) => (
                // Check if 'Employments' exists and map through it
                expItem.Employments && expItem.Employments.map((employment, subIndex) => (
                  <div key={subIndex} className="experience-group">
                    <div className="input-group">
                      <label>Job Title</label>
                      <input
                        type="text"
                        value={employment.jobTitle || ''}
                        onChange={(e) => handleInputChange(e, index, 'exp', 'jobTitle', subIndex)}
                      />
                      <label>Organization Name</label>
                      <input
                        type="text"
                        value={expItem.organizationName || ''}
                        onChange={(e) => handleInputChange(e, index, 'exp', 'organizationName')}
                      />
                    </div>
                    <div className="input-row">
                      <div className="input-group">
                        <label>Start Date</label>
                        <input
                          type="date"
                          value={employment.startDate ? formatDate(employment.startDate) : ''}
                          onChange={(e) => handleInputChange(e, index, 'exp', 'startDate', subIndex)}
                        />
                      </div>
                      <div className="input-group">
                        <label>End Date</label>
                        <input
                          type="date"
                          value={employment.endDate ? formatDate(employment.endDate) : ''}
                          onChange={(e) => handleInputChange(e, index, 'exp', 'endDate', subIndex)}
                        />
                      </div>
                    </div>
                    <div className="input-group">
                      <label>Description</label>
                      <textarea
                        value={employment.jobDescription || ''}
                        onChange={(e) => handleInputChange(e, index, 'exp', 'jobDescription', subIndex)}
                      />
                    </div>
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => removeEmployment(index)}
                    >
                      - Remove Experience
                    </button>
                    <button
                      type="button"
                      className="save-button"
                      onClick={() => handleSaveEmploymentExperienceClick(index)}
                    >
                      Save Changes
                    </button>
                  </div>
                ))
              ))
            )
          )}
  
          <button type="button" className="add-button" onClick={addEmployment}>
            + Add Employment
          </button>
  
          <h2>Education</h2>
          {loading ? (
            <p>Loading education records...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            // Check if the 'education' array exists and has data
            Array.isArray(experience.education) && experience.education.length === 0 ? (
              <div className="education-group">
              <div className="input-group">
                <label>Organization Name</label>
                <input
                  type="text"
                  value={''}  // Blank input
                  onChange={(e) => handleInputChange(e, 0, 'education', 'organizationName')}
                />
              </div>
              <div className="input-row">
                <div className="input-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={''}  // Blank input
                    onChange={(e) => handleInputChange(e, 0, 'education', 'startDate')}
                  />
                </div>
                <div className="input-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={''}  // Blank input
                    onChange={(e) => handleInputChange(e, 0, 'education', 'endDate')}
                  />
                </div>
              </div>
              <div className="input-group">
                <label>Field of Study</label>
                <input
                  type="text"
                  value={''}  // Blank input
                  onChange={(e) => handleInputChange(e, 0, 'education', 'fieldOfStudy')}
                />
                <label>Grade</label>
                <input
                  type="text"
                  value={''}  // Blank input
                  onChange={(e) => handleInputChange(e, 0, 'education', 'grade')}
                />
              </div>
              <div className="input-group">
                <label>Degree</label>
                <input
                  type="text"
                  value={''}  // Blank input
                  onChange={(e) => handleInputChange(e, 0, 'education', 'degree')}
                />
              </div>
            </div>
            ) : (
              experience.education.map((eduItem, index) => (
                // Check if 'Education' exists and map through it
                eduItem.Education && eduItem.Education.map((education, subIndex) => (
                  <div key={subIndex} className="education-group">
                    <div className="input-group">
                      <label>Organization Name</label>
                      <input
                        type="text"
                        value={eduItem.organizationName || ''}
                        onChange={(e) => handleInputChange(e, index, 'education', 'organizationName')}
                      />
                    </div>
                    <div className="input-row">
                      <div className="input-group">
                        <label>Start Date</label>
                        <input
                          type="date"
                          value={education.startDate ? formatDate(education.startDate) : ''}
                          onChange={(e) => handleInputChange(e, index, 'education', 'startDate', subIndex)}
                        />
                      </div>
                      <div className="input-group">
                        <label>End Date</label>
                        <input
                          type="date"
                          value={education.endDate ? formatDate(education.endDate) : ''}
                          onChange={(e) => handleInputChange(e, index, 'education', 'endDate', subIndex)}
                        />
                      </div>
                    </div>
                    <div className="input-group">
                      <label>Field of Study</label>
                      <input
                        type="text"
                        value={education.fieldOfStudy || ''}
                        onChange={(e) => handleInputChange(e, index, 'education', 'fieldOfStudy', subIndex)}
                      />
                      <label>Grade</label>
                      <input
                        type="text"
                        value={education.grade || ''}
                        onChange={(e) => handleInputChange(e, index, 'education', 'grade', subIndex)}
                      />
                    </div>
                    <div className="input-group">
                      <label>Degree</label>
                      <input
                        type="text"
                        value={education.degree || ''}
                        onChange={(e) => handleInputChange(e, index, 'education', 'degree', subIndex)}
                      />
                    </div>
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => removeEducation(index)}
                    >
                      - Remove Education
                    </button>
                    <button
                      type="button"
                      className="save-button"
                      onClick={() => handleSaveEducationClick(index)}
                    >
                      Save Changes
                    </button>
                  </div>
                ))
              ))
            )
          )}
  
          <button type="button" className="add-button" onClick={addEducation}>
            + Add Education
          </button>
        </form>
      </div>
    </div>
  );
  
  
  
}

export default Experience;