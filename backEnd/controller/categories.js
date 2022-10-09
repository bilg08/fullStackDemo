const express = require("express");

const Category = require("../models/category");
const app = express();
app.use(express.json());
app.use((res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
});

exports.getCategories = async (req, res,next) => {
  try {
    const category = await Category.find();

    res.status(200).json({
      succes: true,
      data: category,
    });
  } catch (error) {
    next(err)
  }
};

exports.getCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(400).json({
        succes: false,
        data: `${id} -тай категори алга байна`,
      });
    }
    res.status(200).json({
      succes: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};
exports.createCategory = async (req, res,next) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).json({
      succes: true,
      data: `${req.params.id}-id ${category}`,
    });
  } catch (error) {
    next(error);
  }
};
exports.uptadeCategory = async (req, res,next) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return res.status(400).json({
        succes: false,
        data: `${id} -тай категори алга байна`,
      });
    }
    res.status(200).json({
      succes: true,
      data: category,
    });
  } catch (error) {
       next(error)
  }
};
exports.deleteCategory = async (req, res,next) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(400).json({
        succes: false,
        data: `${id} -тай категори алга байна`,
      });
    }
    res.status(400).json({
      succes: true,
      data: category,
    });
  } catch (error) {
       next(error)
  }
};
