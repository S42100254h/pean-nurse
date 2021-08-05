const initialState = {
  loading: {
    state: false,
    text: "",
  },
  notification: {
    isOpen: false,
    variant: "success",
    message: "",
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
