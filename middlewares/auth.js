const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UNAUTHORIZED_MESSAGE } = require("../utils/errors");
const UnauthorizedError = require("../utils/Errors/UnauthorizedError");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    next(new UnauthorizedError(UNAUTHORIZED_MESSAGE));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError(UNAUTHORIZED_MESSAGE));
  }

  req.user = payload;

  return next();
};

module.exports = { auth };
