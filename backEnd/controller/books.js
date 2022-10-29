const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const BookScheme = require("../models/books");
const Category = require("../models/category");
const MyError = require("../utils/myError");
const path = require('path');
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

exports.getBook = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const book = await BookScheme.findById(id);

  if (!book) {
    throw new MyError('Ийм ном байхгүй', 404);
  }
  res.status(200).json({
    succes: true,
    data:book
  });

});

exports.createBook = asyncHandler(async (req, res, next) => {

  const category = await Category.findById(req.body.category);
  if (!category) {
    throw MyError(category + 'category baihgui');
  }
  req.body.createdUser = req.userId;
  const book = await BookScheme.create(req.body);

  res.status(200).json({
    succes: true,
    data:book
  });
});

exports.deleteBook = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const book = await BookScheme.findById(id);
  if (!book) {
    throw new MyError("Ийм ном байхгүй", 404);
  }

  if (!book.createdUser.toString() === req.userId && req.userRole !== "admin") {
    throw new MyError("TA OORIINHOO NOMIIG ZASNA UU", 404);
  }
  book.remove();

  res.status(200).json({
    succes: true,
    data: book,
  });
 
});



exports.uptadeBook = asyncHandler(async (req, res, next) => {
  const book = await BookScheme.findById(req.params.id);
  if (!book) {
    throw new MyError("Ийм ном байхгүй", 404);
  }
  if (!book.createdUser.toString() === req.userId && req.userRole !== "admin") {
    throw new MyError("TA OORIINHOO NOMIIG ZASNA UU", 404);
  }
  req.body.updatedUser = req.userId;
  for (let attr in req.body) {
    book[attr] = req.body[attr];
  }
  book.save();
  res.status(200).json({
    succes: true,
    data: book,
  });
 
});

exports.uploadBookPhoto = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const book = await BookScheme.findById(id);
  const file = req.files.file;
  
  if (!req.files.file.mimetype.startsWith('image')) {
    res.status(400).json({
      data:'ТА ЗУРАГ ОРУУЛНА УУ' ,
    });
  }
  if (!req.files.file.size > 100000) {
    res.status(400).json({
      data: "ТАНЫ ЗУРАГНЫ ХЭМЖЭЭ ИХ БАЙНА",
    });
  }
  file.name = `photo_${id}${path.parse(file.name).ext}`
  
  file.mv(`./public/upload/${file.name}`, err => {
    if (err) {
      console.log(`АЛДАА ГАРЛАА`)
    };

    book.photo = file.name;
    book.save()
    res.status(200).json({
      success: true,
      data:book
    })
  })
});


exports.getUserBooks = async (req, res, next) => {
  
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;
  const select = req.query.select;
  const sort = req.query.sort;
  ["page", "limit", "select", "sort"].forEach((el) => delete req.query[el]);
  req.query.createdUser = req.userId;
  const books = await BookScheme.find(req.query);
  res.status(200).json({
    success: true,
    data:books
  })
};