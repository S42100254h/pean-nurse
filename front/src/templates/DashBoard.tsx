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
import { getBronzeBadges, getSilverBadges, getGoldBadges } from "../reducks/badges/selectors";

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
`;

const CalendarContainer = styled.div`
  float: right;
`;

const Image = styled.img`
  margin: 5px 0 10px 0;
`;

const DashBoard = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const bronzeBadges = getBronzeBadges(selector);
  const silverBadges = getSilverBadges(selector);
  const goldBadges = getGoldBadges(selector);

  useEffect(() => {
    dispatch(fetchBadges());
    dispatch(fetchStacks());
  }, []);

  return (
    <Container>
      <Profile />
      <Spacer size="xs" />
      <CalendarContainer>
        <Calendar />
      </CalendarContainer>
      <CourseContainer>
        <Tooltip content={"１回 全問正解した問題が表示されます。"}>
          <Image src={bronze} />
        </Tooltip>
        <ListArea badges={bronzeBadges} />
      </CourseContainer>
      <CourseContainer>
        <Tooltip content={"２回 全問正解した問題が表示されます。"}>
          <Image src={silver} />
        </Tooltip>
        <ListArea badges={silverBadges} />
      </CourseContainer>
      <CourseContainer>
        <Tooltip content={"３回 全問正解した問題が表示されます。"}>
          <Image src={gold} />
        </Tooltip>
        <ListArea badges={goldBadges} />
      </CourseContainer>
    </Container>
  );
};

export default DashBoard;
