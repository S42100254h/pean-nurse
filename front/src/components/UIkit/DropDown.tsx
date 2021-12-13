import React from "react";
import { useDispatch } from "react-redux";
import { ListItemText, Menu, MenuItem } from "@material-ui/core";
import { push } from "connected-react-router";

type Props = {
  onClose: () => void;
  anchorEl: Element | null;
  open: boolean;
  menus: Menu[];
};

type Menu = {
  id: string;
  value: string;
  label: string;
}

const DropDown = (props: Props) => {
  const dispatch = useDispatch();
  
  const selectMenu = (path: string) => {
    dispatch(push(path));
    props.onClose();
  };
  
  return (
    <div>
      <Menu
        anchorEl={props.anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        open={props.open}
        onClose={props.onClose}
      >
        {props.menus.map((menu) => (
          <MenuItem key={menu.id} onClick={() => selectMenu(menu.value)}>
            <ListItemText primary={menu.label} />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DropDown;
