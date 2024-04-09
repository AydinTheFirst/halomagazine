declare namespace Express {
  export interface Request {
    user?: import("@/database/UserSchema").IUser;
    isAdmin: boolean;
  }
}
