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

export const EDIT_USER_INFO = "EDIT_USER_INFO";
export const editUserInfoAction = (payload) => {
  return {
    type: "EDIT_USER_INFO",
    payload,
  };
};

export const EDIT_USER_IMAGE = "EDIT_USER_IMAGE";
export const editUserImageAction = (payload) => {
  return {
    type: "EDIT_USER_IMAGE",
    payload,
  };
};

export const DELETE_USER_IMAGE = "DELETE_USER_IMAGE";
export const deleteUserImageAction = () => {
  return {
    type: "DELETE_USER_IMAGE",
  };
};
