// React and hooks imports
import React from 'react';

// Define the props for the EmailVerificationMessage component
interface EmailVerificationMessageProps {
  message: string;
}

// Define the EmailVerificationMessage component
const EmailVerificationMessage: React.FC<EmailVerificationMessageProps> = ({ message }) => {
  // State to hold the message to be displayed

  // Render the message
  return <p>{message}</p>;
};

export default EmailVerificationMessage;