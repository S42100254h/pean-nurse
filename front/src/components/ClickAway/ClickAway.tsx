import React from "react";
import { makeStyles } from "@material-ui/core";
import { ClickAwayListener } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "fixed",
    top: "30vh",
    left: "55vw",
    width: "230px",
    height: "100px",
    textAlign: "left",
    marginLeft: "20px",
    borderRadius: "3px",
    boxShadow: "0 0 4px grey",
    backgroundColor: "#fff",
    zIndex: 999,
  },
  popContainer: {
    height: "50%",
    width: "100%",
    boxSizing: "border-box",
    "&:hover": {
      backgroundColor: theme.palette.basic.light,
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
    zIndex: 20000,
  },
}));

type Props = {
  onClickAway: (event: React.MouseEvent<Document>) => void;
  onChange: Function;
  onClick: Function;
};

const ClickAway = (props: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.clickAwayContainer}>
      <ClickAwayListener onClickAway={props.onClickAway}>
        <div className={classes.modal}>
          <div className={classes.popContainer}>
            <label className={classes.pop}>
              画像をアップロード
              <input type="file" accept="image/jpeg, image/png" className={classes.input} onChange={(e) => props.onChange(e)} />
            </label>
          </div>
          <div className={classes.popContainer}>
            <p className={classes.pop} onClick={() => props.onClick()}>デフォルト画像に設定</p>
          </div>
        </div>
      </ClickAwayListener>
    </div>
  ); 
};

export default ClickAway;
