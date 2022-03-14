import { RootState } from "../../types/entity/rootState";

const initialState: RootState = {
  admin: {
    isAdminSignedIn: false,
    uid: "",
    name: "",
    email: "",
  },
  badge: {
    id: 0,
    index: 0,
    color: "bronze",
  },
  badges: {
    list: [],
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
    level: 1,
  },
  users: {
    list: [],
  },
};

export default initialState;
