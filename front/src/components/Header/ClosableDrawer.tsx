import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import AppsIcon from "@material-ui/icons/Apps";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import { HelpOutline } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { getSignedIn } from "../../reducks/user/selectors";
import { signOut } from "../../reducks/user/operations";
import { RootState } from "../../types/entity/rootState";

const useStyles = makeStyles(() => ({
  drawer: {
    flexShrink: 0,
    width: 256,
  },
  drawerPaper: {
    width: 256,
  },
}));

type Props = {
  open: boolean;
  onClose: () => void;
};

const ClosableDrawer = (props: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const isSignedIn = getSignedIn(selector);
  
  const selectMenu = (path: string) => {
    dispatch(push(path));
    props.onClose();
  };
  
  const handleSignOut = () => {
    dispatch(signOut());
    props.onClose();
  };
  
  const handleSignIn = () => {
    dispatch(push("/signin"));
    props.onClose();
  };

  const menus = [
    {
      func: selectMenu,
      label: "コース一覧",
      icon: <AppsIcon />,
      id: "courselist",
      value: "/courselist",
    },
    {
      func: selectMenu,
      label: "設定",
      icon: <SettingsIcon />,
      id: "setting",
      value: "/setting",
    },
    {
      func: selectMenu,
      label: "ヘルプ",
      icon: <HelpOutline />,
      id: "help",
      value: "/help",
    },
  ];
  
  return (
    <nav className={classes.drawer}>
      <Drawer
        variant="temporary"
        anchor="right"
        open={props.open}
        onClose={(e) => props.onClose()}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true }}
      >
        <div>
          <List>
            {menus.map((menu) => (
              <ListItem button key={menu.id} onClick={() => menu.func(menu.value)}>
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))}
            {isSignedIn ? (
              <div>
                <ListItem button key="signout" onClick={() => handleSignOut()}>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary={"サインアウト"} />
                </ListItem>
              </div>
            ) : (
              <div>
                <ListItem button key="signin" onClick={() => handleSignIn()}>
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
