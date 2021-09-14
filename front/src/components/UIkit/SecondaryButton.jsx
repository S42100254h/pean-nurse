import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

const useStyeles = makeStyles({
  "button": {
    backgroundColor: "#f6f8fa",
    color: "#cf222e",
    "&:hover": {
      color: "#f6f8fa",
      backgroundColor: "#a40e26"
    },
  },
});

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
