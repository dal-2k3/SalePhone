import { Fragment, useEffect, useRef, useState } from "react";
import { DOMAIN } from "../utils/settings/config";
import { NavLink, useNavigate } from "react-router-dom";
import { createOrder, getOrderDetail } from "../services/order";
import {
  apiGetPublicDistrict,
  apiGetPublicProvinces,
  apiGetPublicWard,
} from "./app";
import { Dialog, Transition } from "@headlessui/react";

import Select from "./Select";
import InputReadOnly from "./InputReadOnly";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
const schema = yup.object().shape({
  fullname: yup.string().required("Họ và tên không được để trống"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Vui lòng nhập đúng số điện thoại")
    .required("Số điện thoại không được để trống"),
  email: yup
    .string()
    .email("Email không đúng")
    .required("Email không được để trống"),
});

export default function Cart() {
  const [openAdd, setOpenAdd] = useState(false);
  const cancelButtonRef = useRef(null);
  const [orderSuccessDetail, setOrderSuccessDetail] = useState();
  const [reload, setReload] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [orderSuccess, setOrderSuccess] = useState({
    order: "",
    orderDetail: "",
  });
  const [order, setOrder] = useState({
    fullname: "",
    phone: "",
    email: "",
    address: "",
    total: "",
    order_details: [
      {
        totalDetail: "",
      },
    ],
  });

  const [soNha, setSoNha] = useState("");
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setOrder((prevOrder) => ({
  //     ...prevOrder,
  //     [name]: value,
  //   }));
  // };
  const handleChangeSoNha = (e) => {
    const diaChi = e.target.value;
    setSoNha(diaChi);
  };
  console.log("dia chi:", soNha);

  //   setOrder((prevOrder) => ({
  //     ...prevOrder,
  //     total: formatPrice(calculateTotal() + 20000),
  //   }));
  // };

  const [cart, setCart] = useState([]);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    updateOrderDetails(storedCart);
    // setOrder({ ...order, order_details: updatedOrderDetails, });
    setCart(storedCart);
  }, [reload]);

  const updateOrderDetails = (cart) => {
    const updatedOrderDetails = cart.map((product, index) => ({
      ...cart[index],
      totalDetail: formatPrice(product.price * (product.quantity || 1)),
    }));

    setOrder({ ...order, order_details: updatedOrderDetails });
  };
  const [showMaxQuantityMessage, setShowMaxQuantityMessage] = useState(false);
  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const updateQuantity = (index, newQuantity) => {
    console.log("aaaa");
    const updatedCart = [...cart];
    updatedCart[index].quantity = Math.max(newQuantity, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateOrderDetails(updatedCart);
  };
  const increaseQuantity = (index) => {
    const updatedCart = [...cart];
    const productId = updatedCart[index].idProduct;
    const maxQuantity = parseInt(updatedCart[index].quantityDB, 10); // Lấy giá trị quantityDB và chuyển về kiểu số nguyên

    const newQuantity = Math.min(
      (updatedCart[index].quantity || 1) + 1,
      maxQuantity
    );
    console.log("quantityDB:", maxQuantity);
    console.log("newQuantity:", newQuantity);
    //   if (newQuantity >= maxQuantity) {
    //     // Hiển thị thông báo hoặc thực hiện các hành động khác khi vượt quá giới hạn
    //     console.log("Tối đa số lượng trong kho");

    // }
    if (newQuantity >= maxQuantity) {
      // Show max quantity message
      setShowMaxQuantityMessage(productId);
      setTimeout(() => {
        setShowMaxQuantityMessage(null);
      }, 2000); // Adjust timeout as needed
    }
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateOrderDetails(updatedCart);
  };

  const decreaseQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = Math.max(
      (updatedCart[index].quantity || 1) - 1,
      1
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateOrderDetails(updatedCart);
  };
  function clearLocalStorage() {
    localStorage.removeItem("cart");
    // Thêm các khóa khác nếu cần thiết
  }
  const calculateTotal = () => {
    return cart.reduce((total, product) => {
      return total + product.price * (product.quantity || 1);
    }, 0);
  };
  const calculateTotal2 = () => {
    return orderSuccess && orderSuccess.orderDetail
      ? orderSuccess.orderDetail.reduce((total, product) => {
          // Chuyển đổi chuỗi thành số và thêm vào tổng
          return (
            total + (parseFloat(product.totalDetail.replace(/\./g, "")) || 0)
          );
        }, 0)
      : 0;
  };

  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  useEffect(() => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      total: formatPrice(calculateTotal()),
    }));
  }, [cart]);
  const [loading, setLoading] = useState(true);
  const onSubmit = async (e) => {
    // e.preventDefault();
    // alert("hihihi");
    setOpenAdd(true);
    setLoading(true);
    console.log("tuiiiiiiiiiiiii dat hang duoc roi", e);
    try {
      const orderfinal = await createOrder(order);
      const orderfinalDetail = await getOrderDetail(orderfinal.id);
      console.log("aaa");
      setOrderSuccess({
        ...orderSuccess,
        order: orderfinal,
        orderDetail: orderfinalDetail,
      });
      setLoading(false);
      setReload(!reload);
      clearLocalStorage();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  console.log("này lấy từ localstorage", cart);
  console.log("này lấy để up lên db", order);
  console.log("setOrderSuccess", orderSuccess);
  const [address, setAddress] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");

  const [reset, setReset] = useState(false);
  
  const closeModal = () => {
    setOpenAdd(false);

    setReload(!reload);
  };
  // get tỉnh
  useEffect(() => {
    const fetchPublicProvince = async () => {
      const response = await apiGetPublicProvinces();
      if (response.status === 200) {
        setProvinces(response?.data.results);
      }
    };
    fetchPublicProvince();
  }, []);
  // get huỵen
  useEffect(() => {
    setDistrict(null);
    const fetchPublicDistrict = async () => {
      const response = await apiGetPublicDistrict(province);
      if (response.status === 200) {
        setDistricts(response.data?.results);
      }
    };
    province && fetchPublicDistrict();
    !province ? setReset(true) : setReset(false);
    !province && setDistricts([]);
  }, [province]);
  //get xa
  useEffect(() => {
    setWard(null);
    const fetchPublicWard = async () => {
      const response = await apiGetPublicWard(district);
      if (response.status === 200) {
        setWards(response.data?.results);
      }
    };
    district && fetchPublicWard();
    !district ? setReset(true) : setReset(false);
    !district && setWards([]);
  }, [district]);

  //set tinh huyen xa
  useEffect(() => {
    setAddress((prev) => ({
      ...prev,
      address: `${
        ward
          ? `${wards?.find((item) => item.ward_id === ward)?.ward_name},`
          : ""
      } ${
        district
          ? `${
              districts?.find((item) => item.district_id === district)
                ?.district_name
            },`
          : ""
      } ${
        province
          ? provinces?.find((item) => item.province_id === province)
              ?.province_name
          : ""
      }`,
      province: province
        ? provinces?.find((item) => item.province_id === province)
            ?.province_name
        : "",
    }));
  }, [province, district, ward]);
  useEffect(() => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      address: `${soNha}, ${address.address}`,
    }));
  }, [soNha]);
  useEffect(() => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      total: formatPrice(calculateTotal()),
    }));
  }, [cart]);
  // console.log("address", address);
  return (
    <div className="w-full bg-gray-100 sm:py-16 pt-28">
      <Transition.Root show={openAdd} as={Fragment}>
        <Dialog
          as="div"
          className=" relative z-50"
          // initialFocus={cancelButtonRef}
          onClose={setOpenAdd}
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
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 xl:pt-20 ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden mt-32 rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-screen-md ">
                  <div className="absolute top-2 right-2 ">
                    <button
                      type="button"
                      onClick={closeModal}
                      // ref={cancelButtonRef}
                      className=""
                    >
                      <svg
                        width="22px"
                        height="22px"
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
                            d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
                            fill="#B31312"
                          ></path>{" "}
                        </g>
                      </svg>
                    </button>
                  </div>{" "}
                  <div className="w-5/5 mx-auto p-8 bg-white ">
                    {/* <hr className=" border-solid border-[1.5px] my-5" /> */}

                    {loading && (
                      <div class="animate-pulse flex flex-col items-center gap-4 w-full h-full">
                        <div>
                          <div class="w-48 h-6 bg-slate-400 rounded-md"></div>
                          <div class="w-28 h-4 bg-slate-400 mx-auto mt-3 rounded-md"></div>
                        </div>
                        <div class="h-7 bg-slate-400 w-full rounded-md"></div>
                        <div class="h-7 bg-slate-400 w-full rounded-md"></div>
                        <div class="h-7 bg-slate-400 w-full rounded-md"></div>
                        <div class="h-7 bg-slate-400 w-1/2 rounded-md"></div>
                      </div>
                    )}
                    {!loading && (
                      <div>
                        <div className="">
                          <div className="w-full ">
                            <div className="flex-col flex items-center justify-center">
                              <svg
                                fill="#49be25"
                                width="120px"
                                height="120px"
                                viewBox="0 0 36 36"
                                version="1.1"
                                preserveAspectRatio="xMidYMid meet"
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
                                  <title>success-standard-line</title>{" "}
                                  <path
                                    class="clr-i-outline clr-i-outline-path-1"
                                    d="M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm0,30A14,14,0,1,1,32,18,14,14,0,0,1,18,32Z"
                                  ></path>
                                  <path
                                    class="clr-i-outline clr-i-outline-path-2"
                                    d="M28,12.1a1,1,0,0,0-1.41,0L15.49,23.15l-6-6A1,1,0,0,0,8,18.53L15.49,26,28,13.52A1,1,0,0,0,28,12.1Z"
                                  ></path>{" "}
                                  <rect
                                    x="0"
                                    y="0"
                                    width="36"
                                    height="36"
                                    fill-opacity="0"
                                  ></rect>{" "}
                                </g>
                              </svg>
                              <p className="text-2xl text-red-600">
                                Cảm ơn bạn đã đặt hàng thành công
                              </p>
                              <p>
                                Nhân viên SalePhone sẽ liên hệ với quý khách
                                trong thời gian sớm nhất
                              </p>
                            </div>
                          </div>
                          <div className="bg-gray-100 rounded-md my-2">
                            <div className="flex p-3 max-w-full ">
                              <div className="pr-10 min-w-[30%]">
                                <p className="py-1">Mã đơn hàng</p>
                                <p className="py-1">Họ và tên</p>
                                <p className="py-1">Số điện thoại</p>
                                <p className="py-1">Hình thức thanh toán</p>
                                <p className="py-1">Địa chỉ</p>

                                {/* <p>Nhận hàng tại nhà</p> */}
                              </div>

                              <div className="flex-1 ">
                                <p className="py-1 ">
                                  {orderSuccess.order.id
                                    ? orderSuccess.order.id
                                    : "không"}
                                </p>
                                <p className="py-1">
                                  {orderSuccess.order.fullname
                                    ? orderSuccess.order.fullname
                                    : "không"}
                                </p>
                                <p className="py-1">
                                  {orderSuccess.order.phone
                                    ? orderSuccess.order.phone
                                    : "không"}
                                </p>
                                <p className="py-1">Thanh toán khi nhận hàng</p>
                                <p className="py-1 w-full">
                                  {orderSuccess.order.address
                                    ? orderSuccess.order.address
                                    : "Nhận hàng tại nhà"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <p className="text-2xl font-medium ">
                            Thông tin đơn hàng
                          </p>
                          <div className="bg-gray-50 rounded-md my-2">
                            {orderSuccess.orderDetail &&
                              orderSuccess.orderDetail.map((item, index) => (
                                <div key={index}>
                                  <div className="flex p-3 gap-4">
                                    <div className="p-2 border rounded-md bg-white">
                                      <div className="w-[100px] h-[100px]">
                                        <img
                                          className="w-full h-full "
                                          src={`${DOMAIN}${item.Product_detail.image}`}
                                          alt=""
                                        />
                                      </div>
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-xl font-medium pb-1">
                                        Điện thoại {item.Product.name}{" "}
                                        {item.Product.capacity}{" "}
                                        {item.Product_detail.color}
                                      </p>
                                      <div className="flex justify-between">
                                        <p className="text-gray-500">
                                          Số lượng: {item.quantity}
                                        </p>
                                        <div>
                                          <p className="font-medium text-red-600">
                                            {formatPrice(`${item.totalDetail}`)}
                                            đ
                                          </p>
                                          <p className=" text-gray-500 line-through">
                                            {formatPrice(
                                              `${
                                                item.Product_detail.discount *
                                                (item.quantity || 1)
                                              }`
                                            )}
                                            đ
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="p-3">
                                    <p className="text-lg font-normal">
                                      Khuyến mãi kèm theo
                                    </p>
                                    <div className="border border-gray-200 rounded-lg flex items-center p-3">
                                      <div className="rounded-full w-20 h-20  border flex items-center justify-center ">
                                        <img
                                          className="w-[80%] h-[80%] my-auto mx-auto"
                                          src={`${DOMAIN}${item.Promotion.image}`}
                                          alt=""
                                        />
                                      </div>
                                      <p className="py-2 px-2 text-sm">
                                        Tặng ngay bộ {item.Promotion.gift} giá
                                        lên tới dưới 1 tỉ đồng
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                          {/* <div className="bg-gray-200 rounded-md my-2"></div> */}
                          <div className="bg-gray-100 rounded-md my-2">
                            <div className="p-3">
                              <div className="flex justify-between">
                                <p>Tổng tiền:</p>
                                <p>{formatPrice(`${calculateTotal2()}đ`)}</p>
                              </div>
                              <div className="flex justify-between">
                                <p>Phí giao hàng:</p>
                                <p>0đ</p>
                              </div>
                              <div className="flex justify-between">
                                <p>Giảm giá voucher:</p>
                                <p>0đ</p>
                              </div>
                              <hr className=" border-dotted border-[1.5px] my-2 border-gray-400" />
                              <div className="flex justify-between">
                                <p className="text-xl font-medium ">
                                  Thành tiền
                                </p>
                                <p className="text-red-600 text-xl font-medium">
                                  {formatPrice(`${calculateTotal2()}đ`)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex-col flex  items-center justify-center">
                          <button
                            type="button"
                            // onClick={handleSave}
                            className="bg-green-400 rounded-full  text-white py-2 px-10  mb-4 "
                          >
                            Về trang chủ
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="rounded-lg md:max-w-[900px] max-w-screen-lg mt-4 sm:mt-0 mx-auto px-4 sm:px-0">
        <NavLink to="/">
          <div className="flex items-center text-blue-600 ">
            <svg
              width="20px"
              height="20px"
              fill="#3AB0FF"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              // xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 72 72"
              enable-background="new 0 0 72 72"
              // xml:space="preserve"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <path d="M48.252,69.253c-2.271,0-4.405-0.884-6.011-2.489L17.736,42.258c-1.646-1.645-2.546-3.921-2.479-6.255 c-0.068-2.337,0.833-4.614,2.479-6.261L42.242,5.236c1.605-1.605,3.739-2.489,6.01-2.489c2.271,0,4.405,0.884,6.01,2.489 c3.314,3.314,3.314,8.707,0,12.021L35.519,36l18.743,18.742c3.314,3.314,3.314,8.707,0,12.021 C52.656,68.369,50.522,69.253,48.252,69.253z M48.252,6.747c-1.202,0-2.332,0.468-3.182,1.317L21.038,32.57 c-0.891,0.893-0.833,2.084-0.833,3.355c0,0.051,0,0.101,0,0.151c0,1.271-0.058,2.461,0.833,3.353l24.269,24.506 c0.85,0.85,1.862,1.317,3.063,1.317c1.203,0,2.273-0.468,3.123-1.317c1.755-1.755,1.725-4.61-0.03-6.365L31.292,37.414 c-0.781-0.781-0.788-2.047-0.007-2.828L51.438,14.43c1.754-1.755,1.753-4.61-0.001-6.365C50.587,7.215,49.454,6.747,48.252,6.747z"></path>{" "}
                </g>{" "}
              </g>
            </svg>
            <p  className="font-normal">Tiếp tục mua sắm</p>
          </div>
        </NavLink>
        <p className="font-semibold text-lg mt-3 ">
          Có {cart.length} sản phẩm trong giỏ hàng
        </p>
      </div>
      {cart.length > 0 ? (
        <div className="flex flex-col rounded-lg md:max-w-[900px] max-w-screen-lg mt-15  pt-5 mx-auto px-4 sm:px-0 ">
          <div className="rounded-2xl bg-white py-5 px-4 ">
            {cart.map((product, index) => (
              <div>
                <div className="flex gap-4 mb-4 ">
                  <div className="w-[100px] h-[100px]">
                    <NavLink to={`/product_detail/${product.id_Product}`}>
                      <img
                        className="w-full h-full"
                        src={`${DOMAIN}${product.imageProductDetail}`}
                        alt=""
                      />
                    </NavLink>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <NavLink to={`/product_detail/${product.id_Product}`}>
                        <p className="font-semibold sm:text-lg text-[15px]">
                          Điện thoại {product.name} {product.capacity}{" "}
                          {product.color}
                        </p>
                      </NavLink>
                      {/* <p>số lượng trong kho: {product.quantityDB}</p> */}
                      <div>
                        <button onClick={() => removeFromCart(index)}>
                          <svg
                            width="30px"
                            height="30px"
                            viewBox="0 0 1024 1024"
                            class="icon"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#000000"
                          >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              <path
                                d="M667.8 362.1H304V830c0 28.2 23 51 51.3 51h312.4c28.4 0 51.4-22.8 51.4-51V362.2h-51.3z"
                                fill="#fff"
                              ></path>
                              <path
                                d="M750.3 295.2c0-8.9-7.6-16.1-17-16.1H289.9c-9.4 0-17 7.2-17 16.1v50.9c0 8.9 7.6 16.1 17 16.1h443.4c9.4 0 17-7.2 17-16.1v-50.9z"
                                fill="#fff"
                              ></path>
                              <path
                                d="M733.3 258.3H626.6V196c0-11.5-9.3-20.8-20.8-20.8H419.1c-11.5 0-20.8 9.3-20.8 20.8v62.3H289.9c-20.8 0-37.7 16.5-37.7 36.8V346c0 18.1 13.5 33.1 31.1 36.2V830c0 39.6 32.3 71.8 72.1 71.8h312.4c39.8 0 72.1-32.2 72.1-71.8V382.2c17.7-3.1 31.1-18.1 31.1-36.2v-50.9c0.1-20.2-16.9-36.8-37.7-36.8z m-293.5-41.5h145.3v41.5H439.8v-41.5z m-146.2 83.1H729.5v41.5H293.6v-41.5z m404.8 530.2c0 16.7-13.7 30.3-30.6 30.3H355.4c-16.9 0-30.6-13.6-30.6-30.3V382.9h373.6v447.2z"
                                fill="#211F1E"
                              ></path>
                              <path
                                d="M511.6 798.9c11.5 0 20.8-9.3 20.8-20.8V466.8c0-11.5-9.3-20.8-20.8-20.8s-20.8 9.3-20.8 20.8v311.4c0 11.4 9.3 20.7 20.8 20.7zM407.8 798.9c11.5 0 20.8-9.3 20.8-20.8V466.8c0-11.5-9.3-20.8-20.8-20.8s-20.8 9.3-20.8 20.8v311.4c0.1 11.4 9.4 20.7 20.8 20.7zM615.4 799.6c11.5 0 20.8-9.3 20.8-20.8V467.4c0-11.5-9.3-20.8-20.8-20.8s-20.8 9.3-20.8 20.8v311.4c0 11.5 9.3 20.8 20.8 20.8z"
                                fill="#211F1E"
                              ></path>
                            </g>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="sm:flex justify-between mt-1">
                      <div>
                        <div className="flex items-center sm:text-base text-[12px]">
                          <p className="text-gray-500 pr-1  ">Màu sắc :</p>
                          <p>{product.color}</p>
                        </div>
                        <div className="flex items-center sm:text-base text-[12px]">
                          <p className="text-gray-500 pr-1  ">Số lượng:</p>
                          <div className=" flex items-center border rounded-l-xl  h-[30px]">
                            <button onClick={() => decreaseQuantity(index)}>
                              <svg
                                width="30px"
                                height="30px"
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
                                    d="M7 12L17 12"
                                    stroke="#000000"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>{" "}
                                </g>
                              </svg>
                            </button>
                          </div>
                          <input
                            className="flex items-center border w-[30px] h-[30px] justify-center text-center"
                            type=""
                            value={product.quantity || 1}
                            onChange={(e) =>
                              updateQuantity(
                                index,
                                parseInt(e.target.value, 10)
                              )
                            }
                          />
                          <div className="flex items-center border rounded-r-xl h-[30px]">
                            <button
                              onClick={() => {
                                increaseQuantity(index);
                                // updateQuantity(index)
                              }}
                            >
                              <svg
                                width="30px"
                                height="30px"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#000000"
                              >
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  {" "}
                                  <title></title>{" "}
                                  <g id="Complete">
                                    {" "}
                                    <g data-name="add" id="add-2">
                                      {" "}
                                      <g>
                                        {" "}
                                        <line
                                          fill="none"
                                          stroke="#000000"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          x1="12"
                                          x2="12"
                                          y1="19"
                                          y2="5"
                                        ></line>{" "}
                                        <line
                                          fill="none"
                                          stroke="#000000"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          x1="5"
                                          x2="19"
                                          y1="12"
                                          y2="12"
                                        ></line>{" "}
                                      </g>{" "}
                                    </g>{" "}
                                  </g>{" "}
                                </g>
                              </svg>
                            </button>
                          </div>
                        </div>
                        {showMaxQuantityMessage === product.idProduct && (
                          <p className="text-red-500">
                            Tối đa số lượng trong kho
                          </p>
                        )}
                      </div>
                      <div className="sm:text-lg">
                        <p className="text-red-500 font-semibold">
                          {formatPrice(
                            `${product.price * (product.quantity || 1)} ₫`
                          )}
                          {/* {`${product.price * (product.quantity || 1)}`} */}
                        </p>
                        <p className="line-through text-gray-400">
                          {formatPrice(
                            `${product.discount * (product.quantity || 1)} ₫`
                          )}
                          {/* {product.discount * (product.quantity || 1)} */}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="my-7">
                  <p className="text-gray-500">Khuyến mãi theo sản phẩm</p>
                  <div className="border border-gray-200 rounded-lg flex items-center p-3">
                    <div className="rounded-full w-20 h-20  border flex items-center justify-center ">
                      <img
                        className="w-[80%] h-[80%] my-auto mx-auto"
                        src={`${DOMAIN}${product.imageGift}`}
                        alt=""
                      />
                    </div>
                    <p className="py-2 px-2 text-sm">
                      Tặng ngay bộ sạc dự phòng giá lên tới dưới 1 tỉ đồng
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="h-[30px] rounded-t-2xl bg-red-400 bg-[url('https://fptshop.com.vn/estore-images/bggiftpromotion.png')] flex items-center px-4 mt-5 font-semibold text-base text-white ">
            Khuyến mãi theo đơn hàng
          </div>

          <div className="rounded-b-2xl bg-white py-5 px-4 ">
            <div>
              <p className="text-gray-600">Khuyến mãi tặng kèm</p>
              <div className="flex items-center">
                <img
                  className="w-8 h-8"
                  src="https://fptshop.com.vn/estore-images/promo_ticket.svg"
                  alt=""
                />
                <p>Thu cũ đổi mới Chợ Tốt (Thu đến 75% giá trị máy cũ)</p>
              </div>
              <div className="flex items-center">
                <img
                  className="w-8 h-8"
                  src="https://fptshop.com.vn/estore-images/promo_ticket.svg"
                  alt=""
                />
                <p>Ví Da Magsafe giảm đến 30% khi mua kèm iPhone</p>
              </div>
              <div className="flex items-center">
                <img
                  className="w-8 h-8"
                  src="https://fptshop.com.vn/estore-images/promo_ticket.svg"
                  alt=""
                />
                <p>Sạc dự phòng Magsafe giảm ngay 30% khi mua kèm iPhone</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white py-5 px-4 mt-5 ">
            <div className="flex justify-between">
              <div className="flex items-center">
                <svg
                  className="w-10 h-8"
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
                      d="M8.00537 13C8.00537 13.5523 7.55766 14 7.00537 14C6.45309 14 6.00537 13.5523 6.00537 13C6.00537 12.4477 6.45309 12 7.00537 12C7.55766 12 8.00537 12.4477 8.00537 13Z"
                      fill="#F9B572"
                    ></path>{" "}
                    <path
                      d="M16.9998 14C17.552 14 17.9998 13.5523 17.9998 13C17.9998 12.4477 17.552 12 16.9998 12C16.4475 12 15.9998 12.4477 15.9998 13C15.9998 13.5523 16.4475 14 16.9998 14Z"
                      fill="#F9B572"
                    ></path>{" "}
                    <path
                      d="M9.48438 14.75C9.48438 14.3358 9.82016 14 10.2344 14H13.7188C14.133 14 14.4688 14.3358 14.4688 14.75C14.4688 15.1642 14.133 15.5 13.7188 15.5H10.2344C9.82016 15.5 9.48438 15.1642 9.48438 14.75Z"
                      fill="#F9B572"
                    ></path>{" "}
                    <path
                      d="M9.26562 1.99219C8.85141 1.99219 8.51562 2.32797 8.51562 2.74219V4.5H7.85159C6.42162 4.5 5.15966 5.43465 4.74277 6.8025L4.68258 7H3.75C3.33579 7 3 7.33579 3 7.75C3 8.16421 3.33579 8.5 3.75 8.5H4.28302L4.08121 9.327C3.43291 9.72189 3 10.4354 3 11.25V19.75C3 20.7165 3.7835 21.5 4.75 21.5H6.25C7.2165 21.5 8 20.7165 8 19.75V18.5H16V19.75C16 20.7165 16.7835 21.5 17.75 21.5H19.25C20.2165 21.5 21 20.7165 21 19.75V11.25C21 10.4347 20.5663 9.72063 19.9171 9.32596L19.7106 8.5H20.25C20.6642 8.5 21 8.16421 21 7.75C21 7.33579 20.6642 7 20.25 7H19.308L19.2529 6.81612C18.8404 5.44142 17.5751 4.5 16.1399 4.5H15.5V2.74219C15.5 2.32797 15.1642 1.99219 14.75 1.99219H9.26562ZM14 4.5H10.0156V3.49219H14V4.5ZM7.85159 6H16.1399C16.9127 6 17.5941 6.50692 17.8161 7.24714L18.0266 7.94881L18.2894 9H5.70503L5.96165 7.94839L6.17761 7.23981C6.40209 6.50327 7.08161 6 7.85159 6ZM4.5 17V11.25C4.5 10.8358 4.83579 10.5 5.25 10.5H18.75C19.1642 10.5 19.5 10.8358 19.5 11.25V17H4.5ZM4.5 19.75V18.5H6.5V19.75C6.5 19.8881 6.38807 20 6.25 20H4.75C4.61193 20 4.5 19.8881 4.5 19.75ZM19.5 18.5V19.75C19.5 19.8881 19.3881 20 19.25 20H17.75C17.6119 20 17.5 19.8881 17.5 19.75V18.5H19.5Z"
                      fill="#F9B572"
                    ></path>{" "}
                  </g>
                </svg>
                <p className="font-semibold sm:text-xl text-red-500">
                  Hình thức giao hàng
                </p>
              </div>
              <span className="sm:text-base" name="" id="">
                Giao hàng tận nhà
              </span>
            </div>
            <div className="py-4 px-2 bg-gray-200 rounded-2xl mt-4 ">
              <div className="p-3 ">
                <p>Thông tin người nhận hàng</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className=" mt-2 grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block">Họ và tên:</label>
                      <Controller
                        name="fullname"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="text"
                            value={field.value}
                            onChange={(e) => {
                              field.onChange(e);
                              setOrder((prevOrder) => ({
                                ...prevOrder,
                                fullname: e.target.value,
                              }));
                            }}
                            className="border rounded-lg xl:h-[50px] sm:h-[30px] px-2 w-full"
                            placeholder="Nhập họ và tên"
                          />
                        )}
                      />
                      <p className="text-red-500">{errors.fullname?.message}</p>
                      {/* <input
                        type="text"
                        name="fullname"
                        value={order.fullname}
                        onChange={handleChange}
                        className="border rounded-lg xl:h-[50px] sm:h-[30px] px-2 w-full"
                        placeholder="Nhập họ và tên"
                        required
                      /> */}
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block">Số điện thoại:</label>

                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="text"
                            value={field.value}
                            onChange={(e) => {
                              field.onChange(e);
                              setOrder((prevOrder) => ({
                                ...prevOrder,
                                phone: e.target.value,
                              }));
                            }}
                            className="border rounded-lg xl:h-[50px] sm:h-[30px] px-2 w-full"
                            placeholder="Nhập số điện thoại"
                          />
                        )}
                      />
                      <p className="text-red-500">{errors.phone?.message}</p>
                      {/* <input
>>>>>>> ddbfb9f7952d0758c366f1af2046e9503ceda781
                        name="phone"
                        value={order.phone}
                        onChange={handleChange}
                        type="text"
                        className="border rounded-lg xl:h-[50px] sm:h-[30px] px-2 w-full"
                        placeholder="Nhập số điện thoại"
                      
                      /> */}
                    </div>
                    <div className="col-span-2">
                      <label className="block">Email:</label>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="text"
                            value={field.value}
                            onChange={(e) => {
                              field.onChange(e);
                              setOrder((prevOrder) => ({
                                ...prevOrder,
                                email: e.target.value,
                              }));
                            }}
                            className="border rounded-lg xl:h-[50px] sm:h-[30px] px-2 w-full"
                            placeholder="Nhập email của bạn"
                          />
                        )}
                      />
                      <p className="text-red-500">{errors.email?.message}</p>
                    </div>
                    <div className="col-span-2 border rounded-lg   px-2">
                      <div className="flex flex-col gap-4">
                        <div className="sm:flex items-center gap-4">
                          <Select
                            type="province"
                            value={province}
                            setValue={setProvince}
                            options={provinces}
                            label="Tỉnh/Thành phố"
                          />
                          <Select
                            type="district"
                            reset={reset}
                            value={district}
                            setValue={setDistrict}
                            options={districts}
                            label="Quận/Huyện"
                          />
                          <Select
                            reset={reset}
                            type="ward"
                            value={ward}
                            setValue={setWard}
                            options={wards}
                            label="Xã"
                          />
                        </div>
                        {/* <InputReadOnly
                        name="address"
                        onChange={handleChange}
                        label="Địa chỉ chính xác"
                        value={`${
                          ward
                            ? `${
                                wards?.find((item) => item.ward_id === ward)
                                  ?.ward_name
                              },`
                            : ""
                        } ${
                          district
                            ? `${
                                districts?.find(
                                  (item) => item.district_id === district
                                )?.district_name
                              },`
                            : ""
                        } ${
                          province
                            ? provinces?.find(
                                (item) => item.province_id === province
                              )?.province_name
                            : ""
                        }`}
                      /> */}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <label className="block">Số nhà/ tên đường:</label>
                      <input
                        type="text"
                        name="soNha"
                        value={soNha}
                        onChange={handleChangeSoNha}
                        className=" border rounded-lg xl:h-[50px] sm:h-[30px] px-2 w-full"
                        placeholder="Nhập địa chỉ / số nhà"
                      />
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white py-5 px-4 mt-5 ">
                    <div className="sm:flex sm:gap-4  justify-between items-start">
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p>Tổng tiền:</p>
                          <p>
                            {formatPrice(`${calculateTotal()}₫`)}
                            {/* {calculateTotal()}đ */}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p>Phí giao hàng</p>
                          <p>0₫</p>
                        </div>
                        <div className="flex justify-between">
                          <p>Giảm giá voucher</p>
                          <p>0₫</p>
                        </div>
                      </div>
                      <div className="flex-1 mt-1 sm:mt-0">
                        <div className="flex justify-between ">
                          <p>Cần thanh toán ({cart.length} sản phẩm)</p>
                          <p className="text-red-500 text-lg font-semibold">
                            {formatPrice(`${calculateTotal()}₫`)}
                            {/* {calculateTotal() + 20000} */}
                          </p>
                        </div>
                        <div className="mt-2">
                          <button
                            type="submit"
                            className="font-medium text-lg text-center bg-red-500 text-white w-full rounded-full py-2"
                          >
                            Hoàn tất đặt hàng
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col rounded-lg md:max-w-[900px] max-w-screen-lg pt-4 mx-auto ">
          <div className="rounded-2xl bg-white py-5 px-4 mx-auto ">
            <div className="w-[70%] mx-auto">
              <img
                src="https://cdn.dribbble.com/users/1244867/screenshots/4346888/media/8c1099726d0428fed0e0a2f0a5430b37.jpg?resize=800x600&vertical=center"
                alt=""
              />
              <p className="text-semibold text-center text-2xl text-red-600">
                Chưa có sản phẩm nào trong giỏ hàng
              </p>
              <p className="text-center text-lg">
                Hãy tìm kiếm sản phẩm phù hợp với bạn tại SalePhone
              </p>
              <div className="text-center mt-3">
                <button className="py-2 px-3 rounded-full font-semibold bg-red-400 text-white">
                  Xem sản phẩm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
