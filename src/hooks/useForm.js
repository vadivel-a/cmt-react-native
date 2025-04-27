// hooks/useForm.js

import { useState } from 'react';
import useValidation from './useValidation';

const useForm = (initialValues = {}, validateRules = () => ({})) => {
  const [values, setValues] = useState(initialValues);
  const { errors, validate, clearError } = useValidation(validateRules);

  // Handle change in input fields
  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    clearError(name); // Clear error for this specific field when the user changes the input
  };

  // Handle form submission
  const handleSubmit = (callback) => {
    const validationErrors = validate(values); // Run validation for all fields
    if (Object.keys(validationErrors).length === 0) {
      callback(values); // Call the provided callback if no validation errors
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
