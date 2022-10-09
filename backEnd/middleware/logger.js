const logger = (req, res, next) => {
    req.userId = '1234567890';
  console.log(`${req.method} ${req.protocol}://${req.host}${req.originalUrl}${req.userId}`);
  next();
};
module.exports = logger