import { Post } from "../models/posts.model.js";

const checkId = async (req, res, next, value) => {
  if (!Number(value)) {
    res.status(400).json({
      error: "postId should be a number",
    });

    return;
  }

  const post = await Post.findByPk(+value);

  if (!post) {
    res.status(404).json({
      error: `There is no post with id ${value} in database`,
    });

    return;
  }

  req.post = post.dataValues;
  next();
};

const getPosts = async (req, res) => {
  const posts = await Post.findAll();

  res.json(posts);
};

const getPost = (req, res) => {
  res.json(req.post);
};

const createPost = async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    res.status(400).json({
      error: "title and body are required",
    });

    return;
  }
  const newPost = await Post.create({
    title,
    body,
    user_id: 1,
  });

  res.status(201).json(newPost);
};

const updatePost = async (req, res) => {
  const { postId } = req.params;
  const fieldsToUpdate = req.body;

  const values = {
    ...req.post,
    ...fieldsToUpdate,
  };

  await Post.update(
    { title: values.title, body: values.body, user_id: values.user_id },
    { where: { id: values.id } }
  );

  const updatedPost = await Post.findByPk(+postId);

  res.status(200).json(updatedPost);
};

const deletePost = async (req, res) => {
  const { postId } = req.params;

  await Post.destroy({ where: { id: +postId } });

  res.send();
};

export { getPosts, getPost, createPost, deletePost, updatePost, checkId };
