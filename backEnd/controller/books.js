const express = require("express");
const BookScheme = require("../models/books");
const MyError = require("../utils/myError");
exports.getBooks = (async (req, res, next) => {
    let query
    if (req.params.categoryId) {
      query = await BookScheme.find({ category: req.params.categoryId });
    } else {
      query = await BookScheme.find();
    }
    res.status(200).json({
        succes: true,
        count:query.length,
      data: query,
    });
})

