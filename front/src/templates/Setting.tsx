import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { Tabs, Tab } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { TabPanel, TextInput, PasswordInput, PrimaryButton, SecondaryButton } from "../components/UIkit";
import { useSelector } from "react-redux";
import { getUserEmail, getUserImage, getUserName } from "../reducks/users/selectors";
import Avatar from "@material-ui/core/Avatar";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { deleteImage, editImage, editPassword, editUserInfo } from "../reducks/users/operations";
import { ClickAway } from "../components/ClickAway";
import { Confirmation } from "../components/Confirmation";
import { push } from "connected-react-router";

const useStyles = makeStyles({
  root: {
    marginTop: "40px",
    display: "block",
  },
  container: {
    maxWidth: "1020px",
    margin: "0 auto",
    padding: "0 30px",
  },
  tabList: {
    maxWidth: 600,
    borderRadius: "4px",
    backgroundColor: "#fff",
    border: "1px solid rgba(0,0,0,0.1)",
    padding: "16px 0",
    margin: "0 auto",
    "& .Mui-selected": {
      backgroundColor: "#F6F8FA",
    },
  },
  tabListItem: {
    "&:hover": {
      backgroundColor: "#F6F8FA",
      transition: "0.05s",
    },
  },
  tabMenu: {
    maxWidth: "800px",
    height: "100%",
    borderRadius: "4px",
    backgroundColor: "#fff",
    border: "1px solid rgba(0,0,0,0.1)",
    textAlign: "center",
    padding: "45px 70px",
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
    width: "100px",
    height: "100px",
  },
  upload: {
    position: "absolute",
    top: "75px",
    left: "75px",
    zIndex: 1,
  },
  headline: {
    fontSize: "1.563rem",
    margin: "0 auto 1rem auto",
    textAlign: "center",
  },
});

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
    [password, setPassword] = useState(""),
    [current_password, setCurrentPassword] = useState(""),
    [password_confirmation, setPasswordConfirmation] = useState(""),
    [open, setOpen] = useState(false),
    [isOpen, setIsOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const inputName = useCallback((event) => {
    setName(event.target.value);
  }, [setName]);

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, [setPassword]);

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value);
  }, [setPassword]);

  const inputCurrentPassword = useCallback((event) => {
    setCurrentPassword(event.target.value);
  }, [setCurrentPassword]);

  const inputPasswordConfirmation = useCallback((event) => {
    setPasswordConfirmation(event.target.value);
  }, [setPasswordConfirmation]);

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

  const handleUpload = (e) => {
    const image = e.target.files[0];
    if (image === undefined) {
      return;
    } else {
      dispatch(editImage(image));
      setOpen(!open);
    }
  };

  const handleOnKeyDown = (event) => {
    if (event.keyCode === 13) {
      dispatch(editPassword(current_password, password, password_confirmation));
    }
  };

  return (
    <div className={classes.root}>
      <div onClose={(e) => handleModalToggle(e)} />
      <div className={classes.container}>
        <Grid container spacing={4} justify="center">
          <Grid item xs={12} sm={3}>
            <div>
              <Tabs
                orientation="vertical"
                indicatorColor="primary"
                value={value}
                variant="fullWidth"
                onChange={handleChange}
                className={classes.tabList}
              >
                <Tab className={classes.tabListItem} label="プロフィール" />
                <Tab className={classes.tabListItem} label="パスワード" />
                <Tab className={classes.tabListItem} label="お知らせ" />
                <Tab className={classes.tabListItem} label="お支払情報" />
              </Tabs>
            </div>
          </Grid>
          <Grid item xs={12} sm={9}>
            <div className={classes.tabMenu}>
              <TabPanel value={value} index={0}>
                <button type="button" className={classes.imageContainer} onClick={(e) => handleModalToggle(e)}>
                  {userImage ? (
                    <Avatar src={userImage.url} className={classes.avatar} />
                  ) : (
                    <Avatar src="/broken-image.jpg" className={classes.avatar} />
                  )}
                  <PhotoCameraIcon style={{ fontSize: 30 }} className={classes.upload} />
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
                <div className="module-spacer--extra-extra-small" />
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
                  fullWidth={true}
                  onClick={() => {
                    dispatch(editUserInfo(name, email));
                  }}
                />
                <div className="module-spacer--large" />
                <SecondaryButton
                  label={"アカウントを削除される場合はこちら"}
                  fullWidth={true}
                  onClick={() => setIsOpen(!isOpen)}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <h2 className={classes.headline}>パスワード更新</h2>
                <PasswordInput
                  fullWidth={true}
                  label={"現在のパスワード"}
                  multiline={false}
                  required={true}
                  row={1}
                  value={current_password}
                  onChange={inputCurrentPassword}
                />
                <div className="module-spacer--extra-extra-small" />
                <PasswordInput
                  fullWidth={true}
                  label={"新しいパスワード"}
                  multiline={false}
                  required={true}
                  row={1}
                  value={password}
                  onChange={inputPassword}
                />
                <div className="module-spacer--extra-extra-small" />
                <PasswordInput
                  fullWidth={true}
                  label={"新しいパスワード（確認用）"}
                  multiline={false}
                  required={true}
                  row={1}
                  value={password_confirmation}
                  onChange={inputPasswordConfirmation}
                  onKeyDown={handleOnKeyDown}
                />
                <div className="module-spacer--medium" />
                <PrimaryButton
                  label={"更新"}
                  fullWidth={true}
                  disabled={!current_password || !password || !password_confirmation}
                  onClick={() => {
                    dispatch(editPassword(current_password, password, password_confirmation));
                  }}
                />
              </TabPanel>
              <TabPanel value={value} index={2}>
                お知らせは随時こちらにアップロードします。
              </TabPanel>
              <TabPanel value={value} index={3}>
                現在は無料コースのみです。
              </TabPanel>
            </div>
          </Grid>
          {open && (
            <ClickAway onClickAway={handleModalToggle} onChange={(e) => handleUpload(e)} onClick={() => dispatch(deleteImage())} />
          )}
          <Confirmation
            isOpen={isOpen}
            onClose={() => setIsOpen(!isOpen)}
            onClickStop={() => setIsOpen(!isOpen)}
            onClickProceed={() => dispatch(push("/deactivate"))}
          />
        </Grid>
      </div>
    </div>
  );
};

export default Setting;