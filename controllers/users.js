const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const BadRequestError = require("../utils/Errors/BadRequestError");
const ConflictError = require("../utils/Errors/ConflictError");
const NotFoundError = require("../utils/Errors/NotFoundError");
const UnauthorizedError = require("../utils/Errors/UnauthorizedError");

const {
  BAD_REQUEST_MESSAGE,
  NOT_FOUND_MESSAGE,
  CONFLICT_MESSAGE,
  UNAUTHORIZED_MESSAGE,
} = require("../utils/errors");

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) =>
      res.send({
        name: user.name,
        email: user.email,
        _id: user._id,
      })
    )
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError(BAD_REQUEST_MESSAGE));
      } else if (err.name === "MongoServerError") {
        next(new ConflictError(CONFLICT_MESSAGE));
      } else {
        next(err);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError(NOT_FOUND_MESSAGE));
      } else if (err.name === "CastError") {
        next(new (BadRequestError(BAD_REQUEST_MESSAGE))());
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new BadRequestError(BAD_REQUEST_MESSAGE));
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        next(new UnauthorizedError(UNAUTHORIZED_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports = { createUser, getCurrentUser, login };
