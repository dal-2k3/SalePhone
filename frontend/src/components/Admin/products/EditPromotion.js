import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';

export default function EditPromotion({ promotion, onSave, onCancel }) {
    const [editedPromotion, setEditedPromotion] = useState({ ...promotion });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setEditedPromotion((prevPromotion) => ({
            ...prevPromotion,
            [name]: name === 'image' ? files[0] : value,
        }));
    };
    const handleSave = (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('gift', editedPromotion.gift);
            formData.append('status', editedPromotion.status);
            formData.append('image', editedPromotion.image);
            // Gọi API để thêm mới category
            onSave(formData);
            console.log(formData);
            // Sau khi lưu thành công, đặt lại trạng thái của biểu mẫu
            setEditedPromotion({
                gift: '',
                status: '',
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
                                                <form className="w-full" onSubmit={handleSave}>
                                                    <div
                                                        className="mb-4 p-4 border rounded relative"
                                                    >
                                                        <label
                                                            className="block text-lg font-semibold mb-2"
                                                            htmlFor={`gift`}
                                                        >
                                                            gift:
                                                        </label>
                                                        <select
                                                            name="gift"
                                                            id="gift"
                                                            value={editedPromotion.gift}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full py-2 px-3 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-400"
                                                        >
                                                            <option
                                                                className="bg-gray-100"
                                                                value="tai nghe"
                                                            >
                                                                Tai nghe
                                                            </option>
                                                            <option
                                                                className="bg-gray-100"
                                                                value="sạc dự phòng"
                                                            >
                                                                Sạc dự phòng
                                                            </option>
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
                                                    <button
                                                        onClick={onCancel}
                                                        className="mt-3 inline-flex w-full justify-center rounded-md
                                                             bg-white px-3 py-2 text-sm font-semibold text-gray-900 
                                                             shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 
                                                             sm:mt-0 sm:w-auto"
                                                    >
                                                        Close
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                    >
                                                        Edit Promotion
                                                    </button>
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
