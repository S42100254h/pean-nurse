import React from "react";
import { makeStyles } from "@material-ui/core";
import Course from "../components/Course/Course";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    maxWidth: 1080,
    margin: "0 auto",
    padding: "0 30px",
  },
  headline: {
    fontSize: 18,
    margin: "20px 0",
  },
});

const courses = [
  {
    title: "神経内科",
    image: "cat.png",
    caption: "ALS, パーキンソン病 ...",
    number: 7,
    id: "neurology",
  },
  {
    title: "脳神経外科",
    image: "cat.png",
    caption: "脳出血, 脳腫瘍 ...",
    number: 4,
    id: "Neurosurgery",
  },
  {
    title: "精神科",
    image: "cat.png",
    caption: "統合失調症, うつ病 ...",
    number: 10,
    id: "Psychiatric",
  },
  {
    title: "心臓血管外科",
    image: "cat.png",
    caption: "大動脈乖離, 心筋梗塞 ...",
    number: 1,
    id: "Cardiovascular surgery",
  },
  {
    title: "産婦人科",
    image: "cat.png",
    caption: "子宮筋腫, 帝王切開 ...",
    number: 3,
    id: "Obstetrics and gynecology",
  },
  {
    title: "血液内科",
    image: "cat.png",
    caption: "白血病, 多血症 ...",
    number: 1,
    id: "Hematology",
  },
];

const CourseList = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.headline}>コース一覧</div>
      <Grid container
        spacing={2}
        alignItems="center"
        direction="row"
      >
        {courses.map((course) => (
          <Grid item xs={6} sm={4} md={3} key={course.id}>
            <Course
              title={course.title}
              image={course.image}
              caption={course.caption}
              number={course.number}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CourseList;
