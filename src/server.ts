import express from "express";
import sequelize from "../config/sequelize";
import {
  loginController,
  createUserController,
  deleteUserController,
} from "./controllers/userController";
import { createProject } from "./controllers/projectsController";
import dotenv from "dotenv";
import User from "./models/User";

dotenv.config();
User.initModel(sequelize);

const app = express();
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    // Sync all models with the database
    await sequelize.sync();
    console.log("Database tables created or updated");

    // Start the server after synchronization is complete
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to sync database tables:", error);
  }
})();

app.use(express.json());

app.get("/api/login", loginController);
app.post("/api/register", createUserController);
app.post("/api/createproj", createProject);
app.delete("/api/deleteuser", deleteUserController);
