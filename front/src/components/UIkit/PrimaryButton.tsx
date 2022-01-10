import React from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

const StyledButton = styled(Button)`
  background-color: ${props => props.theme.palette.primary.main};
  color: #fff;
  font-size: 16px;
  height: 48px;
  &:hover {
    background-color: ${props => props.theme.palette.primary.dark};
    transition-duration: 0.5s;
  };
`;

type Props = {
  id?: string;
  rowId? : string | number;
  fullWidth?: boolean;
  disabled?: boolean;
  label: string;
  onClick: Function;
};

const PrimaryButton = (props: Props) => {
  return (
    <StyledButton
      variant="contained"
      fullWidth={props.fullWidth}
      disabled={props.disabled}
      onClick={() => props.onClick()}
    >
      {props.label}
    </StyledButton>
  );
};

export default PrimaryButton;
