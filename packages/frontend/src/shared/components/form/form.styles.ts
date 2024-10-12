import { css } from "@emotion/css";

import { FONT_SIZES, MARGINS } from "~shared/styles/theme";

export const customFormStyles = css`
  display: flex;
  flex-direction: column;

  .form-button {
    margin-top: ${MARGINS.sm};
  }
    
  .error {
    color: red;
    font-size: ${FONT_SIZES.sm};
    font-style: italic;
    text-align: right;
  }
`;
