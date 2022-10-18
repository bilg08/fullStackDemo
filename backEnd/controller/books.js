const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const BookScheme = require("../models/books");
const Category = require("../models/category");
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

exports.getBook = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log(id)
  const book = await BookScheme.findById(id);

  // category.name += '-';
  // category.save(function (err) {
  //   if (err) console.log(err);
  //   console.log('saved');
  // })
  // res.status(200).json({
  //   succes: true,
  //   data: book,
  // });
  if (!book) {
    throw new MyError('Ийм ном байхгүй', 404);
  }
  res.status(200).json({
    succes: true,
    data:book
  });
  // let query;
  // if (req.params.categoryId) {
  //   query = await BookScheme.find({ category: req.params.categoryId });
  // } else {
  //   query = await BookScheme.find();
  // }
  
});

exports.createBook = asyncHandler(async (req, res, next) => {
  // const category = await Category.findById(req.body.category);
  // if (!category) {
  //   throw new MyError(`${id} -тай категори алга байна`, 400);
  // }
  console.log(req.body.category);
  const category = await Category.findById(req.body.category);
  // if (!category) {
  //   throw new MyError(`${id} -тай категори алга байна`, 400);
  // }
  const book = await BookScheme.create(req.body);
  res.status(200).json({
    succes: true,
    data:book
  });
});

exports.deleteBook = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const book = await BookScheme.findById(id);
book.remove()
  // category.name += '-';
  // category.save(function (err) {
  //   if (err) console.log(err);
  //   console.log('saved');
  // })
  res.status(200).json({
    succes: true,
    data: book,
  });
  if (!book) {
    throw new MyError("Ийм ном байхгүй", 404);
  }
  res.status(200).json({
    succes: true,
    data: book,
  });
  // let query;
  // if (req.params.categoryId) {
  //   query = await BookScheme.find({ category: req.params.categoryId });
  // } else {
  //   query = await BookScheme.find();
  // }
});



exports.uptadeBook = asyncHandler(async (req, res, next) => {
  // const { id } = ;
  // console.log(/);
  const book = await BookScheme.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators:true
  });
  // // category.name += '-';
  // // category.save(function (err) {
  // //   if (err) console.log(err);
  // //   console.log('saved');
  // // })
  if (!book) {
    throw new MyError("Ийм ном байхгүй", 404);
  }
  res.status(200).json({
    succes: true,
    data: book,
  });
  // let query;
  // if (req.params.categoryId) {
  //   query = await BookScheme.find({ category: req.params.categoryId });
  // } else {
  //   query = await BookScheme.find();
  // }
});