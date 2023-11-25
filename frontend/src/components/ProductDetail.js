// import { Dialog } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
export default function ProductDetail() {
  const [openAdd, setOpenAdd] = useState(false);
  const cancelButtonRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState("128G");

  const products = [
    { id: 1, capacity: "128G", price: "10.000.000₫" },
    { id: 2, capacity: "256G", price: "12.000.000₫" },
    { id: 3, capacity: "512G", price: "15.000.000₫" },
  ];
  const handleSelectOption = (capacity) => {
    setSelectedOption(capacity);
    console.log(capacity);
  };
  const [rating, setRating] = useState(0);
  const handleChangeStar = (value) => {
    setRating(value);
    setReview((prevReview) => ({
      ...prevReview,
      rating: value.toString(), // Chuyển đổi giá trị sang chuỗi nếu cần
    }));
  };
  const [review, setReview] = useState({
    username: "",
    phone: "",
    content: "",
    rating: rating,
  });
  const handleChangeReview = (e) => {
    const { name, value } = e.target;
    setReview((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
    // Ở đây bạn có thể gửi giá trị rating lên server hoặc xử lý nó theo ý muốn
  };
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    console.log(review);
  };
  
  const [selectedColor, setSelectedColor] = useState("black");
  const colors = [
    {
      id: 1,
      name: "Black",
      value: "black",
      image:
        "https://images.fpt.shop/unsafe/fit-in/38x38/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/9/16/638304626032590721_iphone-15-pro-vang-1.jpg",
    },
    {
      id: 2,
      name: "Green",
      value: "green",
      image:
        "https://images.fpt.shop/unsafe/fit-in/38x38/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/9/16/638304626032590721_iphone-15-pro-vang-1.jpg",
    },
    {
      id: 3,
      name: "Yellow",
      value: "yellow",
      image:
        "https://images.fpt.shop/unsafe/fit-in/38x38/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/9/16/638304626032590721_iphone-15-pro-vang-1.jpg",
    },
  ];

  const handleSelectColor = (colorValue) => {
    setSelectedColor(colorValue);
    console.log(colorValue);
  };
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "https://cdn.hoanghamobile.com/i/preview/Uploads/2022/09/08/2222.png",
    "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-yellow?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923780785",
    "https://imagedelivery.net/5MYSbk45M80qAwecrlKzdQ/f4ec8475-df61-4a9c-fd3f-095b2ab89f00/preview",
    "https://cdn.hoanghamobile.com/i/preview/Uploads/2022/09/08/2222.png",
  ];

  const handlePrev = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  const [activeTab, setActiveTab] = useState(1);

  const changeTab = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  return (
    <div>
      <div className="grid max-w-screen-xl  px-4 pt-20 pb-8 mx-auto lg:gap-8  lg:py-16 lg:pt-10 ">
        {/* modal */}
        <Transition.Root show={openAdd} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50"
            initialFocus={cancelButtonRef}
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
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-screen-sm ">
                    <div className="  mx-auto py-3 px-3 bg-white  ">
                      <div className="flex  sm:items-center justify-between">
                        <h1 className="text-2xl font-bold pl-2">
                          Đánh giá sản phẩm
                        </h1>
                        <button
                          type="button"
                          onClick={() => setOpenAdd(false)}
                          ref={cancelButtonRef}
                          className=""
                        >
                          <svg
                            className="w-5 h-5"
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
                                fill="#0F0F0F"
                              ></path>{" "}
                            </g>
                          </svg>
                        </button>
                      </div>
                      <hr className=" border-solid border-[1.5px] my-5" />
                      <form onSubmit={handleReviewSubmit}>
                        <div className="">
                          <div className="flex items-center justify-center h-300">
                            <img
                              src="https://images.fpt.shop/unsafe/fit-in/96x96/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/9/20/638307989548944936_iphone-15-promax-xanh-1.jpg"
                              alt=""
                            />
                          </div>
                          <p className="font-medium text-xl text-center">
                            Iphone 15 Pro Max 512G
                          </p>
                          <div className="text-2xl text-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                onClick={() => handleChangeStar(star)}
                                className={
                                  star <= rating
                                    ? "text-yellow-500 cursor-pointer hover:transform scale-120 transition-transform duration-200"
                                    : "text-gray-500 cursor-pointer hover:transform scale-120 transition-transform duration-200"
                                }
                              >
                                ★
                              </span>
                            ))}
                            <p className="text-base">Your Rating: {rating}</p>
                          </div>
                          <div>
                            <textarea
                              className="w-full border border-slate-300 rounded h-[80px] focus:border-slate-300"
                              name="content"
                              value={review.content}
                              onChange={handleChangeReview}
                              placeholder="Hãy để lại cảm nhận của bạn...."
                              id=""
                              cols="30"
                              rows="10"
                            ></textarea>
                            {/* <input
                              name="content"
                              value={review.content}
                              onChange={handleChangeReview}
                              className="w-full border border-slate-300 rounded h-[80px]"
                              type="text"
                              placeholder="Hãy để lại cảm nhận của bạn...."
                            /> */}
                          </div>
                          <hr className=" border-solid border-[1.5px] my-5" />
                          <div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="" className="font-normal">
                                  Họ tên:
                                </label>
                                <input
                                  name="username"
                                  value={review.username}
                                  onChange={handleChangeReview}
                                  className="border w-full  h-[40px]   rounded border-slate-300"
                                  type="text"
                                  placeholder="Nhập họ và tên"
                                />
                              </div>
                              <div>
                                <label htmlFor="" className="font-normal">
                                  Số điện thoại:
                                </label>
                                <input
                                  name="phone"
                                  value={review.phone}
                                  onChange={handleChangeReview}
                                  className="border w-full h-[40px]   rounded border-slate-300"
                                  type="text"
                                  placeholder="Nhập số điện thoại"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="bg-green-500 rounded-md  text-white py-2 px-4 w-full mb-4 mt-4"
                        >
                          Gửi đánh giá
                        </button>
                      </form>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        <div className="flex w-[100%] px-5">
          <div className="w-[45%] border border-solid py-8 rounded-2xl h-auto mr-5">
            <div className="relative mb-4 h-[200px] flex items-center justify-center">
              <img
                src={images[currentImage]}
                alt={`Product Image ${currentImage + 1}`}
                className="w-auto h-full rounded-lg object-cover"
              />
              <button
                onClick={handlePrev}
                className="absolute top-1/2 left-4 -translate-y-1/2 p-2 bg-cyan-100 bg-opacity-50 rounded-full"
              >
                {/* Prev Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-800"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-4 -translate-y-1/2 p-2 bg-cyan-100 bg-opacity-50 rounded-full"
              >
                {/* Next Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-800"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Ảnh nhỏ */}
            <div className="flex justify-center space-x-4">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-12 h-12 rounded-md cursor-pointer ${
                    index === currentImage ? "border-2 border-blue-500" : ""
                  }`}
                  onClick={() => setCurrentImage(index)}
                />
              ))}
            </div>
          </div>
          <div className=" w-[40%]   h-auto ">
            <div>
              <p className="font-bold text-xl 	">
                Iphone 15 Pro Max - Chính hãng VN/A
              </p>
            </div>
            <div className="flex items-center ">
              <p className="text-[#fd475a] font-bold mr-2 text-xl">
                18.000.000 ₫
              </p>
              <p className="text-gray-500 font-bold line-through mr-2">
                17.000.000 ₫
              </p>
              <p className="mr-2">|</p>
              <p className="text-base italic text-gray-700 ">
                Giá đã bao gồm VAT
              </p>
            </div>

            {/* //capacity */}
            <div>
              <div className="xl:flex mt-4 justify-center">
                {products.map((product) => (
                  <NavLink
                    key={product.id}
                    to="#"
                    className={`flex-1 px-5 hover:bg-gray-300 rounded-sm ${
                      selectedOption === product.capacity ? "bg-gray-300" : ""
                    }`}
                    onClick={() => handleSelectOption(product.capacity)}
                  >
                    <div className="">
                      <div className="flex  items-center justify-center">
                        <input
                          type="radio"
                          checked={selectedOption === product.capacity}
                          onChange={() => handleSelectOption(product.capacity)}
                        />
                        <p className="text-lg font-semibold flex justify-center">
                          {product.capacity}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-500">{product.price}</p>
                      </div>
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>
            {/* color */}
            <div>
              <div className="max-w-md mx-auto mt-8 flex">
                {colors.map((color) => (
                  <div
                    key={color.id}
                    onClick={() => handleSelectColor(color.value)}
                    className={`items-center mx-4 cursor-pointer p-1 ${
                      selectedColor === color.value
                        ? "border-2 border-red-300"
                        : "border"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full `}
                      style={{ backgroundColor: color.value }}
                    >
                      <img
                        src={color.image}
                        alt={`Color ${color.name}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-2">
                      <p>{color.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <button className="bg-orange-500 text-white font-semibold w-full rounded-lg mt-6 py-2 px-4">
                Mua Ngay
              </button>
            </div>
          </div>
        </div>

        {/* parameter review */}

        <div>
          <div className="flex mt-20   justify-center ">
            <button
              className={`py-2 px-4 font-bold text-2xl ${
                activeTab === 1 ? "text-cyan-600" : "text-black"
              }`}
              onClick={() => changeTab(1)}
            >
              Thông tin sản phẩm
            </button>
            <button
              className={`py-2 px-4  font-bold text-2xl ${
                activeTab === 2 ? "text-cyan-600 " : "text-black"
              }`}
              onClick={() => changeTab(2)}
            >
              Đánh giá sản phẩm
            </button>
            {/* Add more buttons for additional tabs */}
          </div>

          <div className="mt-4">
            {activeTab === 1 && (
              <div className="p-4 bg-gray-100">Thông tin sản phẩm</div>
            )}
            {activeTab === 2 && (
              <div>
                <div className="px-5 text-xl font-medium">
                  Đánh giá sản phẩm
                </div>
                <div className="px-5 my-4">
                  <p>Bạn đã dùng sản phẩm này?</p>
                  <button
                    onClick={() => setOpenAdd(true)}
                    className="bg-cyan-300 py-2 px-5 text-lg font-normal rounded-xl mt-1"
                  >
                    Gửi đánh giá
                  </button>
                </div>
                <div className="px-5 my-4">
                  <hr className="border border-solid" />
                </div>

                {/* list danh gia */}
                <div className="px-5 my-4">
                  <div className="flex  mb-5">
                    <div className="rounded-full w-[45px] h-[45px] overflow-hidden border border-solid border-gray-500 flex items-center mr-3">
                      {/* <img
                        src="https://www.vhv.rs/dpng/d/421-4213525_png-file-svg-single-user-icon-png-transparent.png"
                        alt=""
                        className="w-[80%] h-[80%] mx-auto"
                      /> */}
                      <svg
                        className="w-[80%] h-[80%] mx-auto"
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
                          <circle
                            cx="12"
                            cy="6"
                            r="4"
                            fill="#1C274C"
                          ></circle>{" "}
                          <path
                            d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
                            fill="#1C274C"
                          ></path>{" "}
                        </g>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Thủy</p>
                      <div className="flex mb-2 mt-2 ">
                        <svg
                          className="w-4 h-4 text-yellow-300 me-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className="w-4 h-4 text-yellow-300 me-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className="w-4 h-4 text-yellow-300 me-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className="w-4 h-4 text-yellow-300 me-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      </div>
                      <div>Đẹp quá</div>
                      <div className="flex items-center">
                        <div className="flex items-center text-blue-500 font-medium mr-2">
                          <svg
                            className="w-[20px] h-[30px] mr-1"
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
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M12.444 1.35396C11.6474 0.955692 10.6814 1.33507 10.3687 2.16892L7.807 9.00001L4 9.00001C2.34315 9.00001 1 10.3432 1 12V20C1 21.6569 2.34315 23 4 23H18.3737C19.7948 23 21.0208 22.003 21.3107 20.6119L22.9773 12.6119C23.3654 10.7489 21.9433 9.00001 20.0404 9.00001H14.8874L15.6259 6.7846C16.2554 4.89615 15.4005 2.8322 13.62 1.94198L12.444 1.35396ZM9.67966 9.70225L12.0463 3.39119L12.7256 3.73083C13.6158 4.17595 14.0433 5.20792 13.7285 6.15215L12.9901 8.36755C12.5584 9.66261 13.5223 11 14.8874 11H20.0404C20.6747 11 21.1487 11.583 21.0194 12.204L20.8535 13H17C16.4477 13 16 13.4477 16 14C16 14.5523 16.4477 15 17 15H20.4369L20.0202 17H17C16.4477 17 16 17.4477 16 18C16 18.5523 16.4477 19 17 19H19.6035L19.3527 20.204C19.2561 20.6677 18.8474 21 18.3737 21H8V10.9907C8.75416 10.9179 9.40973 10.4221 9.67966 9.70225ZM6 11H4C3.44772 11 3 11.4477 3 12V20C3 20.5523 3.44772 21 4 21H6V11Z"
                                fill="#1640D6"
                              ></path>
                            </g>
                          </svg>

                          <p>Thích</p>
                        </div>
                        <p className="mr-2 text-gray-400">|</p>
                        <p className="text-gray-400">Ngày 21-11-2003</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex mb-5">
                    <div className="rounded-full w-[45px] h-[45px] overflow-hidden border border-solid border-gray-500 flex items-center mr-3">
                      {/* <img
                        src="https://www.vhv.rs/dpng/d/421-4213525_png-file-svg-single-user-icon-png-transparent.png"
                        alt=""
                        className="w-[80%] h-[80%] mx-auto"
                      /> */}
                      <svg
                        className="w-[80%] h-[80%] mx-auto"
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
                          <circle
                            cx="12"
                            cy="6"
                            r="4"
                            fill="#1C274C"
                          ></circle>{" "}
                          <path
                            d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
                            fill="#1C274C"
                          ></path>{" "}
                        </g>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Thủy</p>
                      <div className="flex mb-2 mt-2 ">
                        <svg
                          className="w-4 h-4 text-yellow-300 me-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className="w-4 h-4 text-yellow-300 me-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className="w-4 h-4 text-yellow-300 me-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className="w-4 h-4 text-yellow-300 me-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      </div>
                      <div>Đẹp quá</div>
                      <div className="flex items-center">
                        <div className="flex items-center text-blue-500 font-medium mr-2">
                          <svg
                            className="w-[20px] h-[30px] mr-1"
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
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M12.444 1.35396C11.6474 0.955692 10.6814 1.33507 10.3687 2.16892L7.807 9.00001L4 9.00001C2.34315 9.00001 1 10.3432 1 12V20C1 21.6569 2.34315 23 4 23H18.3737C19.7948 23 21.0208 22.003 21.3107 20.6119L22.9773 12.6119C23.3654 10.7489 21.9433 9.00001 20.0404 9.00001H14.8874L15.6259 6.7846C16.2554 4.89615 15.4005 2.8322 13.62 1.94198L12.444 1.35396ZM9.67966 9.70225L12.0463 3.39119L12.7256 3.73083C13.6158 4.17595 14.0433 5.20792 13.7285 6.15215L12.9901 8.36755C12.5584 9.66261 13.5223 11 14.8874 11H20.0404C20.6747 11 21.1487 11.583 21.0194 12.204L20.8535 13H17C16.4477 13 16 13.4477 16 14C16 14.5523 16.4477 15 17 15H20.4369L20.0202 17H17C16.4477 17 16 17.4477 16 18C16 18.5523 16.4477 19 17 19H19.6035L19.3527 20.204C19.2561 20.6677 18.8474 21 18.3737 21H8V10.9907C8.75416 10.9179 9.40973 10.4221 9.67966 9.70225ZM6 11H4C3.44772 11 3 11.4477 3 12V20C3 20.5523 3.44772 21 4 21H6V11Z"
                                fill="#1640D6"
                              ></path>
                            </g>
                          </svg>

                          <p>Thích</p>
                        </div>
                        <p className="mr-2 text-gray-400">|</p>
                        <p className="text-gray-400">Ngày 21-11-2003</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex mb-5">
                    <div className="rounded-full w-[45px] h-[45px] overflow-hidden border border-solid border-gray-500 flex items-center mr-3">
                      {/* <img
                        src="https://www.vhv.rs/dpng/d/421-4213525_png-file-svg-single-user-icon-png-transparent.png"
                        alt=""
                        className="w-[80%] h-[80%] mx-auto"
                      /> */}
                      <svg
                        className="w-[80%] h-[80%] mx-auto"
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
                          <circle
                            cx="12"
                            cy="6"
                            r="4"
                            fill="#1C274C"
                          ></circle>{" "}
                          <path
                            d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
                            fill="#1C274C"
                          ></path>{" "}
                        </g>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Thủy</p>
                      <div className="flex mb-2 mt-2 ">
                        <svg
                          className="w-4 h-4 text-yellow-300 me-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className="w-4 h-4 text-yellow-300 me-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className="w-4 h-4 text-yellow-300 me-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className="w-4 h-4 text-yellow-300 me-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      </div>
                      <div>Đẹp quá</div>
                      <div className="flex items-center">
                        <div className="flex items-center text-blue-500 font-medium mr-2">
                          <svg
                            className="w-[20px] h-[30px] mr-1"
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
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M12.444 1.35396C11.6474 0.955692 10.6814 1.33507 10.3687 2.16892L7.807 9.00001L4 9.00001C2.34315 9.00001 1 10.3432 1 12V20C1 21.6569 2.34315 23 4 23H18.3737C19.7948 23 21.0208 22.003 21.3107 20.6119L22.9773 12.6119C23.3654 10.7489 21.9433 9.00001 20.0404 9.00001H14.8874L15.6259 6.7846C16.2554 4.89615 15.4005 2.8322 13.62 1.94198L12.444 1.35396ZM9.67966 9.70225L12.0463 3.39119L12.7256 3.73083C13.6158 4.17595 14.0433 5.20792 13.7285 6.15215L12.9901 8.36755C12.5584 9.66261 13.5223 11 14.8874 11H20.0404C20.6747 11 21.1487 11.583 21.0194 12.204L20.8535 13H17C16.4477 13 16 13.4477 16 14C16 14.5523 16.4477 15 17 15H20.4369L20.0202 17H17C16.4477 17 16 17.4477 16 18C16 18.5523 16.4477 19 17 19H19.6035L19.3527 20.204C19.2561 20.6677 18.8474 21 18.3737 21H8V10.9907C8.75416 10.9179 9.40973 10.4221 9.67966 9.70225ZM6 11H4C3.44772 11 3 11.4477 3 12V20C3 20.5523 3.44772 21 4 21H6V11Z"
                                fill="#1640D6"
                              ></path>
                            </g>
                          </svg>

                          <p>Thích</p>
                        </div>
                        <p className="mr-2 text-gray-400">|</p>
                        <p className="text-gray-400">Ngày 21-11-2003</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex mb-5">
                    <div className="rounded-full w-[45px] h-[45px] overflow-hidden border border-solid border-gray-500 flex items-center mr-3">
                      {/* <img
                        src="https://www.vhv.rs/dpng/d/421-4213525_png-file-svg-single-user-icon-png-transparent.png"
                        alt=""
                        className="w-[80%] h-[80%] mx-auto"
                      /> */}
                      <svg
                        className="w-[80%] h-[80%] mx-auto"
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
                          <circle
                            cx="12"
                            cy="6"
                            r="4"
                            fill="#1C274C"
                          ></circle>{" "}
                          <path
                            d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
                            fill="#1C274C"
                          ></path>{" "}
                        </g>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Thủy</p>
                      <div className="flex mb-2 mt-2 ">
                        <svg
                          className="w-4 h-4 text-yellow-300 me-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className="w-4 h-4 text-yellow-300 me-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className="w-4 h-4 text-yellow-300 me-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className="w-4 h-4 text-yellow-300 me-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      </div>
                      <div>Đẹp quá</div>
                      <div className="flex items-center">
                        <div className="flex items-center text-blue-500 font-medium mr-2">
                          <svg
                            className="w-[20px] h-[30px] mr-1"
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
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M12.444 1.35396C11.6474 0.955692 10.6814 1.33507 10.3687 2.16892L7.807 9.00001L4 9.00001C2.34315 9.00001 1 10.3432 1 12V20C1 21.6569 2.34315 23 4 23H18.3737C19.7948 23 21.0208 22.003 21.3107 20.6119L22.9773 12.6119C23.3654 10.7489 21.9433 9.00001 20.0404 9.00001H14.8874L15.6259 6.7846C16.2554 4.89615 15.4005 2.8322 13.62 1.94198L12.444 1.35396ZM9.67966 9.70225L12.0463 3.39119L12.7256 3.73083C13.6158 4.17595 14.0433 5.20792 13.7285 6.15215L12.9901 8.36755C12.5584 9.66261 13.5223 11 14.8874 11H20.0404C20.6747 11 21.1487 11.583 21.0194 12.204L20.8535 13H17C16.4477 13 16 13.4477 16 14C16 14.5523 16.4477 15 17 15H20.4369L20.0202 17H17C16.4477 17 16 17.4477 16 18C16 18.5523 16.4477 19 17 19H19.6035L19.3527 20.204C19.2561 20.6677 18.8474 21 18.3737 21H8V10.9907C8.75416 10.9179 9.40973 10.4221 9.67966 9.70225ZM6 11H4C3.44772 11 3 11.4477 3 12V20C3 20.5523 3.44772 21 4 21H6V11Z"
                                fill="#1640D6"
                              ></path>
                            </g>
                          </svg>

                          <p>Thích</p>
                        </div>
                        <p className="mr-2 text-gray-400">|</p>
                        <p className="text-gray-400">Ngày 21-11-2003</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
