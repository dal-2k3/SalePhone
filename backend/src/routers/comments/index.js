const express = require('express');
const commentRouter = express.Router();

commentRouter.post('/', async (req,res) =>{
const {idProduct,username,phone,content,rating} = req.body;

});

module.exports = commentRouter;