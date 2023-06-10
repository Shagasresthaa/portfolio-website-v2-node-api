import User from "../models/User";
import bcrypt from "bcrypt";

interface FilteredUser {
  id: number;
  username: string;
  email: string;
  role: string;
}

export const authenticateUser = async (
  username: string,
  password: string
): Promise<{ isAdmin: boolean; user: User } | null> => {
  const user = await User.findOne({ where: { username } });

  if (user && (await bcrypt.compare(password, user.password))) {
    const isAdmin = user.role === "admin";
    return { isAdmin, user };
  }

  return null;
};

export const getUserDetails = async (
  id: number
): Promise<{ user: FilteredUser } | null> => {
  const user = await User.findOne({ where: { id } });

  if (user) {
    const filteredUser: FilteredUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    return { user: filteredUser };
  }

  return null;
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
    role: "user",
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
