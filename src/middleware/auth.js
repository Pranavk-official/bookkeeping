const auth = (req, res, next) => {
  console.log("auth middleware");
  // TODO: Implement authentication middleware logic
  next();
};

export default auth;
