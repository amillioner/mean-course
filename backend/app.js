const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PostTable = require("./models/post");

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
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});
// app.use((req, res, next) => {
//   console.log("First middleweare");
//   next();
// });

app.post("/api/posts", (req, res, next) => {
  // const post = req.body;
  const post = new PostTable({
    title: req.body.title,
    content: req.body.content
  });
  // console.log(post);
  post.save();
  res.status(201).json({
    message: "Post added successfully."
  });
});

app.delete("/api/posts:id", (req, res, next) => {
  console.log(req.params.id);
  res.status(200).json({ message: "Post Deleted." });
});

app.use("/api/posts", (req, res, next) => {
  PostTable.find().then(docs => {
    console.log(docs);
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: docs
    });
  });

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
});

module.exports = app;
