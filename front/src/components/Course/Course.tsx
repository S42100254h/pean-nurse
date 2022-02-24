import React, { MouseEventHandler } from "react";
import { Box } from "@material-ui/core";
import Media from "react-media";
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
  }
`;

const SmallContainer = styled(Box)`
  max-width: 500px;
  height: 150px;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 0 1px grey;
  text-align: center;
  transition-duration: 0.3s;
  &:hover {
    transition-duration: 0.5s;
    box-shadow: 0 0 8px grey;
    opacity: 0.75;
    cursor: pointer;
  }
`;

const LeftContainer = styled(Box)`
  float: left;
  width: 40%;
`;

const RightContainer = styled(Box)`
  float: right;
  width: 60%;
  padding-right: 30px;
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
  image: string;
  caption: string;
  number: number;
  onClick: MouseEventHandler;
};

const Course = (props: Props) => {
  return (
    <Media
      queries={{
        small: "(max-width: 599px)",
        medium: "(min-width: 600px)",
      }}
    >
      {(matches) => (
        <>
          {matches.small && (
            <SmallContainer onClick={props.onClick}>
              <LeftContainer>
                <img src={props.image} width="120px" height="120px" />
              </LeftContainer>
              <RightContainer>
                <Title>{props.title}</Title>
                <Caption>{props.caption}</Caption>
                <div>全{props.number}コース</div>
              </RightContainer>
            </SmallContainer>
          )}
          {matches.medium && (
            <Container onClick={props.onClick}>
              <Title>{props.title}</Title>
              <img src={props.image} width="120px" height="120px" />
              <Caption>{props.caption}</Caption>
              <div>全{props.number}コース</div>
            </Container>
          )}
        </>
      )}
    </Media>
  );
};

export default Course;
