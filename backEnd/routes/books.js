const express = require("express");
const router = express.Router({
    mergeParams:true
});

const { getBooks, getBook, createBook,deleteBook,uptadeBook } = require('../controller/books');
 
router.route('/').get(getBooks)
router
  .route("/:id")
  .get(getBook)
  .post(createBook)
  .delete(deleteBook)
  .put(uptadeBook);

module.exports = router;