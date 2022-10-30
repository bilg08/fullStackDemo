const express = require("express");
const router = express.Router()
const { protect, authorize } = require("../middleware/protect");

const {
  register,forgotPassword,login,getUsers,getUser,uptadeUser,deleteUser,resetPassword
} = require("../controller/user");
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);

router.use(protect)
const {getUserBooks} = require('../controller/books');
router.route("/").get(authorize("admin", "operator"), getUsers);
router
  .route("/:id")
  .get(authorize("admin", "operator"), getUser)
  .delete(authorize("admin", "operator"), deleteUser)
  .put(authorize('admin'), uptadeUser);
router.route("/:id/books").get(authorize('admin','operator','user'),getUserBooks);


module.exports = router;
