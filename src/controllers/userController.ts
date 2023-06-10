import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  authenticateUser,
  createUser,
  deleteUser,
  getUserDetails,
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
        {
          userName: result.user.username,
          userId: result.user.id,
        },
        process.env.JWTSecret!,
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({ message: "Login successful", token });
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

export const userDetailsController = async (req: Request, res: Response) => {
  try {
    // Get the token from the Authorization header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.sendStatus(401); // If there's no token, return a 401 (Unauthorized) status
    }

    // Verify the token
    jwt.verify(
      token,
      process.env.JWTSecret as string,
      async (err: any, user: any) => {
        if (err) {
          console.log(err);
          console.log(user);
          return res.sendStatus(403); // If verification fails, return a 403 (Forbidden) status
        }

        // Get the user details
        const userDetails = await getUserDetails(user.userId);
        if (!userDetails) {
          return res.sendStatus(404); // If no user is found, return a 404 (Not Found) status
        }

        // Send the user details
        res.json(userDetails);
      }
    );
  } catch (error) {
    console.error(error);
    res.sendStatus(500); // If there's an error, return a 500 (Internal Server Error) status
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
