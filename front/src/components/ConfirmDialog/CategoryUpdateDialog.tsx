import React from "react";
import { useDispatch } from "react-redux";
import { Dialog, DialogContent } from "@material-ui/core";
import { PrimaryButton, Spacer } from "../UIkit";
import { Category } from "./index";
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

type Props = {
  category: string;
  open: boolean;
  onClose: () => void;
  id: string;
};

const CategoryUpdateDialog = ({ category, open, onClose, id }: Props) => {
  const dispatch = useDispatch();
  return (
    <div>
      <Dialog open={open} onClose={() => onClose()} fullWidth={false} maxWidth={"md"}>
        <DialogContent>
          <Container>
            <Headline>以下の内容でカテゴリーを更新してもよろしいですか？</Headline>
            <Spacer size="xs" />
            <Category category={category} label={"カテゴリー"} />
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
