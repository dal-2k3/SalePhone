const express = require("express");
const userRouter = require("./users");
const categoriesRouter = require("./categories");
const productRouter = require("./products");
const commentRouter = require("./comments");
const orderRouter = require("./order");
const emailRouter = require("./emails");

const rootRouter = express.Router();

rootRouter.use("/users", userRouter);
rootRouter.use("/categories", categoriesRouter);
rootRouter.use("/products", productRouter);
rootRouter.use("/comments", commentRouter);
rootRouter.use("/orders", orderRouter);
rootRouter.use("/emails", emailRouter);

module.exports = rootRouter;