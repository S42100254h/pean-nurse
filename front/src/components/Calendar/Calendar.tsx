import React from "react";
import { useSelector } from "react-redux";
import { getStacks } from "../../reducks/stacks/selectors";
import { RootState } from "../../types/entity/rootState";
import { Tooltip } from "../UIkit";
import styled from "styled-components";
import dayjs from "dayjs";

const Container = styled.div`
  width: 215px;
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
  width: ${(props) => (props.width ? props.width : 18)}px;
  height: ${(props) => (props.width ? props.width : 18)}px;
  margin: 2px;
  border-radius: 6px;
  border: 0.01px solid rgba(0, 0, 0, 0.02);
  display: inline-block;
  vertical-align: middle;
  ${(props) => getColor(props)}
`;

const Day = styled.div`
  width: 25px;
  height: 25px;
  margin: 0 2px;
  color: ${(props) => props.theme.palette.basic.dark};
  display: inline-block;
`;

const Wrapper = styled.div`
  float: right;
  padding: 10px 5px 0 0;
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

  const setStacks = () => {
    let counts = [];
    let colors = [];
    // take only created_at out from stacks
    const stacksDays = stacks.map((stack) => dayjs(stack["created_at"]).format("YYYYMMDD"));
    for (let i = 0; i < schedules.length; i++) {
      counts[i] = stacksDays.filter((stacksDay) => stacksDay === schedules[i].format("YYYYMMDD")).length;
      if (counts[i] >= 15) {
        colors[i] = "dark";
      } else if (counts[i] >= 10) {
        colors[i] = "little dark";
      } else if (counts[i] >= 5) {
        colors[i] = "little light";
      } else if (counts[i] >= 1) {
        colors[i] = "light";
      } else {
        colors[i] = "white";
      }
    }
    return { colors: colors, counts: counts };
  };

  const colors = setStacks().colors;
  const counts = setStacks().counts;

  return (
    <Container>
      <Heading>{month}月 学習ログ</Heading>
      {days.map((day) => (
        <Day key={day.toString()}>{day}</Day>
      ))}
      {schedules.map((schedule, i) => (
        <Tooltip
          key={schedule.toString()}
          content={
            counts[i] !== 0
              ? `${counts[i]}問クリア - ${schedule.format("YYYY/MM/DD")}`
              : `${schedule.format("YYYY/MM/DD")}`
          }
          location="bottom"
          width={200}
        >
          <Item color={colors[i]} width={25} height={25} />
        </Tooltip>
      ))}
      <Wrapper>
        <Text>少ない</Text>
        <Item />
        <Item color="light" />
        <Item color="little light" />
        <Item color="little dark" />
        <Item color="dark" />
        <Text>多い</Text>
      </Wrapper>
    </Container>
  );
};

export default Calendar;
