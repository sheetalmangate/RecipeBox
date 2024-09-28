import { Router } from "express";
import bcrypt from "bcrypt";
import { User } from "../../models/index.js";
const router = Router();
// CREATE a new user
router.post("/", async (req, res) => {
  try {
    const newUser = req.body;
    // ! hash the password from 'req.body' and save to newUser
    newUser.password = await bcrypt.hash(req.body.password, 10);
    // ! create the newUser with the hashed password and save to DB
    const userData = await User.create(newUser);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});
export default router;
