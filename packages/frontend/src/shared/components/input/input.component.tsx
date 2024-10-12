import React, { forwardRef } from 'react';

import { inputStyles, inputWrapperStyles } from './input.styles';
import { CustomLabel } from '../label/label.component';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	placeholder: string;
	id: string;
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
	({ label, placeholder, id, ...props }, ref) => {
		return (
			<div className={inputWrapperStyles}>
				{label && <CustomLabel htmlFor={id} text={label} />}
				<input
					placeholder={placeholder}
					className={inputStyles}
					ref={ref}
					id={id}
					{...props}
				/>
			</div>
		);
	},
);

CustomInput.displayName = 'CustomInput';
