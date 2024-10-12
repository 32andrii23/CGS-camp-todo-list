import { css } from '@emotion/css';

import { colors } from '../../styles';
import { FONT_SIZES, PADDINGS } from '~shared/styles/theme';

export const btnStyles = (disabled: boolean): string => {
	return css`
		padding: ${PADDINGS.xs} ${PADDINGS.sm};
		font-size: ${FONT_SIZES.sm};
		color: ${colors.primaryText};
		border-radius: 12px;
		border: 1px solid ${colors.primaryBorder};
		text-align: center;
		&:hover {
			background-color: ${colors.secondaryHover};
		}
		transition: all 0.2s ease-in-out;
		opacity: ${disabled ? 0.9 : 1};
		cursor: ${!disabled ? 'pointer' : 'default'};
		&:focus-visible {
			box-shadow: 0 0 0 2px ${colors.primaryBg};
		}
	`;
};

export const btnContentWrapper = css`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 5px;
`;

export const iconWrapper = css`
	display: flex;
	align-items: center;
`;
