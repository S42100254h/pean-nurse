import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Box, IconButton, Toolbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { push } from "connected-react-router";
import pean from "../../assets/img/pean.png";
import { ClosableDrawer } from "./index";
import { SignInDialog } from "../SignInDialog";
import { SignUpDialog } from "../SignUpDialog";
import { DropDown } from "../UIkit";
import { getSignedIn } from "../../reducks/user/selectors";
import { getAdminSignedIn } from "../../reducks/admin/selectors";
import { adminSignOut } from "../../reducks/admin/operations";
import { RootState } from "../../types/entity/rootState";
import styled from "styled-components";

const Root = styled(Box)`
  flex-grow: 1;
  z-index: 9999;
`;

const Left = styled.div`
  height: 98%;
  margin-right: auto;
`;

const Right = styled.div`
  height: 98%;
  margin-left: auto;
`;

const StyledAppBar = styled(AppBar)`
    background-color: #fff;
    height: 60px;
`;

const StyledToolbar = styled(Toolbar)`
  width: 100%;
`

const Image = styled.img`
  max-height: 50px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  };
`;

const HeaderItem = styled.p`
  color: #696969;
  cursor: pointer;
  font-size: 14px;
  margin: 0 0 0 15px;
  line-height: 60px;
  height: 100%;
  float: left;
  &:hover {
    border-bottom: 5px solid #55AFD6;
    transition: 0.075s;
  };
`;

const ButtonWrapper = styled(Box)`
  margin: 0 0 0 auto;
`;

const Header = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const isSignedIn = getSignedIn(selector);
  const isAdminSignedIn = getAdminSignedIn(selector);

  type Menu = {
    id: string;
    value: string;
    label: string;
  };

  const [open, setOpen] = useState(false),
    [isSignInOpen, setIsSignInOpen] = useState(false),
    [isSignUpOpen, setIsSignUpOpen] = useState(false),
    [anchorEl, setAnchorEl] = useState<Element | null>(null),
    [menus, setMenus] = useState<Menu[]>([]);
  
  const dropDownOpen = Boolean(anchorEl);
  
  const userMenu: Menu[] = [
    {
      label: "ユーザー一覧",
      id: "userlist",
      value: "/user/list",
    },
  ];
  
  const quizMenu: Menu[] = [
    {
      label: "クイズ一覧",
      id: "quizlist",
      value: "/quiz/list"
    },
    {
      label: "クイズ作成",
      id: "createquiz",
      value: "/quiz/create",
    },
  ];
  
  const categoryMenu: Menu[] = [
    {
      label: "カテゴリー一覧",
      id: "categorylist",
      value: "/category/list",
    },
    {
      label: "カテゴリー作成",
      id: "createcategory",
      value: "/category/create",
    },
  ];
  
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, menus: Menu[]) => {
    setAnchorEl(event.currentTarget);
    setMenus(menus);
  };

  const handleClose = () => setAnchorEl(null);

  const handleDrawerToggle = () => setOpen(!open);
  const handleSignInDialogToggle = () => setIsSignInOpen(!isSignInOpen);
  const handleSignUpDialogToggle = () => setIsSignUpOpen(!isSignUpOpen);

  return (
    <Root>
      {isAdminSignedIn ? (
        <Box>
          <StyledAppBar position="fixed">
            <StyledToolbar>
              <Image src={pean} alt="logo" onClick={() => dispatch(push("/management"))} />
              <Left>
                <HeaderItem onClick={() => dispatch(push("/management"))}>ホーム</HeaderItem>
                <HeaderItem onClick={(event) => handleClick(event, userMenu)}>ユーザー管理</HeaderItem>
                <HeaderItem onClick={(event) => handleClick(event, quizMenu)}>クイズ管理</HeaderItem>
                <HeaderItem onClick={(event) => handleClick(event, categoryMenu)}>カテゴリー管理</HeaderItem>
              </Left>
              <Right>
                <HeaderItem onClick={() => dispatch(adminSignOut())}>サインアウト</HeaderItem>
              </Right>
            </StyledToolbar>
            <DropDown
              anchorEl={anchorEl}
              open={dropDownOpen}
              onClose={() => handleClose()}
              menus={menus}
            />
          </StyledAppBar>
        </Box>
      ) : (
        <Box>
          <StyledAppBar position="fixed">
            {isSignedIn ? (
              <StyledToolbar>
                <Image src={pean} alt="logo" onClick={() => dispatch(push("/dashboard"))} />
                <Left>
                  <HeaderItem onClick={() => dispatch(push("/dashboard"))}>ダッシュボード</HeaderItem>
                  <HeaderItem onClick={() => dispatch(push("/courselist"))}>コース一覧</HeaderItem>
                  <HeaderItem onClick={() => dispatch(push("/help"))}>ヘルプ</HeaderItem>
                </Left>
                <ButtonWrapper>
                  <IconButton style={{ padding: "8px" }} onClick={handleDrawerToggle}>
                    <MenuIcon />
                  </IconButton>
                </ButtonWrapper>
              </StyledToolbar>
            ) : (
              <StyledToolbar>
                <Image src={pean} alt="logo" onClick={() => dispatch(push("/"))} />
                <Right>
                  <HeaderItem onClick={handleSignInDialogToggle}>サインイン</HeaderItem>
                  <HeaderItem onClick={handleSignUpDialogToggle}>無料会員登録</HeaderItem>
                </Right>
              </StyledToolbar>
            )}
          </StyledAppBar>
          <ClosableDrawer open={open} onClose={handleDrawerToggle} />
          <SignInDialog open={isSignInOpen} onClose={handleSignInDialogToggle} onClick={handleSignInDialogToggle} />
          <SignUpDialog open={isSignUpOpen} onClose={handleSignUpDialogToggle} onClick={handleSignUpDialogToggle} />
        </Box>
      )}
    </Root>
  );
};

export default Header;
