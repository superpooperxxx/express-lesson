const express = require("express");

const controller = require("../controllers/posts.controller");

const router = express.Router();

router
  .param("postId", controller.checkId)
  .get("/", controller.getPosts)
  .get("/:postId", controller.getPost)
  .post("/", controller.createPost)
  .patch("/:postId", controller.updatePost)
  .delete("/:postId", controller.deletePost);

module.exports = router;
