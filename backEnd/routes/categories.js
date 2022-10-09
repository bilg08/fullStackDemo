const express = require("express");
const router = express.Router();
const {
  getCategories,
  getCategory,
  createCategory,
  deleteCategory,
  uptadeCategory,
} = require("../controller/categories");



router.get("", getCategories);
router.get("/:id", getCategory);
router.post("/", createCategory);
router.put("/:id", uptadeCategory);
router.delete("/:id", deleteCategory);
module.exports = router;