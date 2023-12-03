const { Order } = require("../../models");
const { Product } = require("../../models");
const { Product_detail } = require("../../models");
const { Order_detail } = require("../../models");


const createOrder = async (data) => {
    try {
        const order = await Order.create(data)
        return order;
    } catch (error) {
        console.log(error);
    }
};
const getAllOrders = async () => {
    try {
        const order = await Order.findAll({
            order: [['createdAt', 'DESC']],
        }
        )
        return order;
    } catch (error) {
        console.log(error);
    }
};
const getOrderById = async (id) => {
    try {
        const order = await Order.findOne({
            where: {
                id,
            }
        })
        return order;
    } catch (error) {
        console.log(error);
    }
};
const getOrderByPhone = async (phone) => {
    try {
        const order = await Order.findOne({
            where: {
                phone,
            }
        })
        return order;
    } catch (error) {
        console.log(error);
    }
};
const updateOrder = async (id, data) => {
    try {
        const order = await Order.update(data, {
            where: {
                id,
            }
        })
        return order;
    } catch (error) {
        console.log(error);
    }
};
const deleteOrder = async (id) => {
    try {
        const order = await Order.destroy({
            where: {
                id,
            }
        })
        return order;
    } catch (error) {
        console.log(error);
    }
};

// order_detail
const createOrderDetail = async (data) => {
    try {
        const orderDetail = await Order_detail.create(data);
        return orderDetail;
    } catch (error) {
        console.log(error);
    }
};
const getOrderDetailByOrder = async (id_Order) => {
    try {
        const orderDetail = await Order_detail.findOne({
            where: {
                id_Order,
            }
        });
        return orderDetail;
    } catch (error) {
        console.log(error);
    }
};
const getOrderDetail = async (id_Order) => {
    try {
        const orderDetail = await Order_detail.findAll({
            where: {
                id_Order,
            },
            include: [
                {
                    model: Order,
                },
                {
                    model: Product,
                },
                {
                    model: Product_detail,
                },
                {
                    model: Promotion,
                }
            ]

        });
        return orderDetail;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrderByPhone,
    updateOrder,
    deleteOrder,
    // order_detail
    createOrderDetail,
    getOrderDetail,
    getOrderDetailByOrder,
}