import React, { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => props.theme.palette.background.default};
  display: inline-block;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 5px 13px;
  margin: 0 5px;
`;

type Props = {
  children: ReactNode;
};

export const CategoryCard = (props: Props) => {
  return <Container>{props.children}</Container>;
};

export default CategoryCard;
