import { Express } from "express";
import { createProject } from "../controllers/projectsController";

export const projectRoutes = (app: Express) => {
  // GET Requests

  // POST Requests
  app.post("/api/createproj", createProject);

  // UPDATE Requests

  // DELETE Requests
};
