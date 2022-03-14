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
import { fetchCategories } from "../reducks/categories/operations";
import { getBronzeBadges, getSilverBadges, getGoldBadges } from "../reducks/badges/selectors";
import { getCategories } from "../reducks/categories/selectors";
import cat from "../assets/img/cat.png";

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

const Icon = styled.img`
  width: 45px;
  height: 45px;
  display: inline-block;
  margin-right: 5px;
`;

const Caption = styled.p`
  font-size: 16px;
  line-height: 60px;
  display: inline-block;
`;

const BadgeContainer = styled.div`
  width: 180px;
  height: 60px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background-color: #fff;
  display: inline-block;
  margin: 5px;
  text-align: center;
  transition-duration: 0.3s;
  &:hover {
    transition-duration: 0.5s;
    box-shadow: 0 0 8px grey;
    opacity: 0.75;
    cursor: pointer;
  }
`;

const DashBoard = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const bronzeBadges = getBronzeBadges(selector);
  const silverBadges = getSilverBadges(selector);
  const goldBadges = getGoldBadges(selector);
  const categories = getCategories(selector);

  const findCategoryName = (category_id: number) => {
    const selectedCategory = categories.filter((category) => category.id === category_id);
    return selectedCategory[0].name;
  };

  useEffect(() => {
    dispatch(fetchBadges());
    dispatch(fetchCategories());
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
            <BadgeContainer key={bronzeBadge.id}>
              <Icon src={cat} />
              <Caption>
                {findCategoryName(bronzeBadge.category_id)}
                {bronzeBadge.index}
              </Caption>
            </BadgeContainer>
          ))}
        </div>
      </Container>
      <Container>
        <Image src={silver} />
        <div>
          {silverBadges.length === 0 && <Text>学習中の問題はありません。</Text>}
          {silverBadges.map((silverBadge) => (
            <BadgeContainer key={silverBadge.id}>
              <Icon src={cat} />
              <Caption>
                {findCategoryName(silverBadge.category_id)}
                {silverBadge.index}
              </Caption>
            </BadgeContainer>
          ))}
        </div>
      </Container>
      <Container>
        <Image src={gold} />
        <div>
          {goldBadges.length === 0 && <Text>学習中の問題はありません。</Text>}
          {goldBadges.map((goldBadge) => (
            <BadgeContainer key={goldBadge.id}>
              <Icon src={cat} />
              <Caption>
                {findCategoryName(goldBadge.category_id)}
                {goldBadge.index}
              </Caption>
            </BadgeContainer>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default DashBoard;
