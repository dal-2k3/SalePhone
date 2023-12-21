const express = require('express');
const { createCategory, getCategory, deleteCategory, getCategoryById, updateCategory, getCategoryByName } = require('../../services/categories');
const categoriesRouter = express.Router();
const multer = require('multer');
const path = require('path');
const { getProductByCategory, getIdCategory } = require('../../services/products');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // thư mục lưu trữ ảnh
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now();
        const originalname = file.originalname.replace(/[^a-zA-Z0-9]/g, ''); // Lọc bỏ ký tự đặc biệt từ tên gốc
        const fileName = `${timestamp}-${originalname}`;
        cb(null, fileName);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        // Kiểm tra nếu tệp là hình ảnh
        cb(null, true);
    } else {
        // Nếu không phải là hình ảnh, từ chối tệp
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

categoriesRouter.post('/', upload.single('logo'), async (req, res) => {
    try {
        const { name, note } = req.body;
        const logo = path.join('uploads', req.file.filename); // Kết hợp thư mục và tên file
        const checkname = await getCategoryByName(name);
        if (checkname) {
            return res.status(501).send("Category name already exists!!!");
        }
        const category = await createCategory({ name, note, logo });
        if (!category) {
            return res.status(502).send("Can't create category");
        }
        res.status(200).send(category);
        const idProduct = category.id;
        console.log(idProduct);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error creating category");
    }
});
categoriesRouter.get('/all', async (req, res) => {
    const listcategory = await getCategory();
    if (!listcategory) {
        return res.status(500).send("can't get all category");
    }
    res.status(200).send(listcategory);
});

categoriesRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const idcategoryExistProducts = await getIdCategory(id);
    if (idcategoryExistProducts) {
        return res.status(501).send("This category has products available");
    };
    await deleteCategory(id);
    res.status(200).send(`delete Category id successfully`);
});

categoriesRouter.put('/:id', upload.single('logo'), async (req, res) => {
    const { id } = req.params;
    const { name, note, status } = req.body;
    const logo = path.join('uploads', req.file.filename);
    const idcategoryUpdate = await getCategoryById(id);
    if (!idcategoryUpdate) {
        return res.status(404).send(`Category ${id} is not update in db`);
    }
    const category = await updateCategory(id, { name, note, logo, status });
    if (!category) {
        return res.status(500).send("can't update category");
    }
    res.status(200).send(category);
});
module.exports = categoriesRouter;
