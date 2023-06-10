import { Express } from "express";
import {
  loginController,
  createUserController,
  deleteUserController,
  userDetailsController
} from "../controllers/userController";
import { checkJwt } from "../middleware/jwtTokenManager";

export const userRoutes = (app: Express) => {
  //Public Routes
  app.post("/api/register", createUserController);
  app.post("/api/login", loginController);

  app.use(checkJwt);
  //Private Routes
  app.post("/api/user/getData", userDetailsController);
  app.delete("/api/user/deleteuser", deleteUserController);
};
