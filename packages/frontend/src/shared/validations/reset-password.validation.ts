import * as yup from 'yup';

export const resetPasswordSchema = yup.object().shape({
  password: yup.string().required('Password is required').min(6).max(50),
  confirmPassword: yup.string().required('Confirm password is required').oneOf([yup.ref('password'), null], 'Passwords must match'),
})