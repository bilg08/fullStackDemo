const express = require('express');
const { getUsersData, getUserData } = require("../controller/users");
const router = express.Router();

router.get("/", getUsersData);
router.get("/:id", getUserData);

module.exports = router