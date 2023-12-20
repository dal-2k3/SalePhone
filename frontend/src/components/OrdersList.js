import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getOrderByPhone, updateOrder } from '../services/order';
import moment from "moment";

export default function OrdersList() {
    const { phone } = useParams();
    const [orders, setOrders] = useState([]);
    const [reload, setReload] = useState(false);
    const statusColors = {
        chờ_xử_lý: 'text-yellow-400',
        đã_xử_lý: 'text-green-500',
        đã_giao: 'text-blue-500',
        đã_hủy: 'text-red-600 ',
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrderByPhone(phone);
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, [phone, reload]);
    const status = {
        status: "đã_hủy",
    };

    const handleEdit = async (id) => {
        const update = await updateOrder(id, status);
        const updatedOrder = orders.map((order) =>
            order.id === update.id ? update : order
        );
        setReload((prevReload) => !prevReload);
        setOrders(updatedOrder);
    };

    return (
        <div className=" grid grid-cols-4 w-full p-3 ">
            <div className='col-span-1'>
                <img className='mt-4' src="https://news.khangz.com/wp-content/uploads/2023/12/mung-ngay-quan-doi-1.jpg" alt="1" />
                <img className='mt-4' src="https://news.khangz.com/wp-content/uploads/2021/11/1155-x-510-px-1.png" alt="2" />
                <img className='mt-4' src="https://news.khangz.com/wp-content/uploads/2021/11/Main-2-ki%CC%81ch-thu%CC%9Bo%CC%9B%CC%81c_81104282330112023.png" alt="3" />
                <img className='mt-4' src="https://news.khangz.com/wp-content/uploads/2021/11/Main_74155322330112023-1.png" alt="4" />
            </div>
            <div className='col-span-3 '>
                <div className="m-4 text-3xl text-green-700 underline underline-offset-8 decoration-2 decoration-pink-500">
                    Danh sách đơn hàng của bạn
                </div>

                {orders && orders.map((order) => (
                    <div className=" border-b-2 border-slate-300" key={order.id}>
                        <div className='flex my-3 justify-between text-green-700'>
                            <div className='flex pl-4'>
                                <div className='text-2xl font-normal'>mã đơn hàng:</div>
                                <div className='px-3 text-2xl text-black'>#{order.id}</div>
                            </div>
                            <div className='flex'>
                                <div className={`text-lg px-3 py border-2 border-green-500 rounded-lg ${statusColors[order.status]}`}>{order.status}</div>
                                {order.status === 'chờ_xử_lý' && (
                                    <button onClick={() => handleEdit(order.id)}
                                        className=' ml-2 text-lg px-3 py
                                    
                                 bg-red-600 text-white border-2
                                 border-yellow-400 rounded-lg'>
                                        Hủy đơn
                                    </button>
                                )}
                            </div>
                        </div>
                        <hr />
                        <div className="py-2 grid grid-cols-12 m-4 gap-4 ">
                            <div className="col-span-2">
                                <div className="w-[150px] h-[150px]">
                                    <img
                                        className="w-[100%]"
                                        src={`https://www.thegioididong.com/lich-su-mua-hang/images/no-image.jpg`}
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="col-span-2 p-3">
                                <div>{order.fullname}</div>
                            </div>
                            <div className="col-span-4   p-3">
                                <div>{order.address}</div>
                            </div>
                            <div className="col-span-2 p-2 flex">{order.phone}</div>
                            <div className="p-3 col-span-2 pr-4 text-right">
                                <div className='text-xl text-green-700'>{order.total} Đ</div>
                                <NavLink to={`/order/details/${order.id}`}>
                                    <button className=' bg-gradient-to-r from-orange-400 to-yellow-400
                                 text-white font-bold  py-2 px-4 rounded-md mt-16 hover:bg-indigo-600
                                  hover:to-green-500 transition ease-in-out duration-150'>
                                        Xem chi tiết.
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                    </div>))}
            </div>

        </div>
    );
}