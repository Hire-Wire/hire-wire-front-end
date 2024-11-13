// handlers/navigationHandlers.js
import { PATHS } from '../config/pageConfig'; // Import PATHS

export const handleLoginClick = (history) => {
    history.push(PATHS.LOGIN);
};

export const handleRegistrationClick = (history) => {
    history.push(PATHS.REGISTRATION);
};

export const handleExperienceClick = (history) => {
    history.push(PATHS.EXPERIENCE);
};

export const handleJobApplicationClick = (history) => {
    history.push(PATHS.JOB_APPLICATION);
};

export const handleProfileClick = (history) => {
    history.push(PATHS.USER_PROFILE);
};

export const handleBackClick = (history) => {
    history.push(PATHS.HOME);
};
