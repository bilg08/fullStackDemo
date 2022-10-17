const express = require("express");
const router = express.Router();
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
router.post("/", createCategory);
router.put("/:id", uptadeCategory);
router.delete("/:id", deleteCategory);
module.exports = router;