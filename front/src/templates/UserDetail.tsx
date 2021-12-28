import React, { useCallback, useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import { makeStyles } from "@material-ui/core";
import { TextInput } from "../components/UIkit";
import axios from "axios";

const useStyles = makeStyles({
  container: {
    margin: "30px auto",
    maxWidth: 800,
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

type MatchParams = {
  id: string;
};

const UserDetail = () => {
  const classes = useStyles();
  const match = useRouteMatch<MatchParams>();
  
  const [name, setName] = useState("");
  
  useEffect(() => {
    if (localStorage.getItem("access-token")) {
      const auth_token = localStorage.getItem("access-token") || "";
      const client = localStorage.getItem("client") || "";
      const uid = localStorage.getItem("uid") || "";
      const apiEndpoint = process.env.REACT_APP_API_URL + "users/" + match.params.id;
      let isMounted = true;

      axios
        .get(apiEndpoint, {
          headers: {
            "access-token": auth_token,
            client: client,
            uid: uid,
          },
        })
        .then((resp) => {
          if (isMounted) {
            setName(resp.data.name);
          }
        })
    }
  }, []);
  
  const inputName = useCallback((event) => {
    setName(event.target.value);
  }, [setName]);

  return (
    <div className={classes.container}>
      <h2 className={classes.headline}>ユーザー詳細</h2>
      <div className="module-spacer--extra-small" />
      <TextInput
        fullWidth={true}
        label={"ユーザー名"}
        multiline={true}
        required={true}
        rows={1}
        value={name}
        type={"text"}
        onChange={inputName}
      />
    </div>
  );
};

export default UserDetail;
