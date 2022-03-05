import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => props.theme.palette.basic.main};
  border-radius: 0.5rem;
  margin: 10px 0;
  height: 15px;
`;

const Progress = styled.div`
  background-color: #4dd0e1;
  height: 15px;
  border-radius: 1rem;
  transition: 1s ease;
  transition-delay: 0.5s;
`;

type Props = {
  percent: number;
};

const ProgressBar = (props: Props) => {
  return (
    <Container>
      <Progress style={{ width: `${props.percent}%` }} />
    </Container>
  );
};

export default ProgressBar;
