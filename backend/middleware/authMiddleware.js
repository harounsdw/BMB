import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  let token;

  // Check for token in cookies
  if (req.cookies && req.cookies.jwt) {
    try {
      token = req.cookies.jwt; // Get the token from the cookie

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user info to request object
      req.user = decoded.userId;

      next(); // Proceed to the next middleware
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, token missing");
  }
};

export { protect };
