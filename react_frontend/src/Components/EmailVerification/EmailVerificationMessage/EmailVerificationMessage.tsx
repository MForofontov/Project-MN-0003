import React, { useEffect, useState } from 'react';
import { verifyEmail } from '../../../services/verifyEmail';
import { resendEmailVerification } from '../../../services/resendEmailVerification';

// Define the props for the EmailVerificationMessage component
interface EmailVerificationMessageProps {
  uidb64: string;
  token: string;
}

// Define the EmailVerificationMessage component
const EmailVerificationMessage: React.FC<EmailVerificationMessageProps> = ({ uidb64, token }) => {
  // State to hold the message to be displayed
  const [message, setMessage] = useState<string>('');

  // useEffect hook to run the verification process when the component mounts or when uidb64 or token changes
  useEffect(() => {
    // Define an async function to verify the email
    const verify = async () => {
      try {
        // Call the verifyEmail function with uidb64 and token
        const response = await verifyEmail(uidb64, token);
        // Check if the email was verified successfully
        if (response.message === 'Email verified successfully.') {
          setMessage(response.message);
        }
        // Check if the email verification link has expired
        if (response.message === 'Email verification link has expired.') {
          // Resend the verification email if the link has expired
          await resendEmailVerification(uidb64);
          // Update the message state to inform the user
          setMessage(`${response.message} A new link has been sent to your email.`);
        }
      } catch (error) {
        // Handle any errors that occur during the verification process
        setMessage('An error occurred while verifying your email.');
      }
    };

    // Call the verify function
    verify();
  }, [uidb64, token]); // Dependency array to re-run the effect when uidb64 or token changes

  // Render the message
  return <p>{message}</p>;
};

export default EmailVerificationMessage;