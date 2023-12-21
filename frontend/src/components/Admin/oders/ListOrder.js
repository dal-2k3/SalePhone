import React, { useEffect, useState } from "react";
import moment from "moment";
import { getOrders, updateOrder } from "../../../services/order";
import EditOrder from "./EditOrder";
import { NavLink } from "react-router-dom";

export default function ListOrder() {
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [reload, setReload] = useState(false);
  const [editingOrder, seteditingOrder] = useState(null);
  const [search, setSearch] = useState("");
  const statusColors = {
    chờ_xử_lý: "bg-yellow-400",
    đã_xử_lý: "bg-green-400",
    đã_giao: "bg-blue-400",
    đã_hủy: "bg-red-400",
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const [processed, setProcessed] = useState([]);
  const [processedTotalPage, setProcessedTotalPage] = useState(1);

  const [pending, setPending] = useState([]);
  const [pendingTotalPage, setPendingTotalPage] = useState(1);

  const [delivered, setDelivered] = useState([]);
  const [deliveredTotalPage, setDeliveredTotalPage] = useState(1);

  const [cancel, setCancel] = useState([]);
  const [cancelTotalPage, setCancelTotalPage] = useState(1);

  const handleChangeEdit = (item) => {
    seteditingOrder(item);
  };
  const handleCancelEdit = () => {
    seteditingOrder(null);
  };
  const handleEdit = async (editedCategory) => {
    try {
      await updateOrder(editingOrder.id, editedCategory);
      // setReload((prevReload) => !prevReload);
      seteditingOrder(null);
    } catch (error) {
      console.log(error);
    }
  };
  const changeTab = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  useEffect(() => {
    const fetchlistorders = async () => {
      try {
        const orderslist = await getOrders();
        setAllOrders(orderslist);
        const totalCount = orderslist.length;
        console.log(totalCount);
        setTotalPages(Math.ceil(totalCount / itemsPerPage));
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentProducts = orderslist.slice(startIndex, endIndex);
        setOrders(currentProducts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchlistorders();
  }, [reload, currentPage]);
  console.log(orders);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);
  const changePage = (id) => {
    setCurrentPage(id);
  };
  useEffect(() => {
    const processedOrders = allOrders.filter((item) => {
      return item.status === "đã_xử_lý";
    });
    console.log("aaa", processedOrders);
    const numberOfprocessedOrders = processedOrders.length;
    console.log(numberOfprocessedOrders);
    setProcessedTotalPage(Math.ceil(numberOfprocessedOrders / 2));
    const startIndex = (currentPage - 1) * 2;
    const endIndex = startIndex + 2;
    const currentProducts = processedOrders.slice(startIndex, endIndex);
    setProcessed(currentProducts);
  }, [activeTab, currentPage]);
  const numbersProcessed = [...Array(processedTotalPage + 1).keys()].slice(1);

  useEffect(() => {
    const pendingOrders = allOrders.filter((item) => {
      return item.status === "chờ_xử_lý";
    });
    console.log("pending", pendingOrders);
    const numberOfpendingdOrders = pendingOrders.length;
    console.log(numberOfpendingdOrders);
    setPendingTotalPage(Math.ceil(numberOfpendingdOrders / 10));
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    const currentProducts = pendingOrders.slice(startIndex, endIndex);
    setPending(currentProducts);
  }, [activeTab, currentPage]);
  const numbersPending = [...Array(pendingTotalPage + 1).keys()].slice(1);

  useEffect(() => {
    const listOrdersFilter = allOrders.filter((item) => {
      return item.status === "đã_giao";
    });
    console.log("delivered", listOrdersFilter);
    const numberOfListOrdersFilter = listOrdersFilter.length;
    console.log(numberOfListOrdersFilter);
    setDeliveredTotalPage(Math.ceil(numberOfListOrdersFilter / 3));
    const startIndex = (currentPage - 1) * 3;
    const endIndex = startIndex + 3;
    const currentProducts = listOrdersFilter.slice(startIndex, endIndex);
    setDelivered(currentProducts);
  }, [activeTab, currentPage]);
  const numbersDelivered = [...Array(deliveredTotalPage + 1).keys()].slice(1);

  useEffect(() => {
    const listOrdersFilter = allOrders.filter((item) => {
      return item.status === "đã_hủy";
    });
    console.log("cancel", listOrdersFilter);
    const numberOfListOrdersFilter = listOrdersFilter.length;
    console.log(numberOfListOrdersFilter);
    setCancelTotalPage(Math.ceil(numberOfListOrdersFilter / 3));
    const startIndex = (currentPage - 1) * 3;
    const endIndex = startIndex + 3;
    const currentProducts = listOrdersFilter.slice(startIndex, endIndex);
    setCancel(currentProducts);
  }, [activeTab, currentPage]);
  const numbersCancel = [...Array(cancelTotalPage + 1).keys()].slice(1);

  return (
    <div>
      <div className="mt-3 mx-4">
        <div className="flex ">
          <button
            className={`py-1 pr-4 font-bold text-2xl border-b-4 ${
              activeTab === 1 ? "text-cyan-500 border-y-cyan-500" : "text-black"
            }`}
            onClick={() => changeTab(1)}
          >
            Tất cả đơn hàng
          </button>
          <button
            className={`py-1 px-4 font-bold text-2xl border-b-4 ${
              activeTab === 2 ? "text-cyan-500 border-y-cyan-500" : "text-black"
            }`}
            onClick={() => changeTab(2)}
          >
            Đơn chưa xử lý
          </button>
          <button
            className={`py-1 px-4 font-bold text-2xl border-b-4 ${
              activeTab === 3 ? "text-cyan-500 border-y-cyan-500" : "text-black"
            }`}
            onClick={() => changeTab(3)}
          >
            Đơn đã xử lý
          </button>
          <button
            className={`py-1 px-4 font-bold text-2xl border-b-4 ${
              activeTab === 4 ? "text-cyan-500 border-y-cyan-500" : "text-black"
            }`}
            onClick={() => changeTab(4)}
          >
            Đã giao
          </button>
          <button
            className={`py-1 px-4 font-bold text-2xl border-b-4 ${
              activeTab === 5 ? "text-cyan-500 border-y-cyan-500" : "text-black"
            }`}
            onClick={() => changeTab(5)}
          >
            Đã hủy
          </button>
          {/* Add more buttons for additional tabs */}
        </div>

        <div className="bg-gray-100 rounded-xl my-4 flex justify-between">
          <div className="w-[70%] p-2">
            <div class="relative">
              <input
                type="text"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                class="border border-solid rounded-2xl p-4 w-full py-2 pl-4 pr-4  focus:outline-none focus:border-blue-500"
                placeholder="Tìm kiếm đơn hàng"
              />
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  height="32px"
                  version="1.1"
                  viewBox="0 0 32 32"
                  width="32px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title />
                  <desc />
                  <defs />
                  <g
                    fill="none"
                    fill-rule="evenodd"
                    id="Page-1"
                    stroke="none"
                    stroke-width="1"
                  >
                    <g fill="#929292" id="icon-111-search">
                      <path
                        d="M19.4271164,21.4271164 C18.0372495,22.4174803 16.3366522,23 14.5,23 C9.80557939,23 6,19.1944206 6,14.5 C6,9.80557939 9.80557939,6 14.5,6 C19.1944206,6 23,9.80557939 23,14.5 C23,16.3366522 22.4174803,18.0372495 21.4271164,19.4271164 L27.0119176,25.0119176 C27.5621186,25.5621186 27.5575313,26.4424687 27.0117185,26.9882815 L26.9882815,27.0117185 C26.4438648,27.5561352 25.5576204,27.5576204 25.0119176,27.0119176 L19.4271164,21.4271164 L19.4271164,21.4271164 Z M14.5,21 C18.0898511,21 21,18.0898511 21,14.5 C21,10.9101489 18.0898511,8 14.5,8 C10.9101489,8 8,10.9101489 8,14.5 C8,18.0898511 10.9101489,21 14.5,21 L14.5,21 Z"
                        id="search"
                      />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div className="flex-1 py-2 flex justify-end ">
            <div className="flex items-center border rounded-xl px-2 mr-2">
              <svg
                width="32px"
                height="32px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M21 6H19M21 12H16M21 18H16M7 20V13.5612C7 13.3532 7 13.2492 6.97958 13.1497C6.96147 13.0615 6.93151 12.9761 6.89052 12.8958C6.84431 12.8054 6.77934 12.7242 6.64939 12.5617L3.35061 8.43826C3.22066 8.27583 3.15569 8.19461 3.10948 8.10417C3.06849 8.02393 3.03853 7.93852 3.02042 7.85026C3 7.75078 3 7.64677 3 7.43875V5.6C3 5.03995 3 4.75992 3.10899 4.54601C3.20487 4.35785 3.35785 4.20487 3.54601 4.10899C3.75992 4 4.03995 4 4.6 4H13.4C13.9601 4 14.2401 4 14.454 4.10899C14.6422 4.20487 14.7951 4.35785 14.891 4.54601C15 4.75992 15 5.03995 15 5.6V7.43875C15 7.64677 15 7.75078 14.9796 7.85026C14.9615 7.93852 14.9315 8.02393 14.8905 8.10417C14.8443 8.19461 14.7793 8.27583 14.6494 8.43826L11.3506 12.5617C11.2207 12.7242 11.1557 12.8054 11.1095 12.8958C11.0685 12.9761 11.0385 13.0615 11.0204 13.1497C11 13.2492 11 13.3532 11 13.5612V17L7 20Z"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
              <p className="pl-1">Lọc</p>
            </div>
            <div className="flex items-center border rounded-xl px-2 ml-2 mr-4">
              <svg
                fill="#000000"
                width="32px"
                height="32px"
                viewBox="0 0 24 24"
                id="export"
                data-name="Flat Line"
                xmlns="http://www.w3.org/2000/svg"
                class="icon flat-line"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <polyline
                    id="primary"
                    points="17 3 21 3 21 7"
                    style={{
                      fill: "none",
                      stroke: "#000",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                    }}
                  ></polyline>
                  <line
                    id="primary-2"
                    data-name="primary"
                    x1="11"
                    y1="13"
                    x2="21"
                    y2="3"
                    style={{
                      fill: "none",
                      stroke: "#000",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                    }}
                  ></line>
                  <path
                    id="primary-3"
                    data-name="primary"
                    d="M19,13.89V20a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V6A1,1,0,0,1,4,5h6.11"
                    style={{
                      fill: "none",
                      stroke: "#000",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                    }}
                  ></path>
                </g>
              </svg>
              <p className="pl-1">Xuất</p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          {activeTab === 1 && (
            <div className="">
              <table className="w-full table-auto">
                <thead className="bg-gray-200">
                  <tr
                    className="bg-gray-300  dark:bg-meta-4
                   text-left"
                  >
                    <th className="min-w-[120px] px-2 font-medium  text-black dark:text-white ">
                      Mã đơn hàng
                    </th>
                    <th className="min-w-[150px] px-4 font-medium text-black dark:text-white ">
                      Khách hàng
                    </th>
                    <th className="min-w-[140px] px-4 font-medium text-black dark:text-white ">
                      Số điện thoại
                    </th>
                    <th className="min-w-[120px] px-4  font-medium text-black dark:text-white ">
                      Email
                    </th>
                    <th className="px-4 font-medium text-black dark:text-white">
                      Địa chỉ
                    </th>
                    <th className="px-4 font-medium text-black dark:text-white">
                      Thời gian
                    </th>
                    <th className="px-4 font-medium text-black dark:text-white">
                      Tổng tiền
                    </th>
                    <th className="min-w-[90px] px-4 font-medium text-black dark:text-white">
                      Tình trạng đơn hàng
                    </th>
                    <th className="px-2 font-medium text-black dark:text-white">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders
                    .filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item.fullname.toLowerCase().includes(search);
                    })
                    .map((item) => (
                      <tr key={item.id}>
                        <td className="border-b-4 border-[#eee] dark:border-strokedark  text-center ">
                          <p className="inline-flex rounded-full bg-opacity-0  text-lg font-light text-black">
                            #{item.id}
                          </p>
                        </td>
                        <td className="border-b-4 border-[#eee] px-4 py-2 dark:border-strokedark">
                          <p className="inline-flextext-lg  font-normal text-black">
                            {item.fullname}
                          </p>
                        </td>
                        <td className="border-b-4  px-4 py-2 border-[#eee] dark:border-strokedark ">
                          <p className="inline-flextext-lg  font-normal text-black">
                            {item.phone}
                          </p>
                        </td>
                        <td className="border-b-4 border-[#eee] px-4 py-2">
                          <p className="  bg-opacity-0 text-lg font-light  text-black">
                            {item.email}
                          </p>
                        </td>
                        <td className=" border-b-4 border-[#eee] px-4 py-2">
                          <p className=" max-w-full  text-lg font-light text-black">
                            {item.address}
                          </p>
                        </td>
                        <td className="border-b-4 border-[#eee] px-4 py-2">
                          <p className="text-lg font-light  text-black">
                            {moment(item.createdAt).format(
                              "DD-MM-YYYY hh:mm:ss"
                            )}
                          </p>
                        </td>
                        <td className=" border-b-4 border-[#eee] px-4 py-2">
                          <p className=" max-w-full  text-lg font-light text-black">
                            {item.total}đ
                          </p>
                        </td>
                        <td className="border-b-4 border-[#eee] px-2 py-2">
                          <p
                            className={`text-center rounded-full bg-opacity-50 py-1 px-3 text-sm font-medium text-slate-700 ${
                              statusColors[item.status]
                            }`}
                          >
                            {item.status == "chờ_xử_lý"
                              ? "Chờ xử lý"
                              : item.status == "đã_xử_lý"
                              ? "Đã xử lý"
                              : item.status == "đã_giao"
                              ? "Đã giao"
                              : item.status == "hủy"
                              ? "Hủy"
                              : item.status}
                          </p>
                        </td>
                        <td className="border-b-4 border-[#eee] py-5 px-4 dark:border-strokedark">
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
                            <button
                              className="hover:text-primary"
                              onClick={() => handleChangeEdit(item)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="fill-current text-green-600"
                                width="18"
                                height="18"
                                enable-background="new 0 0 32 32"
                                viewBox="0 0 32 32"
                                id="update"
                              >
                                <path d="M23.7207 8.1641c-3.7872-3.7316-9.6125-4.1499-13.8605-1.2914L9.8483 5.2317c-.002-.2762-.2276-.4985-.5039-.4963L8.3445 4.7432C8.0684 4.7453 7.8464 4.9708 7.8484 5.2468L7.876 8.9893c.0039.5498.4512.9922 1 .9922.002 0 .0049 0 .0078 0l3.743-.0276c.2762-.002.4984-.2277.4963-.5039l-.0078-1.0001c-.0021-.2761-.2276-.4981-.5036-.4961l-.6362.0046c3.3478-1.6712 7.5305-1.1391 10.341 1.6295 2.6972 2.6588 3.4342 6.6558 1.9015 10.0831-.1091.244-.0197.5283.2183.65l.8925.456c.2529.1292.5727.0251.6901-.2334C27.9255 16.3433 27.0319 11.4282 23.7207 8.1641zM23.124 22.0186c-.002 0-.0049 0-.0078 0l-3.743.0275c-.2762.0021-.4984.2277-.4963.5039l.0078 1.0001c.0021.276.2276.498.5036.4961l.6356-.0046c-3.348 1.6708-7.53 1.1382-10.3404-1.6295-2.6972-2.6588-3.4342-6.6559-1.9015-10.0831.1091-.244.0197-.5283-.2183-.65l-.8925-.456c-.2529-.1292-.5727-.0251-.6901.2334-1.9068 4.2002-1.0131 9.1153 2.298 12.3795 2.1396 2.1084 4.9307 3.1592 7.7197 3.1592 2.1475 0 4.2929-.6252 6.1407-1.869l.0119 1.6421c.002.2762.2276.4985.5039.4964l.9999-.0078c.2761-.0022.4981-.2277.4961-.5037l-.0276-3.7424C24.1201 22.4609 23.6729 22.0186 23.124 22.0186z"></path>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="flex items-end justify-center mt-10">
                <div className=" pagination">
                  <button
                    className={`mr-2 flex items-center text-cyan-500 ${
                      currentPage === 1 ? "hidden" : "block"
                    }`}
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    <svg
                      width="12px"
                      height="12px"
                      fill={`${currentPage === 1 ? "#6B7280" : "#1640D6"}`}
                      viewBox="0 0 512 512"
                      data-name="Layer 1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      transform="rotate(180)"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M214.78,478l-20.67-21.57L403.27,256,194.11,55.57,214.78,34,446.46,256ZM317.89,256,86.22,34,65.54,55.57,274.7,256,65.54,456.43,86.22,478Z"></path>
                      </g>
                    </svg>
                  </button>

                  {/* {currentPage} / {totalPages} */}
                  {numbers.map((n, i) => (
                    <li
                      className={`page-item cursor-pointer mx-2 ${
                        currentPage === n ? "active" : ""
                      } `}
                      key={i}
                    >
                      <a className="page-link" onClick={() => changePage(n)}>
                        {n}
                      </a>
                    </li>
                  ))}

                  <button
                    className={`flex items-center ml-2 ${
                      currentPage === totalPages
                        ? "text-gray-500 hidden"
                        : "text-cyan-500 block"
                    }`}
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    {/* <p className="pr-1"> Trang sau</p> */}
                    <svg
                      width="12px"
                      height="12px"
                      viewBox="0 0 512 512"
                      data-name="Layer 1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill={`${
                        currentPage === totalPages ? "#6B7280" : "#1640D6"
                      }`}
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M214.78,478l-20.67-21.57L403.27,256,194.11,55.57,214.78,34,446.46,256ZM317.89,256,86.22,34,65.54,55.57,274.7,256,65.54,456.43,86.22,478Z"></path>
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeTab === 2 && (
            <div className="">
              <table className="w-full table-auto">
                <thead className="bg-gray-200">
                  <tr
                    className="bg-gray-300  dark:bg-meta-4
                   text-left"
                  >
                    <th className="min-w-[120px] px-2 font-medium  text-black dark:text-white ">
                      Mã đơn hàng
                    </th>
                    <th className="min-w-[150px] px-4 font-medium text-black dark:text-white ">
                      Khách hàng
                    </th>
                    <th className="min-w-[140px] px-4 font-medium text-black dark:text-white ">
                      Số điện thoại
                    </th>
                    <th className="min-w-[120px] px-4  font-medium text-black dark:text-white ">
                      Email
                    </th>
                    <th className="px-4 font-medium text-black dark:text-white">
                      Địa chỉ
                    </th>
                    <th className="px-4 font-medium text-black dark:text-white">
                      Thời gian
                    </th>
                    <th className="px-4 font-medium text-black dark:text-white">
                      Tổng tiền
                    </th>
                    <th className="min-w-[90px] px-4 font-medium text-black dark:text-white">
                      Tình trạng đơn hàng
                    </th>
                    <th className="px-2 font-medium text-black dark:text-white">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pending.filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item.fullname.toLowerCase().includes(search);
                    }).map((item) => (
                    <tr key={item.id}>
                      <td className="border-b-4 border-[#eee] dark:border-strokedark  text-center ">
                        <p className="inline-flex rounded-full bg-opacity-0  text-lg font-light text-black">
                          #{item.id}
                        </p>
                      </td>
                      <td className="border-b-4 border-[#eee] px-4 py-2  dark:border-strokedark">
                        <p className="inline-flextext-lg  font-normal text-black">
                          {item.fullname}
                        </p>
                      </td>
                      <td className="border-b-4  px-4 py-2 border-[#eee] dark:border-strokedark ">
                        <p className="inline-flextext-lg  font-normal text-black">
                          {item.phone}
                        </p>
                      </td>
                      <td className="border-b-4 border-[#eee] px-4 py-2">
                        <p className="  bg-opacity-0 text-lg font-light  text-black">
                          {item.email}
                        </p>
                      </td>
                      <td className=" border-b-4 border-[#eee] px-4 py-2">
                        <p className=" max-w-full  text-lg font-light text-black">
                          {item.address}
                        </p>
                      </td>
                      <td className="border-b-4 border-[#eee] px-4 py-2">
                        <p className="text-lg font-light  text-black">
                          {moment(item.createdAt).format("DD-MM-YYYY hh:mm:ss")}
                        </p>
                      </td>
                      <td className=" border-b-4 border-[#eee] px-4 py-2">
                        <p className=" max-w-full  text-lg font-light text-black">
                          {item.total}đ
                        </p>
                      </td>
                      <td className="border-b-4 border-[#eee] px-2 py-2">
                        <p
                          className={`text-center rounded-full bg-opacity-50 py-1 px-3 text-sm font-medium text-slate-700 ${
                            statusColors[item.status]
                          }`}
                        >
                          {item.status == "chờ_xử_lý"
                            ? "Chờ xử lý"
                            : item.status == "đã_xử_lý"
                            ? "Đã xử lý"
                            : item.status == "đã_giao"
                            ? "Đã giao"
                            : item.status == "hủy"
                            ? "Hủy"
                            : item.status}
                        </p>
                      </td>
                      <td className="border-b-4 border-[#eee] py-5 px-4 dark:border-strokedark">
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
                          <button
                            className="hover:text-primary"
                            onClick={() => handleChangeEdit(item)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="fill-current text-green-600"
                              width="18"
                              height="18"
                              enable-background="new 0 0 32 32"
                              viewBox="0 0 32 32"
                              id="update"
                            >
                              <path d="M23.7207 8.1641c-3.7872-3.7316-9.6125-4.1499-13.8605-1.2914L9.8483 5.2317c-.002-.2762-.2276-.4985-.5039-.4963L8.3445 4.7432C8.0684 4.7453 7.8464 4.9708 7.8484 5.2468L7.876 8.9893c.0039.5498.4512.9922 1 .9922.002 0 .0049 0 .0078 0l3.743-.0276c.2762-.002.4984-.2277.4963-.5039l-.0078-1.0001c-.0021-.2761-.2276-.4981-.5036-.4961l-.6362.0046c3.3478-1.6712 7.5305-1.1391 10.341 1.6295 2.6972 2.6588 3.4342 6.6558 1.9015 10.0831-.1091.244-.0197.5283.2183.65l.8925.456c.2529.1292.5727.0251.6901-.2334C27.9255 16.3433 27.0319 11.4282 23.7207 8.1641zM23.124 22.0186c-.002 0-.0049 0-.0078 0l-3.743.0275c-.2762.0021-.4984.2277-.4963.5039l.0078 1.0001c.0021.276.2276.498.5036.4961l.6356-.0046c-3.348 1.6708-7.53 1.1382-10.3404-1.6295-2.6972-2.6588-3.4342-6.6559-1.9015-10.0831.1091-.244.0197-.5283-.2183-.65l-.8925-.456c-.2529-.1292-.5727-.0251-.6901.2334-1.9068 4.2002-1.0131 9.1153 2.298 12.3795 2.1396 2.1084 4.9307 3.1592 7.7197 3.1592 2.1475 0 4.2929-.6252 6.1407-1.869l.0119 1.6421c.002.2762.2276.4985.5039.4964l.9999-.0078c.2761-.0022.4981-.2277.4961-.5037l-.0276-3.7424C24.1201 22.4609 23.6729 22.0186 23.124 22.0186z"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-end justify-center mt-10">
                <div className=" pagination">
                  <button
                    className={`mr-2 flex items-center text-cyan-500 ${
                      currentPage === 1 ? "hidden" : "block"
                    }`}
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    <svg
                      width="12px"
                      height="12px"
                      fill={`${currentPage === 1 ? "#6B7280" : "#1640D6"}`}
                      viewBox="0 0 512 512"
                      data-name="Layer 1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      transform="rotate(180)"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M214.78,478l-20.67-21.57L403.27,256,194.11,55.57,214.78,34,446.46,256ZM317.89,256,86.22,34,65.54,55.57,274.7,256,65.54,456.43,86.22,478Z"></path>
                      </g>
                    </svg>
                  </button>

                  {/* {currentPage} / {totalPages} */}
                  {numbersPending.map((n, i) => (
                    <li
                      className={`page-item cursor-pointer mx-2 ${
                        currentPage === n ? "active" : ""
                      } `}
                      key={i}
                    >
                      <a className="page-link" onClick={() => changePage(n)}>
                        {n}
                      </a>
                    </li>
                  ))}

                  <button
                    className={`flex items-center ml-2 ${
                      currentPage === pendingTotalPage
                        ? "text-gray-500 hidden"
                        : "text-cyan-500 block"
                    }`}
                    disabled={currentPage === pendingTotalPage}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    {/* <p className="pr-1"> Trang sau</p> */}
                    <svg
                      width="12px"
                      height="12px"
                      viewBox="0 0 512 512"
                      data-name="Layer 1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill={`${
                        currentPage === pendingTotalPage ? "#6B7280" : "#1640D6"
                      }`}
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M214.78,478l-20.67-21.57L403.27,256,194.11,55.57,214.78,34,446.46,256ZM317.89,256,86.22,34,65.54,55.57,274.7,256,65.54,456.43,86.22,478Z"></path>
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeTab === 3 && (
            <div className="">
              <table className="w-full table-auto">
                <thead className="bg-gray-200">
                  <tr
                    className="bg-gray-300  dark:bg-meta-4
                   text-left"
                  >
                    <th className="min-w-[120px] px-2 font-medium  text-black dark:text-white ">
                      Mã đơn hàng
                    </th>
                    <th className="min-w-[150px] px-4 font-medium text-black dark:text-white ">
                      Khách hàng
                    </th>
                    <th className="min-w-[140px] px-4 font-medium text-black dark:text-white ">
                      Số điện thoại
                    </th>
                    <th className="min-w-[120px] px-4  font-medium text-black dark:text-white ">
                      Email
                    </th>
                    <th className="px-4 font-medium text-black dark:text-white">
                      Địa chỉ
                    </th>
                    <th className="px-4 font-medium text-black dark:text-white">
                      Thời gian
                    </th>
                    <th className="px-4 font-medium text-black dark:text-white">
                      Tổng tiền
                    </th>
                    <th className="min-w-[90px] px-4 font-medium text-black dark:text-white">
                      Tình trạng đơn hàng
                    </th>
                    <th className="px-2 font-medium text-black dark:text-white">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {processed.filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item.fullname.toLowerCase().includes(search);
                    }).map((item) => (
                    <tr key={item.id}>
                      <td className="border-b-4 border-[#eee] dark:border-strokedark  text-center ">
                        <p className="inline-flex rounded-full bg-opacity-0  text-lg font-light text-black">
                          #{item.id}
                        </p>
                      </td>
                      <td className="border-b-4 border-[#eee] px-4 py-2  dark:border-strokedark">
                        <p className="inline-flextext-lg  font-normal text-black">
                          {item.fullname}
                        </p>
                      </td>
                      <td className="border-b-4  px-4 py-2 border-[#eee] dark:border-strokedark ">
                        <p className="inline-flextext-lg  font-normal text-black">
                          {item.phone}
                        </p>
                      </td>
                      <td className="border-b-4 border-[#eee] px-4 py-2">
                        <p className="  bg-opacity-0 text-lg font-light  text-black">
                          {item.email}
                        </p>
                      </td>
                      <td className=" border-b-4 border-[#eee] px-4 py-2">
                        <p className=" max-w-full  text-lg font-light text-black">
                          {item.address}
                        </p>
                      </td>
                      <td className="border-b-4 border-[#eee] px-4 py-2">
                        <p className="text-lg font-light  text-black">
                          {moment(item.createdAt).format("DD-MM-YYYY hh:mm:ss")}
                        </p>
                      </td>
                      <td className=" border-b-4 border-[#eee] px-4 py-2">
                        <p className=" max-w-full  text-lg font-light text-black">
                          {item.total}đ
                        </p>
                      </td>
                      <td className="border-b-4 border-[#eee] px-2 py-2">
                        <p
                          className={`text-center rounded-full bg-opacity-50 py-1 px-3 text-sm font-medium text-slate-700 ${
                            statusColors[item.status]
                          }`}
                        >
                          {item.status == "chờ_xử_lý"
                            ? "Chờ xử lý"
                            : item.status == "đã_xử_lý"
                            ? "Đã xử lý"
                            : item.status == "đã_giao"
                            ? "Đã giao"
                            : item.status == "hủy"
                            ? "Hủy"
                            : item.status}
                        </p>
                      </td>
                      <td className="border-b-4 border-[#eee] py-5 px-4 dark:border-strokedark">
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
                          <button
                            className="hover:text-primary"
                            onClick={() => handleChangeEdit(item)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="fill-current text-green-600"
                              width="18"
                              height="18"
                              enable-background="new 0 0 32 32"
                              viewBox="0 0 32 32"
                              id="update"
                            >
                              <path d="M23.7207 8.1641c-3.7872-3.7316-9.6125-4.1499-13.8605-1.2914L9.8483 5.2317c-.002-.2762-.2276-.4985-.5039-.4963L8.3445 4.7432C8.0684 4.7453 7.8464 4.9708 7.8484 5.2468L7.876 8.9893c.0039.5498.4512.9922 1 .9922.002 0 .0049 0 .0078 0l3.743-.0276c.2762-.002.4984-.2277.4963-.5039l-.0078-1.0001c-.0021-.2761-.2276-.4981-.5036-.4961l-.6362.0046c3.3478-1.6712 7.5305-1.1391 10.341 1.6295 2.6972 2.6588 3.4342 6.6558 1.9015 10.0831-.1091.244-.0197.5283.2183.65l.8925.456c.2529.1292.5727.0251.6901-.2334C27.9255 16.3433 27.0319 11.4282 23.7207 8.1641zM23.124 22.0186c-.002 0-.0049 0-.0078 0l-3.743.0275c-.2762.0021-.4984.2277-.4963.5039l.0078 1.0001c.0021.276.2276.498.5036.4961l.6356-.0046c-3.348 1.6708-7.53 1.1382-10.3404-1.6295-2.6972-2.6588-3.4342-6.6559-1.9015-10.0831.1091-.244.0197-.5283-.2183-.65l-.8925-.456c-.2529-.1292-.5727-.0251-.6901.2334-1.9068 4.2002-1.0131 9.1153 2.298 12.3795 2.1396 2.1084 4.9307 3.1592 7.7197 3.1592 2.1475 0 4.2929-.6252 6.1407-1.869l.0119 1.6421c.002.2762.2276.4985.5039.4964l.9999-.0078c.2761-.0022.4981-.2277.4961-.5037l-.0276-3.7424C24.1201 22.4609 23.6729 22.0186 23.124 22.0186z"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-end justify-center mt-10">
                <div className=" pagination">
                  <button
                    className={`mr-2 flex items-center text-cyan-500 ${
                      currentPage === 1 ? "hidden" : "block"
                    }`}
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    <svg
                      width="12px"
                      height="12px"
                      fill={`${currentPage === 1 ? "#6B7280" : "#1640D6"}`}
                      viewBox="0 0 512 512"
                      data-name="Layer 1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      transform="rotate(180)"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M214.78,478l-20.67-21.57L403.27,256,194.11,55.57,214.78,34,446.46,256ZM317.89,256,86.22,34,65.54,55.57,274.7,256,65.54,456.43,86.22,478Z"></path>
                      </g>
                    </svg>
                  </button>

                  {/* {currentPage} / {totalPages} */}
                  {numbersProcessed.map((n, i) => (
                    <li
                      className={`page-item cursor-pointer mx-2 ${
                        currentPage === n ? "active" : ""
                      } `}
                      key={i}
                    >
                      <a className="page-link" onClick={() => changePage(n)}>
                        {n}
                      </a>
                    </li>
                  ))}

                  <button
                    className={`flex items-center ml-2 ${
                      currentPage === processedTotalPage
                        ? "text-gray-500 hidden"
                        : "text-cyan-500 block"
                    }`}
                    disabled={currentPage === processedTotalPage}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    {/* <p className="pr-1"> Trang sau</p> */}
                    <svg
                      width="12px"
                      height="12px"
                      viewBox="0 0 512 512"
                      data-name="Layer 1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill={`${
                        currentPage === processedTotalPage
                          ? "#6B7280"
                          : "#1640D6"
                      }`}
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M214.78,478l-20.67-21.57L403.27,256,194.11,55.57,214.78,34,446.46,256ZM317.89,256,86.22,34,65.54,55.57,274.7,256,65.54,456.43,86.22,478Z"></path>
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeTab === 4 && (
            <div className="">
              <table className="w-full table-auto">
                <thead className="bg-gray-200">
                  <tr
                    className="bg-gray-300  dark:bg-meta-4
                   text-left"
                  >
                    <th className="min-w-[120px] px-2 font-medium  text-black dark:text-white ">
                      Mã đơn hàng
                    </th>
                    <th className="min-w-[150px] px-4 font-medium text-black dark:text-white ">
                      Khách hàng
                    </th>
                    <th className="min-w-[140px] px-4 font-medium text-black dark:text-white ">
                      Số điện thoại
                    </th>
                    <th className="min-w-[120px] px-4  font-medium text-black dark:text-white ">
                      Email
                    </th>
                    <th className="px-4 font-medium text-black dark:text-white">
                      Địa chỉ
                    </th>
                    <th className="px-4 font-medium text-black dark:text-white">
                      Thời gian
                    </th>
                    <th className="px-4 font-medium text-black dark:text-white">
                      Tổng tiền
                    </th>
                    <th className="min-w-[90px] px-4 font-medium text-black dark:text-white">
                      Tình trạng đơn hàng
                    </th>
                    <th className="px-2 font-medium text-black dark:text-white">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {delivered.filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item.fullname.toLowerCase().includes(search);
                    }).map((item) => (
                    <tr key={item.id}>
                      <td className="border-b-4 border-[#eee] dark:border-strokedark  text-center ">
                        <p className="inline-flex rounded-full bg-opacity-0  text-lg font-light text-black">
                          #{item.id}
                        </p>
                      </td>
                      <td className="border-b-4 border-[#eee] px-4 py-2  dark:border-strokedark">
                        <p className="inline-flextext-lg  font-normal text-black">
                          {item.fullname}
                        </p>
                      </td>
                      <td className="border-b-4  px-4 py-2 border-[#eee] dark:border-strokedark ">
                        <p className="inline-flextext-lg  font-normal text-black">
                          {item.phone}
                        </p>
                      </td>
                      <td className="border-b-4 border-[#eee] px-4 py-2">
                        <p className="  bg-opacity-0 text-lg font-light  text-black">
                          {item.email}
                        </p>
                      </td>
                      <td className=" border-b-4 border-[#eee] px-4 py-2">
                        <p className=" max-w-full  text-lg font-light text-black">
                          {item.address}
                        </p>
                      </td>
                      <td className="border-b-4 border-[#eee] px-4 py-2">
                        <p className="text-lg font-light  text-black">
                          {moment(item.createdAt).format("DD-MM-YYYY hh:mm:ss")}
                        </p>
                      </td>
                      <td className=" border-b-4 border-[#eee] px-4 py-2">
                        <p className=" max-w-full  text-lg font-light text-black">
                          {item.total}đ
                        </p>
                      </td>
                      <td className="border-b-4 border-[#eee] px-2 py-2">
                        <p
                          className={`text-center rounded-full bg-opacity-50 py-1 px-3 text-sm font-medium text-slate-700 ${
                            statusColors[item.status]
                          }`}
                        >
                          {item.status == "chờ_xử_lý"
                            ? "Chờ xử lý"
                            : item.status == "đã_xử_lý"
                            ? "Đã xử lý"
                            : item.status == "đã_giao"
                            ? "Đã giao"
                            : item.status == "hủy"
                            ? "Hủy"
                            : item.status}
                        </p>
                      </td>
                      <td className="border-b-4 border-[#eee] py-5 px-4 dark:border-strokedark">
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
                          <button
                            className="hover:text-primary"
                            onClick={() => handleChangeEdit(item)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="fill-current text-green-600"
                              width="18"
                              height="18"
                              enable-background="new 0 0 32 32"
                              viewBox="0 0 32 32"
                              id="update"
                            >
                              <path d="M23.7207 8.1641c-3.7872-3.7316-9.6125-4.1499-13.8605-1.2914L9.8483 5.2317c-.002-.2762-.2276-.4985-.5039-.4963L8.3445 4.7432C8.0684 4.7453 7.8464 4.9708 7.8484 5.2468L7.876 8.9893c.0039.5498.4512.9922 1 .9922.002 0 .0049 0 .0078 0l3.743-.0276c.2762-.002.4984-.2277.4963-.5039l-.0078-1.0001c-.0021-.2761-.2276-.4981-.5036-.4961l-.6362.0046c3.3478-1.6712 7.5305-1.1391 10.341 1.6295 2.6972 2.6588 3.4342 6.6558 1.9015 10.0831-.1091.244-.0197.5283.2183.65l.8925.456c.2529.1292.5727.0251.6901-.2334C27.9255 16.3433 27.0319 11.4282 23.7207 8.1641zM23.124 22.0186c-.002 0-.0049 0-.0078 0l-3.743.0275c-.2762.0021-.4984.2277-.4963.5039l.0078 1.0001c.0021.276.2276.498.5036.4961l.6356-.0046c-3.348 1.6708-7.53 1.1382-10.3404-1.6295-2.6972-2.6588-3.4342-6.6559-1.9015-10.0831.1091-.244.0197-.5283-.2183-.65l-.8925-.456c-.2529-.1292-.5727-.0251-.6901.2334-1.9068 4.2002-1.0131 9.1153 2.298 12.3795 2.1396 2.1084 4.9307 3.1592 7.7197 3.1592 2.1475 0 4.2929-.6252 6.1407-1.869l.0119 1.6421c.002.2762.2276.4985.5039.4964l.9999-.0078c.2761-.0022.4981-.2277.4961-.5037l-.0276-3.7424C24.1201 22.4609 23.6729 22.0186 23.124 22.0186z"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-end justify-center mt-10">
                <div className=" pagination">
                  <button
                    className={`mr-2 flex items-center text-cyan-500 ${
                      currentPage === 1 ? "hidden" : "block"
                    }`}
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    <svg
                      width="12px"
                      height="12px"
                      fill={`${currentPage === 1 ? "#6B7280" : "#1640D6"}`}
                      viewBox="0 0 512 512"
                      data-name="Layer 1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      transform="rotate(180)"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M214.78,478l-20.67-21.57L403.27,256,194.11,55.57,214.78,34,446.46,256ZM317.89,256,86.22,34,65.54,55.57,274.7,256,65.54,456.43,86.22,478Z"></path>
                      </g>
                    </svg>
                  </button>

                  {/* {currentPage} / {totalPages} */}
                  {numbersDelivered.map((n, i) => (
                    <li
                      className={`page-item cursor-pointer mx-2 ${
                        currentPage === n ? "active" : ""
                      } `}
                      key={i}
                    >
                      <a className="page-link" onClick={() => changePage(n)}>
                        {n}
                      </a>
                    </li>
                  ))}

                  <button
                    className={`flex items-center ml-2 ${
                      currentPage === deliveredTotalPage
                        ? "text-gray-500 hidden"
                        : "text-cyan-500 block"
                    }`}
                    disabled={currentPage === deliveredTotalPage}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    {/* <p className="pr-1"> Trang sau</p> */}
                    <svg
                      width="12px"
                      height="12px"
                      viewBox="0 0 512 512"
                      data-name="Layer 1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill={`${
                        currentPage === deliveredTotalPage
                          ? "#6B7280"
                          : "#1640D6"
                      }`}
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M214.78,478l-20.67-21.57L403.27,256,194.11,55.57,214.78,34,446.46,256ZM317.89,256,86.22,34,65.54,55.57,274.7,256,65.54,456.43,86.22,478Z"></path>
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeTab === 5 && (
            <div className="">
              <table className="w-full table-auto">
                <thead className="bg-gray-200">
                  <tr
                    className="bg-gray-300  dark:bg-meta-4
                   text-left"
                  >
                    <th className="min-w-[120px] px-2 font-medium  text-black dark:text-white ">
                      Mã đơn hàng
                    </th>
                    <th className="min-w-[150px] px-4 font-medium text-black dark:text-white ">
                      Khách hàng
                    </th>
                    <th className="min-w-[140px] px-4 font-medium text-black dark:text-white ">
                      Số điện thoại
                    </th>
                    <th className="min-w-[120px] px-4  font-medium text-black dark:text-white ">
                      Email
                    </th>
                    <th className="px-4 font-medium text-black dark:text-white">
                      Địa chỉ
                    </th>
                    <th className="px-4 font-medium text-black dark:text-white">
                      Thời gian
                    </th>
                    <th className="px-4 font-medium text-black dark:text-white">
                      Tổng tiền
                    </th>
                    <th className="min-w-[90px] px-4 font-medium text-black dark:text-white">
                      Tình trạng đơn hàng
                    </th>
                    <th className="px-2 font-medium text-black dark:text-white">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cancel.filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item.fullname.toLowerCase().includes(search);
                    }).map((item) => (
                    <tr key={item.id}>
                      <td className="border-b-4 border-[#eee] dark:border-strokedark  text-center ">
                        <p className="inline-flex rounded-full bg-opacity-0  text-lg font-light text-black">
                          #{item.id}
                        </p>
                      </td>
                      <td className="border-b-4 border-[#eee] px-4 py-2  dark:border-strokedark">
                        <p className="inline-flextext-lg  font-normal text-black">
                          {item.fullname}
                        </p>
                      </td>
                      <td className="border-b-4  px-4 py-2 border-[#eee] dark:border-strokedark ">
                        <p className="inline-flextext-lg  font-normal text-black">
                          {item.phone}
                        </p>
                      </td>
                      <td className="border-b-4 border-[#eee] px-4 py-2">
                        <p className="  bg-opacity-0 text-lg font-light  text-black">
                          {item.email}
                        </p>
                      </td>
                      <td className=" border-b-4 border-[#eee] px-4 py-2">
                        <p className=" max-w-full  text-lg font-light text-black">
                          {item.address}
                        </p>
                      </td>
                      <td className="border-b-4 border-[#eee] px-4 py-2">
                        <p className="text-lg font-light  text-black">
                          {moment(item.createdAt).format("DD-MM-YYYY hh:mm:ss")}
                        </p>
                      </td>
                      <td className=" border-b-4 border-[#eee] px-4 py-2">
                        <p className=" max-w-full  text-lg font-light text-black">
                          {item.total}đ
                        </p>
                      </td>
                      <td className="border-b-4 border-[#eee] px-2 py-2">
                        <p
                          className={`text-center rounded-full bg-opacity-50 py-1 px-3 text-sm font-medium text-slate-700 ${
                            statusColors[item.status]
                          }`}
                        >
                          {item.status == "chờ_xử_lý"
                            ? "Chờ xử lý"
                            : item.status == "đã_xử_lý"
                            ? "Đã xử lý"
                            : item.status == "đã_giao"
                            ? "Đã giao"
                            : item.status == "đã_hủy"
                            ? "Hủy"
                            : item.status}
                        </p>
                      </td>
                      <td className="border-b-4 border-[#eee] py-5 px-4 dark:border-strokedark">
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
                          <button
                            
                            className={`${item.status}`==="đã_hủy" ? "hidden" : 'block'}
                            onClick={() => handleChangeEdit(item)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="fill-current text-green-600"
                              width="18"
                              height="18"
                              enable-background="new 0 0 32 32"
                              viewBox="0 0 32 32"
                              id="update"
                            >
                              <path d="M23.7207 8.1641c-3.7872-3.7316-9.6125-4.1499-13.8605-1.2914L9.8483 5.2317c-.002-.2762-.2276-.4985-.5039-.4963L8.3445 4.7432C8.0684 4.7453 7.8464 4.9708 7.8484 5.2468L7.876 8.9893c.0039.5498.4512.9922 1 .9922.002 0 .0049 0 .0078 0l3.743-.0276c.2762-.002.4984-.2277.4963-.5039l-.0078-1.0001c-.0021-.2761-.2276-.4981-.5036-.4961l-.6362.0046c3.3478-1.6712 7.5305-1.1391 10.341 1.6295 2.6972 2.6588 3.4342 6.6558 1.9015 10.0831-.1091.244-.0197.5283.2183.65l.8925.456c.2529.1292.5727.0251.6901-.2334C27.9255 16.3433 27.0319 11.4282 23.7207 8.1641zM23.124 22.0186c-.002 0-.0049 0-.0078 0l-3.743.0275c-.2762.0021-.4984.2277-.4963.5039l.0078 1.0001c.0021.276.2276.498.5036.4961l.6356-.0046c-3.348 1.6708-7.53 1.1382-10.3404-1.6295-2.6972-2.6588-3.4342-6.6559-1.9015-10.0831.1091-.244.0197-.5283-.2183-.65l-.8925-.456c-.2529-.1292-.5727-.0251-.6901.2334-1.9068 4.2002-1.0131 9.1153 2.298 12.3795 2.1396 2.1084 4.9307 3.1592 7.7197 3.1592 2.1475 0 4.2929-.6252 6.1407-1.869l.0119 1.6421c.002.2762.2276.4985.5039.4964l.9999-.0078c.2761-.0022.4981-.2277.4961-.5037l-.0276-3.7424C24.1201 22.4609 23.6729 22.0186 23.124 22.0186z"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-end justify-center mt-10">
                <div className=" pagination">
                  <button
                    className={`mr-2 flex items-center text-cyan-500 ${
                      currentPage === 1 ? "hidden" : "block"
                    }`}
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    <svg
                      width="12px"
                      height="12px"
                      fill={`${currentPage === 1 ? "#6B7280" : "#1640D6"}`}
                      viewBox="0 0 512 512"
                      data-name="Layer 1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      transform="rotate(180)"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M214.78,478l-20.67-21.57L403.27,256,194.11,55.57,214.78,34,446.46,256ZM317.89,256,86.22,34,65.54,55.57,274.7,256,65.54,456.43,86.22,478Z"></path>
                      </g>
                    </svg>
                  </button>

                  {/* {currentPage} / {totalPages} */}
                  {numbersCancel.map((n, i) => (
                    <li
                      className={`page-item cursor-pointer mx-2 ${
                        currentPage === n ? "active" : ""
                      } `}
                      key={i}
                    >
                      <a className="page-link" onClick={() => changePage(n)}>
                        {n}
                      </a>
                    </li>
                  ))}

                  <button
                    className={`flex items-center ml-2 ${
                      currentPage === cancelTotalPage
                        ? "text-gray-500 hidden"
                        : "text-cyan-500 block"
                    }`}
                    disabled={currentPage === cancelTotalPage}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    {/* <p className="pr-1"> Trang sau</p> */}
                    <svg
                      width="12px"
                      height="12px"
                      viewBox="0 0 512 512"
                      data-name="Layer 1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill={`${
                        currentPage === cancelTotalPage ? "#6B7280" : "#1640D6"
                      }`}
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M214.78,478l-20.67-21.57L403.27,256,194.11,55.57,214.78,34,446.46,256ZM317.89,256,86.22,34,65.54,55.57,274.7,256,65.54,456.43,86.22,478Z"></path>
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {editingOrder && (
            <EditOrder
              order={editingOrder}
              onSave={handleEdit}
              onCancel={handleCancelEdit}
            />
          )}
        </div>
      </div>
    </div>
  );
}
