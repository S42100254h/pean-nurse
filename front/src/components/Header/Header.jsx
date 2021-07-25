import React, { useCallback, useState} from "react";
import { useDispatch } from "react-redux";
import { AppBar, Box, IconButton, MenuIcon, rgbToHex, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { push } from "connected-react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 9999,
  },
  menuBar: {
    backgroundColor: "#ffffff",
    height: "60px",
  },
  toolBar: {
    margin: "0 auto",
    width: "100%",
  },
  IconButtons: {
    margin: "0 0 0 auto",
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Box className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolBar}>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
