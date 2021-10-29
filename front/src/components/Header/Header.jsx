import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Box, IconButton, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { push } from "connected-react-router";
import logo from "../../assets/img/icons/logo.png";
import { ClosableDrawer } from "./index";
import { SignInDialog } from "../SignInDialog";
import { SignUpDialog } from "../SignUpDialog";
import { getSignedIn } from "../../reducks/users/selectors";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    zIndex: 9999,
  },
  menuBar: {
    backgroundColor: "#fff",
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
    width: "100%",
  },
  iconButtons: {
    margin: "0 0 0 auto",
  },
  headerItem: {
    color: "#696969",
    cursor: "pointer",
    fontSize: "14px",
    margin: "0 0 0 15px",
    lineHeight: "60px",
    height: "100%",
    float: "left",
    "&:hover": {
      borderBottom: "5px solid #55AFD6",
      transition: "0.075s",
    },
  },
  leftToolbar: {
    height: "98%",
    marginRight: "auto",
  },
  rightToolbar: {
    height: "98%",
    marginLeft: "auto",
  },
});

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getSignedIn(selector);

  const [open, setOpen] = useState(false),
    [isSignInOpen, setIsSignInOpen] = useState(false),
    [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const handleDrawerToggle = () => setOpen(!open);
  const handleSignInDialogToggle = () => setIsSignInOpen(!isSignInOpen);
  const handleSignUpDialogToggle = () => setIsSignUpOpen(!isSignUpOpen);

  return (
    <Box className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        {isSignedIn ? (
          <Toolbar className={classes.toolBar}>
            <img src={logo} alt="logo" className={classes.headerLogo} onClick={() => dispatch(push("dashboard"))} />
            <div className={classes.leftToolbar}>
              <p className={classes.headerItem} onClick={() => dispatch(push("/dashboard"))}>ダッシュボード</p>
              <p className={classes.headerItem} onClick={() => dispatch(push("/courselist"))}>コース一覧</p>
              <p className={classes.headerItem} onClick={() => dispatch(push("/help"))}>ヘルプ</p>
            </div>
            <Box className={classes.iconButtons}>
              <IconButton style={{ padding: "8px" }} onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        ) : (
          <Toolbar className={classes.toolBar}>
            <img src={logo} alt="logo" className={classes.headerLogo} onClick={() => dispatch(push("/"))} />
            <div className={classes.rightToolbar}>
              <p className={classes.headerItem} onClick={handleSignInDialogToggle}>サインイン</p>
              <p className={classes.headerItem} onClick={handleSignUpDialogToggle}>無料会員登録</p>
            </div>
          </Toolbar>
        )}
      </AppBar>
      <ClosableDrawer open={open} onClose={handleDrawerToggle} />
      <SignInDialog open={isSignInOpen} onClose={handleSignInDialogToggle} onClick={handleSignInDialogToggle} />
      <SignUpDialog open={isSignUpOpen} onClose={handleSignUpDialogToggle} onClick={handleSignUpDialogToggle} />
    </Box>
  );
};

export default Header;
