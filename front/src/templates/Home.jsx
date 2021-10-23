import React from "react";
import { makeStyles } from "@material-ui/core";
import { PrimaryButton } from "../components/UIkit";

const useStyles = makeStyles((theme) => ({
  topContainer: {
    height: 320,
    textAlign: "center",
  },
  topHeading: {
    fontSize: 50,
    fontWeight: "bold",
    padding: "50px 0 10px 0",
  },
  topSubHeading: {
    fontSize: 40,
    padding: "10px 0 30px 0",
  },
  middleContainer: {
    height: 400,
    textAlign: "center",
    backgroundColor: theme.palette.primary.light,
  },
  middleHeading: {
    fontSize: 40,
    padding: "40px 0 30px 0",
  },
  reviewContainer: {
    backgroundColor: "#fff",
    height: 600,
    textAlign: "center",
  },
  reviewSubHeading: {
    fontSize: 20,
    padding: "40px 0 10px 0",
  },
  reviewHeading: {
    fontSize: 36,
    padding: "0px 0 30px 0",
  },
  bottomContainer: {
    height: 430,
    textAlign: "center",
    backgroundColor: "#2B546A",
    color: "#fff",
  },
  bottomHeading: {
    fontSize: 30,
    color: "#fff",
    padding: "30px 0 30px 0",
  },
  voice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    padding: "5px 0",
  },
  message: {
    padding: "3px 0",
  },
  registerContainer: {
    height: 280,
    textAlign: "center",
  },
  registerSubHeading: {
    fontSize: 20,
    padding: "40px 0 10px 0",
  },
  registerHeading: {
    fontSize: 30,
    padding: "0 0 30px 0",
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.topContainer}>
        <div className={classes.topHeading}>看護師 国家試験</div>
        <div className={classes.topSubHeading}>WEB問題集で学習しよう</div>
        <PrimaryButton
          id={"button"}
          label={"今すぐ始める"}
          onClick={() => console.log("click!")}
        />
      </div>   
      <div className={classes.middleContainer}>
        <div className={classes.middleHeading}>看護学生から、看護師へ</div>
        <div>※ここに問題の画面を入れ込む※</div>
      </div>
      <div className={classes.reviewContainer}>
        <div className={classes.reviewSubHeading}>看護師 国家試験WEB問題集の</div>
        <div className={classes.reviewHeading}>利用者レビュー</div>
        <div>※ここにレビューを２件埋め込む※</div>
      </div>
      <div className={classes.bottomContainer}>
        <div className={classes.bottomHeading}>看護学生から、看護師になろう</div>
        <div className={classes.voice}>「国家試験に合格できるか心配...」</div>
        <div className={classes.voice}>「参考書を読むと眠くなって、勉強が進まない...」</div>
        <div className="module-spacer--extra-extra-small" />
        <div className={classes.message}>そんなあなたが医療の世界に飛び込むお手伝いをしたい！</div>
        <div>私たちはこんな思いで、PeANを運営しています。</div>
        <div className="module-spacer--small" />
        <div className={classes.message}>看護学生にとって、国家試験は大きな壁です。</div>
        <div>国家試験の合否によっては、今後の１年が決まります。</div>
        <div className="module-spacer--small" />
        <div>私たちと一緒に医療の世界へ飛び込みましょう！</div>
      </div>
      <div className={classes.registerContainer}>
        <div className={classes.registerSubHeading}>無料会員登録をして、</div>
        <div className={classes.registerHeading}>さっそく始めよう！</div>
        <PrimaryButton
          id={"button"}
          label={"無料会員登録"}
          onClick={() => console.log("click!")}
        />
      </div>
    </div>
  );
};

export default Home;
