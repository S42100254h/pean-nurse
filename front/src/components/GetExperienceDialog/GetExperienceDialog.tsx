import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent } from "@material-ui/core";
import { editExperiencePoint, editUserLevel } from "../../reducks/user/operations";
import { RootState } from "../../types/entity/rootState";
import { getExperiencePoint, getUserLevel } from "../../reducks/user/selectors";
import { ProgressBar } from "../UIkit";
import { LevelUpDialog } from "../LevelUpDialog";
import cat from "../../assets/img/cat.png";
import bronze from "../../assets/img/bronze.png";
import silver from "../../assets/img/silver.png";
import gold from "../../assets/img/gold.png";
import styled, { css } from "styled-components";
import { push } from "connected-react-router";
import axios from "axios";

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

const TextContainer = styled.div`
  text-align: center;
`;

const Text = styled.div`
  color: ${(props) => props.theme.palette.secondary.light};
  text-align: center;
  font-size: 24px;
  display: inline-block;
  vertical-align: middle;
`;

const SubText = styled.div`
  font-size: 14px;
  opacity: 0.7;
  letter-spacing: -0.5px;
  margin: 0 10px 0 5px;
  display: inline-block;
  vertical-align: middle;
`;

const Badge = styled.img`
  vertical-align: middle;
`;

const Comment = styled.div`
  font-size: 16px;
  opacity: 0.7;
  padding: 8px 0px;
  display: inline-block;
`;

const Label = styled.button`
  font-size: 12px;
  color: #fff;
  display: flex;
  justify-content: center;
  width: 100px;
  padding: 8px;
  float: right;
  border-radius: 20px;
  border: none;
  background-color: ${(props) => props.theme.palette.primary.main};
  ${(props) =>
    props.disabled
      ? css`
          background-color: ${(props) => props.theme.palette.basic.main};
        `
      : css`
          cursor: pointer;
          &:hover {
            opacity: 0.7;
          }
        `}
`;

const LabelContainer = styled.div`
  padding-top: 5px;
  justify-content: space-between;
`;

type Props = {
  open: boolean;
  show: boolean;
  addedExp: number;
  onClose: () => void;
  path: string;
  disabled: boolean;
};

const GetExperienceDialog = (props: Props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const exp = getExperiencePoint(selector);
  const level = getUserLevel(selector);

  const [endExp, setEndExp] = useState(0),
    [startExp, setStartExp] = useState(0),
    [isOpen, setIsOpen] = useState(false);

  // add "| 0" to prevent from returning infinity (0 / number => inifinity)
  const percent = (((exp - startExp) / (endExp - startExp)) * 100) | 0;
  const roundPercent = percent >= 100 ? 100 : percent;

  useEffect(() => {
    const startApiEndpoint = process.env.REACT_APP_API_URL + "experiences/" + level;
    // get experience of next level
    const endApiEndpoint = process.env.REACT_APP_API_URL + "experiences/" + (Number(level) + 1);
    let isMounted = true;

    axios.get(startApiEndpoint).then((resp) => {
      if (isMounted) {
        setStartExp(resp.data.experience);
      }
    });
    axios.get(endApiEndpoint).then((resp) => {
      if (isMounted) {
        setEndExp(resp.data.experience);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (props.open === false) return;

    setTimeout(() => {
      dispatch(editExperiencePoint(props.addedExp));

      if (exp + props.addedExp >= endExp) {
        dispatch(editUserLevel(level + 1));

        setTimeout(() => {
          setIsOpen(true);
        }, 2000);
      }
    }, 200);
  }, [props.open]);

  return (
    <div>
      <Dialog open={props.open} fullWidth={true} maxWidth={"sm"} onClose={props.onClose}>
        <DialogContent>
          <Container>
            <Heading>経験値アップ！！</Heading>
            <Image src={cat} alt="ねこ" width="180px" height="180px" />
            <TextContainer>
              <Text>Congratulations!!</Text>
              <SubText>(+ {props.addedExp} EXP)</SubText>
              {props.show && <Badge src={bronze} width="34px" height="30px" />}
            </TextContainer>
            <ProgressBar percent={roundPercent} />
            <LabelContainer>
              <Comment>次の問題もがんばろう！！</Comment>
              <Label disabled={props.disabled} onClick={() => dispatch(push(props.path))}>
                次のクイズへ
              </Label>
            </LabelContainer>
          </Container>
        </DialogContent>
      </Dialog>
      <LevelUpDialog open={isOpen} onClose={() => setIsOpen(false)} level={level} />
    </div>
  );
};

export default GetExperienceDialog;
