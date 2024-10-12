import { css } from "@emotion/css";
import { colors } from "~shared/styles";
import { MARGINS, PADDINGS } from "~shared/styles/theme";

export const paginationContainerStyle = css`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: ${MARGINS.lg} 0;
`;

export const buttonStyle = css`
	padding: ${PADDINGS.sm} ${PADDINGS.md};
	margin: 0 ${MARGINS.xs};
	border: none;
	border-radius: 5px;
	background-color: ${colors.primaryBg};
	color: white;
	cursor: pointer;
	transition: all 0.3s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

export const activeButtonStyle = css`
	background-color: white;
  border: 1px solid ${colors.primaryBorder};
  color: ${colors.primaryText};
  text-decoration: underline;
`;
