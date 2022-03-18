import { Image } from "../entity/image";

export type Category = {
  id: number;
  name: string;
  image: Image | null;
  caption: string;
  uid: string;
  created_at: string;
  updated_at: string;
};
