import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, fetchCategories } from "../reducks/categories/operations";
import { getCategories } from "../reducks/categories/selectors";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { SecondaryButton } from "../components/UIkit";
import { DeleteDialog } from "../components/DeleteDialog";
import { RootState } from "../types/entity/rootState";
import styled from "styled-components";

const Container = styled.div`
  margin: 25px auto;
  width: calc(100% - 20rem);
  max-width: 600px;
`;

const Heading = styled.h2`
  color: #4dd0e1;
  font-size: 1.563rem;
  margin: 0 auto 1.5rem auto;
  text-align: center;
`;

const Wrapper = styled.div`
  width: 100%;
  background-color: #fff;
`;

const CategoryList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const categories = getCategories(selector);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const [open, setOpen] = useState(false),
    [selectedId, setSelectedId] = useState<string | number>("");

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "カテゴリー名", width: 400 },
    {
      field: "delete",
      headerName: "削除",
      width: 120,
      renderCell: (params: GridCellParams) => (
        <SecondaryButton
          label={"削除"}
          rowId={params.id}
          onClick={() => {
            setSelectedId(params.id);
            setOpen(true);
          }}
        />
      ),
    },
  ];

  const sortedCategories = categories.sort((a, b) => {
    // ascending order by updated_at
    return a.created_at > b.created_at ? -1 : 1;
  });

  const rows = sortedCategories.map((category) => ({
    id: category.id,
    name: category.name,
  }));

  return (
    <Container>
      <Heading>カテゴリー一覧</Heading>
      <Wrapper>
        <DataGrid rows={rows} columns={columns} autoHeight pageSize={10} rowsPerPageOptions={[10]} />
      </Wrapper>
      <DeleteDialog
        open={open}
        onClose={() => {
          setSelectedId("");
          setOpen(false);
        }}
        onClickStop={() => setOpen(false)}
        onClickProceed={() => {
          dispatch(deleteCategory(selectedId));
          setOpen(false);
        }}
      />
    </Container>
  );
};

export default CategoryList;
