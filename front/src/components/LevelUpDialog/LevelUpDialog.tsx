import React from "react";
import { Dialog, DialogContent } from "@material-ui/core";
import styled from "styled-components";

const Container = styled.div`
  margin: 10px auto;
  max-width: 600px;
  padding: 35px 70px;
  height: auto;
  width: calc(100% - 2rem);
`;

const Heading = styled.h2`
  color: #4dd0e1;
  font-size: 1.563rem;
  margin: 0 auto 1rem auto;
  text-align: center;
`;

type Props = {
  open: boolean;
};

const LevelUpDialog = (props: Props) => {
  return (
    <div>
      <Dialog open={props.open} fullWidth={true} maxWidth={"sm"}>
        <DialogContent>
          <Container>
            <Heading>経験値アップ！！</Heading>
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LevelUpDialog;
