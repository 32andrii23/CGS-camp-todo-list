import React from 'react';
import ReactDOM from 'react-dom';

import {
	closeButtonStyles,
	modalContentStyles,
	modalOverlayStyles,
} from './modal.styles';
import Button from '../button/button.component';
import { X } from 'lucide-react';

const CustomModal = ({ isVisible, onClose, children }) => {
	if (!isVisible) return null;

	return ReactDOM.createPortal(
		<div className={modalOverlayStyles}>
			<div className={modalContentStyles}>
				<Button
					onClick={onClose}
					text=""
					icon={<X />}
					extraButtonStyles={closeButtonStyles}
				/>
				{children}
			</div>
		</div>,
		document.getElementById('modal-root'),
	);
};

export default CustomModal;
