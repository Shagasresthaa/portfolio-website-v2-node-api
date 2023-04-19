import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

interface LoginRequest {
  username: string;
  password: string;
}

interface CreateUserRequest {
  username: string;
  password: string;
}

export const login = async (req: Request, res: Response) => {
  const loginData: LoginRequest = req.body;

  try {
    const user = await User.findOne({
      where: {
        username: loginData.username,
      },
    });

    if (user && (await bcrypt.compare(loginData.password, user.password))) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred during the login process", error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const userData: CreateUserRequest = req.body;
  console.log("in create user");
  try {
    const existingUser = await User.findOne({
      where: {
        username: userData.username,
      },
    });

    if (existingUser) {
      res.status(400).json({ message: "Username already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = User.build({
      username: userData.username,
      password: hashedPassword,
    } as User);

    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", userId: newUser.id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred during user creation", error });
  }
};
