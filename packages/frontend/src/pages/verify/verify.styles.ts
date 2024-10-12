import { css } from "@emotion/css";

import { colors } from "~shared/styles";
import { FONT_SIZES, PADDINGS } from "~shared/styles/theme";

export const verifyStyles = css`
  .verify-container {
    padding: ${PADDINGS.lg};
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 6px;
    font-size: ${FONT_SIZES.xl};
    font-weight: 500;
  }

  .verify-container > a {
    color: ${colors.primaryText};
    text-decoration: underline;
    outline: none;
  }
`