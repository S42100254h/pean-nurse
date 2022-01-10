import React from "react";
import { Grid } from "@material-ui/core";
import styled from "styled-components";

const Root = styled.div`
  bottom: 0;
  height: 300px;
  background-color: ${props => props.theme.palette.basic.dark};
  box-shadow: 0 0 1px grey;
  position: relative;
`;

const Heading = styled.h2`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  width: fit-content;
  margin-bottom: 5px;
  margin-top: 50px;
`;

const Text = styled.div`
  color: #fff;
  margin-bottom: 3px;
  width: fit-content;
  &:hover {
    cursor: pointer;
    color: ${props => props.theme.palette.primary.main};
  };
`;
const Footer = () => {
  return (
    <Root>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="flex-end"
      >
        <Grid item sm={2}>
          <Heading>PeAN</Heading>
          <Text>About</Text>
          <Text>利用規約</Text>
          <Text>プライバシー</Text>
        </Grid>
        <Grid item sm={2}>
          <Heading>サービス</Heading>
          <Text>コース一覧</Text>
          <Text>利用者の声</Text>
          <Text>ヘルプ</Text>
        </Grid>
      </Grid>
    </Root>
  );
};

export default Footer;
