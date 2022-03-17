import React from "react";
import { useSelector } from "react-redux";
import { getStacks } from "../../reducks/stacks/selectors";
import { RootState } from "../../types/entity/rootState";
import { Spacer } from "../UIkit";
import styled from "styled-components";
import dayjs from "dayjs";

const Container = styled.div`
  width: 250px;
  height: auto;
  display: inline-block;
  text-align: center;
  padding: 2px;
`;

const Heading = styled.p`
  font-size: 16px;
`;

type Props = {
  width?: number;
  height?: number;
};

const Item = styled.div<Props>`
  /* width: 30px; */
  width: ${(props) => (props.width ? props.width : 30)}px;
  height: ${(props) => (props.width ? props.width : 30)}px;
  /* height: 30px; */
  margin: 2px;
  border-radius: 6px;
  border: 0.01px solid rgba(0, 0, 0, 0.02);
  display: inline-block;
  vertical-align: middle;
  ${(props) => getColor(props)}
`;

const Day = styled.div`
  width: 30px;
  height: 30px;
  margin: 0 2px;
  line-height: 40px;
  color: ${(props) => props.theme.palette.basic.dark};
  display: inline-block;
`;

const Wrapper = styled.div`
  float: right;
  padding-right: 10px;
`;

const Text = styled.div`
  font-size: 12px;
  display: inline-block;
`;

const getColor = (props: any) => {
  if (props.color === "dark") {
    return `
      background-color: #2B7584;
    `;
  } else if (props.color === "little dark") {
    return `
      background-color: #45BEB5;
    `;
  } else if (props.color === "little light") {
    return `
      background-color: #57F3C6;
    `;
  } else if (props.color === "light") {
    return `
      background-color: #B0F5E5;
    `;
  } else {
    return `
      background-color: #ECF3FA;
    `;
  }
};

const getMonth = (year: number, month: number) => {
  return dayjs(`${year}-${month}`);
};

const createCalendar = (year: number, month: number) => {
  const firstDay = getMonth(year, month);
  const firstDayIndex = firstDay.day();

  return Array(35)
    .fill(0)
    .map((_, i) => {
      const diffFromDay = i - firstDayIndex;
      const day = firstDay.add(diffFromDay, "day");
      return day;
    });
};

const days = ["日", "月", "火", "水", "木", "金", "土"];
const today = dayjs();
const year = today.year();
const month = today.month() + 1;
const schedules = createCalendar(year, month);

const Calendar = () => {
  const selector = useSelector((state: RootState) => state);
  const stacks = getStacks(selector);

  const setColor = () => {
    let color = [];
    // take only created_at out from stacks
    const stacksDays = stacks.map((stack) => dayjs(stack["created_at"]).format("YYYYMMDD"));
    for (let i = 0; i < schedules.length; i++) {
      const count = stacksDays.filter((stacksDay) => stacksDay === schedules[i].format("YYYYMMDD")).length;
      if (count >= 15) {
        color[i] = "dark";
      } else if (count >= 10) {
        color[i] = "little dark";
      } else if (count >= 5) {
        color[i] = "little light";
      } else if (count >= 1) {
        color[i] = "light";
      } else {
        color[i] = "white";
      }
    }
    return color;
  };

  const colors = setColor();

  return (
    <Container>
      <Heading>{month}月 学習ログ</Heading>
      {days.map((day) => (
        <Day key={day.toString()}>{day}</Day>
      ))}
      {schedules.map((schedule, i) => (
        <Item key={schedule.toString()} color={colors[i]} />
      ))}
      <Spacer size="xxs" />
      <Wrapper>
        <Text>少ない</Text>
        <Item width={20} height={20} />
        <Item color="light" width={20} height={20} />
        <Item color="little light" width={20} height={20} />
        <Item color="little dark" width={20} height={20} />
        <Item color="dark" width={20} height={20} />
        <Text>多い</Text>
      </Wrapper>
    </Container>
  );
};

export default Calendar;
