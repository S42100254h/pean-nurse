import { Admin } from "./admin";
import { Categories } from "./categories";
import { Loading } from "./loading";
import { Notification } from "./notification";
import { Quizzes } from "./quizzes";
import { User } from "./user";

export type RootState = {
  admins: Admin;
  categories: Categories;
  loading: Loading;
  notification: Notification;
  quizzes: Quizzes;
  users: User;
};
