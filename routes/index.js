const router = require("express").Router();
const { NOT_FOUND_MESSAGE } = require("../utils/errors");
const NotFoundError = require("../utils/Errors/NotFoundError");

const userRouter = require("./users");
const savedArticleRouter = require("./savedArticle");
const { createUser, login } = require("../controllers/users");
const {
  validateUserInfo,
  validateAuthUser,
} = require("../middlewares/validation");

/**
 * Route layout:
 * - Public routes (signup/signin) come first
 * - auth middleware is applied in app.js
 * - Protected resources (users/articles) are mounted after auth
 */

router.post("/signin", validateAuthUser, login);
router.post("/signup", validateUserInfo, createUser);
router.use("/users", userRouter);
router.use("/articles", savedArticleRouter);

// Catch-all for undefined routes (keeps API responses predictable for clients)
router.use("*", (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_MESSAGE));
});

module.exports = router;
