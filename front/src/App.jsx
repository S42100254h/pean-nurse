import React from "react";
import Router from "./Router";
import { Notification } from "./components/Notification";
import { Loading } from "./components/UIkit";
import "./assets/style.css";
import "./assets/reset.css";

const App = () => {
  return (
    <Loading>
      <main>
        <Notification />
        <Router />
      </main>
    </Loading>
  );
};

export default App;
