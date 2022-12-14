const mongoose = require('mongoose');
const colors = require("colors");

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log(conn.connection.host.bgBlue)
}

module.exports = connectDB