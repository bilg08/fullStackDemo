const express = require("express");
const MyError = require('../utils/myError')
const asyncHandler = require('../middleware/asyncHandler')
const Category = require("../models/category");
const app = express();
app.use(express.json());
// app.use((res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
// });

exports.getCategories = asyncHandler(async (req, res, next) => {
    const category = await Category.find();

    res.status(200).json({
      succes: true,
      data: category,
    });
  
});

exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
   const category = await Category.findById(id);

    if (!category) {
      throw new MyError(`${id} -тай категори алга байна`,400);
    }
    res.status(200).json({
      succes: true,
      data: category,
    });
    next(error);
  
});
exports.createCategory =asyncHandler(async (req, res,next) => {
    const category = await Category.create(req.body);
    if (!category) {
      throw new MyError(`${id} -тай категори алга байна`, 400);
    }
    res.status(200).json({
      succes: true,
      data: `${req.params.id}-id ${category}`,
    });
  
});
exports.uptadeCategory = asyncHandler(async (req, res,next) => {
  const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!category) {
      throw new MyError(`${id} -тай категори алга байна`, 400);
    }
    res.status(200).json({
      succes: true,
      data: category,
    });

});

exports.deleteCategory = asyncHandler(async (req, res,next) => {
  const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      throw new MyError(`${id} -тай категори алга байна`, 403);
    }
    res.status(400).json({
      succes: true,
      data: category,
    });

});
//ЭНЭ БИЧЭГЛЭЛТЭЙ АДИЛХАН
// exports.deleteCategory = async (req, res,next) => {
//   const { id } = req.params;
//     const category = await Category.findByIdAndDelete(id);

//     if (!category) {
//       throw new MyError(`${id} -тай категори алга байна`, 400);
//     }
//     res.status(400).json({
//       succes: true,
//       data: category,
//     });

// };
