import { css } from "@emotion/css";

import { colors } from "~shared/styles";
import { FONT_SIZES } from "~shared/styles/theme";

export const withAuthStyles = css`
  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  .error-container > a {
    color: ${colors.primaryText}; 
    text-decoration: underline;
    font-size: ${FONT_SIZES.lg};
    font-weight: 500;
  }
`