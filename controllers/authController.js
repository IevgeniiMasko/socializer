import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../model/userModel.js";

export const registerUser = async (req, res) => {
  const { username, firstname, lastname, password } = req.body;

  console.log(req.body);

  if (!username)
    res.status(400).json({ info: "username is required", field: "username" });
  if (!password)
    res.status(400).json({ info: "password is required", field: "username" });

  const user = await UserModel.findOne({ username }).exec();
  if (user) {
    return res
      .status(409)
      .json({ info: "username already exists", field: "username" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      username,
      firstname,
      lastname,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(401).json({ info: "user has been created successfully" });
  } catch (error) {
    res.status(500).json({ info: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username)
    res.status(400).json({ info: "username is required", field: "username" });
  if (!password)
    res.status(400).json({ info: "password is required", field: "username" });

  const user = await UserModel.findOne({ username }).exec();
  if (!user) {
    return res
      .status(401)
      .json({ info: "incorrect username", field: "username" });
  }

  const passwordCorrect = await bcrypt.compare(password, user.password);
  if (!passwordCorrect) {
    return res
      .status(401)
      .json({ info: "incorrect password", field: "password" });
  }

  const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_TOKEN,
    {
      expiresIn: "1d",
    }
  );
  user.refreshToken.push(refreshToken);
  await user.save();

  const { password: pwd, ...userData } = user._doc;
  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json({
      info: "user is logged in",
      data: { userId: user._id, accessToken, authUser: userData },
    });
};

export const logoutUser = async (req, res) => {
  // const {
  //   body: { authUserId },
  //   cookies: { refreshToken },
  // } = req;

  const cookies = req.cookies;

  if (!cookies?.refreshToken)
    return res
      .status(204)
      .json({ info: "There is no Refresh token in cookies" });

  const refreshToken = cookies.refreshToken;

  const foundUser = await UserModel.findOne({
    refreshToken: { $in: [refreshToken] },
  });

  if (!foundUser) {
    res.clearCookie("refreshToken", { httpOnly: true });
    return res
      .status(204)
      .json({ info: "No user found with provided Refresh token" });
  }
  const updatedTokenList = foundUser._doc.refreshToken.filter(
    (token) => token !== refreshToken
  );
  foundUser.refreshToken = updatedTokenList;
  await foundUser.save();

  res.clearCookie("refreshToken");
  res.json({ info: "user is successfully logged out" });
};
