import { css } from "@emotion/css";
import { colors } from "~shared/styles";
import { FONT_SIZES, MARGINS } from "~shared/styles/theme";

export const profileStyles = css`
  margin-top: ${MARGINS.navbar};
  display: flex;
  flex-direction: column;
  
  .profile-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
    margin-bottom: ${MARGINS.lg};
  }

  .profile-header h1 {
    font-size: ${FONT_SIZES.xl};
  }

  .profile-picture {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: ${colors.primaryBg};
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .profile-picture-letter {
    font-size: ${FONT_SIZES.profilePicture};
    font-weight: bold;
    color: white;
  }

  .profile-info {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .profile-actions {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
`;