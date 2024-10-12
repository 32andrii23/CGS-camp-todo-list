import { css } from "@emotion/css";

import { colors } from "~shared/styles";
import { FONT_SIZES, MARGINS } from "~shared/styles/theme";

export const labelStyles = css`
  display: block;
  margin-bottom: ${MARGINS.sm};
  font-size: ${FONT_SIZES.sm};
  font-weight: 500;
  color: ${colors.secondaryText};
`