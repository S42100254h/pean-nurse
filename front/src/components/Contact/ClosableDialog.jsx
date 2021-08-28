import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText } from "@material-ui/core";
import { PrimaryButton } from "../../components/UIkit";

const ClosableDialog = (props) => {
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
