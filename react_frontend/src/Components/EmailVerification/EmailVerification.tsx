// React and hooks imports
import React, { useEffect, useState } from 'react';

// Router imports
import { useParams } from 'react-router-dom';

// Component imports
import Loading from '../../utils/Components/Loading/Loading';
import EmailVerificationMessage from './EmailVerificationMessage/EmailVerificationMessage';

// Service imports
import { verifyEmail } from '../../services/verifyEmail';
import { resendEmailVerification } from '../../services/resendEmailVerification';

// Define the EmailVerification component
const EmailVerification: React.FC = () => {
  // Extract uidb64 and token from the URL parameters
  const { uidb64, token } = useParams<{ uidb64: string; token: string }>();

  // State to hold the verification message and loading state
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // useEffect hook to verify the email when the component mounts or when uidb64 or token changes
  useEffect(() => {
    // Define an async function to verify the email
    const verify = async () => {
      if (uidb64 && token) {
        // Call the verifyEmail function with uidb64 and token
        const response = await verifyEmail(uidb64, token);
        if (response.message === 'Email verification link has expired.') {
          // Resend the email verification link if the link has expired
          resendEmailVerification(uidb64);
          // Update the message state with a new verification link message
          setMessage(`${response.message} A new verification link has been sent to your email.`);
        }
          
        // Update the message state based on the response
        setMessage(response.message);
        // Set loading to false after the verification process
        setIsLoading(false);
      } else {
        // Set the message as invalid if uidb64 or token is missing
        setMessage('Invalid link.');
        // Set loading to false if uidb64 or token is missing
        setIsLoading(false);
      }
    };

    // Call the verify function
    verify();
  }, [uidb64, token]); // Dependency array to re-run the effect when uidb64 or token changes

  // Render the component based on the loading state and verification message
  return (
    <div>
      <h1>Email Verification</h1>
      {isLoading ? (
        <Loading /> // Show loading component while verifying the email
      ) : (
        <EmailVerificationMessage message={message} /> // Show email verification message if the email is verified
      )
      }
    </div>
  );
};

export default EmailVerification;