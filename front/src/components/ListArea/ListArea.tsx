import React from "react";
import { useDispatch } from "react-redux";
import { Badge } from "../../types/entity/badge";
import { Category } from "../../types/entity/category";
import styled from "styled-components";
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
  width: fit-content;
  height: 60px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background-color: #fff;
  display: inline-block;
  margin: 5px;
  padding: 0 10px;
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
  categories: Category[];
};

const ListArea = (props: Props) => {
  const dispatch = useDispatch();

  const findCategory = (category_id: number) => {
    const selectedCategory = props.categories.filter((category) => category.id === category_id);
    return selectedCategory[0];
  };

  return (
    <div>
      {props.badges.length === 0 && <Text>学習中の問題はありません。</Text>}
      {props.badges.map((badge) => (
        <BadgeContainer
          key={badge.id}
          onClick={() => dispatch(push("/courselist/" + findCategory(badge.category_id).uid + "/study/" + badge.index))}
        >
          {findCategory(badge.category_id) && <Icon src={findCategory(badge.category_id)?.image?.url} />}
          <Caption>
            {findCategory(badge.category_id).name}
            {badge.index}
          </Caption>
        </BadgeContainer>
      ))}
    </div>
  );
};

export default ListArea;
