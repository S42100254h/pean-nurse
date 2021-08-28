import React from "react";
import { makeStyles } from "@material-ui/core";
import { MailOutline } from "@material-ui/icons";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: "0",
    right: "10px",
    padding: "8px 20px",
    backgroundColor: "#F08080",
    borderRadius: "2px",
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
}));

const Contact = () => {
  const classes = useStyles();

  return (
    <Box
      className={classes.root}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <MailOutline fontSize="small" style={{ color: "white" }} />      
      <p className={classes.main}>ご意見箱</p>
    </Box>
  );
};

export default Contact;
