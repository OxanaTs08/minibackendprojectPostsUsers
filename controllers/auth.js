import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const jwtSecret = process.env.JWT_SECRET;

export const registerController = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  const userExists = await User.findOne({ where: { username } });
  if (userExists) {
    res.status(400).send("User already exists");
    return;
  }

  try {
    const hashRounds = 10;
    const hashedPassword = await bcrypt.hash(password, hashRounds);

    const user = await User.create({
      username,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ message: "User not created" });
  }
};

export const loginController = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const foundUser = await User.findOne({ username });

    if (!foundUser) {
      res.status(400).send("User not found");
      return;
    }
    if (foundUser) {
      const isPasswordValid = bcrypt.compare(password, foundUser.password);

      if (!isPasswordValid) {
        res.status(400).send("Invalid password");
        return;
      }

      const token = jwt.sign(
        { id: foundUser.id, username: foundUser.username },
        jwtSecret,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({ token });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const postGetController = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(201).json({ posts });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const createPostController = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content  are required" });
  }

  try {
    const post = await Post.create({
      title,
      content,
      author: req.user.username,
      createdAt: Date.now(),
    });
    const result = await post.save();
    res.status(201).json({ message: "Post created", result });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
