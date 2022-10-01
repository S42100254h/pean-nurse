import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCategories } from "../../reducks/categories/selectors";
import { fetchCategories } from "../../reducks/categories/operations";
import { RootState } from "../../types/entity/rootState";
import { Badge } from "../../types/entity/badge";
import styled from "styled-components";
import cat from "../../assets/img/cat.png";
import { push } from "connected-react-router";

const Text = styled.p`
  font-size: 14px;
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

type Props = {
  badges: Badge[];
};

const ListArea = (props: Props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const categories = getCategories(selector);

  const findCategoryName = (category_id: number) => {
    const selectedCategory = categories.filter((category) => category.id === category_id);
    return selectedCategory[0].name;
  };

  const findCategoryUid = (category_id: number) => {
    const selectedCategory = categories.filter((category) => category.id === category_id);
    return selectedCategory[0].uid;
  };

  const findCategoryImage = (category_id: number) => {
    const selectedCategory = categories.filter((category) => category.id === category_id);
    return selectedCategory[0].image;
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <div>
      {props.badges.length === 0 && <Text>学習中の問題はありません。</Text>}
      {props.badges.map((badge) => (
        <BadgeContainer
          key={badge.id}
          onClick={() => dispatch(push("/courselist/" + findCategoryUid(badge.category_id) + "/study/" + badge.index))}
        >
          <Icon src={findCategoryImage(badge.category_id)?.url} />
          <Caption>
            {findCategoryName(badge.category_id)}
            {badge.index}
          </Caption>
        </BadgeContainer>
      ))}
    </div>
  );
};

export default ListArea;
