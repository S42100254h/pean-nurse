import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Profile } from "../components/Profile";
import styled from "styled-components";
import { Spacer } from "../components/UIkit";
import bronze from "../assets/img/bronze.png";
import silver from "../assets/img/silver.png";
import gold from "../assets/img/gold.png";
import { RootState } from "../types/entity/rootState";
import { fetchBadges } from "../reducks/badges/operations";
import { getBronzeBadges, getSilverBadges, getGoldBadges } from "../reducks/badges/selectors";

const Container = styled.div`
  width: calc(100% - 5rem);
  max-width: 1080px;
  height: auto;
  min-height: 180px;
  margin: 0 auto;
`;

const Text = styled.p`
  font-size: 14px;
`;

const Image = styled.img`
  margin: 5px 0 10px 0;
`;

const BadgeContainer = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background-color: #fff;
  display: inline-block;
  margin: 5px;
`;

const DashBoard = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const bronzeBadges = getBronzeBadges(selector);
  const silverBadges = getSilverBadges(selector);
  const goldBadges = getGoldBadges(selector);

  useEffect(() => {
    dispatch(fetchBadges());
  }, []);

  return (
    <div>
      <Profile />
      <Spacer size="sm" />
      <Container>
        <Image src={bronze} />
        <div>
          {bronzeBadges.length === 0 && <Text>学習中の問題はありません。</Text>}
          {bronzeBadges.map((bronzeBadge) => (
            <BadgeContainer key={bronzeBadge.id}>{bronzeBadge.id}</BadgeContainer>
          ))}
        </div>
      </Container>
      <Container>
        <Image src={silver} />
        <div>
          {silverBadges.length === 0 && <Text>学習中の問題はありません。</Text>}
          {silverBadges.map((silverBadge) => (
            <BadgeContainer key={silverBadge.id}>{silverBadge.id}</BadgeContainer>
          ))}
        </div>
      </Container>
      <Container>
        <Image src={gold} />
        <div>
          {goldBadges.length === 0 && <Text>学習中の問題はありません。</Text>}
          {goldBadges.map((goldBadge) => (
            <BadgeContainer key={goldBadge.id}>{goldBadge.id}</BadgeContainer>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default DashBoard;
