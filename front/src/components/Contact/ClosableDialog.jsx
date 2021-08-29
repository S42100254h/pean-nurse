import React from "react";
import { makeStyles } from "@material-ui/core";
import { Dialog, DialogContent, DialogContentText, MenuItem } from "@material-ui/core";
import { PrimaryButton, SelectBox } from "../../components/UIkit";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "0 auto",
    textAlign: "center",
  },
}));

const ClosableDialog = (props) => {
  const classes = useStyles();

  const menus = [
    { label: "- 選択してください -", value: "none" },
    { label: "コース内容について", value: "course" },
    { label: "お支払いについて", value: "payment" },
    { label: "エラー、トラブルについて", value: "error" },
    { label: "その他", value: "others" },
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
        </DialogContent>
        <div className="module-spacer--extra-extra-small" />
        <DialogContent className={classes.button}>
          <PrimaryButton
            id={"button"}
            label={"送信"}
          />
        </DialogContent>
        <div className="module-spacer--extra-extra-small" />
      </Dialog>
    </div>
  );
};

export default ClosableDialog;
