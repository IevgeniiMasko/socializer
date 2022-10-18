import jwt from "jsonwebtoken";
import UserModel from "../model/userModel.js";

export const refreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.refreshToken)
    return res.status(401).json({ info: "Refresh token is not provided" });

  const refreshToken = cookies.refreshToken;

  const foundUser = await UserModel.findOne({
    refreshToken: { $in: [refreshToken] },
  });

  if (!foundUser)
    return res.status(403).json({ info: "Unknown refresh token" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    if (decoded.userId !== foundUser._doc._id.toString()) throw new Error();
    const otherTokens = foundUser._doc.refreshToken.filter(
      (item) => item !== refreshToken
    );
    foundUser.refreshToken = otherTokens;
    await foundUser.save();
  } catch (error) {
    return res.status(403).json({ info: "Invalid Refresh token" });
  }

  const accessToken = jwt.sign(
    { userId: foundUser._id },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: "15m",
    }
  );

  const refreshTokenNew = jwt.sign(
    { userId: foundUser._id },
    process.env.REFRESH_TOKEN,
    {
      expiresIn: "1d",
    }
  );

  foundUser.refreshToken.push(refreshTokenNew);
  await foundUser.save();

  res
    .cookie("refreshToken", refreshTokenNew, {
      httpOnly: true,
      // sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json({ accessToken });
};
