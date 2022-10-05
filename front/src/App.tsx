import React from "react";
import { CssBaseline } from "@material-ui/core";
import Router from "./Router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Contact } from "./components/Contact";
import { Notification } from "./components/Notification";
import { Loading } from "./components/UIkit";
import styled from "styled-components";
import "./assets/reset.css";
import "./assets/style.css";

const Main = styled.main`
  padding: 70px 0 60px 0;
  min-height: calc(100vh - 292px);
  width: calc(100vw - 15px);
`;

const App = () => {
  return (
    <>
      <CssBaseline />
      <Loading>
        <Header />
        <Main>
          <Notification />
          <Router />
        </Main>
        <Contact />
        <Footer />
      </Loading>
    </>
  );
};

export default App;
