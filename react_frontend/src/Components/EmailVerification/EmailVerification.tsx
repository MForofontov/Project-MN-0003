import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { validateEmailVerificationLink } from '../../services/validateEmailVerificationLink';

const EmailVerification: React.FC = () => {
    const { uidb64, token } = useParams<{ uidb64: string; token: string }>();
    const [isLinkValid, setIsLinkValid] = useState<boolean | null>(null);
  
    useEffect(() => {
      const validateLink = async () => {
        if (uidb64 && token) {
          try {
            const isValid = await validateEmailVerificationLink(uidb64, token);
            setIsLinkValid(isValid);
          } catch (error) {
            setIsLinkValid(false);
          }
        } else {
            setIsLinkValid(false);
        }
      };
  
      validateLink();
    }, []);
  
    return (
      <div>
        <h1>Email Verification</h1>
        {setIsLinkValid === null ? (
          <p>Loading...</p>
        ) : (
          <p>{message}</p>
        )}
      </div>
    );
  };
  
  export default EmailVerification;