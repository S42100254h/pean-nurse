import React, { ReactNode, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

type CustomProps = {
  location: "top" | "bottom";
  width?: number;
};

const Content = styled.div<CustomProps>`
  position: absolute;
  width: ${(props) => (props.width ? props.width : 300)}px;
  border-radius: 4px;
  color: #fff;
  padding: 5px 10px;
  opacity: 0.8;
  background-color: ${(props) => props.theme.palette.basic.dark};
  z-index: 100;
  ${(props) => getLocation(props)}
  &:before {
    content: "";
    position: absolute;
    border: 6px solid transparent;
    ${(props) => getBeforeLocation(props)}
  }
`;

const getLocation = (props: any) => {
  if (props.location === "top") {
    return `
      bottom: calc(100% + 8px);
      left: -25px;
    `;
  } else if (props.location === "bottom") {
    return `
      top: calc(100% + 5px);
      left: -310%;
    `;
  }
};

const getBeforeLocation = (props: any) => {
  if (props.location === "top") {
    return `
        top: 100%;
        left: 30px;
        border-top: 6px solid #3e3e3e;
  `;
  } else if (props.location === "bottom") {
    return `
        bottom: 100%;
        left: 50%;
        border-bottom: 6px solid #3e3e3e;
    `;
  }
};

type Props = {
  content: string;
  children: ReactNode;
  location: "top" | "bottom";
  width?: number;
};

const Tooltip = (props: Props) => {
  const [show, setShow] = useState(false);

  return (
    <Container>
      <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        {props.children}
      </div>
      {show && (
        <Content width={props.width} location={props.location}>
          {props.content}
        </Content>
      )}
    </Container>
  );
};

export default Tooltip;
