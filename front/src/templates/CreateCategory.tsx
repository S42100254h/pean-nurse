import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { TextInput, PrimaryButton } from "../components/UIkit";
import { createCategory } from "../function/category";

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
  const dispatch = useDispatch();

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
        label={"カテゴリー名"}
        required={true}
        rows={1}
        value={category}
        onChange={inputCategory}
      />
      <div className="module-spacer--medium" />
      <PrimaryButton
        label={"カテゴリーを作成する"}
        fullWidth={true}
        disabled={!category}
        onClick={() => dispatch(createCategory(category))}
      />
    </div>
  );
};

export default CreateCategory;
