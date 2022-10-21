import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Profile } from "../components/Profile";
import { Calendar } from "../components/Calendar";
import { ListArea } from "../components/ListArea";
import styled from "styled-components";
import { Spacer, Tooltip } from "../components/UIkit";
import bronze from "../assets/img/bronze.png";
import silver from "../assets/img/silver.png";
import gold from "../assets/img/gold.png";
import { RootState } from "../types/entity/rootState";
import { fetchBadges } from "../reducks/badges/operations";
import { fetchStacks } from "../reducks/stacks/operations";
import { getCategories } from "../reducks/categories/selectors";
import { fetchCategories } from "../reducks/categories/operations";
import { getBronzeBadges, getSilverBadges, getGoldBadges } from "../reducks/badges/selectors";
import { Help } from "@material-ui/icons";

const Container = styled.div`
  width: calc(100% - 2rem);
  max-width: 1080px;
  height: auto;
  margin: 0 auto;
`;

const CourseContainer = styled.div`
  height: auto;
  min-height: 180px;
  width: 80%;
  margin-bottom: 15px;
`;

const CalendarContainer = styled.div`
  float: right;
`;

const Image = styled.img``;

const HelpIcon = styled(Help)`
  position: absolute;
  width: 20px;
  padding-bottom: 3px;
`;

const ImageContainer = styled.div`
  position: relative;
  margin: 5px 0 10px 0;
`;

const DashBoard = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const bronzeBadges = getBronzeBadges(selector);
  const silverBadges = getSilverBadges(selector);
  const goldBadges = getGoldBadges(selector);
  const categories = getCategories(selector);

  useEffect(() => {
    dispatch(fetchBadges());
    dispatch(fetchStacks());
    dispatch(fetchCategories());
  }, []);

  return (
    <Container>
      <Profile />
      <Spacer size="xs" />
      <CalendarContainer>
        <Calendar />
      </CalendarContainer>
      <CourseContainer>
        <ImageContainer>
          <img src={bronze} />
          <Tooltip content={"１回 全問正解した問題が表示されます。"} location="top">
            <HelpIcon />
          </Tooltip>
        </ImageContainer>
        <ListArea badges={bronzeBadges} categories={categories} />
      </CourseContainer>
      <CourseContainer>
        <ImageContainer>
          <img src={silver} />
          <Tooltip content={"２回 全問正解した問題が表示されます。"} location="top">
            <HelpIcon />
          </Tooltip>
        </ImageContainer>
        <ListArea badges={silverBadges} categories={categories} />
      </CourseContainer>
      <CourseContainer>
        <ImageContainer>
          <img src={gold} />
          <Tooltip content={"３回 全問正解した問題が表示されます。"} location="top">
            <HelpIcon />
          </Tooltip>
        </ImageContainer>
        <ListArea badges={goldBadges} categories={categories} />
      </CourseContainer>
    </Container>
  );
};

export default DashBoard;
