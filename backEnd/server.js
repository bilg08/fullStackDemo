const fs = require("fs");
//Cors
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
//Express
const express = require("express");
const logger = require("./middleware/logger.js");
//Route
const categoriesRoute = require('./routes/categories');
const booksRoutes = require("./routes/books");
var rfs = require('rotating-file-stream');
const dotenv = require('dotenv');
//.ENV
dotenv.config({path:'./config.env'})
const connectDb = require('./db');
//INIT EXPRESS
const app = express();
const colors = require('colors');
//ERROR HANDLER

const errorHandler = require('./middleware/error')

const port = 8000;
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};


var accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log"),
});
connectDb();



//BODY_PARSER
app.use(express.json());
app.use(logger);
app.use(morgan("combined", { stream: accessLogStream }));
app.use(cors(corsOptions));
app.use('/books',booksRoutes)
app.use("/categories", categoriesRoute)
  app
    .use(errorHandler)

    .listen(port, () => console.log(`Listening in ${port} localhost:${port}`));
