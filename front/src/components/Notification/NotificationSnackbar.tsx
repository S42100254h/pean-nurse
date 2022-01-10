import React from "react";
import IconButton from "@material-ui/core/IconButton";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import styled from "styled-components";

const Message = styled.span`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  font-weight: bold;
`;

const StyledSnackbarContent = styled(SnackbarContent)<{ state: "success" | "error"}>`
  background-color: ${props => props.state == "success" ? "#43A047" : "#D32F2F" };
  padding: 0 8px 0 8px;
`;

const StyledCheckCircleIcon = styled(CheckCircleIcon)`
  font-size: 1rem;
  margin-right: 3px;
`;

const StyledErrorIcon = styled(ErrorIcon)`
  font-size: 1rem;
  margin-right: 3px;
`;

type Props = {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  variant: "success" | "error";
  message: string | undefined;
};

const NotificationSnackbar = (props: Props) => {
  return (
    <StyledSnackbarContent state={props.variant}
      aria-describedby="client-snackbar"
      message={
        <Message>
          {props.variant == "success" ? <StyledCheckCircleIcon /> : <StyledErrorIcon />}
          {props.message}
        </Message>
      }
      action={[
        <IconButton key="close" aria-label="Close" color="inherit" onClick={props.onClose}>
          <CloseIcon />
        </IconButton>
      ]}
    />
  );
};

export default NotificationSnackbar;
