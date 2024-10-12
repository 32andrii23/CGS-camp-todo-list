import { css } from "@emotion/css"

import { colors } from "~shared/styles"

export const switchStyles = css`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`

export const switchContainerStyle = (checked: boolean) => css`
  position: relative;
  width: 42px;
  height: 25px;
  background-color: ${checked ? colors.primaryBg : colors.secondaryBg};
  border-radius: 9999px;
  transition: background-color 0.2s;
  cursor: pointer;
  border: none;
  padding: 0;
  &:focus-visible {
    box-shadow: 0 0 0 2px ${colors.primaryBg};
  }
`

export const switchThumbStyle = (checked: boolean) => css`
  display: block;
  width: 21px;
  height: 21px;
  background-color: white;
  border-radius: 9999px;
  transition: transform 0.2s;
  transform: translateX(${checked ? '19px' : '2px'});
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`

export const srOnlyStyle = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`