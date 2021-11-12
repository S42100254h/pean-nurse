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
import { DropDown } from "../UIkit";
import { getSignedIn } from "../../reducks/users/selectors";
import { getAdminSignedIn } from "../../reducks/admins/selectors";
import { adminSignOut } from "../../reducks/admins/operations";

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
  const isAdminSignedIn = getAdminSignedIn(selector);

  const [open, setOpen] = useState(false),
    [isSignInOpen, setIsSignInOpen] = useState(false),
    [isSignUpOpen, setIsSignUpOpen] = useState(false),
    [anchorEl, setAnchorEl] = useState(null),
    [menus, setMenus] = useState([]);
  
  const dropDownOpen = Boolean(anchorEl);
  
  const userMenu = [
    {
      label: "ユーザー一覧",
      id: "userlist",
      value: "/user/list",
    },
    {
      label: "ユーザー詳細",
      id: "userdetail",
      value: "/user/detail",
    },
  ];
  
  const quizMenu = [
    {
      label: "クイズ一覧",
      id: "quizlist",
      value: "/quiz/list"
    },
    {
      label: "クイズ作成",
      id: "createquiz",
      value: "/quiz/create",
    },
  ];

  const handleClick = (event, menus) => {
    setAnchorEl(event.currentTarget);
    setMenus(menus);
  };

  const handleClose = () => setAnchorEl(null);

  const handleDrawerToggle = () => setOpen(!open);
  const handleSignInDialogToggle = () => setIsSignInOpen(!isSignInOpen);
  const handleSignUpDialogToggle = () => setIsSignUpOpen(!isSignUpOpen);

  return (
    <Box className={classes.root}>
      {isAdminSignedIn ? (
        <Box>
          <AppBar position="fixed" className={classes.menuBar}>
            <Toolbar className={classes.toolBar}>
              <img src={logo} alt="logo" className={classes.headerLogo} onClick={() => dispatch(push("/management"))} />
              <div className={classes.leftToolbar}>
                <div className={classes.headerItem} onClick={() => dispatch(push("/management"))}>ホーム</div>
                <div className={classes.headerItem} onClick={(event) => handleClick(event, userMenu)}>ユーザー管理</div>
                <div className={classes.headerItem} onClick={(event) => handleClick(event, quizMenu)}>クイズ管理</div>
              </div>
              <div className={classes.rightToolbar}>
                <div className={classes.headerItem} onClick={() => dispatch(adminSignOut())}>サインアウト</div>
              </div>
            </Toolbar>
            <DropDown
              anchorEl={anchorEl}
              open={dropDownOpen}
              onClose={handleClose}
              menus={menus}
            />
          </AppBar>
        </Box>
      ) : (
        <Box>
          <AppBar position="fixed" className={classes.menuBar}>
            {isSignedIn ? (
              <Toolbar className={classes.toolBar}>
                <img src={logo} alt="logo" className={classes.headerLogo} onClick={() => dispatch(push("/dashboard"))} />
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
      )}
    </Box>
  );
};

export default Header;
