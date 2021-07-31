import React from "react";
import { Profile } from "../components/UIkit";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  profile: {
    marginTop: "20px",
  },
}));

const DashBoard = () => {
  const classes = useStyles();

  return (
    <div className={classes.profile}>
      <Profile />
    </div>
  );
};

export default DashBoard;
