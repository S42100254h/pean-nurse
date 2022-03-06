import React, { ReactNode } from "react";
import Confetti from "react-confetti";

type Props = {
  children: ReactNode;
  width: number;
  height: number;
};

const Reward = ({ children, width, height }: Props) => {
  return (
    <>
      <Confetti width={width} height={height} recycle={false} />
      {children}
    </>
  );
};

export default Reward;
