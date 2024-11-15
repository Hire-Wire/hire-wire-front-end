import React from 'react';
import axios from 'axios';

const Employment = ({ experiences, setExperiences, getExperiences }) => {
  // Handle the input changes for both experience and education
  const handleInputChange = (e, index, type, field) => {
    const updatedExperience = [...experiences[type]];
    updatedExperience[index][field] = e.target.value;
    setExperiences({
      ...experiences,
      [type]: updatedExperience,
    });
  };

  // Add new experience
  const addEmployment = () => {
    setExperiences({
      ...experiences,
      employments: [
        ...experiences.employments,
        { jobTitle: '', organizationName: '', startDate: '', endDate: '', jobDescription: '' },
      ],
    });
  };

  // Remove an experience entry
  const removeEmployment = (index) => {
    const updatedExperience = [...experiences.employments];
    updatedExperience.splice(index, 1);
    setExperiences({ ...experiences, employments: updatedExperience });
  };

  const handleSaveEmploymentExperienceClick = async (index) => {
    const expData = experiences.employments[index];
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
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        withCredentials: true 
      });
      if (response.data.success) {
        // Display a success message or handle the response
        getExperiences()
      } else {
        // Handle backend validation errors
        console.error('Failed to save experience', response.data.errors);
      }
    } catch (error) {
      console.error('Error saving experience:', error.message);
    }
  };

  return (
    <div>
      <h2>Employment Experience</h2>
      {experiences.employments.map((exp, index) => (
        <div key={index} className="experience-group">
          <div className="input-group">
            <label>Job Title</label>
            <input
              type="text"
              value={exp.jobTitle}
              onChange={(e) =>
                handleInputChange(e, index, 'employments', 'jobTitle')
              }
            />
            <label>Organization Name</label>
            <input
              type="text"
              value={exp.organizationName}
              onChange={(e) =>
                handleInputChange(e, index, 'employments', 'organizationName')
              }
            />
          </div>
          <div className="input-row">
            <div className="input-group">
              <label>Start Date</label>
              <input
                type="date"
                value={exp.startDate}
                onChange={(e) =>
                  handleInputChange(e, index, 'employments', 'startDate')
                }
              />
            </div>
            <div className="input-group">
              <label>End Date</label>
              <input
                type="date"
                value={exp.endDate}
                onChange={(e) =>
                  handleInputChange(e, index, 'employments', 'endDate')
                }
              />
            </div>
          </div>
          <div className="input-group">
            <label>Description</label>
            <textarea
              value={exp.jobDescription}
              onChange={(e) =>
                handleInputChange(e, index, 'employments', 'jobDescription')
              }
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
      ))}
      <button type="button" className="add-button" onClick={addEmployment}>
        + Add Experience
      </button>
    </div>
  );
};

export default Employment;
