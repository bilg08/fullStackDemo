const express = require("express");
const app = express();
app.use(express.json());
app.use((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
});
const users = [
  {
    id: 0,
    firstName: "hello1",
    lastName: "world1",
  },
  {
    id: 1,
    firstName: "hello2",
    lastName: "world2",
  },
  {
    id: 2,
    firstName: "hello3",
    lastName: "world3",
  },
];

exports.getUsersData = async (req, res) => {
  res.status(200).send(users);
};
exports.getUserData = async (req, res) => {

  const { id } = req.params;
  const filteredData = users.filter((user) => user.id == id);
  res.status(200).json(filteredData);
};
