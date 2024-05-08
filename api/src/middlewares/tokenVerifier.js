import jwt from "jsonwebtoken";

export const tokenVerifier = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ message: "Access Denied, missing token" });
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN || "TOKEN");
    req.user = verified;
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
  return next();
};
