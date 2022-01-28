import React, { useState } from "react";
import { PrimaryButton, Spacer } from "../components/UIkit";
import { SignUpDialog } from "../components/SignUpDialog";
import styled from "styled-components";

const TopContainer = styled.div`
  height: 320px;
  text-align: center;
`;

const TopHeading = styled.h2`
  font-size: 50px;
  font-weight: bold;
  padding: 50px 0 10px 0;
`;

const TopSubHeading = styled.h3`
  font-size: 40px;
  padding: 10px 0 30px 0;
`;

const MiddleContainer = styled.div`
  height: 400px;
  text-align: center;
  background-color: ${(props) => props.theme.palette.primary.light};
`;

const MiddleHeading = styled.h2`
  font-size: 40px;
  padding: 40px 0 30px 0;
`;

const ReviewContainer = styled.div`
  background-color: #fff;
  height: 600px;
  text-align: center;
`;

const ReviewSubHeading = styled.h3`
  font-size: 20px;
  padding: 40px 0 10px 0;
`;

const ReviewHeading = styled.h2`
  font-size: 36px;
  padding: 0 0 30px 0;
`;

const BottomContainer = styled.div`
  height: 430px;
  text-align: center;
  background-color: #2b546a;
  color: #fff;
`;

const BottomHeading = styled.h2`
  font-size: 30px;
  color: #fff;
  padding: 30px 0 30px 0;
`;

const Voice = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #000;
  padding-bottom: 10px;
  line-height: 20px;
`;

const Message = styled.p`
  line-height: 18px;
`;

const RegisterContainer = styled.div`
  height: 280px;
  text-align: center;
`;

const RegisterSubHeading = styled.h3`
  font-size: 20px;
  padding: 40px 0 10px 0;
`;

const RegisterHeading = styled.h2`
  font-size: 30px;
  padding: 0 0 30px 0;
`;

const Home = () => {
  const [open, setOpen] = useState(false);

  const handleDialogToggle = () => setOpen(!open);

  return (
    <div>
      <TopContainer>
        <TopHeading>看護師 国家試験</TopHeading>
        <TopSubHeading>WEB問題集で学習しよう</TopSubHeading>
        <PrimaryButton
          id={"button"}
          label={"今すぐ始める"}
          onClick={handleDialogToggle}
        />
      </TopContainer>
      <MiddleContainer>
        <MiddleHeading>看護学生から、看護師へ</MiddleHeading>
        <div>※ここに問題の画面を入れ込む※</div>
      </MiddleContainer>
      <ReviewContainer>
        <ReviewSubHeading>看護師 国家試験WEB問題集の</ReviewSubHeading>
        <ReviewHeading>利用者レビュー</ReviewHeading>
        <div>※ここにレビューを２件埋め込む※</div>
      </ReviewContainer>
      <BottomContainer>
        <BottomHeading>看護学生から、看護師になろう</BottomHeading>
        <Voice>「国家試験に合格できるか心配...」</Voice>
        <Voice>「参考書を読むと眠くなって、勉強が進まない...」</Voice>
        <Spacer size="xxs" />
        <Message>そんなあなたが医療の世界に飛び込むお手伝いをしたい！</Message>
        <Message>私たちはこんな思いで、PeANを運営しています。</Message>
        <Spacer size="sm" />
        <Message>看護学生にとって、国家試験は大きな壁です。</Message>
        <Message>国家試験の合否によっては、今後の１年が決まります。</Message>
        <Spacer size="sm" />
        <Message>私たちと一緒に医療の世界へ飛び込みましょう！</Message>
      </BottomContainer>
      <RegisterContainer>
        <RegisterSubHeading>無料会員登録をして、</RegisterSubHeading>
        <RegisterHeading>さっそく始めよう！</RegisterHeading>
        <PrimaryButton
          id={"button"}
          label={"無料会員登録"}
          onClick={handleDialogToggle}
        />
      </RegisterContainer>
      <SignUpDialog
        open={open}
        onClose={handleDialogToggle}
        onClick={handleDialogToggle}
      />
    </div>
  );
};

export default Home;
