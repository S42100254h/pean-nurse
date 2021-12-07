export type InitialState = {
  admins: {
    isAdminSignedIn: boolean;
    uid: string;
    name: string;
    email: string;
  },
  categories: {
    list: string[];
  },
  loading: {
    state: boolean;
    text: string;
  },
  notification: {
    isOpen: boolean;
    variant: "success" | "error";
    message: string;
  },
  quizzes: {
    list: string[];
  },
  users: {
    isSignedIn: boolean;
    uid: string;
    name: string;
    email: string;
    image: File;
  },
};
