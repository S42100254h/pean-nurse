export const isValidEmailFormat = (email: string) => {
  const regex = /([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})/i;
  return regex.test(email);
};

export const isValidRequiredInput = (...args: any) => {
  let validator = true;
  for (let i = 0; i < args.length; i = (i + 1) | 0) {
    if (args[i] === "") {
      validator = false;
    }
  }
  return validator;
};

export const isValidPassword = (password: string, confirmPassword: string) => {
  let validator = true;
  if (password !== confirmPassword) {
    validator = false;
  }
  return validator;
};

export const getAuthentication = () => {
  const auth_token = localStorage.getItem("access-token") || "";
  const client = localStorage.getItem("client") || "";
  const uid = localStorage.getItem("uid") || "";
  const headers = { "access-token": auth_token, client: client, uid: uid };
  return headers;
};

export const _sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
