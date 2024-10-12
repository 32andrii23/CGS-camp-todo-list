import { css, keyframes } from "@emotion/css";

import { FONT_SIZES } from "~shared/styles/theme";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

export const loaderStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  font-size: ${FONT_SIZES.xxl};
  font-weight: 500;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  & > *:first-child {
    animation: ${spin} 0.75s linear infinite;
  }

`