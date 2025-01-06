import React, { useEffect, useState } from 'react';
import { verifyEmail } from '../../../services/verifyEmail';
import { resendEmailVerification } from '../../../services/resendEmailVerification';

interface EmailVerificationMessageProps {
  uidb64: string;
  token: string;
}

const EmailVerificationMessage: React.FC<EmailVerificationMessageProps> = ({ uidb64, token }) => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await verifyEmail(uidb64, token);
        if (response.message === 'Email verified successfully.') {
            setMessage(response.message);
        }
        if (response.message === 'Email verification link has expired.') {
            resendEmailVerification(uidb64);
            setMessage(`${response.message} A new link has been sent to your email.`);
        }
      } catch (error) {
        setMessage('An error occurred while verifying your email.');
      }
    };

    verify();
  }, [uidb64, token]);

  return <p>{message}</p>;
};

export default EmailVerificationMessage;