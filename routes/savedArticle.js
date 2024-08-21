const router = require("express").Router();
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require("../controllers/savedArticles");
const { auth } = require("../middlewares/auth");
const { checkOwner } = require("../middlewares/checkOwner");
const {
  validateCardBody,
  validateArticleId,
} = require("../middlewares/validation");

router.post("/", auth, validateCardBody, createArticle);
router.get("/", auth, getArticles);
router.delete(
  "/:articleId",
  auth,
  checkOwner,
  validateArticleId,
  deleteArticle
);

module.exports = router;
