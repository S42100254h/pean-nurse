import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router";
import { PrimaryButton, SecondaryButton, Spacer, TextInput } from "../components/UIkit";
import { Add, Close } from "@material-ui/icons";
import { CategoryUpdateDialog } from "../components/ConfirmDialog";
import { SetCategoryProfile } from "../components/SetCategoryProfile";
import { DeleteDialog } from "../components/DeleteDialog";
import { push } from "connected-react-router";
import axios from "axios";
import styled from "styled-components";
import { deleteCategory } from "../reducks/categories/operations";

const Container = styled.div`
  margin: 30px auto;
  max-width: 800px;
  padding: 35px 70px;
  height: auto;
  width: calc(100% - 2rem);
  background-color: #fff;
  box-shadow: 0 0 1px grey;
`;

const Heading = styled.h2`
  color: #4dd0e1;
  font-size: 1.563rem;
  margin: 0 auto 1rem auto;
  text-align: center;
`;

const Label = styled.label<LabelProps>`
  color: #fff;
  display: flex;
  justify-content: center;
  width: 100px;
  padding: 8px;
  border-radius: 20px;
  background-color: #4dd0e1;
  cursor: pointer;
  font-size: 12px;
  float: left;
  margin-bottom: 15px;
  &:hover {
    opacity: 0.7;
  }
  background-color: ${(props) => (props.open ? props.theme.palette.secondary.main : props.theme.palette.primary.main)};
`;

const StyledAdd = styled(Add)`
  float: right;
  color: #f5f5f5;
  font-size: 14px;
  margin-right: 3px;
`;

const StyledClose = styled(Close)`
  float: right;
  color: #f5f5f5;
  font-size: 14px;
  margin-right: 3px;
`;

type LabelProps = {
  open: boolean;
};

type MatchParams = {
  id: string;
};

const CategoryDetail = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch<MatchParams>();
  const [category, setCategory] = useState(""),
    [caption, setCaption] = useState(""),
    [image, setImage] = useState<File | null>(null),
    [fileUrl, setFileUrl] = useState<string>(""),
    [uid, setUid] = useState(""),
    [dialogOpen, setDialogOpen] = useState(false),
    [isOpen, setIsOpen] = useState(false),
    [open, setOpen] = useState(false);

  const inputCategory = useCallback(
    (event) => {
      setCategory(event.target.value);
    },
    [setCategory],
  );

  const handleDialogClose = () => setDialogOpen(false);

  const handleDialogOpen = () => {
    if (category === "") return;
    setDialogOpen(true);
  };

  const handleOpenToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const categoryApiEndpoint = process.env.REACT_APP_API_URL + "categories/" + match.params.id;
    const categoryProfileApiEndpoint =
      process.env.REACT_APP_API_URL + "category_profiles?category_id=" + match.params.id;
    let isMounted = true;

    axios.get(categoryApiEndpoint).then((resp) => {
      if (isMounted) {
        setCategory(resp.data.name);
      }
    });

    axios.get(categoryProfileApiEndpoint).then((resp) => {
      if (isMounted) {
        setCaption(resp.data.caption);
        setImage(resp.data.image);
        setFileUrl(resp.data.image.url);
        setUid(resp.data.uid);
        setOpen(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Container>
      <Heading>カテゴリー詳細</Heading>
      <Spacer size="xs" />
      <TextInput
        fullWidth={true}
        label={"カテゴリー名"}
        required={true}
        rows={1}
        value={category}
        onChange={inputCategory}
      />
      <Spacer size="xs" />
      <Label onClick={handleOpenToggle} open={open}>
        {!open ? <StyledAdd /> : <StyledClose />}
        {!open ? "詳細を追加" : "閉じる"}
      </Label>
      {open && (
        <SetCategoryProfile
          image={image}
          fileUrl={fileUrl}
          caption={caption}
          uid={uid}
          setImage={setImage}
          setFileUrl={setFileUrl}
          setCaption={setCaption}
          setUid={setUid}
        />
      )}
      <Spacer size="sm" />
      <PrimaryButton
        label={"カテゴリーを更新する"}
        fullWidth={true}
        disabled={open ? !category || !caption || !image || !uid : !category}
        onClick={() => handleDialogOpen()}
      />
      <Spacer size="xs" />
      <SecondaryButton label={"カテゴリーを削除する"} fullWidth={true} onClick={() => setIsOpen(true)} />
      <CategoryUpdateDialog id={match.params.id} category={category} open={dialogOpen} onClose={handleDialogClose} />
      <DeleteDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onClickStop={() => setIsOpen(false)}
        onClickProceed={() => {
          dispatch(deleteCategory(match.params.id));
          setIsOpen(false);
          setTimeout(() => {
            dispatch(push("/category/list"));
          }, 0);
        }}
      />
    </Container>
  );
};

export default CategoryDetail;
