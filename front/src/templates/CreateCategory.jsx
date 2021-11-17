import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { TextInput, PrimaryButton } from "../components/UIkit";

const useStyles = makeStyles({
  container: {
    margin: "30px auto",
    maxWidth: 600,
    padding: "35px 70px",
    height: "auto",
    width: "calc(100% - 2rem)",
    backgroundColor: "#fff",
    boxShadow: "0 0 1px grey",
  },
  headline: {
    color: "#4dd0e1",
    fontSize: "1.563rem",
    margin: "0 auto 1rem auto",
    textAlign: "center",
  },
});

const CreateCategory = () => {
  const classes = useStyles();

  const [category, setCategory] = useState("");

  const inputCategory = useCallback((event) => {
    setCategory(event.target.value);
  }, [setCategory]);

  return (
    <div className={classes.container}>
      <div className={classes.headline}>カテゴリー作成</div>
      <div className="module-spacer--medium" />
      <TextInput
        fullWidth={true}
        lable={"カテゴリー名"}
        required={true}
        row={1}
        value={category}
        onChange={inputCategory}
      />
      <div className="module-spacer--medium" />
      <PrimaryButton
        label={"カテゴリーを作成する"}
        fullWidth={true}
        disabled={!category}
        onClick={() => console.log("click!")}
      />
    </div>
  );
};

export default CreateCategory;
