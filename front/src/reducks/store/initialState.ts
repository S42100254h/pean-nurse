import { RootState } from "../../types/entity/rootState";

const initialState: RootState = {
  admins: {
    isAdminSignedIn: false,
    uid: "",
    name: "",
    email: "",
  },
  categories: {
    list: [],
  },
  loading: {
    state: false,
    text: "",
  },
  notification: {
    isOpen: false,
    variant: "success",
    message: "",
  },
  quizzes: {
    list: [],
  },
  users: {
    isSignedIn: false,
    uid: "",
    name: "",
    email: "",
    image: null,
  },
};

export default initialState;
