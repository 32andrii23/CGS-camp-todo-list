import { css } from "@emotion/css";

import { colors } from "~shared/styles";
import { FONT_SIZES, MARGINS, PADDINGS, SHADOWS } from "~shared/styles/theme";

export const forgotPasswordStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .forgot-password-container {
    border-radius: 8px;
    border: 1px solid ${colors.primaryBorder};
    padding: ${PADDINGS.xl};
    box-shadow: ${SHADOWS.primary};
  }

  h1 {
    margin-bottom: ${MARGINS.lg};
  }

  .forgot-password-link {
    margin-top: ${MARGINS.md};
    display: flex;
    gap: 6px;

    a {
      font-weight: bold;
      color: ${colors.primaryText};
      text-decoration: underline;
    }
  }

  .forgot-password-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: ${colors.primaryBg};
    color: white;
    font-size: ${FONT_SIZES.xxl};
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  .forgot-password-overlay.active {
    opacity: 1;
  }

`;  