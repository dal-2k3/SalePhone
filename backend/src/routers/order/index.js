const express = require('express');
const { createOrder, createOrderDetail, getAllOrders, getOrderById, deleteOrder, updateOrder, getOrderDetailByOrder, getOrderDetail, getOrderByPhone, checkPhone } = require('../../services/order');
const { getProductDetailById, updateProductDetail } = require('../../services/products');
const { sendMail } = require('../../services/mailer');
const orderRouter = express.Router();
const DOMAIN = "http://localhost:8000/";
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

                if (newQuantity <= 0) {
                    // Nếu số lượng mới sau khi cập nhật là 0 hoặc âm, cập nhật trạng thái của product_detail
                    await updateProductDetail(id_Product_detail, { quantity: 0, status: 'Hết hàng' });
                } else {
                    // Nếu số lượng mới lớn hơn 0, tiến hành cập nhật số lượng
                    const updateResult = await updateProductDetail(id_Product_detail, { quantity: newQuantity });
                    if (!updateResult) {
                        // Trả về lỗi nếu cập nhật không thành công
                        return res.status(500).json({ message: 'Error updating product detail' });
                    }
                }
                await createOrderDetail({
                    id_Order: newOrder.id,
                    id_Product: detail.id_Product,
                    id_Product_detail: id_Product_detail,
                    id_Promotion: detail.id_Promotion,
                    totalDetail: detail.totalDetail,
                    quantity: quantity,
                });
            }
        };

        const subject = `Hóa Đơn Đặt Hàng số : ${newOrder.id}`;
        const htmlHead = `<table style="width:50%">
            <tr style="border: 1px solid black;">
                <th style="border: 1px solid black;">Tên Sản Phẩm</th>
                <th style="border: 1px solid black;">Màu sắc</th>
                <th style="border: 1px solid black;">Hình Ảnh</th>
                <th style="border: 1px solid black;">Giá</th>
                <th style="border: 1px solid black;">Số Lượng</th>
                <th style="border: 1px solid black;">Thành Tiền</th>
            </tr>`;

        let htmlContent = "";

        for (const detail of order_details) {
            htmlContent += `
            <tr>
                <td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">
                    ${detail.name} ${detail.capacity}
                </td>
                <td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">
                    ${detail.color}
                </td>
                <td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">
                    <a href="${DOMAIN}${detail.imageProductDetail}">
                        <img src=${DOMAIN}${detail.imageProductDetail} width="80" height="80">
                    </a>
                </td>
                <td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">${detail.price}đ</td>
                <td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">${detail.quantity}</td>
                <td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">${detail.totalDetail}đ</td>
            </tr>`;
        }

        const htmlResult = `
                <h1>Xin chào khách hàng : ${fullname}</h1>
                <h3>Số điện thoại: ${phone}</h3>
                <h3>Địa chỉ: ${address}</h3>
                
                <h3>thời gian đặt hàng: ${newOrder.createdAt} </h3>
              
                <h3 style=" color: red;" >chi tiết sản phẩm</h3>
                ${htmlHead}
                ${htmlContent}
                 <h2>Tổng Thanh Toán:<h3 style="color: red;">${total}đ</h3></h2>           
                <p style =" "> Trân trọng!</p>`;

        await sendMail(email, subject, htmlResult);
        res.status(200).json(newOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding order and order details', error });
    }
});

orderRouter.get('/', async (req, res) => {
    const order = await getAllOrders();
    if (!order) {
        return res.status(500).send("can't get the order list");
    }
    res.status(200).send(order);
})
orderRouter.get('/order/:phone', async (req, res) => {
    const { phone } = req.params;
    console.log(phone);
    const Phone = await checkPhone(phone);
    if (!Phone) {
        return res.status(500).send("order does not exist");
    }
    const orders = await getOrderByPhone(phone)
    res.status(200).send(orders);
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
        return res.status(501).send("can't update the order ");
    }
    res.status(200).send(order);
});
orderRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const checkId = await getOrderById(id);
    if (!checkId) {
        return res.status(500).send("order does not exist");
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
        return res.status(500).send("order does not exist")
    }
    const orderDetai = await getOrderDetail(id);
    if (!orderDetai) {
        return res.status(501).send("can't get list order detail");
    }
    res.status(200).send(orderDetai);
});
module.exports = orderRouter;
