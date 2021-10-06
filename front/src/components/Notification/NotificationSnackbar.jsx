import React from "react";
import IconButton from "@material-ui/core/IconButton";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
};

const useStyles = makeStyles((theme) => ({
  SnackbarContent: {
    padding: "0 8px 0 8px",
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: red[700],
  },
  icon: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  iconVariant: {
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
      className={classNames(classes[props.variant], classes.SnackbarContent)}
      aria-describedby="client-snackbar"
      message={
        <span className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {props.message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="Close" color="inherit" onClick={props.onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
    />
  );
};

export default NotificationSnackbar;
