import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuiz, fetchQuizzes } from "../reducks/quizzes/operations";
import { getQuizzes } from "../reducks/quizzes/selectors";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { PrimaryButton, SecondaryButton } from "../components/UIkit";
import { DeleteDialog } from "../components/DeleteDialog";
import { push } from "connected-react-router";
import { RootState } from "../types/entity/rootState";
import moment from "moment";
import styled from "styled-components";

const Container = styled.div`
  margin: 25px auto;
  width: calc(100% - 20rem);
  max-width: 1080px;
`;

const Heading = styled.h2`
  color: #4dd0e1;
  font-size: 1.563rem;
  margin: 0 auto 1rem auto;
  text-align: center;
`;

const QuizList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const quizzes = getQuizzes(selector);

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, []);

  const [open, setOpen] = useState(false),
    [selectedId, setSelectedId] = useState<string | number>("");

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "title", headerName: "タイトル", width: 510 },
    { field: "created_at", headerName: "作成日", width: 140 },
    { field: "updated_at", headerName: "更新日", width: 140 },
    {
      field: "detail",
      headerName: "詳細",
      width: 100,
      renderCell: (params: GridCellParams) =>
        <PrimaryButton
          label={"詳細"}
          rowId={params.id}
          onClick={() => dispatch(push("/quiz/detail/" + params.id))}
        />
    },
    {
      field: "delete",
      headerName: "削除",
      width: 100,
      renderCell: (params: GridCellParams) =>
        <SecondaryButton
          label={"削除"}
          rowId={params.id}
          onClick={() => {
            setSelectedId(params.id);
            setOpen(true);
          }}
        />
    },
  ];

  const sortedQuizzes = quizzes.sort((a, b) => {
    // ascending order by updated_at
    return (a.updated_at > b.updated_at) ? -1 : 1;
  });

  const rows = sortedQuizzes.map((quiz) => {
    return (
      {
        id: quiz.id,
        title: quiz.title,
        created_at: moment(quiz.created_at).fromNow(),
        updated_at: moment(quiz.updated_at).fromNow(),
      }
    );
  });

  return (
    <Container>
      <Heading>クイズ一覧</Heading>
      <div style={{ width: "100%", backgroundColor: "#fff" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
      <DeleteDialog
        open={open}
        onClose={() => {
          setSelectedId("");
          setOpen(false);
        }}
        onClickStop={() => setOpen(false)}
        onClickProceed={() => {
          dispatch(deleteQuiz(selectedId));
          setOpen(false);
        }}
      />
    </Container>
  ); 
};

export default QuizList;
