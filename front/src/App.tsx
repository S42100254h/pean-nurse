import React from "react";
import { CssBaseline } from "@material-ui/core";
import Router from "./Router";
import { makeStyles } from "@material-ui/core";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Contact } from "./components/Contact";
import { Notification } from "./components/Notification";
import { Loading } from "./components/UIkit";
import "./assets/style.css";
import "./assets/reset.css";

const useStyles = makeStyles(() => ({
  main: {
    padding: "70px 0 60px 0",
    minHeight: "calc(100vh - 292px)",
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Loading>
        <Header />
        <main className={classes.main}>
          <Notification />
          <Router />
        </main>
        <Contact />
        <Footer />
      </Loading>
    </>
  );
};

export default App;
