import React from "react";
import IconButton from "@material-ui/core/IconButton";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import { makeStyles } from "@material-ui/styles";

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
};

const useStyles = makeStyles(() => ({
  success: {
    backgroundColor: "#43A047",
    padding: "0 8px 0 8px",
  },
  error: {
    backgroundColor: "#D32F2F",
    padding: "0 8px 0 8px",
  },
  icon: {
    fontSize: "1rem",
    fontWeight: "bold",
    opacity: 0.9,
    marginRight: 1,
  },
  closeIcon: {
    opacity: 0.9,
    marginRight: 1,
  },
  message: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.8rem",
    fontWeight: "bold",
  },
}));

const NotificationSnackbar = (props) => {
  const classes = useStyles();
  const Icon = variantIcon[props.variant];

  return (
    <SnackbarContent
      className={classes[props.variant]}
      aria-describedby="client-snackbar"
      message={
        <span className={classes.message}>
          <Icon className={classes.icon} />
          {props.message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="Close" color="inherit" onClick={props.onClose}>
          <CloseIcon className={classes.closeIcon} />
        </IconButton>
      ]}
    />
  );
};

export default NotificationSnackbar;
