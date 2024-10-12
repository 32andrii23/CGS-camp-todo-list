import React, { forwardRef } from 'react';

import { CustomLabel } from '../label/label.component';
import { textareaStyles } from './textarea.styles';
import { inputWrapperStyles } from '../input/input.styles';

interface TextAreaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
}

export const CustomTextarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	({ label, id, ...props }, ref) => {
		return (
			<div className={inputWrapperStyles}>
				{label && <CustomLabel htmlFor={id} text={label} />}
				<textarea
					className={textareaStyles}
					ref={ref}
					id={id}
					{...props}
				/>
			</div>
		);
	},
);

CustomTextarea.displayName = 'CustomTextarea';
