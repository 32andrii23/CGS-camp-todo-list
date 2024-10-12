import { css } from "@emotion/css";
import { FONT_SIZES } from "~shared/styles/theme";

export const homeStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 20px;

  .home-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .home-container > button {
    width: 100%;
  }

  .home-title {
    font-style: italic;
    font-size: ${FONT_SIZES.xxxl};
  }
`