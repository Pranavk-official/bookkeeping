import { verifyToken } from "../utils/jwtUtils";

const auth = (req, res, next) => {
  console.log("auth middleware");
  // DONE: Implement authentication middleware logic
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = verifyToken(token);
    req.user = decoded;
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized access",
    });
  }
  next();
};

export default auth;
