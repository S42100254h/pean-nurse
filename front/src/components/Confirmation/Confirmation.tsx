import React from "react";
import { Dialog, DialogContent } from "@material-ui/core";
import { PrimaryButton, SecondaryButton, Spacer } from "../UIkit";
import cat from "../../assets/img/cat.png";
import styled from "styled-components";

const Heading = styled.h1`
  font-size: 24px;
  text-align: center;
  padding-bottom: 4px;
  border-bottom: 1.3px solid;
`;

const Red = styled.span`
  color: #cf222e;
  font-weight: bold;
`;

const Image = styled.img`
  display: block;
  margin: auto;
`;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onClickStop: () => void;
  onClickProceed: () => void;
  
};

const Confirmation = (props: Props) => {
  return (
    <>
      <Dialog
        open={props.isOpen}
        onClose={() => props.onClose()}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogContent>
          <div>
            <Heading>退会</Heading>
            <Spacer size="xs" />
            <h2>退会手続きの前にご確認ください</h2>
            <Spacer size="xxs" />
            <p>アカウントを削除すると、これまでのデータが<Red>すべて削除されます</Red></p>
            <Image src={cat} alt="ねこ" width="180px" height="180px" />
          </div>
          <Spacer size="xs" />
          <PrimaryButton
            label={"退会をやめる"}
            fullWidth={true}
            onClick={props.onClickStop} 
          />
          <Spacer size="xs" />
          <SecondaryButton
            label={"退会手続きを進める"}
            fullWidth={true}
            onClick={props.onClickProceed}
          />
          <Spacer size="xs" />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Confirmation;
