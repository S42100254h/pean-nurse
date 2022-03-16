import { Admin } from "./admin";
import { Badge } from "./badge";
import { Badges } from "./badges";
import { Categories } from "./categories";
import { Experiences } from "./experiences";
import { Loading } from "./loading";
import { Notification } from "./notification";
import { Quizzes } from "./quizzes";
import { Stacks } from "./stacks";
import { User } from "./user";
import { Users } from "./users";

export type RootState = {
  admin: Admin;
  badge: Badge;
  badges: Badges;
  categories: Categories;
  experiences: Experiences;
  loading: Loading;
  notification: Notification;
  quizzes: Quizzes;
  stacks: Stacks;
  user: User;
  users: Users;
};
