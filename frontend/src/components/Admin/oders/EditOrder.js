import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function EditOrder({ order, onSave, onCancel }) {
    const [editedOrder, setEditedOrder] = useState({ ...order });
    const statusColors = {
        chờ_xử_lý: 'bg-yellow-300',
        đã_xử_lý: 'bg-green-300',
        đã_giao: 'bg-blue-300',
        đã_hủy: 'bg-red-300',
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedOrder((prevOrder) => ({
            ...prevOrder,
            [name]: value,
        }));
    }
    const handleEdit = async (e) => {
        e.preventDefault()

        try {
            onSave(editedOrder)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Transition.Root show={true} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-50"
                initialFocus={onCancel} onClose={onCancel}
            >
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
                                    <div className="sm: flex sm:items-start ">
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                            <Dialog.Title
                                                as="h1"
                                                className=" text-center font-semibold leading-6 text-2xl p-7 text-cyan-900"
                                            >
                                                Edit order
                                            </Dialog.Title>
                                            <div className=" ">
                                                <form className="w-full" onSubmit={handleEdit}>
                                                    <div className="mb-4">
                                                        <div className=" mt-2 grid grid-cols-2 gap-4">
                                                            <div>
                                                                <label className="block mb-2 text-sm font-bold">
                                                                    fullname
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="fullname"
                                                                    value={editedOrder.fullname}
                                                                    onChange={handleChange}
                                                                    className="border rounded-lg xl:h-[50px] sm:h-[30px] px-2"
                                                                    placeholder="Nhập họ và tên"
                                                                    required
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block mb-2 text-sm font-bold">
                                                                    SĐT
                                                                </label>
                                                                <input
                                                                    name="phone"
                                                                    value={editedOrder.phone}
                                                                    onChange={handleChange}
                                                                    type="text"
                                                                    className="border rounded-lg xl:h-[50px] sm:h-[30px] px-2"
                                                                    placeholder="Nhập số điện thoại"
                                                                    required
                                                                />
                                                            </div>
                                                            <div className='col-span-2'>
                                                                <label className="block mb-2 text-sm font-bold">
                                                                    địa chỉ
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="address"
                                                                    value={editedOrder.address}
                                                                    onChange={handleChange}
                                                                    className=" w-full border rounded-lg xl:h-[50px] sm:h-[30px] px-2"
                                                                    placeholder="Địa chỉ..."
                                                                    required
                                                                />
                                                            </div>
                                                            <div className='col-span-2'>
                                                                <label className="block mb-2 text-sm font-bold">
                                                                    email
                                                                </label>
                                                                <input
                                                                    type="email"
                                                                    name="email"
                                                                    value={editedOrder.email}
                                                                    onChange={handleChange}
                                                                    className="w-full border rounded-lg xl:h-[50px] sm:h-[30px] px-2"
                                                                    placeholder="Nhập địa chỉ email"
                                                                    required
                                                                />
                                                            </div>

                                                            <div className='col-span-2'>
                                                                <label className="block mb-2 text-sm font-bold">
                                                                    Trạng thái
                                                                </label>
                                                                <select
                                                                    id="statusSelect"
                                                                    name="status"
                                                                    className="w-full py-2 px-3 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-400"
                                                                    value={editedOrder.status}
                                                                    onChange={handleChange}
                                                                >
                                                                    <option className={`${editedOrder.status}` === "đã_giao" || `${editedOrder.status}` === "đã_xử_lý"  ? 'hidden' : 'block'} value="chờ_xử_lý">Chờ xử lí</option>
                                                                    <option className={`${editedOrder.status}` === "đã_giao" ? 'hidden' : 'block'} value="đã_xử_lý">Đã xử lí</option>
                                                                    <option   value="đã_giao">Đã giao</option>
                                                                    <option   value="đã_hủy">Hủy</option>
                                                                    {/* {Object.keys(statusColors).map((status) => (
                                                                        <option key={status} value={status}>
                                                                            {status}
                                                                        </option>
                                                                    ))} */}
                                                                </select>
                                                            </div>



                                                        </div>
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
                                                        Edit
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
