const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postsRoutes = require("./routes/posts");

const app = express();

mongoose
  .connect(
    "mongodb+srv://anwar:w8yG1ypWVP6K14yX@cluster0-lixpt.mongodb.net/node-angular?retryWrites=true"
  )
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch(() => {
    console.log("Connection failed");
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);

// const posts = [
//   {
//     id: "asdf2345asd",
//     title: "First server side post",
//     content: "This is coming from the server"
//   },
//   {
//     id: "asdf2345asd",
//     title: "First server side post----",
//     content: "This is coming from the server!"
//   }
// ];

module.exports = app;
