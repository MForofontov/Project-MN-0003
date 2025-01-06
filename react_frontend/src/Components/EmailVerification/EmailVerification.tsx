import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { validateEmailVerificationLink } from '../../services/validateEmailVerificationLink';

const EmailVerification: React.FC = () => {
  const { uidb64, token } = useParams<{ uidb64: string; token: string }>();
  const [message, setMessage] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const validateLink = async () => {
      try {
        const response = await validateEmailVerificationLink(uidb64, token);
        setMessage(response.message);
        setIsValid(true);
      } catch (error) {
        setMessage(error.message);
        setIsValid(false);
      }
    };

    validateLink();
  }, [uidb64, token]);

  return (
    <div>
      <h1>Email Verification</h1>
      {isValid === null ? (
        <p>Loading...</p>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default EmailVerification;