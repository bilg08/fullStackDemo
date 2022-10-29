const express = require("express");
const { protect,authorize} = require("../middleware/protect.js");
const router = express.Router({
    mergeParams:true
});

const { getBooks, getBook, createBook,deleteBook,uploadBookPhoto,uptadeBook } = require('../controller/books');
 
router.route('/').get(getBooks)
router
  .route("/:id")
  .get(getBook)
  .post(protect, authorize("admin"), createBook)
  .delete(protect, authorize("admin"), deleteBook)
  .put(protect, authorize("admin", "operator"), uptadeBook);

  router
    .route("/:id/photo")
    .put(authorize("admin", "operator"), uploadBookPhoto);
  
module.exports = router;