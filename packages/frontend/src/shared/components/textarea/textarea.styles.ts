import { css } from "@emotion/css";

import { inputStyles } from "../input/input.styles";
import { MARGINS } from "~shared/styles/theme";

export const textareaStyles = css`
  ${inputStyles}
  resize: vertical;
  min-height: 100px;
`

export const inputWrapperStyles = css`
  margin-bottom: ${MARGINS.md};
`