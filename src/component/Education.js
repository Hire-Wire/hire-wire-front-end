import React, { useState } from "react";
import axiosInstance from '../utils/setupInstance';
import { useSnackbar } from 'notistack';

const Education = ({ experiences, setExperiences, getExperiences }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [ newEducation, setNewEducation ] = useState(false);

  // Handle the input changes for both experience and education
const handleInputChange = (e, index, type, field) => {
  const value = e.target.value;
  const updatedExperience = [...experiences[type]];

  // For endDate, check if the value is null or a valid date
  if (field === 'endDate') {
    if (value === '') {
      updatedExperience[index][field] = null; // Set endDate to null
    } else if (new Date(value) > new Date(getLocalDate())) {
      alert('End date cannot be in the future.');
      updatedExperience[index][field] = getLocalDate();
      return;
    } else {
      updatedExperience[index][field] = value; // Valid date
    }
  } else {
    updatedExperience[index][field] = value;
  }

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
    setNewEducation(true);
  };

  // Remove an education entry
  const removeEducation = async (index) => {
    const updatedEducation = [...experiences.educations];
    const removedEducation = updatedEducation.splice(index, 1)[0];

    // Check if the removedEducation contains only empty strings
    const isEmptyEducation = removedEducation &&
        Object.values(removedEducation).every(value => value === '');

    if (!removedEducation || isEmptyEducation) {
      setExperiences({ ...experiences, educations: updatedEducation });
      enqueueSnackbar('Education Deleted', { variant: 'success' });
      return;
    }

    const data = { id: removedEducation.id }

    try {
      const response = await axiosInstance.delete(
        `/experiences/${removedEducation.experienceId}`,
      {
        data,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        withCredentials: true
      });

      if (response.data.success) {
        setExperiences({ ...experiences, educations: updatedEducation });
        getExperiences()
        enqueueSnackbar('Employment Deleted', { variant: 'success' });
      } else {
        enqueueSnackbar('Failed to delete employment', { variant: 'error' });
      }
    } catch {
      enqueueSnackbar('Error deleting employment', { variant: 'error' });
    }
  };

  const handleSaveEducationClick = async (index) => {
    const eduData = experiences.educations[index];

    // Prepare the data to be sent to the backend
    const data = {
      experienceType: 'Education',
      organizationName: eduData.organizationName,
      education: {
        id: eduData.id,
        degree: eduData.degree,
        fieldOfStudy: eduData.fieldOfStudy,
        grade: eduData.grade,
        startDate: eduData.startDate,
        endDate: eduData.endDate,
      },
    };

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      withCredentials: true,
    };

    try {
      const apiUrl = '/experiences';
      const response = newEducation
        ? await axiosInstance.post(apiUrl, data, config)
        : await axiosInstance.put(`${apiUrl}/${eduData.experienceId}`, data, config);
      
      if (response.data.success) {
        setNewEducation(false);
        getExperiences();
        enqueueSnackbar('Education Updated', { variant: 'success' });
      } else {
        enqueueSnackbar('Failed to save education', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Error saving experience', { variant: 'error' });
    }
  };

  const getLocalDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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
                value={edu.endDate || ""}
                onChange={(e) =>
                  handleInputChange(e, index, 'educations', 'endDate')
                }
              />
              {(edu.endDate === null || edu.endDate === "") && <span>(Current)</span>}
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
