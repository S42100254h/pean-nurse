import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  AppsIcon,
  Email,
  ExitToAppIcon,
  PermIdentityIcon,
} from "@material-ui/icons/Apps";
import { makeStyles } from "@material-ui/styles";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { getSignedIn } from "../../reducks/users/selectors";

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      flexShrink: 0,
      width: 256,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 256,
  },
}));

const ClosableDrawer = (props) => {
  const classes = useStyles();
  const { container } = props;
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getSignedIn(selector);
  
  const selectMenu = (event, path) => {
    dispatch(push(path));
    props.onClose(event);
  };
  
  const handleSignOut = (event) => {
    dispatch(signOut());
    props.onClose(event);
  };
  
  const menus = [
    {
      func: selectMenu,
      label: "コース一覧",
      icon: <AppsIcon />,
      id: "courses",
      value: "/courses",
    },
    {
      func: selectMenu,
      label: "問い合わせ",
      icon: <Email />,
      id: "contact",
      value: "/contact",
    },
  ];
  
  return (
    <nav className={classes.drawer}>
      <Drawer
        container={container}
        variant="temporary"
        anchor="right"
        open={props.open}
        onClose={(e) => props.onClose(e)}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true }}
      >
        <div onClose={(e) => props.onClose(e)} onKeyDown={(e) => props.onClose(e)} />
        <div>
          <List>
            {menus.map((menu) => (
              <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))}
            {isSignedIn ? (
              <div>
                <ListItem button key="signout" onClick={(e) => handleSignOut(e)}>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary={"サインアウト"} />
                </ListItem>
              </div>
            ) : (
              <div>
                <ListItem button key="signin" onClick={(e) => handleSignIn(e)}>
                  <ListItemIcon>
                    <PermIdentityIcon />
                  </ListItemIcon>
                  <ListItemText primary={"サインイン"} />
                </ListItem>
              </div>
            )}
          </List>
        </div>
      </Drawer>
    </nav>
  );
};

export default ClosableDrawer;
