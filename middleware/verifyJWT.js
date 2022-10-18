import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.status(401).json({ info: "there is no authorization field in header" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    // req.authUser = decoded.user._id;
    req.authUser = decoded.userId;
  } catch (error) {
    return res.status(403).json({ info: "invalid token" });
  }

  next();
};

export default verifyJWT;
