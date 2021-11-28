import React from "react";
import { Profile } from "../components/Profile";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  courseContainer: {
    width: "calc(100% - 5rem)",
    maxWidth: 1080,
    height: "auto",
    minHeight: 250,
    margin: "0 auto",
  },
  headline: {
    fontSize: 18,
  },
  none: {
    fontSize: 14,
    marginTop: 5,
  },
});

const DashBoard = () => {
  const classes = useStyles();

  return (
    <div>
      <Profile />
      <div className="module-spacer--medium" />
      <div className={classes.courseContainer}>
        <div className={classes.headline}>学習中のコース</div>
        <p className={classes.none}>学習中のコースはありません。</p>
      </div>
      <div className={classes.courseContainer}>
        <div className={classes.headline}>修了コース</div>
        <p className={classes.none}>修了したコースはありません。</p>
      </div>
    </div>
  );
};

export default DashBoard;
