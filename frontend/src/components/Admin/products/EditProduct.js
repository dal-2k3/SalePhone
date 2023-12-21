import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

export default function EditProduct({ product, categories, onSave, onCancel }) {
    const [editedProduct, setEditedProduct] = useState({ ...product });

    const handleChange = (field, event) => {
        setEditedProduct({
            ...editedProduct,
            [field]: event.target.value,
        });
    };
    const handleDescriptionChange = (value) => {
        setEditedProduct({ ...editedProduct, parameter: value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        try {
            onSave(editedProduct);

            // Sau khi lưu thành công, đặt lại trạng thái của biểu mẫu
            setEditedProduct({
                idCategory: "",
                name: '',
                capacity: '',
                status: '',
                parameter: ''
            });
            // Đóng cửa sổ modal
            onCancel();
        } catch (error) {
            console.error('Error editing product :', error);
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                            <Dialog.Title as="h3" className=" text-center text-xl font-extrabold leading-6 text-red-600 hover:text-red-500">
                                                Edit Product
                                            </Dialog.Title>
                                            <div className="mt-2 ">
                                                <form onSubmit={handleSave}>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="mb-4">
                                                            <label
                                                                className="block text-lg font-bold mb-2 "
                                                                htmlFor="category"
                                                            >
                                                                Danh mục:
                                                            </label>
                                                            <select
                                                                id="idCategory"
                                                                name="idCategory"
                                                                value={editedProduct.idCategory}
                                                                onChange={(event) =>
                                                                    handleChange("idCategory", event)
                                                                }
                                                                className="w-full py-2 px-3 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-400"
                                                            >
                                                                {categories.map((category) => (
                                                                    <option
                                                                        key={category.id}
                                                                        value={category.id}
                                                                    >
                                                                        {category.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="mb-4">
                                                            <label
                                                                className="block text-lg font-semibold mb-2"
                                                                htmlFor="capacity"
                                                            >
                                                                Dung lượng:
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="capacity"
                                                                name="capacity"
                                                                value={editedProduct.capacity}
                                                                onChange={(event) =>
                                                                    handleChange("capacity", event)
                                                                }
                                                                className="w-full py-2 px-3 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-400"
                                                            />
                                                        </div>
                                                        <div className="mb-4 ">
                                                            <label
                                                                className="block text-lg font-semibold mb-2"
                                                                htmlFor="name"
                                                            >
                                                                Tên sản phẩm:
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="name"
                                                                name="name"
                                                                value={editedProduct.name}
                                                                onChange={(event) =>
                                                                    handleChange("name", event)
                                                                }
                                                                required
                                                                placeholder="Type here..."
                                                                className="w-full py-2 px-3 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-400"
                                                            />
                                                        </div>
                                                        <div className="mb-4 ">
                                                            <label className="block text-lg font-semibold mb-2"
                                                                htmlFor="status">Trạng thái:</label>
                                                            <select
                                                                className="w-full py-2 px-3 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-400"
                                                                id="status"
                                                                name="status"
                                                                value={editedProduct.status}
                                                                onChange={(event) =>
                                                                    handleChange("status", event)}>
                                                                <option value="stop Business">Dừng kinh doanh</option>
                                                                <option value="business">Đang bán</option>
                                                                <option value="about To Go Into Business">Hàng sắp về</option>
                                                            </select>
                                                        </div>


                                                        <div className="mb-4 col-span-2">
                                                            <label
                                                                className="block text-lg font-semibold mb-2"
                                                                htmlFor="parameter"
                                                            >
                                                                Mô tả:
                                                            </label>
                                                            <ReactQuill
                                                                name="parameter"
                                                                id="parameter"
                                                                theme="snow"
                                                                value={editedProduct.parameter}
                                                                onChange={handleDescriptionChange}
                                                                modules={{
                                                                    toolbar: [
                                                                        [{ font: [] }],
                                                                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                                                                        ["bold", "italic", "underline", "strike"],
                                                                        [{ color: [] }, { background: [] }],
                                                                        [{ script: "sub" }, { script: "super" }],
                                                                        ["blockquote", "code-block"],
                                                                        [{ list: "ordered" }, { list: "bullet" }],
                                                                        [
                                                                            { indent: "-1" },
                                                                            { indent: "+1" },
                                                                            { align: [] },
                                                                        ],
                                                                        ["link", "image", "video"],
                                                                        ["clean"],
                                                                    ],
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
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
    )
}
