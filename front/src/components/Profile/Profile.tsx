import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { getUserLevel, getUserName, getUserImage } from "../../reducks/user/selectors";
import { getStacks } from "../../reducks/stacks/selectors";
import { RootState } from "../../types/entity/rootState";
import styled from "styled-components";

const GridContainer = styled(Grid)`
  margin: 30px auto;
  max-width: 600px;
  padding: 20px 40px;
  height: auto;
  width: calc(100% - 2rem);
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

const GridCenter = styled(Grid)`
  text-align: center;
`;

const StyledAvatar = styled(Avatar)`
  width: 100px;
  height: 100px;
  margin: 0 auto;
`;

const Name = styled.p`
  font-size: 22px;
`;

const Level = styled.p`
  font-size: 20px;
`;

const Caption = styled.p`
  font-size: 14px;
`;

const Cleard = styled.p`
  font-size: 24px;
`;

const Profile = () => {
  const selector = useSelector((state: RootState) => state);
  const userName = getUserName(selector);
  const userImage = getUserImage(selector);
  const userLevel = getUserLevel(selector);
  const stacks = getStacks(selector);

  return (
    <GridContainer container spacing={1} direction="row" alignItems="center">
      <Grid item xs={4}>
        {userImage ? <StyledAvatar src={userImage.url} /> : <StyledAvatar src="/broken-image.jpg" />}
      </Grid>
      <GridCenter item xs={4}>
        <Name>{userName}</Name>
        <Level>Lv. {userLevel}</Level>
      </GridCenter>
      <GridCenter item xs={4}>
        <Cleard>{stacks.length}</Cleard>
        <Caption>総問題クリア数</Caption>
      </GridCenter>
    </GridContainer>
  );
};

export default Profile;
