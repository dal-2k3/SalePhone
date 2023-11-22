import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';

export default function EditDetail({ productdetail, onSave, onCancel }) {
    const [editedDetail, setEditedDetail] = useState({ ...productdetail });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setEditedDetail((prevDetail) => ({
            ...prevDetail,
            [name]: name === 'image' ? files[0] : value,
        }));
    };
    const handleSave = (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('color', editedDetail.color);
            formData.append('quantity', editedDetail.quantity);
            formData.append('price', editedDetail.price);
            formData.append('discount', editedDetail.discount);
            formData.append('status', editedDetail.status);
            formData.append('image', editedDetail.image);
            // Gọi API để thêm mới category
            onSave(formData);
            console.log(formData);
            // Sau khi lưu thành công, đặt lại trạng thái của biểu mẫu
            setEditedDetail({
                color: '',
                price: '',
                discount: '',
                status: '',
                quantity: '',
                image: null,
            });
            // Đóng cửa sổ modal
            onCancel();
        } catch (error) {
            console.error('Error update product detail:', error);
        }
    };
    return (
        <Transition.Root show={true} as={Fragment}>
            <Dialog as="div" className="relative z-50" initialFocus={onCancel} onClose={onCancel}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                Edit Product Detail
                                            </Dialog.Title>
                                            <div className="mt-2 ">
                                                <form onSubmit={handleSave}>
                                                    <div
                                                        className="mb-4 p-4 border rounded relative"
                                                    >
                                                        <label
                                                            className="block text-lg font-semibold mb-2"
                                                            htmlFor={`color`}
                                                        >
                                                            Màu sắc:
                                                        </label>
                                                        <input

                                                            type="text"
                                                            name="color"
                                                            value={editedDetail.color}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full py-2 px-3 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-400"
                                                        />
                                                        <label
                                                            className="block text-lg font-semibold mb-2"
                                                            htmlFor={`quantity`}
                                                        >
                                                            Số lượng:
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="quantity"
                                                            value={editedDetail.quantity}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full py-2 px-3 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-400"
                                                        />
                                                        <label
                                                            className="block text-lg font-semibold mb-2"
                                                            htmlFor={`price`}
                                                        >
                                                            Giá:
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="price"
                                                            value={editedDetail.price}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full py-2 px-3 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-400"
                                                        />
                                                        <label
                                                            className="block text-lg font-semibold mb-2"
                                                            htmlFor={`discount`}
                                                        >
                                                            Giảm Giá:
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="discount"
                                                            value={editedDetail.discount}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full py-2 px-3 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-400"
                                                        />
                                                        <label className="block text-lg font-semibold mb-2"
                                                            htmlFor="status">Status:</label>
                                                        <select
                                                            className="w-full py-2 px-3 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-400"
                                                            id="status"
                                                            name="status"
                                                            value={editedDetail.status}

                                                            onChange={handleChange}>
                                                            <option value="stop Business">Stop Business</option>
                                                            <option value="business">Business</option>
                                                            <option value="about To Go Into Business">About to Go Into Business</option>
                                                        </select>
                                                        <label
                                                            className="block text-lg font-semibold mb-2"
                                                            htmlFor={`image`}
                                                        >
                                                            Hình ảnh:
                                                        </label>
                                                        <input
                                                            type="file"
                                                            name="image"
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full py-2 px-3 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-400"
                                                        />
                                                    </div>
                                                    <div className="flex space-x-4">
                                                        <button
                                                            onClick={onCancel}
                                                            className="flex-1 p-2 text-center rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400"
                                                        >
                                                            Close
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            className="flex-1 p-2 text-white text-center rounded-md bg-red-600 hover:bg-red-500"
                                                        >
                                                            Edit product detail
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
