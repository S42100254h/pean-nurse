import React from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

const StyledButton = styled(Button)`
  background-color: ${props => props.theme.palette.basic.light};
  color: ${props => props.theme.palette.secondary.dark};
  font-size: 16px;
  height: 48px;
  &:hover {
    color: ${props => props.theme.palette.basic.light};
    background-color: ${props => props.theme.palette.secondary.dark};
    transition-duration: 0.5s;
  };
`;

type Props = {
  fullWidth?: boolean;
  disabled?: boolean;
  rowId?: string | number;
  label: string;
  onClick: Function;
};

const SecondaryButton = (props: Props) => {
  return (
    <StyledButton
      variant="outlined"
      fullWidth={props.fullWidth}
      disabled={props.disabled}
      onClick={() => props.onClick()}
    >
      {props.label}
    </StyledButton>
  );
};

export default SecondaryButton;
