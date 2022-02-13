import React from "react";
import { ClickAwayListener } from "@material-ui/core";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  inset: 0;
  z-index: 20000;
`;

const Modal = styled.div`
  position: fixed;
  top: 30vh;
  left: 55vw;
  width: 230px;
  height: 100px;
  text-align: left;
  margin-left: 20px;
  border-radius: 3px;
  box-shadow: 0 0 4px grey;
  background-color: #fff;
  z-index: 999;
`;

const PopContainer = styled.div`
  height: 50%;
  width: 100%;
  box-sizing: border-box;
  &:hover {
    background-color: ${(props) => props.theme.palette.basic.light};
  }
`;

const Label = styled.label`
  line-height: 30px;
  display: inline-block;
  padding: 10px 20px;
  cursor: pointer;
`;

const StyledInput = styled.input`
  display: none;
`;

type Props = {
  onClickAway: (event: React.MouseEvent<Document>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
};

const ClickAway = (props: Props) => {
  return (
    <Container>
      <ClickAwayListener onClickAway={props.onClickAway}>
        <Modal>
          <PopContainer>
            <Label>
              画像をアップロード
              <StyledInput type="file" accept="image/jpeg, image/png" onChange={(e) => props.onChange(e)} />
            </Label>
          </PopContainer>
          <PopContainer>
            <Label onClick={() => props.onClick()}>デフォルト画像に設定</Label>
          </PopContainer>
        </Modal>
      </ClickAwayListener>
    </Container>
  );
};

export default ClickAway;
