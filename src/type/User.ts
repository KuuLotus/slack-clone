export interface User {
  displayName: string;
  email: string;
  profile_picture: string;
}

export interface UserRef {
  uid: string;
  user: User;
}
