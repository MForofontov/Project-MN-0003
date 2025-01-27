interface PasswordValidationResult {
    isValid: boolean;
    failedCriteria: string[];
  }
  
const validatePassword = (password: string): PasswordValidationResult => {
const criteria = [
    { regex: /[A-Z]/, message: 'at least one uppercase letter' },
    { regex: /[a-z]/, message: 'at least one lowercase letter' },
    { regex: /[0-9]/, message: 'at least one number' },
    { regex: /[^A-Za-z0-9]/, message: 'at least one special character' },
    { regex: /.{8,}/, message: 'at least 8 characters long' },
];

const failedCriteria = criteria.filter(criterion => !criterion.regex.test(password)).map(c => c.message);

return {
    isValid: failedCriteria.length === 0,
    failedCriteria,
};
};

export default validatePassword;