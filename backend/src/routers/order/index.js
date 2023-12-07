const express = require('express');
const { createOrder, createOrderDetail, getAllOrders, getOrderById, deleteOrder, updateOrder, getOrderDetailByOrder, getOrderDetail } = require('../../services/order');
const { getProductDetailById, updateProductDetail } = require('../../services/products');
const orderRouter = express.Router();

orderRouter.post('/', async (req, res) => {
    try {
        const { fullname, phone, email, address, total, order_details } = req.body;

        if (!order_details || !Array.isArray(order_details) || order_details.length === 0) {
            return res.status(400).json({ message: 'Invalid request data' });
        }

        const newOrder = await createOrder({ fullname, phone, email, address, total });

        if (!newOrder) {
            return res.status(500).send("Can't create order");
        }
        for (const detail of order_details) {
            const { id_Product_detail, quantity } = detail;
            console.log(detail);
            const productDetail = await getProductDetailById(id_Product_detail);

            if (productDetail) {
                const newQuantity = productDetail.quantity - quantity;
                console.log(newQuantity);
                const updateResult = await updateProductDetail(id_Product_detail, { quantity: newQuantity });

                if (updateResult) {
                    await createOrderDetail({
                        id_Order: newOrder.id,
                        id_Product: detail.id_Product,
                        id_Product_detail: id_Product_detail,
                        id_Promotion: detail.id_Promotion,
                        totalDetail: detail.totalDetail,
                        quantity: quantity,
                    });
                } else {
                    // Trả về lỗi nếu cập nhật không thành công
                    return res.status(500).json({ message: 'Error updating product detail' });
                }
            }
        }
        res.status(200).json({ message: 'Order and details added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding order and order details', error });
    }
});

orderRouter.get('/', async (req, res) => {
    const order = await getAllOrders();
    if (!order) {
        res.status(500).send("can't get the order list");
    }
    res.status(200).send(order);
})
orderRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { fullname, phone, email, address, status } = req.body;
    console.log({ fullname, phone, email, address, status })
    console.log(id)
    const checkId = await getOrderById(id);
    if (!checkId) {
        res.status(500).send("order does not exist");
    }
    const order = await updateOrder(id, { fullname, phone, email, address, status });
    if (!order) {
        res.status(501).send("can't update the order ");
    }
    res.status(200).send(order);
});
orderRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const checkId = await getOrderById(id);
    if (!checkId) {
        res.status(500).send("order does not exist");
    }
    const order = await deleteOrder(id);
    if (!order) {
        res.status(500).send("can't delete the order ");
    }
    res.status(200).send("delete successfully");
});

// Order detail

orderRouter.get('/detail/:id', async (req, res) => {
    const { id } = req.params;
    const checkId = await getOrderDetailByOrder(id);
    if (!checkId) {
        res.status(500).send("order does not exist")
    }
    const orderDetai = await getOrderDetail(id);
    if (!orderDetai) {
        res.status(501).send("can't get list order detail");
    }
    res.status(200).send(orderDetai);
});
module.exports = orderRouter;
