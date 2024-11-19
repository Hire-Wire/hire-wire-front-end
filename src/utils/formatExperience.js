const formatExperience = (experiences) => {
  const result = {
    employments: [],
    educations: [],
};

  experiences.forEach((experience) => {
      if (experience.experienceType === "Employment") {
          experience.Employments.forEach((employment) => {
              result.employments.push({
                  experienceId: experience.id,
                  id: employment.id,
                  jobTitle: employment.jobTitle,
                  organizationName: experience.organizationName,
                  startDate: employment.startDate.split("T")[0],
                  endDate: employment.endDate ? employment.endDate.split("T")[0] : "", // Handle null
                  jobDescription: employment.jobDescription,
              });
          });
      } else if (experience.experienceType === "Education") {
          experience.Education.forEach((education) => {
              result.educations.push({
                  experienceId: experience.id,
                  id: education.id,
                  organizationName: experience.organizationName,
                  startDate: education.startDate.split("T")[0],
                  endDate: education.endDate ? education.endDate.split("T")[0] : "", // Handle null
                  fieldOfStudy: education.fieldOfStudy,
                  grade: `${education.grade}/4.0`,
                  degree: education.degree,
              });
          });
      }
  });

  return result;
}

export default formatExperience;
