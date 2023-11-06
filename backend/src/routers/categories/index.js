const express = require('express');
const { createCategory, getCategory, deleteCategory, getCategoryById, updateCategory, getCategoryByName } = require('../../services/categories');
const categoriesRouter = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // thư mục lưu trữ ảnh
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // tên tệp sẽ được lưu là một timestamp + tên gốc của tệp
    },
});
const upload = multer({ storage: storage });


categoriesRouter.post('/', upload.single('logo'), async (req, res) => {
    const { name, note } = req.body;
    const logo = req.file.filename;
    const checkname = await getCategoryByName(name);
    if (checkname) {
        return res.status(404).send(" category name already exists!!!");
    }
    const category = await createCategory({ name, note, logo });
    if (!category) {
        return res.status(500).send("can't create category");
    }
    res.status(200).send(category);
    const idProduct = category.id;
    console.log(idProduct)
});

categoriesRouter.get('/all', async (req, res) => {
    const listcategory = await getCategory();
    if (!listcategory) {
        return res.status(500).send("can't get all category");
    }
    res.status(200).send(listcategory);
});
// categoriesRouter.get('/get/:id', async (req, res) => {
//     const { id } = req.params;
//     const idcategory = await getProductByCategory(id);
//     if (!idcategory) {
//         return res.status(500).send(`Category ${id} is no00t exists in db`);
//     }
//     res.status(200).send(idcategory);
// });

categoriesRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const idcategoryExist = await getCategoryById(id);
    if (!idcategoryExist) {
        return res.status(500).send(`Category ${id} is not exists in db`);
    }
    const categoryDelete = await deleteCategory(id);
    res.status(200).send(`Category id : ${id} successfully`);
});

categoriesRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, note, logo, status } = req.body;

    const idcategoryUpdate = await getCategoryById(id);
    if (!idcategoryUpdate) {
        return res.status(500).send(`Category ${id} is not update in db`);
    }
    const data = { name, note, logo, status };
    const category = await updateCategory(id, data);
    if (!category) {
        return res.status(500).send("can't create category");
    }
    res.status(200).send(data);
});
module.exports = categoriesRouter;
