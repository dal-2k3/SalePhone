import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';

export default function EditCategory({ category, onSave, onCancel }) {
    const [editedCategory, setEditedCategory] = useState({ ...category });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setEditedCategory((prevCategory) => ({
            ...prevCategory,
            [name]: name === 'logo' ? files[0] : value,
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', editedCategory.name);
            formData.append('logo', editedCategory.logo);
            formData.append('note', editedCategory.note);

            // Gọi API để thêm mới category
            onSave(formData);
            console.log(formData)
            // Sau khi lưu thành công, đặt lại trạng thái của biểu mẫu
            setEditedCategory({
                name: '',
                logo: null,
                note: '',
            });

            // Đóng cửa sổ modal
            onCancel();
        } catch (error) {
            console.error('Error adding category:', error);
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
                                               Cập nhật danh mục
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <form onSubmit={handleSave}>
                                                    <label className="block mb-4 text-sm font-bold">Tên danh mục:</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={editedCategory.name}
                                                        onChange={handleChange}
                                                        className="w-full p-2 mb-4 border rounded"
                                                        required
                                                    />

                                                    <label className="block mb-2 text-sm font-bold">Ảnh danh mục:</label>
                                                    <input
                                                        type="file"
                                                        name="logo"
                                                        onChange={handleChange}
                                                        className="w-full p-2 mb-4 border rounded"
                                                        accept="image/*"
                                                        required
                                                    />

                                                    <label className="block mb-2 text-sm font-bold">Ghi chú:</label>
                                                    <textarea
                                                        name="note"
                                                        value={editedCategory.note}
                                                        onChange={handleChange}
                                                        className="w-full p-2 mb-4 border rounded"
                                                    />

                                                    <div className="flex space-x-4">
                                                        <button
                                                            onClick={onCancel}
                                                            className="flex-1 p-2 text-center rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400"
                                                        >
                                                            Đóng
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            className="flex-1 p-2 text-white text-center rounded-md bg-red-600 hover:bg-red-500"
                                                        >
                                                           Cập nhật
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
    );
}