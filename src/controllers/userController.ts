import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  authenticateUser,
  createUser,
  deleteUser,
} from "../services/UserServices";

dotenv.config();

interface LoginRequest {
  username: string;
  password: string;
}

interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
}

interface DeleteUser {
  username: string;
}

export const loginController = async (req: Request, res: Response) => {
  const loginData: LoginRequest = req.body;

  try {
    const result = await authenticateUser(
      loginData.username,
      loginData.password
    );

    if (result) {
      const token = jwt.sign(
        { userId: result.user.id, isAdmin: result.isAdmin },
        process.env.JWTSecret!,
        {
          expiresIn: "1h",
        }
      );
      res
        .status(200)
        .json({ message: "Login successful", token, isAdmin: result.isAdmin });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred during the login process", error });
  }
};

export const createUserController = async (req: Request, res: Response) => {
  const userData: CreateUserRequest = req.body;

  try {
    const newUser = await createUser(
      userData.username,
      userData.email,
      userData.password
    );

    res
      .status(201)
      .json({ message: "User created successfully", userId: newUser.id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred during user creation", error });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  const userData: DeleteUser = req.body;

  try {
    const delUser = await deleteUser(userData.username);
    if (delUser) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred during user creation", error });
  }
};
