import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, MenuItem } from "@material-ui/core";
import { PrimaryButton, SelectBox } from "../../components/UIkit";

const ClosableDialog = (props) => {

  const menus = [
    {
      label: "- 選択してください -",
      value: "none",
    },
    {
      label: "コース内容について",
      value: "course",
    },
    {
      label: "お支払いについて",
      value: "payment",
    },
    {
      label: "エラー、トラブルについて",
      value: "error",
    },
    {
      label: "その他",
      value: "others",
    },
  ];

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={(e) => props.onClose(e)}
        ModalProps={{ keepMounted: true }}
      >
        <DialogContent>
          <DialogContentText>
            contact form
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <SelectBox
            value={"inquiry title"}
            displayEmpty={true}
          >
            {menus.map((menu) => (
              <MenuItem value={menu.value}>
                {menu.label}
              </MenuItem>
            ))}
          </SelectBox>
          <PrimaryButton
            id={"button"}
            label={"送信"}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ClosableDialog;
