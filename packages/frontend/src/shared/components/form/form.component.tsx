import React from 'react';
import { UseFormHandleSubmit } from 'react-hook-form';

import { customFormStyles } from './form.styles';
import Button from '../button/button.component';

interface ICustomFormProps<T extends Record<string, unknown>> {
	handleSubmit: UseFormHandleSubmit<T>;
	onSubmit: (data: T) => void;
	children: React.ReactNode;
	buttonText: string;
	buttonIcon?: React.ReactNode;
}

const CustomForm = <T extends Record<string, unknown>>({
	handleSubmit: handleFormSubmit,
	onSubmit,
	children,
	buttonText,
	buttonIcon,
}: ICustomFormProps<T>): JSX.Element => (
	<form className={customFormStyles} onSubmit={handleFormSubmit(onSubmit)}>
		{children}
		<Button
			type="submit"
			text={buttonText}
			icon={buttonIcon}
			extraButtonStyles="form-button"
		/>
	</form>
);
export default CustomForm;
