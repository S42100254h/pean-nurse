import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { getUserName, getUserImage } from "../../reducks/user/selectors";
import { RootState } from "../../types/entity/rootState";

const useStyles = makeStyles({
  container: {
    margin: "30px auto",
    maxWidth: 600,
    padding: "20px 50px",
    height: "auto",
    width: "calc(100% - 2rem)",
    backgroundColor: "#fff",
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: "4px",
  },
  avatar: {
    width: "100px",
    height: "100px",
    margin: "0 20px",
  },
  center: {
    textAlign: "center",
  },
  clearedCount: {
    fontSize: 24,
  },
  caption: {
    fontSize: 14,
  },
  name: {
    fontSize: 18,
  },
  level: {
    fontSize: 18,
  },
});

const Profile = () => {
  const classes = useStyles();
  const selector = useSelector((state: RootState) => state);
  const userName = getUserName(selector);
  const userImage = getUserImage(selector);
  
  return (
    <Grid
      container
      spacing={1}
      direction="row"
      alignItems="center"
      className={classes.container}
    >
      <Grid item xs={3}>
        {userImage ? (
          <Avatar src={userImage.url} className={classes.avatar} />
        ) : (
          <Avatar src="/broken-image.jpg" className={classes.avatar} />
        )}
      </Grid>
      <Grid item xs={3} className={classes.center}>
        <div className={classes.name}>{userName}</div>
        <div className={classes.level}>Lv. 1</div>
      </Grid>
      <Grid item xs={3} className={classes.center}>
        <div className={classes.clearedCount}>1</div>
        <div className={classes.caption}>総演習クリア数</div>
      </Grid>
      <Grid item xs={3} className={classes.center}>
        <div className={classes.clearedCount}>1</div>
        <div className={classes.caption}>修了コース数</div>
      </Grid>
    </Grid>
  );
};

export default Profile;
