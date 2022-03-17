import React, { ReactNode, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

type CustomProps = {
  width?: number;
};

const Content = styled.div<CustomProps>`
  position: absolute;
  bottom: calc(100% + 5px);
  left: -10px;
  width: ${(props) => (props.width ? props.width : 300)}px;
  border-radius: 4px;
  color: #fff;
  padding: 5px 10px;
  opacity: 0.8;
  background-color: ${(props) => props.theme.palette.basic.dark};
  &:before {
    content: "";
    position: absolute;
    top: 100%;
    left: 30px;
    border: 6px solid transparent;
    border-top-color: ${(props) => props.theme.palette.basic.dark};
  }
`;

type Props = {
  content: string;
  children: ReactNode;
  width?: number;
};

const Tooltip = (props: Props) => {
  const [show, setShow] = useState(false);

  return (
    <Container>
      <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        {props.children}
      </div>
      {show && <Content width={props.width}>{props.content}</Content>}
    </Container>
  );
};

export default Tooltip;
