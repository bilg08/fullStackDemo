const mongoose = require('mongoose');

const CategoryScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "KATEGORIIN NERIIG ORUULNA"],
    unique: true,
    trim: true,
    maxLength: [50, "НЭР УРТ ИХ БАЙНА"],
  },
  description: {
    type: String,
    required: [true, "KATEGORIIN NERIIG ORUULNA"],
    maxLength: [50, "НЭР УРТ ИХ БАЙНА"],
  },
  // description: {
  //   required: [true, "KATEGORIIN ТАЙЛБАР ОРУУЛНА УУ"],
  //   maxLength: [500, "ТАЙЛБАРЫН УРТ ИХ БАЙНА"],
  //   },
  photo: {
    type: String,
    default: "no-photo.jpeg",
  },
  averageRating: {
    type: Number,
    // minLength: [1, 'Rating хамгийн багадаа 1 байна'],
    // maxLength:[10,'Rating хамгийн ихдээ 10 байна']
  },
  //   averagePrice: Number,
  //   createdAt: {
  //       type: Date,
  //       default:Date.now
  //   }
});

module.exports = mongoose.model('Category',CategoryScheme)