import { as } from "pg-promise";
import User from "../models/User";
import bcrypt from "bcrypt";

export const authenticateUser = async (
  username: string,
  password: string
): Promise<boolean | null> => {
  const user = await User.findOne({ where: { username } });

  if (user && (await bcrypt.compare(password, user.password))) {
    return true;
  }

  return false;
};

export const createUser = async (
  username: string,
  email: string,
  password: string
): Promise<User> => {
  const existingUser = await User.findOne({
    where: {
      username,
    },
  });

  if (existingUser) {
    throw new Error("Username already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return newUser;
};

export const deleteUser = async (username: string): Promise<boolean> => {
  const user = await User.findOne({ where: { username } });

  if (!user) {
    return false;
  } else {
    return await User.deleteUser(user.id);
  }
};
