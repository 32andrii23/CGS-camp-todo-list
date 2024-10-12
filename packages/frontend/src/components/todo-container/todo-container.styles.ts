import { css } from "@emotion/css";
import { colors } from "~shared/styles";
import { FONT_SIZES, MARGINS } from "~shared/styles/theme";

export const containerStyles = css`
  margin-top: ${MARGINS.lg};

  h1 {
    font-size: ${FONT_SIZES.lg};
    color: ${colors.secondaryText};
  }
`