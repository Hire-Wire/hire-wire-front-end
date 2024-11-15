import React from "react";
import axios from 'axios';

const Education = ({ experiences, setExperiences, getExperiences }) => {
  // Handle the input changes for both experience and education
  const handleInputChange = (e, index, type, field) => {
    const updatedExperience = [...experiences[type]];
    updatedExperience[index][field] = e.target.value;
    setExperiences({
      ...experiences,
      [type]: updatedExperience,
    });
  };

  // Add new education
  const addEducation = () => {
    setExperiences({
      ...experiences,
      educations: [
        ...experiences.educations,
        { organizationName: '', startDate: '', endDate: '', fieldOfStudy:'', grade:'', degree: '' },
      ],
    });
  };

  // Remove an education entry
  const removeEducation = (index) => {
    const updatedEducation = [...experiences.educations];
    updatedEducation.splice(index, 1);
    setExperiences({ ...experiences, educations: updatedEducation });
  };
  
  const handleSaveEducationClick = async (index) => {
    const eduData = experiences.educations[index];
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
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        withCredentials: true 
      });

      if (response.data.success) {
        // Display a success message or handle the response
        getExperiences();
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
      <h2>Education</h2>
      {experiences.educations.map((edu, index) => (
        <div key={index} className="education-group">
          <div className="input-group">
            <label>Organization Name</label>
            <input
              type="text"
              value={edu.organizationName}
              onChange={(e) =>
                handleInputChange(e, index, 'educations', 'organizationName')
              }
            />
          </div>
          <div className="input-row">
            <div className="input-group">
              <label>Start Date</label>
              <input
                type="date"
                value={edu.startDate}
                onChange={(e) =>
                  handleInputChange(e, index, 'educations', 'startDate')
                }
              />
            </div>
            <div className="input-group">
              <label>End Date</label>
              <input
                type="date"
                value={edu.endDate}
                onChange={(e) =>
                  handleInputChange(e, index, 'educations', 'endDate')
                }
              />
            </div>
          </div>
          <div className="input-group">
            <label>Field of Study</label>
            <input
              type="text"
              value={edu.fieldOfStudy}
              onChange={(e) =>
                handleInputChange(e, index, 'educations', 'fieldOfStudy')
              }
            />
            <label>Grade</label>
            <input
              type="text"
              value={edu.grade}
              onChange={(e) => handleInputChange(e, index, 'educations', 'grade')}
            />
          </div>
          <div className="input-group">
            <label>Degree</label>
            <input
              type="text"
              value={edu.degree}
              onChange={(e) => handleInputChange(e, index, 'educations', 'degree')}
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
      ))}
      <button type="button" className="add-button" onClick={addEducation}>
        + Add Education
      </button>
    </div>
  );
  
};

export default Education;