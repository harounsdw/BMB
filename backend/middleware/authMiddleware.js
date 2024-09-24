import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  let token =
    req.headers.authorization && req.headers.authorization.startsWith("Bearer")
      ? req.headers.authorization.split(" ")[1]
      : null;

  if (!token) {
    res.status(401).json({ message: "Not authorized, token missing" });
  }

  // Verify the token and extract user info
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
    req.user = decoded; // store decoded token payload in req.user
    next();
  });
};
