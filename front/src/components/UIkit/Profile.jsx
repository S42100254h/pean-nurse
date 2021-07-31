import React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  "profile": {
    backgroundColor: "#FEEEED",
    border: "1px solid #FEEEED",
    height: "150px",
    borderRadius: "4px",
  },
  "profileItems": {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
    display: "inline-flex",
  },
  "separator": {
    backgroundColor: "#000000",
    width: "1px",
    height: "120px",
    margin: "15px auto",
  },
  "avatar": {
    width: "80px",
    height: "80px",
    margin: "0 20px",
  },
}));

const Profile = () => {
  const classes = useStyles();
  
  return (
    <Container className={classes.profile} maxWidth="sm">
      <div className={classes.profileItems}>
        <Avatar src="/broken-image.jpg" className={classes.avatar} />
        <h2>ユーザー名</h2>
        <div className={classes.separator} />
        <div className={classes.separator} />
      </div>
    </Container>
  );
};

export default Profile;
