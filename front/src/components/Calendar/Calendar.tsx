import React from "react";
import { useSelector } from "react-redux";
import { getStacks } from "../../reducks/stacks/selectors";
import { RootState } from "../../types/entity/rootState";
import styled from "styled-components";
import dayjs from "dayjs";

const Container = styled.div`
  width: 250px;
  height: 220px;
  display: inline-block;
  border: 1px solid #000;
  text-align: center;
  padding: 2px;
`;

const Item = styled.div`
  width: 30px;
  height: 30px;
  margin: 0 2px;
  background-color: #fff;
  border-radius: 6px;
  display: inline-block;
`;

const Day = styled.div`
  width: 30px;
  height: 30px;
  margin: 0 2px;
  line-height: 40px;
  color: ${(props) => props.theme.palette.basic.dark};
  display: inline-block;
`;

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
      {days.map((day) => (
        <Day key={day.toString()}>{day}</Day>
      ))}
      {schedules.map((schedule, i) => (
        <Item key={schedule.toString()} color={colors[i]}>
          {schedule.date()}
        </Item>
      ))}
    </Container>
  );
};

export default Calendar;
