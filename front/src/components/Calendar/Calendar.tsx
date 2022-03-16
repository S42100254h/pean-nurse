import React from "react";
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
const schedules = createCalendar(2021, 3);

const Calendar = () => {
  return (
    <Container>
      {days.map((day) => (
        <Day key={day.toString()}>{day}</Day>
      ))}
      {schedules.map((schedule) => (
        <Item key={schedule.toString()} />
      ))}
    </Container>
  );
};

export default Calendar;
