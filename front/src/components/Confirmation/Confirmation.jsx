import React from "react";
import { makeStyles } from "@material-ui/core";
import { Dialog, DialogContent } from "@material-ui/core";
import { PrimaryButton } from "../../components/UIkit";
import classNames from "classnames";

const useStyles = makeStyles({
  "heading": {
    color: "f6f8fa",
  },
  "button": {
    color: "f6f8fa",
    backgroundColor: "#a40e26",
  },
});

const Confirmation = () => {
  return (
    <>
      <Dialog
        open={props.open}
        onClose={(e) => props.onClose(e)}
        ModalProps={{ keepMounted: true }}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogContent>
          <div>
            <h2 className={classNames.heading}>退会手続きの前にご確認ください</h2>
            <p>アカウントを削除すると、これまでのデータがすべて削除されます</p>
          </div>
          <PrimaryButton
            label={"退会をやめる"}
          />
          <PrimaryButton
            className={classes.button}
            label={"退会手続きを進める"}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Confirmation;
