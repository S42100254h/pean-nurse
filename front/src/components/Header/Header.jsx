import React, { useCallback, useState} from "react";
import { useDispatch } from "react-redux";
import { AppBar, Box, IconButton, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { push } from "connected-react-router";
import logo from "../../assets/img/icons/logo.png";
import { ClosableDrawer } from "./index";

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
    height: "90%",
    textAlign: "center",
    "&:hover": {
      borderBottom: "5px solid #F6ADC6",
      transition: "0.05s",
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleDrawerToggle = useCallback((event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setOpen(!open);
  },
  [setOpen, open]
  );

  return (
    <Box className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolBar}>
          <img src={logo} alt="logo" className={classes.headerLogo} onClick={() => dispatch(push("dashboard"))} />
          <p className={classes.headerItem} onClick={() => dispatch(push("dashboard"))}>ダッシュボード</p>
          <p className={classes.headerItem} onClick={() => dispatch(push("courses"))}>コース一覧</p>
          <p className={classes.headerItem} onClick={() => dispatch(push("contact"))}>ヘルプ</p>

          <Box className={classes.iconButtons}>
            <IconButton style={{ padding: "8px" }} onClick={(event) => handleDrawerToggle(event)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <ClosableDrawer open={open} onClose={handleDrawerToggle} />
    </Box>
  );
};

export default Header;
