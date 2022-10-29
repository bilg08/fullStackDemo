const asyncHandler = require("./asyncHandler");
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const MyError = require("../utils/myError");
exports.protect = asyncHandler(async (req, res, next) => {
    if (!req.headers.authorization) {
    throw new MyError("TA ERHGUI BAINA", 401);
  }

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    throw new MyError("TA HANDAH ERHGUI BAINA", 401);
  }

  const user = jwt.verify(token, process.env.JSON_WEB_TOKEN);
    req.userId = user.id;
  req.userRole = user.role;
  next();
});

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.userRole)) {
          throw MyError(
            `TANII ERH(${req.role})ENE UILDLIIG HIIJ CADAHGUI`,
            401
          );
        }
        next()
    }
}

 