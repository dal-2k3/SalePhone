import { useEffect, useState } from "react";
import { DOMAIN } from "../utils/settings/config";
import { NavLink } from "react-router-dom";
export default function Cart() {
  // const [order, setOrder] = useState([])
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
  const handleChangeReview = (e) => {
    const { name, value } = e.target;
    setOrder((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
    // Ở đây bạn có thể gửi giá trị rating lên server hoặc xử lý nó theo ý muốn
  };
  //   setOrder((prevOrder) => ({
  //     ...prevOrder,
  //     total: calculateTotal(),
  //   }));
  const [totalDetail, settotalDetail] = useState();
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    updateOrderDetails(storedCart);
    // setOrder({ ...order, order_details: updatedOrderDetails, });
    setCart(storedCart);
  }, []);
  const updateOrderDetails = (cart) => {
    const updatedOrderDetails = cart.map((product,index) => ({
        ...cart[index],
      totalDetail: formatPrice(product.price * (product.quantity || 1)),
    }));

    setOrder({ ...order, order_details: updatedOrderDetails });
  };
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
    updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
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
  const calculateTotal = () => {
    return cart.reduce((total, product) => {
      return total + product.price * (product.quantity || 1);
    }, 0);
  };
  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  //   const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("này lấy từ localstorage", cart);
  console.log("này lấy để up lên db", order);
  return (
    <div className="w-full bg-gray-100">
      <div className="rounded-lg md:max-w-[900px] max-w-screen-lg pt-4 mx-auto ">
        <NavLink to="/listproducts/1">
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
            <p className="font-normal">Tiếp tục mua sắm</p>
          </div>
        </NavLink>
        <p className="font-semibold text-lg mt-3 ">
          Có {cart.length} sản phẩm trong giỏ hàng
        </p>
      </div>
      {cart.length > 0 ? (
        <div className="flex flex-col rounded-lg md:max-w-[900px] max-w-screen-lg mt-15  pt-5 mx-auto ">
          <div className="rounded-2xl bg-white py-5 px-4 ">
            {cart.map((product, index) => (
              <div>
                <div className="flex gap-4 mb-4 ">
                  <div className="w-[100px] h-[100px]">
                    <img
                      className="w-full h-full"
                      src={`${DOMAIN}${product.imageProductDetail}`}
                      alt=""
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-semibold text-lg">
                        Điện thoại {product.name} {product.capacity}{" "}
                        {product.color}
                      </p>
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
                    <div className="flex justify-between mt-1">
                      <div>
                        <div className="flex items-center text-base">
                          <p className="text-gray-500 pr-1  ">Màu sắc :</p>
                          <p>{product.color}</p>
                        </div>
                        <div className="flex items-center text-base">
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
                      </div>
                      <div className="text-lg">
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
                    {/* <p className="py-2 px-2 text-sm">
                      Giảm ngay 800,000đ áp dụng đến 27/11 Khuyến mãi chỉ áp
                      dụng trên loại đơn hàng Trả góp.
                    </p> */}
                  </div>
                </div>
              </div>
            ))}

            {/* <div className="mt-5">
              <p className="text-gray-500">Khuyến mãi theo sản phẩm</p>
              <div className="border border-gray-200 rounded-lg">
                <p className="py-2 px-2 text-sm">
                  Tặng ngay bộ sạc dự phòng giá lên tới dưới 1 tỉ đồng
                </p>
                <p className="py-2 px-2 text-sm">
                  Giảm ngay 800,000đ áp dụng đến 27/11 Khuyến mãi chỉ áp dụng
                  trên loại đơn hàng Trả góp.
                </p>
              </div>
            </div> */}
            {/* <div className="mt-5">
              <p className="text-gray-500">Khuyến mãi thanh toán</p>
              <div className="border border-gray-200 rounded-lg">
                <p className="py-2 px-2 text-sm">
                  Nhập mã FPTSHOP200 giảm 1% tối đa 200.000 đồng khi thanh toán
                  100% qua ZaloPay
                </p>
                <p className="py-2 px-2 text-sm">
                  Giảm ngay 5% tối đa 200.000 đồng khi thanh toán trả góp 6/12
                  tháng qua Kredivo
                </p>
              </div>
            </div> */}
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
                <p className="font-semibold text-xl text-red-500">
                  Hình thức giao hàng
                </p>
              </div>
              <span className="text-base" name="" id="">
                Giao hàng tận nhà
              </span>
            </div>
            <div className="py-2 px-2 bg-gray-200 rounded-2xl mt-4">
              <div className="p-3 ">
                <p>Thông tin người nhận hàng</p>
                <div className=" mt-2 grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="fullname"
                    value={order.fullname}
                    onChange={handleChangeReview}
                    className="border rounded-lg xl:h-[50px] sm:h-[30px] px-2"
                    placeholder="Nhập họ và tên"
                  />
                  <input
                    name="phone"
                    value={order.phone}
                    onChange={handleChangeReview}
                    type="text"
                    className="border rounded-lg xl:h-[50px] sm:h-[30px] px-2"
                    placeholder="Nhập số điện thoại"
                  />
                  <input
                    type="text"
                    name="email"
                    value={order.email}
                    onChange={handleChangeReview}
                    className="col-span-2 border rounded-lg xl:h-[50px] sm:h-[30px] px-2"
                    placeholder="Nhập địa chỉ email"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white py-5 px-4 mt-5 ">
            <div className="flex gap-4  justify-between items-start">
              <div className="flex-1">
                <div className="flex justify-between">
                  <p>Tổng tiền:</p>
                  <p>
                    {formatPrice(`${calculateTotal()} ₫`)}
                    {/* {calculateTotal()}đ */}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>Phí giao hàng</p>
                  <p>20.000 ₫</p>
                </div>
                <div className="flex justify-between">
                  <p>Giảm giá voucher</p>
                  <p>0đ</p>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between ">
                  <p>Cần thanh toán ({cart.length} sản phẩm)</p>
                  <p className="text-red-500 text-lg font-semibold">
                    {formatPrice(`${calculateTotal() + 20000} ₫`)}
                    {/* {calculateTotal() + 20000} */}
                  </p>
                </div>
                <div className="mt-2">
                  <button
                    onClick={() => {
                      setOrder((prevOrder) => ({
                        ...prevOrder,
                        total: formatPrice(calculateTotal() + 20000),
                       
                        // order_details.totalDetail:
                      }));
                    }}
                    className="font-medium text-lg text-center bg-red-500 text-white w-full rounded-full py-2"
                  >
                    Hoàn tất đặt hàng
                  </button>
                </div>
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
