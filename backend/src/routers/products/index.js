const express = require('express');
const { createProduct, getAllProduct, getProductById, addProductDetail, getProductDetailByIdProduct, getProductByCategory, updateProduct, deleteProduct, addPromotion, getProductDetailById, updateProductDetail, deleteProductDetail, getPromotionById, updatePromotion, deletePromotion, } = require('../../services/products');
const { getCategoryById } = require('../../services/categories');
const productRouter = express.Router();
const path = require('path');
const multer = require('multer');
const { findIdProductDetailInOrderDetail, findIdProductInOrderDetail, findIdProductPromotionInOrderDetail } = require('../../services/order');
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

const isImage = (file) => {
    const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return imageMimeTypes.includes(file.mimetype);
};

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!isImage(file)) {
            // Nếu không phải là file ảnh, từ chối tệp
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
});

productRouter.post('/', upload.fields([{ name: 'image', maxCount: 10 }, { name: 'giftImage', maxCount: 10 }]), async (req, res) => {
    try {
        const files = req.files;
        if (!files || (files['image'] && files['image'].length === 0 && files['giftImage'] && files['giftImage'].length === 0)) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const data = JSON.parse(JSON.stringify(req.body));

        if (!data || !data.product_details || !data.promotions) {
            return res.status(400).json({ message: 'Invalid request data' });
        }
        const { idCategory, name, capacity, parameter, product_details, promotions } = data;

        const category = await getCategoryById(idCategory);

        if (!category) {
            return res.status(400).json({ message: 'Invalid idCategory' });
        }

        const createdProduct = await createProduct({
            idCategory,
            name,
            capacity,
            parameter
        });
        const addDetailsPromises = product_details.map(async (detail, index) => {
            if (files['image'] && files['image'][index]) {
                await addProductDetail({
                    idProduct: createdProduct.id,
                    color: detail.color,
                    quantity: detail.quantity,
                    price: detail.price,
                    discount: detail.discount,
                    image: files['image'][index].path,
                });
            }
        });

        const addPromotionsPromises = promotions.map(async (promotion, index) => {
            if (files['giftImage'] && files['giftImage'][index]) {
                await addPromotion({
                    idProduct: createdProduct.id,
                    gift: promotion.gift,
                    image: files['giftImage'][index].path,
                });
            }
        });

        // Đợi cho tất cả các promises hoàn thành trước khi trả về kết quả
        await Promise.all([...addDetailsPromises, ...addPromotionsPromises]);

        res.status(200).json({ message: 'Product and details added successfully' });
    } catch (error) {
        console.log(error);
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
})
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
    const { idCategory, name, capacity, status } = req.body;
    const { id } = req.params;
    const idproduct = await getProductById(id);
    if (!idproduct) {
        res.status(500).send("Product does not exist");
    }
    const product = await updateProduct(id, { idCategory, name, capacity, status });
    if (!product) {
        res.status(500).send("can't update  product");
    }
    res.status(200).send(product)
});
productRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const idproduct = await findIdProductInOrderDetail(id);
    if (idproduct) {
        return res.status(500).send("Product already exist in the table order detail");
    };
    await deleteProduct(id);
    res.status(200).send("delete product successfully")
});

// Product_detail
productRouter.post('/detail', upload.single('image'), async (req, res) => {
    const { idProduct, color, discount, price, quantity } = req.body;
    const image = path.join('uploads', req.file.filename);
    const checkId = await getProductById(idProduct);
    if (!checkId) {
        res.status(404).send("Product does not exist");
    }
    const productDetail = await addProductDetail({ idProduct, color, discount, price, quantity, image });
    if (!productDetail) {
        res.status(501).send("can't create product detail");
    }
    res.status(200).send(productDetail);
});
productRouter.put('/detail/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { color, discount, price, quantity, status } = req.body;
    const image = path.join('uploads', req.file.filename);
    const checkId = await getProductDetailById(id);
    if (!checkId) {
        res.status(404).send("Product detail does not exist");
    };
    const productDetail = await updateProductDetail(id, { color, discount, price, quantity, image, status });
    if (!productDetail) {
        res.status(501).send("can't update product detail");
    }
    res.status(200).send(productDetail);
});
productRouter.delete('/detail/:id', async (req, res) => {
    const { id } = req.params;
    const checkId = await findIdProductDetailInOrderDetail(id);
    if (checkId) {
        return res.status(500).send("Product details already exist in the table order detail");
    }
    await deleteProductDetail(id);
    res.status(200).send("delete product detail successfully");
});

// Product_promotion
productRouter.post('/promotion', upload.single('image'), async (req, res) => {
    const { idProduct, gift } = req.body;
    const image = path.join('uploads', req.file.filename);
    const checkId = await getProductById(idProduct);
    if (!checkId) {
        res.status(501).send("Product does not exist");
    }
    const promotion = await addPromotion({ idProduct, gift, image });
    if (!promotion) {
        res.status(502).send("can't create product promotion");
    }
    res.status(200).send(promotion);
});
productRouter.put('/promotion/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { gift, status } = req.body;
    const image = path.join('uploads', req.file.filename);
    const checkId = await getPromotionById(id);
    if (!checkId) {
        res.status(500).send("Product detail does not exist");
    };
    const productDetail = await updatePromotion(id, { gift, image, status });
    if (!productDetail) {
        res.status(500).send("can't update product detail");
    }
    res.status(200).send(productDetail);
});

productRouter.delete('/promotion/:id', async (req, res) => {
    const { id } = req.params;
    const checkId = await findIdProductPromotionInOrderDetail(id);
    if (checkId) {
        return res.status(500).send("Product Promotion already exist in the table order detail");
    }
    await deletePromotion(id);
    res.status(200).send("delete successfuly");
});

module.exports = productRouter;