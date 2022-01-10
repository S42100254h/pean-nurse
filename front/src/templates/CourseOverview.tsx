import React from "react";
import { CourseCard } from "../components/CourseCard";
import styled from "styled-components";

const Container = styled.div`
  margin: 30px auto;
  max-width: 1080px;
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

const SubHeading = styled.h3`
  font-size: 1rem;
  text-align: center;
`;

const courseCards = [
  { id: 1, label: "神経内科Ⅰ"},
  { id: 2, label: "神経内科Ⅱ"},
  { id: 3, label: "神経内科Ⅲ"},
  { id: 4, label: "神経内科Ⅳ"},
];

const CourseOverview = () => {
  return (
    <Container>
      <Heading>神経内科</Heading>
      <SubHeading>ALS, パーキンソン病 ...</SubHeading>
      <div className="module-spacer--small" />
      {courseCards.map((card) => (
        <CourseCard key={card.id} label={card.label} />
      ))}
    </Container>
  );
};

export default CourseOverview;
