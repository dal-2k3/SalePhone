const express = require('express');
const { createComment, getCommentPrivate, getCommentPublic, updateComment, deleteComments, getComment } = require('../../services/comments');
const { getProductById } = require('../../services/products');
const commentRouter = express.Router();

commentRouter.post('/', async (req, res) => {
  try {
    const { idProduct, rating, username, phone, content } = req.body;
    console.log(idProduct);
    const checkidProduct = await getProductById(idProduct);
    if (!checkidProduct) {
      res.status(500).send("loi id")
    }
    // console.log(req.body);
    const comment = await createComment({ idProduct, rating, username, phone, content });
    if (!comment) {
      res.status(500).send(" can't create comment");
    };
    res.status(200).send(comment);
  } catch (error) {
    console.log(error);
  }
});
commentRouter.get('/private', async (req, res) => {
  const comment = await getCommentPrivate();
  if (!comment) {
    res.status(500).send("can't get comments");
  }
  res.status(200).send(comment);
});

commentRouter.get('/public', async (req, res) => {
  const comment = await getCommentPublic();
  if (!comment) {
    res.status(500).send("can't get comments");
  }
  res.status(200).send(comment);
});

commentRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const comment = await getComment(id);
  if (!comment) {
    res.status(500).send("can't get comments");
  }
  res.status(200).send(comment);
});
commentRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const comment = await updateComment(id, { status });
  if (!comment) {
    res.status(500).send("can't updete comments");
  }
  res.status(200).send(comment);
});
commentRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const comment = await deleteComments(id);
  if (!comment) {
    res.status(500).send("can't delete comments");
  }
  res.status(200).send("delete successfully");
});

module.exports = commentRouter;