import { Express } from "express";
import {
  loginController,
  createUserController,
  deleteUserController,
} from "../controllers/userController";
import { checkJwt } from "../middleware/jwtTokenManager";

export const userRoutes = (app: Express) => {
  //Public Routes
  app.post("/api/register", createUserController);
  app.post("/api/login", loginController);

  app.use(checkJwt);
  //Private Routes
  app.delete("/api/deleteuser", deleteUserController);
};
