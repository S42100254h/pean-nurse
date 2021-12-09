import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { deleteQuiz, fetchQuizzes } from "../reducks/quizzes/operations";
import { getQuizzes } from "../reducks/quizzes/selectors";
import { DataGrid } from "@mui/x-data-grid";
import { PrimaryButton, SecondaryButton } from "../components/UIkit";
import { DeleteDialog } from "../components/DeleteDialog";
import { push } from "connected-react-router";
import moment from "moment";
import { GridCellParams } from "@mui/x-data-grid";
import { Quiz } from "../types/entity/quiz";
import { RootState } from "../types/entity/rootState";

const useStyles = makeStyles({
  container: {
    margin: "25px auto",
    width: "calc(100% - 20rem)",
    maxWidth: 1080,
  },
  headline: {
    color: "#4dd0e1",
    fontSize: "1.563rem",
    margin: "0 auto 1rem auto",
    textAlign: "center",
  },
});

const QuizList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const quizzes = getQuizzes(selector);

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, []);

  const [open, setOpen] = useState(false),
    [selectedId, setSelectedId] = useState<number | null>(null);

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
      renderCell: (params) =>
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

  const rows = quizzes.map((quiz: Quiz) => {
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
    <div className={classes.container}>
      <h2 className={classes.headline}>クイズ一覧</h2>
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
          setSelectedId(null);
          setOpen(false);
        }}
        onClickStop={() => setOpen(false)}
        onClickProceed={() => {
          dispatch(deleteQuiz(selectedId));
          setOpen(false);
        }}
      />
    </div>
  ); 
};

export default QuizList;
