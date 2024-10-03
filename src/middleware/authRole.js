import { getMessage } from "../utils/languageUtils.js";

export const authRole = (roles) => (req, res, next) => {
  console.log(req.user);
  if (!req.user) {
    return res.status(401).json({
      message: getMessage("unauthorizedAccess", req.headers["accept-language"]),
    });
  }
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({
      message: getMessage("accessDenied", req.headers["accept-language"]),
    });
  }
  next();
};
