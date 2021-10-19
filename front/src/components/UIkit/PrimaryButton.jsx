import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  "button": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    fontSize: 16,
    height: 48,
  },
}));

const PrimaryButton = (props) => {
  const classes = useStyles();
  
  return (
    <Button
      className={classes.button}
      variant="contained"
      fullWidth={props.fullWidth}
      disabled={props.disabled}
      onClick={() => props.onClick()}
    >
      {props.label}
    </Button>
  );
};

export default PrimaryButton;
