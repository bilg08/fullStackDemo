const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const Category = require("./models/category");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const categories = JSON.parse(
  fs.readFileSync('./data/categories.json', "utf-8")
);
const importData = async () => {
  try {
      await Category.create(categories);
    console.log("ӨГӨГДӨЛ НЭМЛЭЭ".green.inverse);
  } catch (error) {
    console.log(error.message.red.inverse);
  }
};

const deleteData = async () => {
  try {
      await Category.deleteMany();
    console.log('ӨГӨГДӨЛ УСТГАГДЛАА'.red.inverse);
  } catch (error) {
    console.log(error.message.red.inverse);
  }
};

if (process.argv[2] == '-i') {
    importData()
} else if (process.argv[2] == "-d") {
    deleteData()
}
