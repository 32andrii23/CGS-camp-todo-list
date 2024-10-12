import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  name: yup.string().required('Name is required').min(3).max(50),
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required').min(6).max(50),
})
