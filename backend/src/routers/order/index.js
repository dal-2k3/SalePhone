const express = require('express');
const { createOrder, createOrderDetail } = require('../../services/order');
const orderRouter = express.Router();

orderRouter.post('/', async (req, res) => {
    try {
        const data = JSON.parse(JSON.stringify(req.body));
        if (!data || !data.order_details) {
            return res.status(400).json({ message: 'Invalid request data' });
        }
        const { fullname, phone, email, address, total, order_details } = data;

        const order = createOrder({ fullname, phone, email, address, total })
        if (!order) {
            res.status(500).send(" can't create order ")
        }
        order_details.forEach(async (detail) => {
            await createOrderDetail({
                id_Product: order.id,
                id_Product_detail: detail.id_Product_detail,
                id_Promotion: detail.id_Promotion,
                totalDetail: detail.totalDetail,
                quantity: detail.quantity
            });
        });
        res.status(200).json({ message: 'Order and details added successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error adding order and order details', error });
    }


})

