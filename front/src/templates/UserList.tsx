import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { deleteUser, fetchUsers } from "../reducks/users/operations";
import { getUsers } from "../reducks/users/selectors";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { PrimaryButton, SecondaryButton } from "../components/UIkit";
import { DeleteDialog } from "../components/DeleteDialog";
import { push } from "connected-react-router";
import moment from "moment";
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

const UserList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const users = getUsers(selector);
  
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  
  const [open, setOpen] = useState(false),
    [selectedId, setSelectedId] = useState<string | number>("");

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "ユーザー名", width: 200 },
    { field: "email", headerName: "メールアドレス", width: 300 },
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
  
  const rows = users.map((user) => {
    return (
      {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    );
  });
  
  return (
    <div className={classes.container}>
      <h2 className={classes.headline}>ユーザー一覧</h2>
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
          dispatch(deleteUser(selectedId));
          setOpen(false);
        }}
      />
    </div>
  ); 
  
};

export default UserList;
