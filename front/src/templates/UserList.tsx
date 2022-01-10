import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers } from "../reducks/users/operations";
import { getUsers } from "../reducks/users/selectors";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { PrimaryButton, SecondaryButton } from "../components/UIkit";
import { DeleteDialog } from "../components/DeleteDialog";
import { push } from "connected-react-router";
import { RootState } from "../types/entity/rootState";
import styled from "styled-components";

const Container = styled.div`
  margin: 25px auto;
  width: calc(100% - 20rem);
  max-width: 910px;
`;

const Heading = styled.h2`
  color: #4dd0e1;
  font-size: 1.563rem;
  margin: 0 auto 1rem auto;
  text-align: center;
  
`;

const UserList = () => {
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
    { field: "name", headerName: "ユーザー名", width: 320 },
    { field: "email", headerName: "メールアドレス", width: 300 },
    {
      field: "detail",
      headerName: "詳細",
      width: 100,
      renderCell: (params: GridCellParams) =>
        <PrimaryButton
          label={"詳細"}
          rowId={params.id}
          onClick={() => dispatch(push("/user/detail/" + params.id))}
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
  
  const sortedRows = rows.sort((a, b) => {
    // descending order by id
    return (a.id > b.id) ? -1 : 1;
  });
  
  return (
    <Container>
      <Heading>ユーザー一覧</Heading>
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
    </Container>
  ); 
};

export default UserList;
