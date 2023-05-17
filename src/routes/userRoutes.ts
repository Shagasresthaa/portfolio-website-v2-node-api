import { Express } from "express";
import {
  loginController,
  createUserController,
  deleteUserController,
} from "../controllers/userController";

export const userRoutes = (app: Express) => {
  // GET Requests
  app.get("/api/login", loginController);

  // POST Requests
  app.post("/api/register", createUserController);

  // UPDATE Requests

  // DELETE Requests
  app.delete("/api/deleteuser", deleteUserController);
};
