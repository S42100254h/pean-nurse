import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { Dialog, DialogContent } from "@material-ui/core";
import { PrimaryButton } from "../UIkit";
import { createQuiz } from "../../function/quiz";

const useStyles = makeStyles({
  container: {
    width: "100%",
    padding: "30px 50px",
  },
  headline: {
    color: "#4dd0e1",
    fontSize: "1.563rem",
    margin: "0 auto 1rem auto",
    textAlign: "center",
  },
  textContainer: {
    width: 700,
    padding: 10,
    marginBottom: 15,
    boxShadow: "0 0 1px grey",
    borderRadius: "4px",
  },
  caption: {
    fontWeight: "bold",
  },
});

const ConfirmDialog = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={(e) => props.onClose(e)}
        fullWidth={false}
        maxWidth={"md"}
      >
        <DialogContent>
          <div className={classes.container}>
            <div className={classes.headline}>以下の内容でクイズを作成してもよろしいですか？</div>
            <div className="module-spacer--extra-small" />
            <div className={classes.textContainer}>
              <p className={classes.caption}>問題</p>
              <div>{props.quiz}</div>
            </div>
            <div className={classes.textContainer}>
              <p className={classes.caption}>選択肢１</p>
              <div>{props.choice1}</div>
              <div>-{props.select1}-</div>
            </div>
            <div className={classes.textContainer}>
              <p className={classes.caption}>選択肢２</p>
              <div>{props.choice2}</div>
              <div>-{props.select2}-</div>
            </div>
            {props.choice3 && (
              <div className={classes.textContainer}>
                <p className={classes.caption}>選択肢３</p>
                <div>{props.choice3}</div>
                <div>-{props.select3}-</div>
              </div>
            )}
            {props.choice4 && (
              <div className={classes.textContainer}>
                <p className={classes.caption}>選択肢４</p>
                <div>{props.choice4}</div>
                <div>-{props.select4}-</div>
              </div>
            )}
            <div className="module-spacer--extra-extra-small" />
            <PrimaryButton
              label={"クイズを作成する"}
              fullWidth={true}
              onClick={() => dispatch(createQuiz(props.quiz, props.choice1, props.select1, props.choice2, props.select2, props.choice3, props.select3, props.choice4, props.select4 ))}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
