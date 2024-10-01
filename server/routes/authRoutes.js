import { Router } from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    where: { username },
  });

  if (!user) {
    return res.status(401).json({ message: "Authentication failed" });
  }
  const passwordIsValid = bcrypt.compare(password, user.password);

  if (!passwordIsValid) {
    return res.status(401).json({ message: "Authentication failed" });
  }
  const secretKey = process.env.JWT_SECRET_KEY || "";
  const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
  return res.json({ token });
};

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }
};

const router = Router();
// POST /login - Login a user
router.post("/login", login);
// POST /register - Register a new user
router.post("/register", register);
export default router;
