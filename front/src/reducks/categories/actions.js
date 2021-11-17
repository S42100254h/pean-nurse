export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const fetchCategoriesAction = (payload) => {
  return {
    type: "FETCH_CATEGORIES",
    payload,
  };
};

export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const deleteCategoryAction = (payload) => {
  return {
    type: "DELETE_CATEGORY",
    payload,
  };
};
