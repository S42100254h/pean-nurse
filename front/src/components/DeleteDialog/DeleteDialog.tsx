import React from "react";
import { Dialog, DialogContent } from "@material-ui/core";
import { PrimaryButton, SecondaryButton, Spacer } from "../UIkit";
import cat from "../../assets/img/cat.png";
import styled from "styled-components";

const Heading = styled.h2`
  font-size: 24px;
  text-align: center;
  padding-bottom: 4px;
  border-bottom: 1.3px solid;
`;

const Image = styled.img`
  display: block;
  margin: auto;
`;

type Props = {
  open: boolean;
  onClose: Function;
  onClickStop: Function;
  onClickProceed: Function;
};

const DeleteDialog = (props: Props) => {
  return (
    <>
      <Dialog
        open={props.open}
        onClose={(e) => props.onClose(e)}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogContent>
          <div>
            <Heading>削除する</Heading>
            <Spacer size="xs" />
            <h2>本当に削除してもよろしいですか？</h2>
            <Spacer size="xxs" />
            <Image src={cat} alt="ねこ" width="180px" height="180px" />
          </div>
          <Spacer size="xs" />
          <PrimaryButton
            label={"キャンセル"}
            fullWidth={true}
            onClick={props.onClickStop} 
          />
          <Spacer size="xs" />
          <SecondaryButton
            label={"削除する"}
            fullWidth={true}
            onClick={props.onClickProceed}
          />
          <Spacer size="xs" />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
