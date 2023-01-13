export interface User {
  id: string;
  email: string;
  picture: string;
  name: string;
  admin: boolean;
}

export interface Auth {
  user: User;
  token: string;
}
