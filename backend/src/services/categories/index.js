const db = require("..//..//models");
const { Categorie } = require("..//..//models");
const { Product } = require("..//..//models");

const createCategory = async (category) => {
    try {
        const newCategory = await Categorie.create(category);
        return newCategory;
    } catch (error) {
        console.log(error);
    }
};
const getCategory = async () => {
    try {
        const listCategory = await Categorie.findAll();
        return listCategory;
    } catch (error) {
        console.log(error);
    }
};

const getCategoryByName = async (name) => {
    try {
        const listCategory = await Categorie.findOne({
            where: {
                name,
            }
        });
        return listCategory;
    } catch (error) {
        console.log(error);
    }
};

const getCategoryById = async (id) => {
    try {
        const category = await Categorie.findOne({
            where: {
                id,
            },
        });
        return category;
    } catch (err) {
        console.log(err);
    }
};
const deleteCategory = async (id) => {
    try {
        const deleteCategory = await Categorie.destroy({
            where: {
                id,
            }
        });
        return deleteCategory;
    } catch (error) {
        console.log(error);
    }
};
const updateCategory = async (id, data) => {
    try {
        const updateCategory = await Categorie.update(data, {
            where: {
                id,
            }
        });
        return updateCategory;
    } catch (error) {
        console.log(error);
    }
};
module.exports = {
    createCategory,
    getCategory,
    getCategoryByName,
    deleteCategory,
    getCategoryById,
    // getProductByCategory,
    updateCategory

}
