import React from "react";
import { useDispatch } from "react-redux";
import Course from "../components/Course/Course";
import { Grid } from "@material-ui/core";
import { push } from "connected-react-router";
import cat from "../assets/img/cat.png";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 30px;
`;

const Heading = styled.h2`
  font-size: 18px;
  margin: 20px 0;
`;

const courses = [
  {
    title: "神経内科",
    image: cat,
    caption: "ALS, パーキンソン病 ...",
    number: 7,
    id: "Neurology",
  },
  {
    title: "脳神経外科",
    image: cat,
    caption: "脳出血, 脳腫瘍 ...",
    number: 4,
    id: "Neurosurgery",
  },
  {
    title: "精神科",
    image: cat,
    caption: "統合失調症, うつ病 ...",
    number: 10,
    id: "Psychiatric",
  },
  {
    title: "心臓血管外科",
    image: cat,
    caption: "大動脈乖離, 心筋梗塞 ...",
    number: 1,
    id: "Cardiovascular_surgery",
  },
  {
    title: "産婦人科",
    image: cat,
    caption: "子宮筋腫, 帝王切開 ...",
    number: 3,
    id: "Obstetrics_and_gynecology",
  },
  {
    title: "血液内科",
    image: cat,
    caption: "白血病, 多血症 ...",
    number: 1,
    id: "Hematology",
  },
];

const CourseList = () => {
  const dispatch = useDispatch();

  return (
    <Container>
      <Heading>コース一覧</Heading>
      <Grid container
        spacing={2}
        alignItems="center"
        direction="row"
      >
        {courses.map((course) => (
          <Grid item xs={12} sm={4} md={3} key={course.id}>
            <Course
              title={course.title}
              image={course.image}
              caption={course.caption}
              number={course.number}
              onClick={() => dispatch(push("/courselist/" + course.id))}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CourseList;
