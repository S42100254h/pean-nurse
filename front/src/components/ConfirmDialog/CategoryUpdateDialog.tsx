import React from "react";
import { useDispatch } from "react-redux";
import { Dialog, DialogContent } from "@material-ui/core";
import { PrimaryButton, Spacer } from "../UIkit";
import { Card } from "./index";
import { editCategory } from "../../function/category";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  padding: 30px 50px 50px 50px;
`;

const Headline = styled.div`
  color: #4dd0e1;
  font-size: 1.563rem;
  margin: 0 auto 1rem auto;
  text-align: center;
`;

const ImageContainer = styled.div`
  position: relative;
  width: max-content;
  height: 100%;
`;

const Image = styled.img`
  position: relative;
  width: 120px;
  height: 120px;
  margin: 20px;
`;

type Props = {
  id: string;
  open: boolean;
  onClose: () => void;
  category: string;
  caption?: string;
  image?: File | null;
  fileUrl?: string;
  uid?: string;
};

const CategoryUpdateDialog = ({ id, open, onClose, category, caption, image, fileUrl, uid }: Props) => {
  const dispatch = useDispatch();
  return (
    <div>
      <Dialog open={open} onClose={() => onClose()} fullWidth={false} maxWidth={"md"}>
        <DialogContent>
          <Container>
            <Headline>以下の内容でカテゴリーを更新してもよろしいですか？</Headline>
            <Spacer size="xs" />
            <Card text={category} label={"カテゴリー"} />
            {caption && <Card text={caption} label={"見出し"} />}
            {uid && <Card text={uid} label={"ID"} />}
            {image && (
              <ImageContainer>
                <Image src={fileUrl} />
              </ImageContainer>
            )}
            <Spacer size="xxs" />
            <PrimaryButton
              label={"クイズを更新する"}
              fullWidth={true}
              onClick={() => dispatch(editCategory(category, id))}
            />
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryUpdateDialog;
