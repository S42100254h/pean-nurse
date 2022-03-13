import React from "react";
import bronze from "../../assets/img/bronze.png";
import silver from "../../assets/img/silver.png";
import gold from "../../assets/img/gold.png";

type Props = {
  color: "bronze" | "silver" | "gold";
  width?: number;
  height?: number;
};

const Badge = (props: Props) => {
  const colors = {
    bronze: <img src={bronze} width={props.width} height={props.height} />,
    silver: <img src={silver} width={props.width} height={props.height} />,
    gold: <img src={gold} width={props.width} height={props.height} />,
  };

  return colors[props.color];
};

export default Badge;
