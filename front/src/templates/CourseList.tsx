import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Course from "../components/Course/Course";
import { Grid } from "@material-ui/core";
import { push } from "connected-react-router";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 30px;
`;

const Heading = styled.h2`
  font-size: 18px;
  margin: 20px 0;
`;

type Image = {
  url: string;
};

type CategoryProfile = {
  id: string;
  title: string;
  image: Image;
  caption: string;
  uid: string;
};

const CourseList = () => {
  const dispatch = useDispatch();

  const [categoryProfiles, setCategoryProfiles] = useState<CategoryProfile[]>([]);

  useEffect(() => {
    const apiEndpoint = process.env.REACT_APP_API_URL + "category_profiles";

    axios.get(apiEndpoint).then((resp) => {
      setCategoryProfiles(resp.data);
    });
  }, []);

  return (
    <Container>
      <Heading>コース一覧</Heading>
      <Grid container spacing={2} alignItems="center" direction="row">
        {categoryProfiles !== [] &&
          categoryProfiles.map((categoryProfile) => (
            <Grid item xs={12} sm={4} md={3} key={categoryProfile.id}>
              <Course
                title={categoryProfile.title}
                image={categoryProfile.image.url}
                caption={categoryProfile.caption}
                number={1}
                onClick={() => dispatch(push("/courselist/" + categoryProfile.id))}
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default CourseList;
