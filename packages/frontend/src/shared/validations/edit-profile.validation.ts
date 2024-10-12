import * as yup from 'yup';

export const editProfileSchema = yup.object().shape({
  name: yup.string().min(3).max(50).optional(),
  email: yup.string().email().min(3).max(50).optional(),
});

