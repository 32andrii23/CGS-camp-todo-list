import { css } from "@emotion/css";

import { colors } from "~shared/styles";
import { FONT_SIZES, MARGINS } from "~shared/styles/theme";

export const todoPageStyles = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: ${MARGINS.navbar};  

  h1 {
    font-size: ${FONT_SIZES.xxxl};
  }

  .description {
    color: ${colors.secondaryText};
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
  }

  .status {
    font-size: ${FONT_SIZES.md};
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .status-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }

  .actions > button {
    flex: 1;
  }
`