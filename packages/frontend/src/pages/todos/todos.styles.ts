import { css } from "@emotion/css";

import { FONT_SIZES, MARGINS } from "~shared/styles/theme";

export const todosStyles = css`
  margin-top: ${MARGINS.navbar};
  
  .action-btn {
    margin: ${MARGINS.md} 0;

    button {
      width: 100%;
    }
  }

  h1 {
    font-size: ${FONT_SIZES.xxxl};
  }
`