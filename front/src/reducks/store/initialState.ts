import { RootState } from "../../types/entity/rootState";

const initialState: RootState = {
  admin: {
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
  user: {
    id: "",
    isSignedIn: false,
    uid: "",
    name: "",
    email: "",
    image: null,
  },
  users: {
    list: [],
  },
};

export default initialState;
