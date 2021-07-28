import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { closeNotificationAction } from "../../reducks/notification/actions";
import { getNotificationIsOpen, getNotificationVariant, getNotificationMessage } from "../../reducks/notification/selectors";
import { NotificationSnackbar } from "./index";

const useStyles = makeStyles({
  Snackbar: {
    height: 80,
    paddingTop: 70,
  },
});

const Notification = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isOpen = getNotificationIsOpen(selector);
  const variant = getNotificationVariant(selector);
  const message = getNotificationMessage(selector);
  
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isOpen}
      autoHideDuration={3000}
      onClose={() => dispatch(closeNotificationAction())}
      className={classes.Snackbar}
    >
      <NotificationSnackbar onClose={() => dispatch(closeNotificationAction())} variant={variant} message={message} />
    </Snackbar>
  );
};

export default Notification;
