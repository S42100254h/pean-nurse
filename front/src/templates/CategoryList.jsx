import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { deleteCategory, fetchCategories } from "../reducks/categories/operations";
import { getCategories } from "../reducks/categories/selectors";
import { DataGrid } from "@mui/x-data-grid";
import { SecondaryButton } from "../components/UIkit";
import { push } from "connected-react-router";

const useStyles = makeStyles({
  container: {
    margin: "25px auto",
    width: "calc(100% - 20rem)",
    maxWidth: 600,
  },
  headline: {
    color: "#4dd0e1",
    fontSize: "1.563rem",
    margin: "0 auto 1.5rem auto",
    textAlign: "center",
  },
});

const CategoryList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const categories = getCategories(selector);
  
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const [open, setOpen] = useState(false),
    [selectedId, setSelectedId] = useState("");
  
  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "カテゴリー名", width: 400 },
    {
      field: "delete",
      headerName: "削除",
      width: 120,
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

  const rows = categories;
  
  return (
    <div className={classes.container}>
      <div className={classes.headline}>カテゴリー一覧</div>
      <div style={{ width: "100%", backgroundColor: "#fff" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
    </div>
  );
};

export default CategoryList;
