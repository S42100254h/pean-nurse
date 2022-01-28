import React from "react";
import styled from "styled-components";
import { generateMedia } from "styled-media-query";

const customMedia = generateMedia({
  desktop: "1025px",
  tablet: "600px",
});

const SpacerXXS = styled.div`
  height: 8px;
  ${customMedia.greaterThan("tablet")`
    height: 12px;
  `}
  ${customMedia.greaterThan("desktop")`
    height: 20px;
  `}
`;

const SpacerXS = styled.div`
  height: 12px;
  ${customMedia.greaterThan("tablet")`
    height: 20px;
  `}
  ${customMedia.greaterThan("desktop")`
    height: 32px;
  `}
`;

const SpacerSM = styled.div`
  height: 20px;
  ${customMedia.greaterThan("tablet")`
    height: 32px;
  `}
  ${customMedia.greaterThan("desktop")`
    height: 48px;
  `}
`;

const SpacerMD = styled.div`
  height: 32px;
  ${customMedia.greaterThan("tablet")`
    height: 48px;
  `}
  ${customMedia.greaterThan("desktop")`
    height: 60px;
  `}
`;

const sizes = {
  xxs: <SpacerXXS />,
  xs: <SpacerXS />,
  sm: <SpacerSM />,
  md: <SpacerMD />,
};

type Props = {
  size: "xxs" | "xs" | "sm" | "md";
};

const Spacer = (props: Props) => {
  return sizes[props.size];
};

export default Spacer;
