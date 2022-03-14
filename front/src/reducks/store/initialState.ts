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
    category_id: 0,
    created_at: "",
    updated_at: "",
  },
  badges: {
    bronze: [],
    silver: [],
    gold: [],
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
