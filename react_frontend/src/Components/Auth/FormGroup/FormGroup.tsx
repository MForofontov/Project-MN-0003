import React from 'react';
import './FormGroup.css';

interface FormGroupProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  name: string;
}

const FormGroup: React.FC<FormGroupProps> = ({ label, type, value, onChange, id, name }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <input value={value} onChange={onChange} type={type} id={id} name={name} required />
  </div>
);

export default FormGroup;