import { Image } from "../entity/image";

export type User = {
  id: string | number;
  isSignedIn: boolean;
  uid: string;
  name: string;
  email: string;
  image: Image | null;
  experiencePoint: number;
};
