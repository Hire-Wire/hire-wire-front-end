// copyUtils.js
export const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).catch(() => {
        console.error("Failed to copy text to clipboard.");
    });
};
