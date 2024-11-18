import React, { useState } from 'react';
import axiosInstance from '../utils/setupInstance';
import { useSnackbar } from 'notistack';

const Employment = ({ experiences, setExperiences, getExperiences }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [ newEmployment, setNewEmployment ] = useState(false);
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
    setNewEmployment(true);
  };

  // Remove an experience entry
  const removeEmployment = async (index) => {
    const updatedExperience = [...experiences.employments];
    const removedEmployment = updatedExperience.splice(index, 1)[0];
    const data = { id: removedEmployment.id }

    try {
      const response = await axiosInstance.delete(
        `/experiences/${removedEmployment.experienceId}`,
      {
        data,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        withCredentials: true 
      });

      if (response.data.success) {
        setExperiences({ ...experiences, employments: updatedExperience });
        getExperiences()
        enqueueSnackbar('Employment Deleted', { variant: 'success' });
      } else {
        enqueueSnackbar('Failed to delete employment', { variant: 'error' });
      }
    } catch {
      enqueueSnackbar('Error deleting employment', { variant: 'error' });
    }
  };

  const handleSaveEmploymentExperienceClick = async (index) => {
    const expData = experiences.employments[index];
    // Prepare the data to be sent to the backend
    const data = {
      "experienceType": 'Employment',
      "organizationName": expData.organizationName,
      "employment": {
        "id": expData.id,
        "jobTitle": expData.jobTitle,
        "jobDescription": expData.jobDescription,
        "startDate": expData.startDate,
        "endDate": expData.endDate,
      }
    };

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      withCredentials: true,
    };
  

    try {
      const apiUrl = '/experiences';
      const response = newEmployment
        ? await axiosInstance.post(apiUrl, data, config)
        : await axiosInstance.put(`${apiUrl}/${expData.experienceId}`, data, config);
      if (response.data.success) {
        setNewEmployment(false);
        getExperiences()
        enqueueSnackbar('Employment Updated', { variant: 'success' });
      } else {
        enqueueSnackbar('Failed to save experience', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Error saving experience', { variant: 'error' });
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
