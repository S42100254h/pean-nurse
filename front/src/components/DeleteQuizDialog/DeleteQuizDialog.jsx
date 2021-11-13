import React from "react";
import { makeStyles } from "@material-ui/core";
import { Dialog, DialogContent } from "@material-ui/core";
import { PrimaryButton, SecondaryButton } from "../../components/UIkit";

const useStyles = makeStyles({
  "heading": {
    fontSize: 24,
    textAlign: "center",
    paddingBottom: 4,
    borderBottom: "1.3px solid",
  },
  "image": {
    display: "block",
    margin: "auto",
  },
});

const DeleteQuizDialog = (props) => {
  const classes = useStyles();

  return (
    <>
      <Dialog
        open={props.open}
        onClose={(e) => props.onClose(e)}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogContent>
          <div>
            <h1 className={classes.heading}>クイズを削除する</h1>
            <div className="module-spacer--extra-small" />
            <h2>本当にクイズを削除してもよろしいですか？</h2>
            <div className="module-spacer--extra-extra-small" />
            <img src="cat.png" alt="ねこ" width="180px" height="180px" className={classes.image} />
          </div>
          <div className="module-spacer--extra-small" />
          <PrimaryButton
            label={"キャンセル"}
            fullWidth={true}
            onClick={props.onClickStop} 
          />
          <div className="module-spacer--extra-small" />
          <SecondaryButton
            label={"クイズを削除する"}
            fullWidth={true}
            onClick={props.onClickProceed}
          />
          <div className="module-spacer--extra-small" />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteQuizDialog;
