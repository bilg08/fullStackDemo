const express = require("express");
const router = express.Router()
const { protect, authorize } = require("../middleware/protect");

const {
  register,login,getUsers,getUser,uptadeUser,deleteUser
} = require("../controller/user");
router.route("/register").post(register);
router.route("/login").post(login);
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
