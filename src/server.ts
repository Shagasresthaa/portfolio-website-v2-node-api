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
const PORT = process.env.PORT || 3000;

// Sync all DB Table Schemas
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

// Initiate Routes
userRoutes(app);
projectRoutes(app);
