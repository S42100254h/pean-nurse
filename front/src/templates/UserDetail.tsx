import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router";
import {
  TextInput,
  PrimaryButton,
  SecondaryButton,
  Spacer,
} from "../components/UIkit";
import { deleteUser } from "../reducks/users/operations";
import { DeleteDialog } from "../components/DeleteDialog";
import { editUserInfoByAdmin } from "../function/user";
import { push } from "connected-react-router";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  margin: 30px auto;
  max-width: 800px;
  padding: 35px 70px;
  height: auto;
  width: calc(100% - 2rem);
  background-color: #fff;
  box-shadow: 0 0 1px grey;
`;

const Heading = styled.h2`
  color: #4dd0e1;
  font-size: 1.563rem;
  margin: 0 auto 1rem auto;
  text-align: center;
`;

type MatchParams = {
  id: string;
};

const UserDetail = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch<MatchParams>();

  const [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [open, setOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("access-token")) {
      const auth_token = localStorage.getItem("access-token") || "";
      const client = localStorage.getItem("client") || "";
      const uid = localStorage.getItem("uid") || "";
      const apiEndpoint =
        process.env.REACT_APP_API_URL + "users/" + match.params.id;
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
            setEmail(resp.data.email);
          }
        });

      return () => {
        isMounted = false;
      };
    }
  }, []);

  const inputName = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );

  const inputMail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  return (
    <Container>
      <Heading>ユーザー詳細</Heading>
      <Spacer size="xs" />
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
      <TextInput
        fullWidth={true}
        label={"メールアドレス"}
        multiline={true}
        required={true}
        rows={1}
        value={email}
        type={"text"}
        onChange={inputMail}
      />
      <Spacer size="sm" />
      <PrimaryButton
        label={"ユーザー情報を更新する"}
        fullWidth={true}
        disabled={!name || !email}
        onClick={() =>
          dispatch(editUserInfoByAdmin(match.params.id, name, email))
        }
      />
      <Spacer size="xs" />
      <SecondaryButton
        label={"アカウントを削除する"}
        fullWidth={true}
        onClick={() => setOpen(true)}
      />
      <DeleteDialog
        open={open}
        onClose={() => setOpen(false)}
        onClickStop={() => setOpen(false)}
        onClickProceed={() => {
          dispatch(deleteUser(match.params.id));
          setOpen(false);
          setTimeout(() => {
            dispatch(push("/user/list"));
          }, 100);
        }}
      />
    </Container>
  );
};

export default UserDetail;
