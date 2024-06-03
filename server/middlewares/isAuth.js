const JWT = require("jsonwebtoken");
const handleError = require("../utils/handleError");
module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) return handleError(res, "Not authorized", 401);
  const token = authHeader.split(" ")[1];
  if (!token) return handleError(res, "Not authorized", 401);
  JWT.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) return handleError(res, err.message, 401);
    else if (decodedToken) {
      req.userId = decodedToken.userId;
      next();
    } else return handleError(res, "Not authorized", 401);
  });
};
