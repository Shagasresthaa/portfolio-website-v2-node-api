import express from "express";
import sequelize from "../config/sequelize";
import { login, createUser } from "./controllers/authController";
import { createProject } from "./controllers/projectsController";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/login", login);
app.post("/api/register", createUser);
app.post("/api/createproj", createProject);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

sequelize.sync().then(() => {
  console.log("Database tables created or updated");
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
