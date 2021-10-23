import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    bottom: 0,
    height: 300,
    backgroundColor: theme.palette.basic.dark,
    boxShadow: "0 0 1px grey",
  },
  textleftContainer: {
    padding: "50px 40px",
  },
  textRightContainer: {
    padding: "50px 40px",
    marginRight: 250,
  },
  heading: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    width: "fit-content",
    marginBottom: 5,
  },
  text: {
    color: "#fff",
    marginBottom: 3,
    width: "fit-content",
    "&:hover": {
      cursor: "pointer",
      color: theme.palette.primary.main,
    },
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-end"
        className={classes.root}
      >
        <Grid item>
          <div className={classes.textleftContainer}>
            <div className={classes.heading}>PeAN</div>
            <div className={classes.text}>About</div>
            <div className={classes.text}>利用規約</div>
            <div className={classes.text}>プライバシー</div>
          </div>
        </Grid>
        <Grid item>
          <div className={classes.textRightContainer}>
            <div className={classes.heading}>サービス</div>
            <div className={classes.text}>コース一覧</div>
            <div className={classes.text}>利用者の声</div>
            <div className={classes.text}>ヘルプ</div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
