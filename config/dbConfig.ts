import { Dialect } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

export default {
    database: process.env.DBName!,
    username: process.env.DBUsername!,
    password: process.env.DBPassword!,
    host: process.env.DBHost!,
    dbport: parseInt(process.env.DBPort!, 10),
    dialect: 'postgres' as Dialect,
    logging: false, // Set to true if you want to see SQL queries in the console
  };