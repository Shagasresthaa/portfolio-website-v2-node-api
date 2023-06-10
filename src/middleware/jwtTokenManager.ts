import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // If no token, respond with 401 (unauthorized)
  // Sry no token no auth !!!
  if (!token) {
    res
      .status(401)
      .json({ message: "Who are you? No Authorization Token Detected!" })
      .send();
    return;
  }

  let jwtPayload;

  // Token Validation
  try {
    jwtPayload = <any>jwt.verify(token, process.env.JWTSecret!);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    // Invalid Token, responding with 401 (unauthorized)
    // Dont even think about it
    res
      .status(401)
      .json({ message: "Not so fast! Invalid JWT Token Detected!" })
      .send();
    return;
  }

  // Token generator
  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ userId, username }, process.env.JWTSecret!, {
    expiresIn: "1h",
  });
  res.setHeader("token", newToken);

  // Go for the next middleware/controller
  next();
};
