const initialState = {
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
    image: "",
  },
};

export default initialState;
