import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Tabs, Tab } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import {
  PasswordInput,
  PrimaryButton,
  SecondaryButton,
  Spacer,
  TabPanel,
  TextInput,
} from "../components/UIkit";
import { useSelector } from "react-redux";
import { getUserEmail, getUserImage, getUserName } from "../reducks/user/selectors";
import Avatar from "@material-ui/core/Avatar";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { deleteImage, editImage, editPassword, editUserInfo } from "../reducks/user/operations";
import { ClickAway } from "../components/ClickAway";
import { Confirmation } from "../components/Confirmation";
import { push } from "connected-react-router";
import { RootState } from "../types/entity/rootState";
import styled from "styled-components";

const Root = styled.div`
  margin-top: 40px;
  display: block;
`;

const Container = styled.div`
  max-width: 1020px;
  margin: 0 auto;
  padding: 0 30px;
`;

const StyledTabs = styled(Tabs)`
  max-width: 600px;
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 16px 0;
  margin: 0 auto;
  & .Mui-selected {
    background-color: #f6f8fa;
  }
`;

const StyledTab = styled(Tab)`
  &:hover {
    background-color: #f6f8fa;
    transition: 0.05s;
  }
`;

const MenuContainer = styled.div`
  max-width: 800px;
  height: 100%;
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 45px 70px;
`;

const Heading = styled.h2`
  font-size: 1.563rem;
  margin: 0 auto 1rem auto;
  text-align: center;
`;

const Image = styled.button`
  position: relative;
  background: none;
  border: none;
`;

const StyledAvatar = styled(Avatar)`
  width: 100px;
  height: 100px;
`;

const StyledPhotoCameraIcon = styled(PhotoCameraIcon)`
  position: absolute;
  top: 75px;
  left: 75px;
  z-index: 1;
  font-size: 30px;
`;

const Setting = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
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

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const inputName = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName],
  );

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setPassword],
  );

  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword],
  );

  const inputCurrentPassword = useCallback(
    (event) => {
      setCurrentPassword(event.target.value);
    },
    [setCurrentPassword],
  );

  const inputPasswordConfirmation = useCallback(
    (event) => {
      setPasswordConfirmation(event.target.value);
    },
    [setPasswordConfirmation],
  );

  useEffect(() => {
    setName(userName);
    setEmail(userEmail);
  }, []);

  const handleModalToggle = useCallback(
    (event) => {
      if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
        return;
      }
      setOpen(!open);
    },
    [setOpen, open],
  );

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) {
      return;
    } else {
      const image = event.target.files[0];
      dispatch(editImage(image));
      setOpen(!open);
    }
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode == 13) {
      dispatch(editPassword(current_password, password, password_confirmation));
    }
  };

  return (
    <Root>
      <Container>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={3}>
            <div>
              <StyledTabs
                orientation="vertical"
                indicatorColor="primary"
                value={value}
                variant="fullWidth"
                onChange={handleChange}
              >
                <StyledTab label="プロフィール" />
                <StyledTab label="パスワード" />
                <StyledTab label="お知らせ" />
                <StyledTab label="お支払情報" />
              </StyledTabs>
            </div>
          </Grid>
          <Grid item xs={12} sm={9}>
            <MenuContainer>
              <TabPanel value={value} index={0}>
                <Image type="button" onClick={(e) => handleModalToggle(e)}>
                  {userImage ? (
                    <StyledAvatar src={userImage.url} />
                  ) : (
                    <StyledAvatar src="/broken-image.jpg" />
                  )}
                  <StyledPhotoCameraIcon />
                </Image>
                <Spacer size="xs" />
                <TextInput
                  fullWidth={true}
                  label={"ユーザー名"}
                  multiline={false}
                  required={true}
                  rows={1}
                  value={name}
                  onChange={inputName}
                />
                <Spacer size="xxs" />
                <TextInput
                  fullWidth={true}
                  label={"メールアドレス"}
                  multiline={false}
                  required={true}
                  rows={1}
                  value={email}
                  onChange={inputEmail}
                />
                <Spacer size="sm" />
                <PrimaryButton
                  label={"更新"}
                  fullWidth={true}
                  onClick={() => {
                    dispatch(editUserInfo(name, email));
                  }}
                />
                <Spacer size="md" />
                <SecondaryButton
                  label={"アカウントを削除される場合はこちら"}
                  fullWidth={true}
                  onClick={() => setIsOpen(!isOpen)}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Heading>パスワード更新</Heading>
                <PasswordInput
                  fullWidth={true}
                  label={"現在のパスワード"}
                  multiline={false}
                  required={true}
                  rows={1}
                  value={current_password}
                  onChange={inputCurrentPassword}
                />
                <Spacer size="xxs" />
                <PasswordInput
                  fullWidth={true}
                  label={"新しいパスワード"}
                  multiline={false}
                  required={true}
                  rows={1}
                  value={password}
                  onChange={inputPassword}
                />
                <Spacer size="xxs" />
                <PasswordInput
                  fullWidth={true}
                  label={"新しいパスワード（確認用）"}
                  multiline={false}
                  required={true}
                  rows={1}
                  value={password_confirmation}
                  onChange={inputPasswordConfirmation}
                  onKeyDown={handleOnKeyDown}
                />
                <Spacer size="sm" />
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
            </MenuContainer>
          </Grid>
          {open && (
            <ClickAway
              onClickAway={handleModalToggle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpload(e)}
              onClick={() => dispatch(deleteImage())}
            />
          )}
          <Confirmation
            isOpen={isOpen}
            onClose={() => setIsOpen(!isOpen)}
            onClickStop={() => setIsOpen(!isOpen)}
            onClickProceed={() => dispatch(push("/deactivate"))}
          />
        </Grid>
      </Container>
    </Root>
  );
};

export default Setting;
