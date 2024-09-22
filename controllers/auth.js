import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import Country from "../models/countryModel.js";
import Tag from "../models/tagModel.js";
import Place from "../models/placeModel.js";
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
  try {
    const userExists = await User.findOne({ where: { username } });
    if (userExists) {
      return;
    }

    const hashRounds = 10;
    const hashedPassword = await bcrypt.hash(password, hashRounds);

    const user = await User.create({
      username,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      res.status(500).json(error);
    }
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

export const createCountryController = async (req, res) => {
  const { name, picture } = req.body;
  if (!name || !picture) {
    return res.status(400).json({ message: "Data is required" });
  }
  try {
    const country = await Country.create({
      name,
      picture,
    });
    res.status(201).json({ message: "country is created", country });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const countryGetController = async (req, res) => {
  try {
    console.log("Calling Country.find()");
    const countries = await Country.find();
    console.log("Countries found:", countries);
    res.status(200).json({ countries });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json(error);
  }
};

export const tagGetController = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json({ tags });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json(error);
  }
};

export const createTagController = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Data is required" });
  }
  try {
    const tag = await Tag.create({
      name,
    });
    res.status(201).json({ message: "tag is created", tag });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createPlaceController = async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Data is required" });
  }
  try {
    const place = await Place.create({
      title,
    });
    res.status(201).json({ message: "place is created", place });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const placeGetController = async (req, res) => {
  try {
    const places = await Place.find();
    res.status(200).json({ places });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json(error);
  }
};
