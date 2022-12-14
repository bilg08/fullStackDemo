const mongoose = require("mongoose");
const {Schema } = mongoose;
const { slugify } = require("transliteration");
const BookScheme = new Schema({
  name: {
    type: String,
    required: [true, "НОМЫН NERIIG ORUULNA"],
    unique: true,
    trim: true,
    maxLength: [150, "НЭР УРТ ИХ БАЙНА"],
  },
  slug: String,

  author: {
    type: String,
    required: [true, "Зохиолчын NERIIG ORUULNA"],
    maxLength: [50, "НЭР УРТ ИХ БАЙНА"],
  },
  photo: {
    type: String,
    default: "no-photo.jpeg",
  },
  rating: {
    type: Number,
    min: [1, "Rating хамгийн багадаа 1 байна"],
    max: [10, "Rating хамгийн ихдээ 10 байна"],
  },
  price: {
    type: Number,
    required: [true, "Номын үнийг оруулна"],

    min: [500, "Rating хамгийн багадаа 1 байна"],
  },
  balance: {
    type: Number,
  },
  content: {
    type: String,
    required: [true, "Номын тайлбарыг оруулна"],
    trim: true,
    maxLength: [10000, "НЭР УРТ ИХ БАЙНА"],
  },
  bestseller: {
    type: Boolean,
    default: false,
  },
  available: {
    type: [String],
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: true,
  },
  createdUser: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  updatedUser: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
BookScheme.statics.computeCategoryAveragePrice = async function (catId) {
  const obj = await this.aggregate([
    { $match: { category: catId } },
    { $group: { _id: "$category", avgPrice: { $avg: '$price' } } }
  ]);
  await this.model("Category").findByIdAndUpdate(catId, {
    averagePrice: obj[0].avgPrice,
  });
  return obj;
}
BookScheme.post('save', function () {
  this.constructor.computeCategoryAveragePrice(this.category);
})
BookScheme.pre("remove", function () {
  this.constructor.computeCategoryAveragePrice(this.category);
});
module.exports = mongoose.model("Book", BookScheme);
