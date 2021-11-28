import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { MailOutline } from "@material-ui/icons";
import { Box } from "@material-ui/core";
import { ClosableDialog } from "./index";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: "0",
    right: "10px",
    padding: "8px 20px",
    backgroundColor: "#F08080",
    borderRadius: "2px",
    cursor: "pointer",
    zIndex: 999,
  },
  icon: {
    float: "left",
  },
  main: {
    float: "right",
    color: "white",
    fontSize: "0.8rem",
    marginLeft: "8px",
  },
});

const Contact = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  
  const handleDialogToggle = useCallback((event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setOpen(!open);
  },
  [setOpen, open]
  );

  return (
    <>
      <Box
        className={classes.root}
        display="flex"
        alignItems="center"
        justifyContent="center"
        onClick={(event) => handleDialogToggle(event)}
      >
        <MailOutline fontSize="small" style={{ color: "white" }} />
        <p className={classes.main}>ご意見箱</p>
      </Box>
      <ClosableDialog open={open} onClose={handleDialogToggle} />
    </>
  );
};

export default Contact;
