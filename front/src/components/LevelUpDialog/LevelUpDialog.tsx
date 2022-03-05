import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@material-ui/core";
import { Spacer } from "../UIkit";
import cat from "../../assets/img/cat.png";
import styled from "styled-components";

const Container = styled.div`
  margin: 10px auto;
  max-width: 600px;
  padding: 20px 50px;
  height: 450px;
  width: 550px;
`;

const Wrraper = styled.div`
  display: inline-block;
  align-items: center;
  width: 100%;
`;

const TextWrraper = styled.div`
  text-align: center;
  float: right;
`;

const Text = styled.p`
  color: ${(props) => props.theme.palette.secondary.light};
  text-align: center;
  font-size: 46px;
`;

const Level = styled.p`
  color: ${(props) => props.theme.palette.primary.main};
  font-size: 64px;
  margin-top: 20px;
`;

const Comment = styled.div`
  font-size: 18px;
  opacity: 0.7;
`;

const Image = styled.img`
  display: inline-block;
  margin: auto;
`;

type Props = {
  open: boolean;
  onClose: () => void;
};

const LevelUpDialog = (props: Props) => {
  return (
    <div>
      <Dialog open={props.open} maxWidth={"md"} onClose={props.onClose}>
        <DialogContent>
          <Container>
            <Text>Level Up!!</Text>
            <Spacer size={"xs"} />
            <Wrraper>
              <Image src={cat} width="200px" height="200px" />
              <TextWrraper>
                <Level>Lv. 32</Level>
                <Comment>この調子でがんばろう！！</Comment>
              </TextWrraper>
            </Wrraper>
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LevelUpDialog;
