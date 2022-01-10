import React, { MouseEventHandler } from "react";
import { Box } from "@material-ui/core";
import styled from "styled-components";

const Container = styled(Box)`
    max-width: 600px;
    height: 280px;
    background-color: #fff;
    box-shadow: 0 0 1px grey;
    text-align: center;
    transition-duration: 0.3s;
    &:hover {
      transition-duration: 0.5s;
      box-shadow: 0 0 8px grey;
      opacity: 0.75;
      cursor: pointer;
    };
`;

const Title = styled.h2`
  font-size: 20px;
  height: auto;
  padding: 10px 0;
`;

const Caption = styled.p`
  padding: 10px 0;
  font-size: 12px;
`;

type Props = {
  title: string;
  image: any;
  caption: string;
  number: number;
  onClick: MouseEventHandler;
};

const Course = (props: Props) => {
  return (
    <Container
      onClick={props.onClick}
    >
      <Title>{props.title}</Title>
      <img src={props.image} width="120px" height="120px" />
      <Caption>{props.caption}</Caption>
      <div>全{props.number}コース</div>
    </Container>
  );
};

export default Course;
