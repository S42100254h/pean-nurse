export const ADMIN_SIGN_IN = "ADMIN_SIGN_IN";
export const adminSignInAction = (payload) => {
  return {
    type: "ADMIN_SIGN_IN",
    payload,
  };
};

export const ADMIN_SIGN_OUT = "ADMIN_SIGN_OUT";
export const adminSignOutAction = () => {
  return {
    type: "ADMIN_SIGN_OUT"
  };
};
