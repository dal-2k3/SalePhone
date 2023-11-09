const { Categorie } = require("..//..//models");
const { Product_detail } = require("..//..//models");
const { Product } = require("..//..//models");


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
            ],

        });
        return listProduct;
    } catch (error) {
        console.log(error);
    }
};
const getProductByName = async (name) => {
    try {
        const product = await Product.findOne({
            where: {
                name,
            }
        });
        return product;
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
                }
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
        const product = await Product.destroy({
            where: {
                id
            }
        })
        return product
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
        const idproduct = await Product.findAll({
            where: {
                id,
            },
            include: [
                {
                    model: Product_detail,
                    as: "product_detail",
                }
            ],
        });
        return idproduct;
    } catch (err) {
        console.log(err);
    }
};
module.exports = {
    createProduct,
    getAllProduct,
    getProductByName,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductByCategory,
    // product detail
    addProductDetail,
    getProductDetailByIdProduct
}