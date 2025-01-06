// React and hooks imports
import React, { useEffect, useState } from 'react';

// Router imports
import { useParams } from 'react-router-dom';

// Component imports
import Loading from '../../utils/Components/Loading/Loading';
import EmailVerificationMessage from './EmailVerificationMessage/EmailVerificationMessage';
import LinkIsInvalid from './LinkIsInvalid/LinkIsInvalid';

// Service imports
import { validateEmailVerificationLink } from '../../services/validateEmailVerificationLink';

// Define the EmailVerification component
const EmailVerification: React.FC = () => {
  // Extract uidb64 and token from the URL parameters
  const { uidb64, token } = useParams<{ uidb64: string; token: string }>();

  // State to hold the validity of the link
  const [isLinkValid, setIsLinkValid] = useState<boolean | null>(null);

  // useEffect hook to validate the email verification link when the component mounts or when uidb64 or token changes
  useEffect(() => {
    // Define an async function to validate the email verification link
    const validateLink = async () => {
      if (uidb64 && token) {
        try {
          // Call the validateEmailVerificationLink function with uidb64 and token
          const isValid = await validateEmailVerificationLink(uidb64, token);
          // Update the state based on the validation result
          setIsLinkValid(isValid);
        } catch (error) {
          // Handle any errors that occur during the validation process
          setIsLinkValid(false);
        }
      } else {
        // Set the link as invalid if uidb64 or token is missing
        setIsLinkValid(false);
      }
    };

    // Call the validateLink function
    validateLink();
  }, [uidb64, token]); // Dependency array to re-run the effect when uidb64 or token changes

  // Render the component based on the link validity
  return (
    <div>
      <h1>Email Verification</h1>
      {isLinkValid === null ? (
        <Loading /> // Show loading component while validating the link
      ) : isLinkValid ? (
        <EmailVerificationMessage uidb64={uidb64!} token={token!} /> // Show email verification message if the link is valid
      ) : (
        <LinkIsInvalid /> // Show invalid link message if the link is invalid
      )}
    </div>
  );
};

export default EmailVerification;