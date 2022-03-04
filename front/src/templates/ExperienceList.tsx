import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { PrimaryButton, SecondaryButton } from "../components/UIkit";
import { DeleteDialog } from "../components/DeleteDialog";
import { push } from "connected-react-router";
import styled from "styled-components";

const Container = styled.div`
  margin: 25px auto;
  width: calc(100% - 20rem);
  max-width: 680px;
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

const ExperienceList = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false),
    [selectedId, setSelectedId] = useState<string | number>(""),
    [experiences, setExperiences] = useState<any>();

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "level", headerName: "レベル", width: 180 },
    { field: "experience", headerName: "経験値", width: 220 },
    {
      field: "detail",
      headerName: "詳細",
      width: 100,
      renderCell: (params: GridCellParams) => (
        <PrimaryButton
          label={"詳細"}
          rowId={params.id}
          onClick={() => dispatch(push("/category/detail/" + params.id))}
        />
      ),
    },
    {
      field: "delete",
      headerName: "削除",
      width: 100,
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

  const rows = experiences;

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <Container>
      <Heading>経験値表</Heading>
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
          dispatch(deleteExperience(selectedId));
          setOpen(false);
        }}
      />
    </Container>
  );
};

export default ExperienceList;
