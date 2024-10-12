import { css } from "@emotion/css";
import { colors } from "~shared/styles";
import { FONT_SIZES, MARGINS, PADDINGS } from "~shared/styles/theme";

export const tabsContainerStyle = css`
  display: flex;
  justify-content: space-around;
  padding: ${PADDINGS.sm};
  background-color: ${colors.secondaryBg};
  border-radius: 8px;
  margin-bottom: ${MARGINS.md};
`;

export const tabButtonStyle = css`
  padding: ${PADDINGS.xs} ${PADDINGS.sm};
  border: none;
  background: none;
  font-size: ${FONT_SIZES.md};
  cursor: pointer;
  color: ${colors.secondaryText};
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.primaryText};
  }
`;

export const activeTabStyle = css`
  font-weight: 600;
  color: ${colors.primaryText};
  border-bottom: 2px solid ${colors.primaryText};
`;

export const searchContainerStyle = css`
  display: flex;
  align-items: flex-start;

  .search-input {
    flex: 1;
  }
`;