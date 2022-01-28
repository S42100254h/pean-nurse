import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { closeNotificationAction } from "../../reducks/notification/actions";
import {
  getNotificationIsOpen,
  getNotificationVariant,
  getNotificationMessage,
} from "../../reducks/notification/selectors";
import { NotificationSnackbar } from "./index";
import { RootState } from "../../types/entity/rootState";
import styled from "styled-components";

const StyledSnackbar = styled(Snackbar)`
  height: 80px;
  padding-top: 70px;
`;

const Notification = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const isOpen = getNotificationIsOpen(selector);
  const variant = getNotificationVariant(selector);
  const message = getNotificationMessage(selector);

  return (
    <StyledSnackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isOpen}
      autoHideDuration={3000}
      onClose={() => dispatch(closeNotificationAction())}
    >
      <NotificationSnackbar
        onClose={() => dispatch(closeNotificationAction())}
        variant={variant}
        message={message}
      />
    </StyledSnackbar>
  );
};

export default Notification;
