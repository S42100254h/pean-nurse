export const SIGN_UP = "SIGN_UP";
export const signUpAction = (payload) => {
  return {
    type: "SIGN_UP",
    payload
  };
};

export const SIGN_IN = "SIGN_IN";
export const signInAction = (payload) => {
  return {
    type: "SIGN_IN",
    payload,
  };
};

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
  return {
    type: "SIGN_OUT"
  };
};
