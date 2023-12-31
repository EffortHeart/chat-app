"use strict";

var _cors = _interopRequireDefault(require("cors"));
var _helmet = _interopRequireDefault(require("helmet"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { chats } = require("./data/data");
const colors = require("colors");
const chatRoutes = require("./routes/chatRoutes");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
dotenv.config();
const app = express();
connectDB();
app.use(
  (0, _cors.default)({
    origin: "http://localhost:3000",
  })
);
app.use((0, _helmet.default)());
app.use(express.json()); //to accept json data

app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to E-Talk Server",
  });
});
app.get("/api/chat", (req, res) => {
  res.send(_data.chats);
});
app.get("/api/chat/:id", (req, res) => {
  // console.log(req.params.id);
  const singleChat = _data.chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is Running on PORT: http://localhost:${PORT}`);
});
