import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../utils/Components/Loading/Loading';
import { validateEmailVerificationLink } from '../../services/validateEmailVerificationLink';
import EmailVerificationMessage from './EmailVerificationMessage/EmailVerificationMessage';
import LinkIsInvalid from './LinkIsInvalid/LinkIsInvalid';

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
    }, [uidb64, token]);
  
    return (
      <div>
        <h1>Email Verification</h1>
        {isLinkValid === null ? (
          <Loading />
        ) : isLinkValid ? (
          <EmailVerificationMessage uidb64={uidb64!} token={token!} />
        ) : (
            <LinkIsInvalid />
        )}
      </div>
    );
  };
  
  export default EmailVerification;