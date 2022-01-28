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
