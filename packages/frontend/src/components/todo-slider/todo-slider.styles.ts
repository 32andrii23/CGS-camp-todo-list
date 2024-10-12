import { css } from "@emotion/css";

import { colors } from "~shared/styles";
import { MARGINS, PADDINGS } from "~shared/styles/theme";

export const sliderStyles = css`
  border: 1px solid ${colors.primaryBorder};
  border-radius: 8px;
  padding: ${PADDINGS.md};
  max-width: 700px;
  margin: ${MARGINS.lg} auto;

  .todo-content {
    margin: 0 auto;
    width: 70%;
  }

  .nav-button {
    background: transparent;
    border: none;
    font-size: 24px;
    color: ${colors.primaryText};
    cursor: pointer;

    &:disabled {
      color: ${colors.disabledBtnColor};
      opacity: 0.35;
      cursor: not-allowed;
    }
  }

  .title-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .title {
    font-weight: bold;
    color: ${colors.primaryText};
    flex-grow: 1;
  }

  .description {
    margin: ${MARGINS.sm} 0;
    color: ${colors.secondaryText};
    word-wrap: break-word;
  }

  .swiper-button-prev {
    color: ${colors.primaryText};
  }

  .swiper-button-next {
    color: ${colors.primaryText};
  }
`;

