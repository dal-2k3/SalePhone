const express = require('express');
const { getProductByName, createProduct, getAllProduct, getProductById, addProductDetail, getProductDetailByIdProduct, getProductByCategory, } = require('../../services/products');
const { getCategoryById } = require('../../services/categories');
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
const productRouter = express.Router();


productRouter.post('/', upload.array('image', 2), async (req, res) => {
    const files = req.files;
    console.log(req.body)
    const data = JSON.parse(JSON.stringify(req.body));
    const { idCategory, name, capacity, product_details } = data;
    console.log(data)
    try {
        const checkname = await getProductByName(name);
        // kiểm tra tên sp ...
        if (checkname) {
            return res.status(404).send("product name already exists!!!");
        }
        const category = await getCategoryById(idCategory);
        if (!category) {
            return res.status(400).json({ message: 'Invalid idCategory' });
        }
        const createdProduct = await createProduct({
            idCategory,
            name,
            capacity,
        });
        try {
            product_details.forEach(async (detail, index) => {
                await addProductDetail({
                    idProduct: createdProduct.id,
                    color: detail.color,
                    quantity: detail.quantity,
                    price: detail.price,
                    discount: detail.discount,
                    image: files[index].path,
                });
            });
        } catch (error) {
            console.log(error)
        }
        res.status(200).json({ message: 'Product and details added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product and details', error });
    }

});

productRouter.get('/category/:id', async (req, res) => {
    const { id } = req.params;
    const listcategory = await getProductByCategory(id);
    if (!listcategory) {
        return res.status(500).send("can't get all products by category");
    }
    res.status(200).send(listcategory);
});
// get all
productRouter.get('/', async (req, res) => {
    const listProduct = await getAllProduct();
    if (!listProduct) {
        res.status(500).send("can't get all products")
    }
    res.status(200).send(listProduct);
});
// get one product
productRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await getProductDetailByIdProduct(id);
    if (!product) {
        return res.status(500).send("can't get product");
    }
    res.status(200).send(product);
});


productRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await getProductById(id);
    if (!product) {
        res.status(500).send("Product does not exist");
    }
    res.status(200).send(product)
});
module.exports = productRouter;