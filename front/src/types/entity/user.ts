import { Image } from "../entity/image";

export type User = {
  isSignedIn: boolean;
  uid: string;
  name: string;
  email: string;
  image: Image | null;
};
