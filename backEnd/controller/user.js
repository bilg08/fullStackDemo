const express = require("express");
const MyError = require("../utils/myError");
const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/user");
const crypto = require('crypto');
const sendMail = require("../utils/email");

exports.register = asyncHandler(async (req, res, next) => {
    
    const user = await User.create(req.body);
    const token = user.getJsonWebToken()
    res.status(200).json({
        success: user,
        token
    })
})
exports.login = asyncHandler(async (req, res, next) => {

    const { email, password } = req.body;
    if (!email || !password) {
        throw MyError("EMAIL NUUTS UGEE ORUULNA UU",400)
    };
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        throw MyError('EMAIL NUUTS UG BURUU BAINA',400)
    }
    const ok = await user.checkPassword(password);
    if (!ok) {
        throw MyError("EMAIL NUUTS UG BURUU BAINA", 400);
    }
    res.status(200).json({
        success: true,
        token: user.getJsonWebToken(),
        user
    })

});

exports.getUsers = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;
  const select = req.query.select;
  const sort = req.query.sort;
  
  ["page", "limit", "select", "sort"].forEach(el => delete req.query[el]);
  //pagination
  const total = await User.countDocuments();
  const pageCount = Math.ceil(total / limit);
  const start = (page - 1) * limit + 1;
  let end = start + limit - 1;
  if (end > total) end = total;
  const pagination = {total,pageCount,start,end};

  if (page < pageCount) pagination.nextPage = page + 1;
  if (page > 1) pagination.prevPage = page - 1;

  
// localhost:8000/categories?select=name slug averageRating&sort=averageRating
  const user = await User.find(req.query, select).sort(sort).limit(limit).skip(start - 1);
  res.status(200).json({
    succes: true,
    data: user,
    pagination,
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
    res.status(200).json({
      succes: true,
      data: user,
    });
    next(error);
  
});
exports.createUser =asyncHandler(async (req, res,next) => {
    const user = await User.create(req.body);
    if (!User) {
      throw new MyError(`${id} -тай категори алга байна`, 400);
    }
    res.status(200).json({
      succes: true,
      data: `${req.params.id}-id ${user}`,
    });
  
});
exports.uptadeUser = asyncHandler(async (req, res,next) => {
  const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      throw new MyError(`${id} -тай категори алга байна`, 400);
    }
    res.status(200).json({
      succes: true,
      data: user,
    });

});

exports.deleteUser = asyncHandler(async (req, res,next) => {
  const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      throw new MyError(`${id} -тай категори алга байна`, 403);
    }
  user.remove();
    res.status(400).json({
      succes: true,
      data: user,
    });

});


exports.forgotPassword = asyncHandler(async (req, res, next) => {
  if (!req.body.email) {
    throw new MyError(`ТА СЭРГЭЭХ ЕМАЙЛ ХАЯГАА ОРУУЛНА УУ`, 403);
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new MyError(` ЕМАЙЛ ХАЯГ БУРУУ БАЙНА`, 403);  
  }
  const resetPasswordToken = user.generatePasswordChangeToken();
  await user.save();
  const link = `https://amazon.mn/changepassword/${resetPasswordToken}`;
  const info = await sendMail({
    email: user.email,
    subject: `NUUTS UG SERGEEH HUSELT`,
    message: `SAIN BAINA UU <br>TA NUUTS UG SERGEEH HUSELT ILGELE<br>${link}`,
  });
  res.status(400).json({
    succes: true,
    resetPasswordToken
  });
});




exports.resetPassword = asyncHandler(async (req, res, next) => {
 
  // if (!req.body.resetPasswordToken || !req.body.password) {
  //   throw new MyError(`ТА TOKEN BOLON NUUTS UGEE ОРУУЛНА УУ`, 403);
  // }
  const encrypted = crypto
    .createHash("sha256", req.body.resetPasswordToken)
    .update("resetToken")
    .digest("hex");

  
  const user = await User.findOne({
    resetPasswordToken: encrypted,
  });
  console.log(user)
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordToken = undefined;
  user.save()
  res.status(400).json({
    succes: true,
    user,
  });
});

