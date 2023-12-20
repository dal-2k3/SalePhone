import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { DOMAIN } from "../../../utils/settings/config";
import { getOrderDetail } from '../../../services/order';
import moment from "moment";
export default function OrderDetail() {
    const { id } = useParams();
    const [orderDetail, SetOrderDetail] = useState([]);
    const [order, SetOrder] = useState([]);
    const [isActiveOrder, SetIsActiveOrder] = useState();
    useEffect(() => {
        const fetchOrderDetail = async () => {
            const data = await getOrderDetail(id);
            SetOrderDetail(data);
            SetOrder(data.map((item) => (item.Order)))
        }
        fetchOrderDetail();
    }, [id]);
    useEffect(() => {
        if (!order) return
        SetIsActiveOrder(order[0]);
    }, [order])

    console.log('1223', orderDetail);
    console.log('1228', order);
    console.log('1229', isActiveOrder);

    return (

        <div className='w-full p-3'>
            {isActiveOrder && (
                <div>
                    <div className='flex py-5 text-2xl '>
                        <p className='underline underline-offset-8 decoration-2 decoration-blue-500'>Chi tiết hàng đơn số : # {isActiveOrder.id}</p>
                        <p className='ml-7 px-2 text-xl border rounded-lg border-yellow-400 text-green-700'>{isActiveOrder.status} </p>
                        <p className='ml-7 px-2 text-xl '>Thời gian đặt hàng : {moment(isActiveOrder.createdAt).format("DD-MM-YYYY hh:mm:ss")} </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 ">
                        <div className="col-span-2 rounded-lg border-2 border-green-700 p-4 text-lg text-slate-800">
                            <div className='text-2xl text-center'>THÔNG TIN NHẬN HÀNG </div>
                            <div className='flex py-1'><p className=' w-[16%] text-gray-500'>Người nhận:</p><p className='w-[84%]'>{isActiveOrder.fullname}</p></div>
                            <div className='flex py-1'><p className=' w-[16%] text-gray-500'>Địa chỉ:</p><p className='w-[84%]'>{isActiveOrder.address}</p></div>
                            <div className='flex py-1'><p className=' w-[16%] text-gray-500'>Số điên thoại:</p><p className='w-[84%]'>{isActiveOrder.phone}</p></div>
                            <div className='flex py-1'><p className=' w-[16%] text-gray-500'>Email:</p><p className='w-[84%]'>{isActiveOrder.email}</p></div>
                            <div className='flex py-1'><p className=' w-[16%] text-red-600 text-xl underline underline-offset-8 decoration-2 decoration-red-600'>Tổng tiền:</p>
                                <p className='w-[84%] text-green-700'>{isActiveOrder.total} Đ</p></div>
                        </div>
                        <div className="col-span-1 rounded-lg border-2 border-yellow-400 p-4 text-lg text-slate-800">
                            <div className='text-2xl'>Hình thức thanh toán: </div>
                            <div>Thanh toán khi nhận hàng </div>
                        </div>
                    </div>
                </div>

            )}

            <div className='my-5 text-2xl underline underline-offset-8 decoration-2 decoration-pink-500'>
                Thông tin sản phẩm
            </div>
            {orderDetail.map((item) => (
                <div>
                    <div key={item.id} className='py-2 grid grid-cols-12 m-7 gap-4 text-lg border-b-2 border-slate-300'>
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
            ))}



        </div>

    )
}
