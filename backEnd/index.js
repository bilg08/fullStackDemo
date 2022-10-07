const express = require('express');
const cors = require("cors");
const userRoute = require('./routes/user.js')
const app = express();
const port = 8000;
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use('/users', userRoute)
.listen(port, () => console.log(`Listening in ${port} localhost:${port}`));
