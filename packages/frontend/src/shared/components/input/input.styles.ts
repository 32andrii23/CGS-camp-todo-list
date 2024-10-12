import { css } from "@emotion/css"

import { colors } from "~shared/styles"
import { FONT_SIZES, MARGINS, PADDINGS } from "~shared/styles/theme"

export const inputStyles = css`
  width: 100%;
  padding: ${PADDINGS.sm} ${PADDINGS.md};
  border: 1px solid ${colors.primaryBorder};
  border-radius: 0.375rem;
  font-size: ${FONT_SIZES.md};
  line-height: 1.5;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${colors.primaryBg};
    box-shadow: 0 0 0 3px ${colors.primaryBg}50;
  }
`

export const inputWrapperStyles = css`
  margin-bottom: ${MARGINS.md};
`