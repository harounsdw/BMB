import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  let token;

  // Check for token in cookies
  if (req.cookies && req.cookies.jwt) {
    try {
      token = req.cookies.jwt;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.userId;
      next(); // Proceed to the next middleware
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};
