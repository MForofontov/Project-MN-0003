import React, { useEffect, useState } from 'react';
import { verifyEmail } from '../../../services/verifyEmail';

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
        setMessage(response.message);
      } catch (error) {
        setMessage('An error occurred while verifying your email.');
      }
    };

    verify();
  }, [uidb64, token]);

  return <p>{message}</p>;
};

export default EmailVerificationMessage;