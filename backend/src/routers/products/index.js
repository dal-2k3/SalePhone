const express = require('express');
const { getProductByName, createProduct, getAllProduct, getProductById, addProductDetail, getProductDetailByIdProduct, getProductByCategory, updateProduct, deleteProduct, addPromotion, } = require('../../services/products');
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

productRouter.post('/', upload.array('image', 10), async (req, res) => {
    const files = req.files;
    console.log(req.body)
    const data = JSON.parse(JSON.stringify(req.body));
    const { idCategory, name, capacity, parameter, product_details, promotions } = data;
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
            parameter,
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
            // addPromotion
            promotions.forEach(async (promotion, index) => {
                await addPromotion({
                    idProduct: createdProduct.id,
                    gift: promotion.gift,
                    image: files[index].path
                })
            });
        } catch (error) {
            console.log(error)
        }


        res.status(200).json({ message: 'Product and details added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product and details', error });
    }

});
// get product by idCategory
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

productRouter.put('/:id', async (req, res) => {
    const { idCategory, name, capacity, } = req.body;
    const { id } = req.params;
    const idproduct = await getProductById(id);
    if (!idproduct) {
        res.status(500).send("Product does not exist");
    }
    const product = await updateProduct(id, { idCategory, name, capacity });
    if (!product) {
        res.status(500).send("can't update  product");
    }
    res.status(200).send(product)
});
productRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const idproduct = await getProductById(id);
    if (!idproduct) {
        res.status(500).send("Product does not exist");
    }
    const product = await deleteProduct(id)
    if (!product) {
        res.status(500).send("can't update  product");
    }
    res.status(200).send(product)
});

// Product_detail
productRouter.post('detail', async (req, res) => {
    const { idProduct } = req.params;
    const {color,discount,price,quantity,image} =req.body;
    const checkId = getProductById(idProduct);
    if (!checkId) {
        res.status(500).send("Product does not exist");
    }
    const productDetail = addProductDetail({idProduct,color,discount,price,quantity,image});
    if (!productDetail) {
        res.status(500).send("can't create product detail");
    }
   res.status(200).send(productDetail);
});
productRouter.put('detail/:id', async (req, res) => {
    const { id } = req.params;
    const {color,discount,price,quantity,image,status} = req.body;
    const checkId = getProductById(id);
    if (!checkId) {
        res.status(500).send("Product does not exist");
    }



});

module.exports = productRouter;