import { css } from "@emotion/css";

import { colors } from "~shared/styles";
import { MARGINS, PADDINGS } from "~shared/styles/theme";

export const tableStyles = css`
  width: 100%;
  border-collapse: collapse;
  margin-top: ${MARGINS.lg};

  thead,
  tbody > tr:not(:last-child) {
    border-bottom: 1px solid ${colors.primaryBorder};
  }

  th, td {
    padding: ${PADDINGS.md};
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  th {
    letter-spacing: 0.05em;
  }

  td {
    font-weight: 400;
    color: ${colors.primaryText};
  }

  td:nth-child(2) {
    max-width: 500px;
  }

  td.title {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  tr:hover {
    background-color: ${colors.primaryHover};
  }

  tr {
    transition: background-color 0.2s ease;
  }

  td:last-child, th:last-child {
    text-align: center;
  }
`

