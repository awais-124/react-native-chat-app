import {useState} from 'react';

const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setValues(prev => ({...prev, [name]: value}));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({...prev, [name]: null}));
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  const setFieldError = (name, error) => {
    setErrors(prev => ({...prev, [name]: error}));
  };

  return {
    values,
    errors,
    handleChange,
    resetForm,
    setFieldError,
    setValues,
    setErrors,
  };
};

export default useForm;
