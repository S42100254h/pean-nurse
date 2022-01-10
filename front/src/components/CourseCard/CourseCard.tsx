import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  box-shadow: 0 0 1px grey;
  border-radius: 4px;
  transition-duration: 0.3s;
  &:hover {
    transition-duration: 0.5s;
    box-shadow: 0 0 8px grey;
    opacity: 0.75;
    cursor: pointer;
    };
`;

const Label = styled.div`
  font-size: 18px;
`;

type Props = {
  key: number;
  label: string;
};

const CourseCard = (props: Props) => {
  return (
    <Container>
      <Label>{props.label}</Label>
    </Container>
  );
};

export default CourseCard;
