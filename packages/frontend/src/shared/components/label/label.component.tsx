import React from 'react';

import { labelStyles } from './label.styles';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
	text: string;
}

export const CustomLabel: React.FC<LabelProps> = ({ text, ...props }) => {
	return (
		<label className={labelStyles} {...props}>
			{text}
		</label>
	);
};
