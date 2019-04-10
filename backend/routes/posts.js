const express = require("express");
const multer = require("multer");

const PostTable = require("../models/post");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jng": "jpg"
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];

    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post(
  "",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    // const post = req.body;
    const url = req.protocol + "://" + req.get("host");
    const post = new PostTable({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + "/images" + req.file.filename
    });
    // console.log(post);
    post.save().then(createdPost => {
      console.log(createdPost);
      res.status(201).json({
        message: "Post added successfully.",
        // postId: createdPost._id
        post: {
          ...createdPost,
          id: createdPost._id
          // title: createdPost.title,
          // content: createdPost.content,
          // imagePath: createdPost.imagePath,
        }
      });
    });
  }
);

router.delete("/:id", (req, res, next) => {
  console.log(req.params.id);
  const posts = PostTable.deleteOne({
    _id: req.params.id
  }).then(result => {
    console.log(result);
  });
  res.status(200).json({ message: "Post Deleted." });
});

router.put("/:id", (req, res, next) => {
  const post = new PostTable({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  PostTable.updateOne({ _id: req.params.id }, post).then(result => {
    // console.log(result);
    res.status(200).json({ message: "Update successful." });
  });
});

router.use("", (req, res, next) => {
  PostTable.find().then(docs => {
    console.log(docs);
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: docs
    });
  });

  router.get("/:id", (req, res, next) => {
    PostTable.findById(req.params.id).then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found." });
      }
    });
  });
});
// router.use((req, res, next) => {
//   console.log("First middleweare");
//   next();
// });
module.exports = router;
