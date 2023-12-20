import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getOrderByPhone } from '../services/order';
import { useNavigate } from "react-router-dom";

export default function CheckOrder() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        // Kiểm tra số điện thoại ở đây nếu cần
        if (data.phone.length !== 10 || !/^\d+$/.test(data.phone)) {
            toast.error('Số điện thoại phải là 10 chữ số và chỉ chứa số.');
            return;
        }

        try {
            const orders = await getOrderByPhone(data.phone);
            toast.success('Thành công');
            console.log('Dữ liệu từ db trả về:', orders);
            navigate(`/orders/${data.phone}`);
        } catch (error) {
            console.log(error);
            // Hiển thị thông báo lỗi sử dụng Toastify
            toast.error('Bạn nhập chưa đúng số điện thoại mua hàng. Mời nhập lại.');
        }
        console.log('Dữ liệu form đã gửi:', data);
    };

    return (
        <div>

            <div className=" bg-no-repeat bg-contain bg-[url('https://workit.vn/Upload/page_layout/_237/Image/medium/EE01743F976F8FAF8C041B076E4C4F9F.png')]" >

                <div className="flex flex-col items-center justify-center h-screen light">
                    <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-6">
                        <div className="text-3xl text-center py-6 font-extrabold ...">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-800 to-green-500">
                                Kiểm tra đơn hàng của bạn
                            </span>
                        </div>



                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                            <input
                                placeholder="Nhập số điện thoại mua hàng."
                                {...register('phone', {
                                    required: 'Số điện thoại là bắt buộc',
                                    pattern: {
                                        value: /^\d{10}$/,
                                        message: 'Số điện thoại phải là 10 chữ số, chỉ chứa số ',
                                    },
                                })}
                                className={`bg-gray-200 text-gray-800 border-0 rounded-full p-2 mb-4
                                    focus:bg-gray-200 focus:outline-none focus:ring-1
                                    focus:ring-blue-500 transition ease-in-out duration-150 ${errors.phone ? 'border-red-500' : ''}`}
                                type="text"
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm">{errors.phone.message}</p>
                            )}

                            <button
                                className="text-xl bg-gradient-to-r from-green-500 to-green-700 text-white py-2 px-2
                                    rounded-full mt-6 hover:bg-yellow-300 hover:to-green-400 transition ease-in-out duration-350"
                                type="submit"
                            >
                                Tiếp Tục
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}
