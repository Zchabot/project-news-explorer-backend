const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
} = require("../controllers/savedItems");
const { auth } = require("../middlewares/auth");
const {
  validateCardBody,
  validateItemId,
} = require("../middlewares/validation");

router.post("/", auth, validateCardBody, createItem);
router.get("/", auth, getItems);
router.delete("/:itemId", auth, validateItemId, deleteItem);

module.exports = router;
