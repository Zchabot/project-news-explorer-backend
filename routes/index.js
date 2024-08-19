const router = require("express").Router();
const { NOT_FOUND_MESSAGE } = require("../utils/errors");
const NotFoundError = require("../utils/Errors/NotFoundError");

const userRouter = require("./users");
const savedItemRouter = require("./savedItems");
const { createUser, login } = require("../controllers/users");
const {
  validateUserInfo,
  validateAuthUser,
} = require("../middlewares/validation");

router.post("/signin", validateAuthUser, login);
router.post("/signup", validateUserInfo, createUser);
router.use("/users", userRouter);
router.use("/articles", savedItemRouter);
router.use("*", (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_MESSAGE));
});

module.exports = router;
