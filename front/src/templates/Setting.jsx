import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { Tabs, Tab } from "@material-ui/core";
import { TabPanel, TextInput, PrimaryButton } from "../components/UIkit";
import { useSelector } from "react-redux";
import { getUserEmail, getUserImage, getUserName } from "../reducks/users/selectors";
import Avatar from "@material-ui/core/Avatar";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { editUserInfo } from "../reducks/users/operations";
import { ClickAway } from "../components/UIkit";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "40px",
    display: "block",
  },
  container: {
    maxWidth: "1020px",
    width: "100%",
    margin: "0 auto",
    gridTemplateColumns: "minmax(200px, max-content) auto",
    display: "grid",
    gap: "24px",
  },
  tabList: {
    width: "200px",
    height: "240px",
    borderRadius: "4px",
    backgroundColor: "#FEEEED",
    display: "grid",
    padding: "16px 0",
  },
  tabListItem: {
    display: "block",
    height: "25%",
    boxSizing: "border-box",
    padding: "12px 24px",
    "&:hover": {
      backgroundColor: "white",
      transition: "0.05s",
    },
  },
  tabMenu: {
    width: "750px",
    height: "100%",
    borderRadius: "4px",
    backgroundColor: "#FEEEED",
    textAlign: "center",
    padding: "45px 100px",
  },
  imageContainer: {
    position: "relative",
    minwidth: "100%",
    minheight: "100%",
    margin: "0 auto",
    background: "none",
    border: "none",
  },
  avatar: {
    width: "80px",
    height: "80px",
  },
  upload: {
    position: "absolute",
    top: "55px",
    left: "55px",
    zIndex: "1",
  },
}));

const Setting = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const userImage = getUserImage(selector);
  const userName = getUserName(selector);
  const userEmail = getUserEmail(selector);

  const [value, setValue] = useState(0),
    [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [open, setOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const inputName = useCallback((event) => {
    setName(event.target.value);
  }, [setName]);

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, [setEmail]);

  useEffect(() => {
    setName(userName);
    setEmail(userEmail);
  }, []);

  const handleModalToggle = useCallback((event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setOpen(!open);
  },
  [setOpen, open]
  );

  return (
    <div className={classes.root}>
      <div onClose={(e) => handleModalToggle(e)} />
      <div className={classes.container}>
        <div className={classes.tabList}>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            className={classes.tabList}
          >
            <Tab label="プロフィール" />
            <Tab label="パスワード" />
            <Tab label="お知らせ" />
            <Tab label="お支払情報" />
          </Tabs>
        </div>
        <div className={classes.tabMenu}>
          <TabPanel value={value} index={0}>
            <button type="button" className={classes.imageContainer} onClick={(e) => handleModalToggle(e)}>
              {userImage ? (
                <Avatar src={userImage.url} className={classes.avatar} />
              ) : (
                <Avatar src="/broken-image.jpg" className={classes.avatar} />
              )}
              <PhotoCameraIcon className={classes.upload}/>
              {open && (
                <ClickAway onClickAway={handleModalToggle} />
              )}
            </button>
            <div className="module-spacer--extra-small" />
            <TextInput
              fullWidth={true}
              label={"ユーザー名"}
              multiline={false}
              required={true}
              row={1}
              value={name}
              onChange={inputName}
            />
            <TextInput
              fullWidth={true}
              label={"メールアドレス"}
              multiline={false}
              required={true}
              row={1}
              value={email}
              onChange={inputEmail}
            />
            <div className="module-spacer--medium" />
            <PrimaryButton
              label={"更新"}
              onClick={() => {
                dispatch(editUserInfo(name, email));
              }}
            />
            <div className="module-spacer--medium" />
            <a href="#">アカウントを削除される場合はこちら</a>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item three
          </TabPanel>
          <TabPanel value={value} index={3}>
            Item four
          </TabPanel>
        </div>
      </div>
    </div>
  );
};

export default Setting;
