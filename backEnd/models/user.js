const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "ХЭРЭГЛЭГЧИЙН НЭРИЙГ ОРУУЛНА УУ"],
  },
  email: {
    type: String,
    required: [true, "ХЭРЭГЛЭГЧИЙН EMAIL ОРУУЛНА УУ"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "БУРУУ EMAIL БАЙНА",
    ],
  },
  role: {
    type: String,
    required: [true, "ХЭРЭГЛЭГЧИЙН ҮҮРГИЙГ ОРУУЛНА УУ"],
    enum: ["user","operator"],
    default: "user",
  },
  password: {
    type: String,
    minLength: 4,
    required: [true, "НУУЦ ҮГЭЭ ОРУУЛНА УУ"],
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
UserScheme.pre('save',async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserScheme.methods.getJsonWebToken = function() {
    const token = jwt.sign(
      { id: this._id,role:this.role },
       process.env.JSON_WEB_TOKEN,
      {expiresIn:'1d'}
    );
    return token

}
UserScheme.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}


module.exports = mongoose.model("User", UserScheme);
