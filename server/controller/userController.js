import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "1d" });
};

//login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    //create token
    const token = createToken(user._id);

    res.status(200).json({ email, token, userFirstName: user.first_name, userLastName: user.last_name, isAdmin: user.isAdmin, organization: user.organization, _id: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
export const signupUser = async (req, res) => {
  const { email, password, organization, first_name, last_name, isAdmin } = req.body;

  try {
    const user = await User.signup(email, password, organization, first_name, last_name, isAdmin);

    //create token
    const token = createToken(user._id);

    res.status(200).json({ email, token, userFirstName: user.first_name, userLastName: user.last_name, oranization: user.organization });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// GET ALL USERS
export const getUsers = async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.status(200).json(users);
};
