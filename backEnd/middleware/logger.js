const logger = (req, res, next) => {
    req.userId = '1234567890';
  next();
};
module.exports = logger