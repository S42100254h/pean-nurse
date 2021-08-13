import React from "react";
import { makeStyles } from "@material-ui/core";
import { ClickAwayListener } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    top: "70px",
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
  },
  input: {
    display: "none",
  },
}));

const ClickAway = (props) => {
  const classes = useStyles();


  return (

    <ClickAwayListener onClickAway={props.onClickAway}>
      <div className={classes.modal}>
        <div className={classes.popContainer}>
          <input type="file" accept="image/jpeg, image/png" className={classes.input} />
          <p className={classes.pop}>画像をアップロード</p>
        </div>
        <div className={classes.popContainer}>
          <p className={classes.pop}>デフォルト画像に設定</p>
        </div>
      </div>
    </ClickAwayListener>
  ); 
};

export default ClickAway;
