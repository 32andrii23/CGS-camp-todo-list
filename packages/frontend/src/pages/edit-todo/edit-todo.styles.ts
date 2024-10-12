import { css } from "@emotion/css";

import { MARGINS } from "~shared/styles/theme";

export const editTodoPageStyles = css`
  margin-top: ${MARGINS.navbar};

  form {
    margin-top: ${MARGINS.sm};
  }

  .action-btn {
    margin-top: ${MARGINS.sm};
  }

  .action-btn button {
    width: 100%;
  }

  .switch {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
`