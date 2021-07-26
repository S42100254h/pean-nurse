import React, { useCallback, useState} from "react";
import { useDispatch } from "react-redux";
import { AppBar, Box, IconButton, MenuIcon, rgbToHex, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { push } from "connected-react-router";
import logo from "../../assets/img/icons/logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 9999,
  },
  menuBar: {
    backgroundColor: "#ffffff",
    height: "60px",
  },
  headerLogo: {
    maxHeight: "50px",
    cursor: "pointer",
    "&:hover": {
      opacity: 0.7,
    },
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
          <img src={logo} alt="logo" className={classes.headerLogo} onClick={() => dispatch(push("/"))} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
