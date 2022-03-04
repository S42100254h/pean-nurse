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
  experiences: {
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
    exp: 0,
  },
  users: {
    list: [],
  },
};

export default initialState;
