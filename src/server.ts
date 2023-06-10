import express from "express";
import sequelize from "../config/sequelize";
import dotenv from "dotenv";
import User from "./models/User";

// Routes imports
import { userRoutes } from "./routes/userRoutes";
import { projectRoutes } from "./routes/projectRoutes";

dotenv.config();
User.initModel(sequelize);

const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;

/* 
DB Sync
*/
(async () => {
  try {
    // Models Sync
    await sequelize.sync();
    console.log("Database tables created or updated");

    // Server Start Post Model Sync
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to sync database tables:", error);
  }
})();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:8080",
  })
);

// Initiate Routes
userRoutes(app);
projectRoutes(app);
