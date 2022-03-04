import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { getUserLevel, getUserName, getUserImage } from "../../reducks/user/selectors";
import { RootState } from "../../types/entity/rootState";
import styled from "styled-components";

const GridContainer = styled(Grid)`
  margin: 30px auto;
  max-width: 600px;
  padding: 20px 50px;
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
  margin: 0 20px;
`;

const Name = styled.p`
  font-size: 18px;
`;

const Level = styled.p`
  font-size: 18px;
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

  return (
    <GridContainer container spacing={1} direction="row" alignItems="center">
      <Grid item xs={3}>
        {userImage ? <StyledAvatar src={userImage.url} /> : <StyledAvatar src="/broken-image.jpg" />}
      </Grid>
      <GridCenter item xs={3}>
        <Name>{userName}</Name>
        <Level>Lv. 1</Level>
      </GridCenter>
      <GridCenter item xs={3}>
        <Cleard>1</Cleard>
        <Caption>総演習クリア数</Caption>
      </GridCenter>
      <GridCenter item xs={3}>
        <Cleard>1</Cleard>
        <Caption>修了コース数</Caption>
      </GridCenter>
    </GridContainer>
  );
};

export default Profile;
