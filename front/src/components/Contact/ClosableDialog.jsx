import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText } from "@material-ui/core";
import { PrimaryButton } from "../../components/UIkit";

const ClosableDialog = (props) => {
  return (
    <div>
      <Dialog>
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
