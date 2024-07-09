let POSTS = require("../models/posts.model");

const checkId = (req, res, next, value) => {
  if (!Number(value)) {
    res.status(400).json({
      error: "postId should be a number",
    });

    return;
  }

  const post = POSTS.find(({ id }) => id === +value);

  if (!post) {
    res.status(404).json({
      error: `There is no post with id ${value} in database`,
    });

    return;
  }

  req.post = post;
  next();
};

const getPosts = (req, res) => {
  res.json(POSTS);
};

const getPost = (req, res) => {
  res.json(req.post);
};

const createPost = (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    res.status(400).json({
      error: "title and body are required",
    });

    return;
  }

  const newPost = {
    title,
    body,
    userId: 1,
    id: Math.round(Math.random() * 10000),
  };

  POSTS.push(newPost);

  res.status(201).json(newPost);
};

const updatePost = (req, res) => {
  const { postId } = req.params;
  const fieldsToUpdate = req.body;

  const updatedPost = {
    ...req.post,
    ...fieldsToUpdate,
  };

  POSTS = POSTS.map((post) => (post.id === +postId ? updatedPost : post));

  res.status(200).json(updatedPost);
};

const deletePost = (req, res) => {
  const { postId } = req.params;

  POSTS = POSTS.filter(({ id }) => id !== +postId);

  res.send();
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  checkId,
};
