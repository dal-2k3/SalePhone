const express = require('express');
const { createOrder, createOrderDetail, getAllOrders, getOrderById, deleteOrder, updateOrder, getOrderDetailByOrder, getOrderDetail } = require('../../services/order');
const orderRouter = express.Router();

orderRouter.post('/', async (req, res) => {
    try {
        const { fullname, phone, email, address, total, order_details } = req.body;
        if (!order_details) {
            return res.status(400).json({ message: 'Invalid request data' });
        }
        const newOrder = await createOrder({ fullname, phone, email, address, total })
        if (!newOrder) {
            res.status(500).send(" can't create order ")
        };
        order_details.forEach(async (detail) => {
            await createOrderDetail({
                id_Order: newOrder.id,
                id_Product: detail.id_Product,
                id_Product_detail: detail.id_Product_detail,
                id_Promotion: detail.id_Promotion,
                totalDetail: detail.totalDetail,
                quantity: detail.quantity,
            });
        });
        res.status(200).json( newOrder);
    } catch (error) {
        console.log(error);
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
