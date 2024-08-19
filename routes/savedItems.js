const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
} = require("../controllers/savedItems");
const { auth } = require("../middlewares/auth");
const { checkOwner } = require("../middlewares/checkOwner");
const {
  validateCardBody,
  validateItemId,
} = require("../middlewares/validation");

router.post("/", auth, validateCardBody, createItem);
router.get("/", auth, getItems);
router.delete("/:articleId", auth, checkOwner, validateItemId, deleteItem);

module.exports = router;
