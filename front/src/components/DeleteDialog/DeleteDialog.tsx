import React from "react";
import { Dialog, DialogContent } from "@material-ui/core";
import { PrimaryButton, SecondaryButton } from "../UIkit";
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
            <div className="module-spacer--extra-small" />
            <h2>本当に削除してもよろしいですか？</h2>
            <div className="module-spacer--extra-extra-small" />
            <Image src={cat} alt="ねこ" width="180px" height="180px" />
          </div>
          <div className="module-spacer--extra-small" />
          <PrimaryButton
            label={"キャンセル"}
            fullWidth={true}
            onClick={props.onClickStop} 
          />
          <div className="module-spacer--extra-small" />
          <SecondaryButton
            label={"削除する"}
            fullWidth={true}
            onClick={props.onClickProceed}
          />
          <div className="module-spacer--extra-small" />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
