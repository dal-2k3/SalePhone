const { Categorie } = require("..//..//models");
const { Product_detail } = require("..//..//models");
const { Product } = require("..//..//models");
const { Promotion } = require("..//..//models");
const { Comment } = require("..//..//models");


const createProduct = async (product) => {
    try {
        const newProduct = await Product.create(product);
        return newProduct;
    } catch (error) {
        console.log(error);
    }
};
const getAllProduct = async () => {
    try {
        const listProduct = await Product.findAll({
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: Product_detail,
                    as: 'product_detail',
                    limit: 1, // Giới hạn để chỉ lấy một phần tử đầu tiên
                },
                {
                    model: Categorie,
                    attributes: ['name']
                },
                {
                    model: Promotion,
                    as: "product_promotion",
                },
            ],

        });
        return listProduct;
    } catch (error) {
        console.log(error);
    }
};

const getProductById = async (id) => {
    try {
        const idproduct = await Product.findOne({
            where: {
                id,
            },
        });
        return idproduct;
    } catch (err) {
        console.log(err);
    }
};
const getIdCategory = async (idCategory) => {
    try {
        const idproduct = await Product.findOne({
            where: {
                idCategory,
            },
        });
        return idproduct;
    } catch (err) {
        console.log(err);
    }
};

const getProductByCategory = async (idCategory) => {
    try {
        const Category = await Product.findAll({
            where: {
                idCategory,
            },
            include: [
                {
                    model: Product_detail,
                    as: "product_detail",
                    limit: 1,
                },
                {
                    model: Categorie,
                    attributes: ['name']
                },
                {
                    model: Promotion,
                    as: "product_promotion",
                },
            ],
        });
        return Category;
    } catch (err) {
        console.log(err);
    }
};
const updateProduct = async (id, data) => {
    try {
        const product = await Product.update(data,
            {
                where: {
                    id,
                }
            });
        return product;
    } catch (err) {
        console.log(err)
    }
};
const deleteProduct = async (id) => {
    try {
        await Product.destroy({
            where: {
                id
            }
        });
        await Product_detail.destroy({
            where: {
                idProduct: id,
            }
        });
        await Promotion.destroy({
            where: {
                idProduct: id,
            }
        });
    } catch (err) {
        console.log(err)
    }
};

// productDetails
const addProductDetail = async (data) => {
    try {
        const newProductDetail = await Product_detail.create(data);
        return newProductDetail;

    } catch (error) {
        console.log(error)
    }
};

const getProductDetailByIdProduct = async (id) => {
    try {
        const productDetail = await Product.findAll({
            where: {
                id,
            },
            include: [
                {
                    model: Product_detail,
                    as: "product_detail",
                },
                {
                    model: Promotion,
                    as: "product_promotion",
                },
                {
                    model: Categorie,
                    attributes: ['name']
                },

            ],
        });
        return productDetail;
    } catch (err) {
        console.log(err);
    }
};

const getProductDetailById = async (id) => {
    try {
        const productDetail = await Product_detail.findOne({
            where: {
                id,
            }
        });
        return productDetail;
    } catch (error) {
        console.log(error);
    }
};
const updateProductDetail = async (id, data) => {
    try {
        const productDetail = await Product_detail.update(data,
            {
                where: {
                    id,
                }
            });
        return productDetail;
    } catch (error) {
        console.log(error);
    }
};
const deleteProductDetail = async (id) => {
    try {
        const productDetail = await Product_detail.destroy(
            {
                where: {
                    id,
                }
            });
        return productDetail;
    } catch (error) {
        console.log(error);
    }
};
//addPromotion
const addPromotion = async (data) => {
    try {
        const newPromotion = await Promotion.create(data);
        return newPromotion;
    } catch (error) {
        console.log(error)
    }
};
const getPromotionById = async (id) => {
    try {
        const promotion = await Promotion.findOne(
            {
                where: {
                    id,
                }
            });
        return promotion;
    } catch (error) {
        console.log(error)
    }
};
const updatePromotion = async (id, data) => {
    try {
        const promotion = await Promotion.update(data,
            {
                where: {
                    id,
                }
            });
        return promotion;
    } catch (error) {
        console.log(error)
    }
};
const deletePromotion = async (id) => {
    try {
        const promotion = await Promotion.destroy(
            {
                where: {
                    id,
                }
            });
        return promotion;
    } catch (error) {
        console.log(error)
    }
};
module.exports = {
    createProduct,
    getAllProduct,
    getIdCategory,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductByCategory,
    // product detail
    addProductDetail,
    getProductDetailByIdProduct,
    getProductDetailById,
    updateProductDetail,
    deleteProductDetail,
    // promotions
    addPromotion,
    getPromotionById,
    updatePromotion,
    deletePromotion,
};