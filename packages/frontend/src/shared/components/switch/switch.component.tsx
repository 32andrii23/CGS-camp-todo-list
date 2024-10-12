import React from 'react';

import {
	srOnlyStyle,
	switchContainerStyle,
	switchStyles,
	switchThumbStyle,
} from './switch.styles';
import { CustomLabel } from '../label/label.component';

interface SwitchProps {
	label?: string;
	onChange?: (checked: boolean) => void;
	initialChecked?: boolean;
}

const Switch = ({ label, onChange, initialChecked = false }: SwitchProps) => {
	const [checked, setChecked] = React.useState(initialChecked);

	const toggleSwitch = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const newChecked = !checked;
		setChecked(newChecked);
		if (onChange) {
			onChange(newChecked);
		}
	};

	return (
		<div className={switchStyles}>
			{label && <CustomLabel text={label} htmlFor={label} />}
			<button
				className={switchContainerStyle(checked)}
				onClick={toggleSwitch}
				aria-checked={checked}
				role="switch"
			>
				<span className={switchThumbStyle(checked)} />
			</button>
			<span className={srOnlyStyle}>{label}</span>
		</div>
	);
};

export default Switch;
