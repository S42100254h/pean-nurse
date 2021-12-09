export type User = {
  isSignedIn: boolean;
  uid: string;
  name: string;
  email: string;
  image: File | null;
};
