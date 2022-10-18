const mongoose = require('mongoose');
const {slugify} = require('transliteration')

const CategoryScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "KATEGORIIN NERIIG ORUULNA"],
    unique: true,
    trim: true,
    maxLength: [500, "НЭР УРТ ИХ БАЙНА"],
  },
  slug: String,
  description: {
    type: String,
    required: [true, "KATEGORIIN NERIIG ORUULNA"],
    maxLength: [5000, "НЭР УРТ ИХ БАЙНА"],
  },
  photo: {
    type: String,
    default: "no-photo.jpeg",
  },
  averageRating: {
    type: Number,
    min: [1, "Rating хамгийн багадаа 1 байна"],
    max: [10, "Rating хамгийн ихдээ 10 байна"],
  },
  averagePrice: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


CategoryScheme.pre('remove', async function (next) {
 await this.$model('Book').deleteMany({category:this.id})
  next();
});

CategoryScheme.pre('save', function (next) {
  this.slug = slugify(this.name)
  next();
})
module.exports = mongoose.model('Category',CategoryScheme)