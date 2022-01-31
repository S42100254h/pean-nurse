import React, { ReactNode } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector } from "react-redux";
import { getLoadingState, getLoadingText } from "../../reducks/loading/selectors";
import { RootState } from "../../types/entity/rootState";
import styled from "styled-components";

const Root = styled.section`
  align-items: center;
  background: #fff;
  display: flex;
  flex-flow: column;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: 10;
`;

type Props = {
  children: ReactNode;
};

const Loading = ({ children }: Props) => {
  const selector = useSelector((state: RootState) => state);
  const isBeingLoaded = getLoadingState(selector);
  const loadingText = getLoadingText(selector);

  return (
    <>
      {isBeingLoaded && (
        <Root>
          <CircularProgress />
          <p>{loadingText}</p>
        </Root>
      )}
      {children}
    </>
  );
};

export default Loading;
