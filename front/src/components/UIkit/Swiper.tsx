import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import arrowLeft from "../../assets/img/arrowLeft.png";
import arrowRight from "../../assets/img/arrowRight.png";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  onClick: (e: number) => void;
};

type ArrowProps = {
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

const LeftWrapper = styled.div`
  display: ${(props) => (props.onClick === null ? "none" : "block")};
  position: absolute;
  top: 110%;
  margin-left: 20px;
`;

const RightWrapper = styled.div`
  display: ${(props) => (props.onClick === null ? "none" : "block")};
  position: absolute;
  top: 110%;
  right: 0;
  margin-right: 20px;
`;

const Image = styled.img`
  height: 40px;
  width: 80px;
  cursor: pointer;
  &:hover {
    opacity: 0.75;
  }
`;

const NextArrow = (props: ArrowProps) => {
  return (
    <RightWrapper onClick={props.onClick}>
      <Image src={arrowRight} alt="arrow_right" />
    </RightWrapper>
  );
};

const PrevArrow = (props: ArrowProps) => {
  return (
    <LeftWrapper onClick={props.onClick}>
      <Image src={arrowLeft} alt="arrow_left" />
    </LeftWrapper>
  );
};

export const Swiper = (props: Props) => {
  const slider = React.useRef<Slider>(null);

  const gotoNext = () => {
    slider?.current?.slickNext();
  };

  const gotoPrev = () => {
    slider?.current?.slickPrev();
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    draggable: true,
    nextArrow: <NextArrow onClick={() => gotoNext()} />,
    prevArrow: <PrevArrow onClick={() => gotoPrev()} />,
    beforeChange: (current: number, next: number) => props.onClick(next),
  };

  return <Slider {...settings}>{props.children}</Slider>;
};

export default Swiper;
