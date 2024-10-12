import { css } from "@emotion/css";

import { colors } from "~shared/styles";
import { PADDINGS, SHADOWS } from "~shared/styles/theme";

export const navbarStyles = css`
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${PADDINGS.lg} ${PADDINGS.xl};
    border-bottom: 1px solid ${colors.primaryBorder};
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
    z-index: 1000;
    box-shadow: ${SHADOWS.primary};
  }

  .navbar-profile-picture {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: ${colors.primaryBg};
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 24px;
    font-weight: bold;
  }

  a {
    text-decoration: none;
    color: ${colors.primaryText};
    outline: none;
  }
`