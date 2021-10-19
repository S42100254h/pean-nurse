import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

const useStyeles = makeStyles((theme) => ({
  "button": {
    backgroundColor: theme.palette.basic.light,
    color: theme.palette.secondary.dark,
    fontSize: 16,
    height: 48,
    "&:hover": {
      color: theme.palette.basic.light,
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}));

const SecondaryButton = (props) => {
  const classes = useStyeles();

  return (
    <Button
      className={classes.button}
      variant="outlined"
      fullWidth={props.fullWidth}
      disabled={props.disabled}
      onClick={() => props.onClick()}
    >
      {props.label}
    </Button>
  );
};

export default SecondaryButton;
