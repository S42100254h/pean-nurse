import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent } from "@material-ui/core";
import { editExperiencePoint } from "../../reducks/user/operations";
import { RootState } from "../../types/entity/rootState";
import { getExperiencePoint, getUserLevel } from "../../reducks/user/selectors";
import { ProgressBar } from "../UIkit";
import cat from "../../assets/img/cat.png";
import styled from "styled-components";
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

type Props = {
  open: boolean;
  onClose: () => void;
};

const LevelUpDialog = (props: Props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const exp = getExperiencePoint(selector);
  const level = getUserLevel(selector);

  const [endExp, setEndExp] = useState(0),
    [startExp, setStartExp] = useState(0);

  // add "| 0" to prevent from returning infinity (0 / number => inifinity)
  const percent = (((exp - startExp) / (endExp - startExp)) * 100) | 0;

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
      dispatch(editExperiencePoint(30));
    }, 200);
  }, [props.open]);

  return (
    <div>
      <Dialog open={props.open} fullWidth={true} maxWidth={"sm"} onClose={props.onClose}>
        <DialogContent>
          <Container>
            <Heading>経験値アップ！！</Heading>
            <Image src={cat} alt="ねこ" width="180px" height="180px" />
            <ProgressBar percent={percent} />
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LevelUpDialog;
