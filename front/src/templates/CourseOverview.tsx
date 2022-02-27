import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router";
import { CourseCard } from "../components/CourseCard";
import styled from "styled-components";
import { Spacer } from "../components/UIkit";
import { push } from "connected-react-router";
import { hideLoadingAction, showLoadingAction } from "../reducks/loading/actions";
import axios from "axios";

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

type MatchParams = {
  id: string;
};

const CourseOverview = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch<MatchParams>();
  const [categoryProfile, setCategoryProfile] = useState<CategoryProfile>(),
    [quizzesLength, setQuizzesLength] = useState(0);

  const courseCards = [];
  if (categoryProfile !== undefined) {
    for (let i = 1; i <= quizzesLength; i++) {
      courseCards.push(
        <CourseCard
          key={i}
          label={categoryProfile?.title + i}
          onClick={() => {
            dispatch(showLoadingAction("Loading..."));
            dispatch(push("/courselist/" + match.params.id + "/study/" + i));

            setTimeout(() => {
              dispatch(hideLoadingAction());
            }, 1300);
          }}
        />,
      );
    }
  }

  useEffect(() => {
    const categoryProfileApiEndpoint = process.env.REACT_APP_API_URL + "category_profiles/" + match.params.id;
    let isMounted = true;

    axios.get(categoryProfileApiEndpoint).then((resp) => {
      if (isMounted) {
        setCategoryProfile(resp.data);
        const quizApiEndpoint = process.env.REACT_APP_API_URL + "quizzes?category_id=" + resp.data.category_id;

        axios.get(quizApiEndpoint).then((r) => {
          const courseNumber = Math.floor(r.data.length / 7);
          setQuizzesLength(courseNumber);
        });
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Container>
      <Heading>{categoryProfile?.title}</Heading>
      <SubHeading>{categoryProfile?.caption}</SubHeading>
      <Spacer size="sm" />
      <div>{courseCards}</div>
    </Container>
  );
};

export default CourseOverview;
