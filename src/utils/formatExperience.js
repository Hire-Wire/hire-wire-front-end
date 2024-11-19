const formatExperience = (experiences) => {
    const result = {
      employments: [],
      educations: [],
    };
  
    experiences.forEach(({ id: experienceId, Employments, Education, organizationName }) => {
      const formattedEmployments = Employments.map((employment) => ({
        experienceId,
        id: employment.id,
        jobTitle: employment.jobTitle,
        organizationName,
        startDate: employment.startDate.split("T")[0],
        endDate: employment.endDate ? employment.endDate.split("T")[0] : "", // Handle null
        jobDescription: employment.jobDescription,
      }));
  
      const formattedEducations = Education.map((education) => ({
        experienceId,
        id: education.id,
        organizationName,
        startDate: education.startDate.split("T")[0],
        endDate: education.endDate ? education.endDate.split("T")[0] : "", // Handle null
        fieldOfStudy: education.fieldOfStudy,
        grade: education.grade,
        degree: education.degree,
      }));
  
      result.employments.push(...formattedEmployments);
      result.educations.push(...formattedEducations);
  
    });
  
    return result;
  };
  
  export default formatExperience;
  