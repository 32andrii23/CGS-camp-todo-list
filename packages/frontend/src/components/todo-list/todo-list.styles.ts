import { css } from "@emotion/css";
import { colors } from "~shared/styles";
import { MARGINS, PADDINGS } from "~shared/styles/theme";

export const listStyles = css`
  list-style: none;
  padding: 0;
  margin: ${MARGINS.lg} 0;

  .todo-item {
    padding: ${PADDINGS.md};
    border: 1px solid ${colors.primaryBorder};
    border-radius: 8px;
    margin-bottom: ${MARGINS.md};
    background-color: white;
    transition: box-shadow 0.2s ease;

    &:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const lastElementStyles = css`
  margin-top: ${MARGINS.lg};
  height: 20px;
`;

