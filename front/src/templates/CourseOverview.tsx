import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router";
import { CourseCard } from "../components/CourseCard";
import styled from "styled-components";
import { Spacer } from "../components/UIkit";
import { push } from "connected-react-router";
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

type Category = {
  id: string;
  name: string;
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
  const [category, setCategory] = useState<Category>(),
    [quizzesLength, setQuizzesLength] = useState(0);

  const courseCards = [];
  if (category !== undefined) {
    for (let i = 1; i <= quizzesLength; i++) {
      courseCards.push(
        <CourseCard
          key={i}
          label={category?.name + i}
          onClick={() => dispatch(push("/courselist/" + match.params.id + "/study/" + i))}
        />,
      );
    }
  }

  useEffect(() => {
    let isMounted = true;

    const categoryProfileApiEndpoint = process.env.REACT_APP_API_URL + "categories?category_uid=" + match.params.id;
    axios.get(categoryProfileApiEndpoint).then((resp) => {
      if (isMounted) {
        setCategory(resp.data);
      }
    });

    const quizApiEndpoint = process.env.REACT_APP_API_URL + "quizzes?category_uid=" + match.params.id;
    axios.get(quizApiEndpoint).then((r) => {
      if (isMounted) {
        const courseNumber = Math.floor(r.data.length / 7);
        setQuizzesLength(courseNumber);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Container>
      <Heading>{category?.name}</Heading>
      <SubHeading>{category?.caption}</SubHeading>
      <Spacer size="sm" />
      <div>{courseCards}</div>
    </Container>
  );
};

export default CourseOverview;
