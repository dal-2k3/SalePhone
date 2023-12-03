import React, { useEffect, useState } from 'react';
import moment from "moment";
import { getOrders, updateOrder } from '../../../services/order';
import EditOrder from './EditOrder';
import { NavLink } from 'react-router-dom';

export default function ListOrder() {
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState(1);
    const [reload, setReload] = useState(false);
    const [editingOrder, seteditingOrder] = useState(null);
    const statusColors = {
        chờ_xử_lý: 'bg-yellow-400',
        đã_xử_lý: 'bg-green-400',
        đã_giao: 'bg-blue-400',
        hủy: 'bg-red-400',
    };

    const handleChangeEdit = (item) => {
        seteditingOrder(item);
    }
    const handleCancelEdit = () => {
        seteditingOrder(null)
    }
    const handleEdit = async (editedCategory) => {
        try {
            await updateOrder(editingOrder.id, editedCategory);
            // setReload((prevReload) => !prevReload);  
            seteditingOrder(null);
        } catch (error) {
            console.log(error)
        }
    }
    const changeTab = (tabNumber) => {
        setActiveTab(tabNumber);
    };
    useEffect(() => {
        const fetchlistorders = async () => {
            try {
                const orderslist = await getOrders();
                setOrders(orderslist);
            } catch (error) {
                console.log(error);
            }
        };
        fetchlistorders();
    }, [reload]);
    return (
        <div >

            <div className="flex mt-20   justify-center ">
                <button
                    className={`py-2 px-4 font-bold text-2xl ${activeTab === 1 ? "text-black rounded-full bg-orange-400 bg-opacity-50 py-1 px-3" : "text-black"
                        }`}
                    onClick={() => changeTab(1)}
                >
                    tất cả đơn hàng
                </button>
                <button
                    className={`py-2 px-4 font-bold text-2xl ${activeTab === 2 ? "text-black rounded-full bg-orange-400 bg-opacity-50 py-1 px-3" : "text-black"
                        }`}
                    onClick={() => changeTab(2)}
                >
                    đơn chưa xử lý
                </button>
                <button
                    className={`py-2 px-4  font-bold text-2xl ${activeTab === 3 ? "text-black rounded-full bg-orange-400 bg-opacity-50 py-1 px-3" : "text-black"
                        }`}
                    onClick={() => changeTab(3)}
                >
                    đơn đã xử lý
                </button>
                <button
                    className={`py-2 px-4  font-bold text-2xl ${activeTab === 4 ? "text-black rounded-full bg-orange-400 bg-opacity-50 py-1 px-3" : "text-black"
                        }`}
                    onClick={() => changeTab(4)}
                >
                    đã giao
                </button>
                <button
                    className={`py-2 px-4 font-bold text-2xl ${activeTab === 5 ? "text-black rounded-full bg-orange-400 bg-opacity-50 py-1 px-3" : "text-black"
                        }`}
                    onClick={() => changeTab(5)}
                >
                    đã hủy
                </button>
                {/* Add more buttons for additional tabs */}
            </div>

            <div className="mt-4">
                {activeTab === 1 && (
                    <div className="">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-100 text-left dark:bg-meta-4 bo">
                                    <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                        mã đơn
                                    </th>
                                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                        tên
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        phone
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        email
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        địa chỉ
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        ngày đặt hàng
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        trạng thái
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        hành động
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((item) => (
                                    <tr key={item.id}>

                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="inline-flex rounded-full bg-red-300 bg-opacity-0 py-1 px-3 text-lg font-light text-black">
                                                {item.id}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="inline-flex rounded-full bg-red-300 bg-opacity-0 py-1 px-3 text-lg font-light text-black">
                                                {item.fullname}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="inline-flex rounded-full bg-green-200 bg-opacity-0 py-1 px-3 text-lg font-light text-black">
                                                {item.phone}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="inline-flex rounded-full bg-green-200 bg-opacity-0 py-1 px-3 text-lg font-light  text-black">
                                                {item.email}
                                            </p>
                                        </td>
                                        <td className="max-w[100px] border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className=" max-w-full inline-flex rounded-full bg-green-200 bg-opacity-0 py-1 px-3 text-lg font-light text-black">
                                                {item.address}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="inline-flex rounded-full bg-green-200 bg-opacity-0 py-1 px-3 text-lg font-light  text-black">
                                                {moment(item.createdAt).format("DD-MM-YYYY hh:mm:ss")}
                                            </p>
                                        </td>
                                        <td className={`border-b border-[#eee] py-5 px-4 dark:border-strokedark`}>
                                            <p className={`inline-flex rounded-full bg-opacity-50 py-1 px-3 text-sm font-medium text-slate-700 ${statusColors[item.status]}`}>
                                                {item.status}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <div className="flex items-center justify-center space-x-3.5">
                                                <NavLink to={`/orders/detail/${item.id}`}>
                                                    <button className="hover:text-primary">
                                                        <svg
                                                            className="fill-current text-indigo-600"
                                                            width="20"
                                                            height="20"
                                                            viewBox="0 -3 18 18"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                                                fill=""
                                                            />
                                                            <path
                                                                d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                                                fill=""
                                                            />
                                                        </svg>
                                                    </button>
                                                </NavLink>
                                                <button className="hover:text-primary"
                                                    onClick={() => handleChangeEdit(item)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        className="fill-current text-green-600"
                                                        width="18"
                                                        height="18"
                                                        enable-background="new 0 0 32 32"
                                                        viewBox="0 0 32 32"
                                                        id="update">
                                                        <path d="M23.7207 8.1641c-3.7872-3.7316-9.6125-4.1499-13.8605-1.2914L9.8483 5.2317c-.002-.2762-.2276-.4985-.5039-.4963L8.3445 4.7432C8.0684 4.7453 7.8464 4.9708 7.8484 5.2468L7.876 8.9893c.0039.5498.4512.9922 1 .9922.002 0 .0049 0 .0078 0l3.743-.0276c.2762-.002.4984-.2277.4963-.5039l-.0078-1.0001c-.0021-.2761-.2276-.4981-.5036-.4961l-.6362.0046c3.3478-1.6712 7.5305-1.1391 10.341 1.6295 2.6972 2.6588 3.4342 6.6558 1.9015 10.0831-.1091.244-.0197.5283.2183.65l.8925.456c.2529.1292.5727.0251.6901-.2334C27.9255 16.3433 27.0319 11.4282 23.7207 8.1641zM23.124 22.0186c-.002 0-.0049 0-.0078 0l-3.743.0275c-.2762.0021-.4984.2277-.4963.5039l.0078 1.0001c.0021.276.2276.498.5036.4961l.6356-.0046c-3.348 1.6708-7.53 1.1382-10.3404-1.6295-2.6972-2.6588-3.4342-6.6559-1.9015-10.0831.1091-.244.0197-.5283-.2183-.65l-.8925-.456c-.2529-.1292-.5727-.0251-.6901.2334-1.9068 4.2002-1.0131 9.1153 2.298 12.3795 2.1396 2.1084 4.9307 3.1592 7.7197 3.1592 2.1475 0 4.2929-.6252 6.1407-1.869l.0119 1.6421c.002.2762.2276.4985.5039.4964l.9999-.0078c.2761-.0022.4981-.2277.4961-.5037l-.0276-3.7424C24.1201 22.4609 23.6729 22.0186 23.124 22.0186z"></path></svg>
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {editingOrder && (
                    <EditOrder
                        order={editingOrder}
                        onSave={handleEdit}
                        onCancel={handleCancelEdit}
                    />
                )

                }

            </div>
        </div>
    )
}
