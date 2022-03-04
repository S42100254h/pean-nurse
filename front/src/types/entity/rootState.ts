import { Admin } from "./admin";
import { Categories } from "./categories";
import { Experiences } from "./experiences";
import { Loading } from "./loading";
import { Notification } from "./notification";
import { Quizzes } from "./quizzes";
import { User } from "./user";
import { Users } from "./users";

export type RootState = {
  admin: Admin;
  categories: Categories;
  experiences: Experiences;
  loading: Loading;
  notification: Notification;
  quizzes: Quizzes;
  user: User;
  users: Users;
};
