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

const ConfirmDialog = ({ quiz, choice1, select1, choice2, select2, choice3, select3, choice4, select4, open, onClose })=> {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  return (
    <div>
      <Dialog
        open={open}
        onClose={(e) => onClose(e)}
        fullWidth={false}
        maxWidth={"md"}
      >
        <DialogContent>
          <div className={classes.container}>
            <div className={classes.headline}>以下の内容でクイズを作成してもよろしいですか？</div>
            <div className="module-spacer--extra-small" />
            <div className={classes.textContainer}>
              <p className={classes.caption}>問題</p>
              <div>{quiz}</div>
            </div>
            {choice1 && (
              <div className={classes.textContainer}>
                <p className={classes.caption}>選択肢１</p>
                <div>{choice1}</div>
                {select1 ? (
                  <div>- right -</div>
                ) : (
                  <div>- wrong -</div>
                )}
              </div>
            )}
            {choice2 && (
              <div className={classes.textContainer}>
                <p className={classes.caption}>選択肢２</p>
                <div>{choice2}</div>
                {select2 ? (
                  <div>- right -</div>
                ) : (
                  <div>- wrong -</div>
                )}
              </div>
            )}
            {choice3 && (
              <div className={classes.textContainer}>
                <p className={classes.caption}>選択肢３</p>
                <div>{choice3}</div>
                {select3 ? (
                  <div>- right -</div>
                ) : (
                  <div>- wrong -</div>
                )}
              </div>
            )}
            {choice4 && (
              <div className={classes.textContainer}>
                <p className={classes.caption}>選択肢４</p>
                <div>{choice4}</div>
                {select4 ? (
                  <div>- right -</div>
                ) : (
                  <div>- wrong -</div>
                )}
              </div>
            )}
            <div className="module-spacer--extra-extra-small" />
            <PrimaryButton
              label={"クイズを作成する"}
              fullWidth={true}
              onClick={() => dispatch(createQuiz(quiz, choice1, select1, choice2, select2, choice3, select3, choice4, select4 ))}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
