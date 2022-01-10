import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { getSignedIn } from "../reducks/user/selectors";
import { RootState } from "../types/entity/rootState";
import styled from "styled-components";

const Container = styled.div`
  width: 500px;
  margin: 40px auto;
`;

const Link = styled.p`
  font-size: 22px;
  border-bottom: 1px solid;
  display: inline-block;
  cursor: pointer;
`;

const PageNotFound = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const isSignedIn = getSignedIn(selector);

  const handlePush = () => {
    if (isSignedIn) {
      dispatch(push("/dashboard"));
    } else {
      dispatch(push("/"));
    }
  };

  return (
    <Container>
      <p style={{ fontSize: "48px" }}>404</p>
      <p style={{ fontSize: "28px" }}>Page Not Found</p>
      <p style={{ fontSize: "22px" }}>指定されたページが存在しません。</p>
      <div className="module-spacer--extra-extra-small" />
      <Link onClick={() => handlePush()} >ホームへ戻る</Link>
    </Container>
  );
};

export default PageNotFound;
