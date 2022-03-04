import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { SecondaryButton } from "../components/UIkit";
import { fetchExperiences, deleteExperience } from "../reducks/experiences/operations";
import { getExperiences } from "../reducks/experiences/selectors";
import { DeleteDialog } from "../components/DeleteDialog";
import styled from "styled-components";
import { RootState } from "../types/entity/rootState";

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
  const selector = useSelector((state: RootState) => state);
  const experiences = getExperiences(selector);

  const [open, setOpen] = useState(false),
    [selectedId, setSelectedId] = useState<string | number>("");

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "level", headerName: "レベル", width: 230 },
    { field: "experience", headerName: "経験値", width: 270 },
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

  const sortedExperiences = experiences.sort((a, b) => {
    // descending order by level
    return a.level < b.level ? -1 : 1;
  });

  const rows = sortedExperiences.map((experience) => ({
    id: experience.id,
    level: experience.level,
    experience: experience.experience,
  }));

  useEffect(() => {
    dispatch(fetchExperiences());
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
