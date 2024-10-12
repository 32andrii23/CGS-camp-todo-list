import * as yup from 'yup';

export const todoSchema = yup.object().shape({
	title: yup.string().required('Title is required').min(3).max(50),
	description: yup.string().optional().min(3).max(500),
	completed: yup.boolean(),
	private: yup.boolean(),
});
