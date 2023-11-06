const express = require("express");
const userRouter = require("./users");
const categoriesRouter = require("./categories");
const productRouter = require("./products");

const rootRouter = express.Router();

rootRouter.use("/users", userRouter);
rootRouter.use("/categories",categoriesRouter);
rootRouter.use("/products", productRouter);

module.exports = rootRouter;