import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { getOrderDetail } from '../services/order';
import { DOMAIN } from '../utils/settings/config';
import moment from 'moment';
export default function OrderDetail() {
    const { id } = useParams();
    const [OrderDetails, setOrderDetails] = useState([]);

    const [order, SetOrder] = useState([]);
    const [isActiveOrder, SetIsActiveOrder] = useState();

    useEffect(() => {
        const fetchorderdetails = async () => {
            const orderdetails = await getOrderDetail(id);
            setOrderDetails(orderdetails);
            SetOrder(orderdetails.map((item) => item.Order))
        }
        fetchorderdetails();
    }, [id]);
    useEffect(() => {
        if (!order) return
        SetIsActiveOrder(order[0]);
    }, [order])

    console.log(OrderDetails);

    return (
        <div className=" grid grid-cols-4 w-full p-3 ">
            <div className='col-span-1'>
                <img className='mt-4' src="https://news.khangz.com/wp-content/uploads/2023/12/mung-ngay-quan-doi-1.jpg" alt="1" />
                <img className='mt-4' src="https://news.khangz.com/wp-content/uploads/2021/11/1155-x-510-px-1.png" alt="2" />
                <img className='mt-4' src="https://news.khangz.com/wp-content/uploads/2021/11/Main-2-ki%CC%81ch-thu%CC%9Bo%CC%9B%CC%81c_81104282330112023.png" alt="3" />
                <img className='mt-4' src="https://news.khangz.com/wp-content/uploads/2021/11/Main_74155322330112023-1.png" alt="4" />
            </div>

            {isActiveOrder && (
                <div className='col-span-3 m-5 '>

                    <div>
                        <div className='flex py-5 text-2xl '>
                            <p className='underline underline-offset-8 decoration-2 decoration-blue-500'>Chi tiết hàng đơn số : # {isActiveOrder.id}</p>
                            <p className='ml-7 px-2 text-xl border rounded-lg border-yellow-400 text-green-700'>{isActiveOrder.status} </p>
                            <p className='ml-7 px-2 text-xl text-green-600'>Thời gian đặt hàng : {moment(isActiveOrder.createdAt).format("DD-MM-YYYY hh:mm:ss")} </p>
                        </div>

                        <div className="grid grid-cols-3 gap-4 ">
                            <div className="col-span-2 rounded-lg border-2 border-green-700 p-4 text-lg text-slate-800">
                                <div className='text-2xl text-center'>THÔNG TIN NHẬN HÀNG </div>
                                <div className='flex py-1'><p className=' w-[20%] text-gray-500'>Người nhận:</p><p className='w-[80%]'>{isActiveOrder.fullname}</p></div>
                                <div className='flex py-1'><p className=' w-[20%] text-gray-500'>Địa chỉ:</p><p className='w-[80%]'>{isActiveOrder.address}</p></div>
                                <div className='flex py-1'><p className=' w-[20%] text-gray-500'>Số điên thoại:</p><p className='w-[80%]'>{isActiveOrder.phone}</p></div>
                                <div className='flex py-1'><p className=' w-[20%] text-gray-500'>Email:</p><p className='w-[80%]'>{isActiveOrder.email}</p></div>
                                <div className='flex py-1 font-bold'>
                                    <p className=' w-[20%] text-red-600 text-xl underline underline-offset-8 decoration-2 decoration-red-600'>Tổng tiền:</p>
                                    <p className='w-[80%] text-green-700'>{isActiveOrder.total} Đ</p>
                                </div>
                            </div>
                            <div className="col-span-1 rounded-lg border-2 border-yellow-400 p-4 text-lg text-slate-800">
                                <div className='text-2xl'>Hình thức thanh toán: </div>
                                <div>Thanh toán khi nhận hàng </div>
                            </div>
                        </div>
                    </div>


                    <div className='my-5 text-2xl underline underline-offset-8 decoration-2 decoration-pink-500'>
                        Thông tin sản phẩm
                    </div> {OrderDetails.map((item) => (
                        <div>
                            <div>
                                <div key={item.id} className='py-2 grid grid-cols-12 gap-4 text-lg border-b-2 border-slate-300'>
                                    <div className='col-span-2'>
                                        <div className='w-[150px] h-[150px]'>
                                            <img className='w-[100%]' src={`${DOMAIN}${item.Product_detail.image}`}
                                                alt="" />
                                        </div>
                                    </div>
                                    <div className='col-span-5 p-3'>
                                        <div className='text-xl underline underline-offset-4 decoration-1 decoration-slate-800'>
                                            {item.Product.name}-{item.Product.capacity}</div>
                                        <div className='py-3'> Số lượng : {item.quantity}</div>
                                    </div>
                                    <div className='col-span-3 p-3 flex'>
                                        <div className='w-[70px] h-[70px]'>
                                            <img className='w-full' src={`${DOMAIN}${item.Promotion.image}`}
                                                alt="" />
                                        </div>
                                        <div className='px-2 text-right'>tặng: {item.Promotion.gift}</div>
                                    </div>
                                    <div className='p-3 col-span-2 pr-4 text-right'>{item.totalDetail} Đ</div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='grid grid-cols-4 p-3'>
                        <div className='col-span-2'></div>
                        <div className=''>
                            <div className='mt-3 '>Tạm tính :</div>
                            <div className='mt-3 '>Tổng tiền :</div>
                            <div className='mt-3 text-lg font-bold'>Tổng thanh toán :</div>
                        </div>
                        <div className='text-right'>
                            <div className='mt-3 '>{isActiveOrder.total} Đ</div>
                            <div className='mt-3 '>{isActiveOrder.total} Đ</div>
                            <div className='mt-3 text-lg font-bold text-rose-600'>{isActiveOrder.total} Đ</div>
                        </div>
                    </div>
                 
                    <NavLink className="flex justify-end" to={`/orders/${1}`}>
                        <button className=' bg-gradient-to-r from-orange-400 to-yellow-400
                                 text-white font-bold text-center py-2 px-4 rounded-md mt-16 hover:bg-slate-500
                                  hover:to-red-700 transition ease-in-out duration-150'>
                            về trang danh sách đơn hàng
                        </button>
                    </NavLink>
                </div>)}
        </div>

    )
}
