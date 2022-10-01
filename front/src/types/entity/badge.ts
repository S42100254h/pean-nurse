export type Badge = {
  id: number;
  index: number;
  color: "gold" | "silver" | "bronze";
  image: Image | null;
  category_id: number;
  created_at: string;
  updated_at: string;
};

type Image = {
  url: string;
};
