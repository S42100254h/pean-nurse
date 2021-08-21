import React from "react";
import { makeStyles } from "@material-ui/core";
import { ClickAwayListener } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    top: "220px",
    left: "1020px",
    width: "230px",
    height: "100px",
    border: "2px solid #fff",
    textAlign: "left",
    marginLeft: "20px",
    borderRadius: "3px",
    backgroundColor: "#fff",
    zIndex: "999",
  },
  popContainer: {
    height: "50%",
    width: "100%",
    boxSizing: "border-box",
    "&:hover": {
      backgroundColor: "#f8f8ff",
    },
  },
  pop: {
    height: "100%",
    display: "inline-block",
    padding: "10px 20px",
    cursor: "pointer",
  },
  input: {
    display: "none",
  },
  clickAwayContainer: {
    position: "fixed",
    inset: "0",
    zIndex: "20000",
  },
}));

const ClickAway = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.clickAwayContainer}>
      <ClickAwayListener onClickAway={props.onClickAway}>
        <div className={classes.modal}>
          <div className={classes.popContainer}>
            <label className={classes.pop}>
              画像をアップロード
              <input type="file" accept="image/jpeg, image/png" className={classes.input} />
            </label>
          </div>
          <div className={classes.popContainer}>
            <p className={classes.pop}>デフォルト画像に設定</p>
          </div>
        </div>
      </ClickAwayListener>
    </div>
  ); 
};

export default ClickAway;
