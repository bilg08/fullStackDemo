const express = require("express");
const router = express.Router({
    mergeParams:true
});

const { getBooks } = require('../controller/books');
 
router.route('/').get(getBooks);
module.exports = router;