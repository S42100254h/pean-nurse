import React from "react";
import { Dialog, DialogContent } from "@material-ui/core";
import cat from "../../assets/img/cat.png";
import styled from "styled-components";

const Container = styled.div`
  margin: 10px auto;
  max-width: 600px;
  padding: 20px 70px;
  height: auto;
  width: calc(100% - 2rem);
`;

const Heading = styled.h2`
  color: #4dd0e1;
  font-size: 1.563rem;
  margin: 0 auto 1rem auto;
  text-align: center;
`;

const Image = styled.img`
  display: block;
  margin: auto;
`;

type Props = {
  open: boolean;
  onClose: () => void;
};

const LevelUpDialog = (props: Props) => {
  return (
    <div>
      <Dialog open={props.open} fullWidth={true} maxWidth={"sm"} onClose={props.onClose}>
        <DialogContent>
          <Container>
            <Heading>経験値アップ！！</Heading>
            <Image src={cat} alt="ねこ" width="180px" height="180px" />
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LevelUpDialog;
