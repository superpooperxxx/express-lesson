import express from "express";

import * as controller from "../controllers/posts.controller.js";

const router = express.Router();

router
  .param("postId", controller.checkId)
  .get("/", controller.getPosts)
  .get("/:postId", controller.getPost)
  .post("/", controller.createPost)
  .patch("/:postId", controller.updatePost)
  .delete("/:postId", controller.deletePost);

export { router };
