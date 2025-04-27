// hooks/useValidation.js

import { useState } from 'react';

const useValidation = (validateRules) => {
  const [errors, setErrors] = useState({});

	const validate = (values) => {
		const newErrors = {};

		Object.keys(validateRules).forEach((field) => {
		const fieldRules = validateRules[field];
		const value = values[field];

		// Required check
		if (fieldRules.required && !value) {
			newErrors[field] = `${field} is required`;
		}

		// Email validation
		if (fieldRules.email && value && !/\S+@\S+\.\S+/.test(value)) {
			newErrors[field] = `${field} is invalid`;
		}

		// Min length check (e.g., password validation)
		if (fieldRules.minLength && value && value.length < fieldRules.minLength) {
			newErrors[field] = `${field} must be at least ${fieldRules.minLength} characters`;
		}

		// Numeric validation (for fields that should be numbers)
		if (fieldRules.isNumber && value && isNaN(value)) {
			newErrors[field] = `${field} must be a number`;
		}
		});

		setErrors(newErrors); // Set the validation errors
		return newErrors;
  };

  const clearError = (field) => {
    setErrors(prev => {
      const { [field]: _, ...rest } = prev; // Remove error for a specific field
      return rest;
    });
  };

  return {
    errors,
    validate,
    clearError,
  };
};

export default useValidation;
