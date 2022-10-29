const express = require("express");
const router = express.Router();
const {authorize} = require('../middleware/protect')
const {
  getCategories,
  getCategory,
  createCategory,
  deleteCategory,
  uptadeCategory,
} = require("../controller/categories");

// const {
//   getBooks
// } = require("../controller/books");


// router.get("/:categoryId/books", getBooks);

const booksRouter = require('./books');
router.use("/:categoryId/books",booksRouter);



//category
router.get("", getCategories);
router.get("/:id", getCategory);
router.post("/", authorize("admin", "operator"),createCategory);
router.put("/:id",authorize("admin", "operator"), uptadeCategory);
router.delete("/:id", authorize("admin", "operator"), deleteCategory);
module.exports = router;