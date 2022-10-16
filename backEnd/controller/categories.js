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
  //localhost:8000/categories?select=name slug averageRating&averageRating[$gt]=8
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;
  const select = req.query.select;
  const sort = req.query.sort;
  
  ["page", "limit", "select", "sort"].forEach(el => delete req.query[el]);


  //pagination
  const total = await Category.countDocuments();
  const pageCount = Math.ceil(total / limit);
  const start = (page - 1) * limit + 1;
  let end = start + limit - 1;
  if (end > total) end = total;
  const pagination = {total,pageCount,start,end};

  if (page < pageCount) pagination.nextPage = page + 1;
  if (page > 1) pagination.prevPage = page - 1;









// localhost:8000/categories?select=name slug averageRating&sort=averageRating
  const category = await Category.find(req.query, select).sort(sort).limit(limit).skip(start - 1);
  res.status(200).json({
    succes: true,
    data: category,
    pagination,
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
