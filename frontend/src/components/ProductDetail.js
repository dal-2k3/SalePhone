import { Fragment, useEffect, useRef, useState } from "react";
import {
  NavLink,
  unstable_HistoryRouter,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import moment from "moment";
import {
  getProductDetail,
  getProductsByCategory,
} from "../services/products/product";
import { DOMAIN } from "../utils/settings/config";
import { createComment } from "../services/comments";
export default function ProductDetail() {
  const [product, setProduct] = useState([]);
  const { id: productId } = useParams();
  const [reload, setReload] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const cancelButtonRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState("");

  const [rating, setRating] = useState(0);
  const handleChangeStar = (value) => {
    setRating(value);
    setReview((prevReview) => ({
      ...prevReview,
      rating: value.toString(), // Chuyển đổi giá trị sang chuỗi nếu cần
    }));
  };
  const [review, setReview] = useState({
    idProduct: productId,
    rating: rating,
    username: "",
    phone: "",
    content: "",
  });
  const handleChangeReview = (e) => {
    const { name, value } = e.target;
    setReview((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
    // Ở đây bạn có thể gửi giá trị rating lên server hoặc xử lý nó theo ý muốn
  };
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("comment", review);
      await createComment(review);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelectOption = (capacity) => {
    setSelectedOption(capacity);
  };

  const [productDetail, setProductDetail] = useState([]);
  const [isActivePhone, setisActivePhone] = useState();

  const [activeTab, setActiveTab] = useState(1);

  const changeTab = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  const [selectedProduct, setSelectedProduct] = useState({
    name: "",
    price: "",
    capacity: "",
    color: "",
    idProduct: "",
    idProductDetail: "",
    nameCategory: "",
    imageProductDetail: "",
    idGift: "",
    gift: "",
    imageGift: "",
    discount: "",
  });
  //  get list Products details
  const [viewRating, setViewRating] = useState([]);
  useEffect(() => {
    const fetchProductsDetails = async () => {
      try {
        const productsDetailsData = await getProductDetail(productId);
        console.log("product", productsDetailsData);

        if (productsDetailsData && productsDetailsData.length > 0) {
          const productDetails = productsDetailsData[0];

          setSelectedProduct({
            ...selectedProduct,
            idProduct: productDetails.id,
            name: productDetails.name,
            capacity: productDetails.capacity,
            nameCategory: productDetails.Categorie.name,
            idGift: productDetails.product_promotion[0]?.gift || null,
            gift: productDetails.product_promotion[0]?.gift || null,
            imageGift: productDetails.product_promotion[0]?.image || null,
            discount: productDetails.product_detail[0]?.discount || null,
          });
        }
        // const starsArray = Array(4).fill(null);
        // const starsArray = Array(productsDetailsData[0].comment.rating).fill(null);
        // setViewRating(Array(productsDetailsData[0].comment.rating).fill(null))

        const allDetail = productsDetailsData.reduce(
          (acc, curr) => [
            ...acc,
            ...curr.product_detail.map((detail) => detail),
          ],
          []
        );
        setProductDetail(allDetail);
        console.log("detail", allDetail);

        const capacitydefault = productsDetailsData.map(
          (item) => item.capacity
        );
        setSelectedOption(capacitydefault[0]); // Chọn phần tử đầu tiên

        const productByCategory = await getProductsByCategory(
          productsDetailsData.map((item) => item.idCategory)
        );
        console.log("idcategory", productByCategory);
        const newProduct = productsDetailsData.map((item) => ({
          ...item,
          category: [...productByCategory],
        }));
        console.log("nối", newProduct);
        setProduct(newProduct);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductsDetails();
  }, [productId, reload]);

  useEffect(() => {
    if (!productDetail) return;
    setisActivePhone(productDetail[0]);
  }, [productDetail]);
  useEffect(() => {
    if (!isActivePhone) return;
    setSelectedProduct({
      ...selectedProduct,
      color: isActivePhone.color,
      idProductDetail: isActivePhone.id,
      price: isActivePhone.price,
      imageProductDetail: isActivePhone.image,
    });
  }, [isActivePhone]);

  const productNameToFind = product[0]?.name;
  const filteredArray = product.map((item) =>
    item.category.filter((category) => category.name === productNameToFind)
  );
  console.log("filter", filteredArray);

  const handlePrev = () => {
    const index = productDetail.findIndex(
      (item) => item.id === isActivePhone.id
    );
    console.log(index);
    console.log(productDetail.length);
    if (index === 0) return;
    setisActivePhone(productDetail[index - 1]);
  };

  const handleNext = () => {
    const index = productDetail.findIndex(
      (item) => item.id === isActivePhone.id
    );
    console.log(index);
    console.log(productDetail.length);
    if (index + 1 === productDetail.length) return;

    setisActivePhone(productDetail[index + 1]);
  };
  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  console.log("sadv", selectedOption);

  console.log("product", product);
  console.log("dung luong", selectedOption);
  console.log(isActivePhone);

  console.log("local", selectedProduct);
  console.log("viewRating", viewRating);
  const navigate = useNavigate();
  const addToCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = storedCart.findIndex(
      (product) =>
        product.name === selectedProduct.name &&
        product.capacity === selectedProduct.capacity &&
        product.color === selectedProduct.color
    );

    if (existingIndex !== -1) {
      // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên
      storedCart[existingIndex].quantity =
        (storedCart[existingIndex].quantity || 1) + 1;
    } else {
      // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm mới vào
      storedCart.push({ ...selectedProduct, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(storedCart));
    // alert("Product added to cart!");
    navigate("/cart");
  };

  useEffect(() => {
    const storedProduct = localStorage.getItem("selectedProduct");

    if (storedProduct) {
      setSelectedProduct(JSON.parse(storedProduct));
    }
  }, []);

  return (
    <div className="pt-20">
      {product.map((item) => (
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
                              {isActivePhone && (
                                <img
                                  src={`${DOMAIN}${isActivePhone.image}`}
                                  alt={`${isActivePhone.image}`}
                                  width={"100px"}
                                />
                              )}
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
                                      ? "text-yellow-500 text-5xl cursor-pointer hover:transform scale-120 transition-transform duration-200"
                                      : "text-gray-300 text-5xl cursor-pointer hover:transform scale-120 transition-transform duration-200"
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
                                required
                              ></textarea>
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
                                    placeholder="Nhập họ và tên (bắt buộc..)"
                                    required
                                  />
                                </div>
                                <div>
                                  <label htmlFor="" className="font-normal">
                                    Số điện thoại mua hàng:
                                  </label>

                                  <input
                                    name="phone"
                                    value={review.phone}
                                    onChange={handleChangeReview}
                                    className="border w-full h-[40px]   rounded border-slate-300"
                                    type="number"
                                    placeholder="Nhập số điện thoại(bắt buộc..)"
                                    required
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
              <div className="relative mb-4 h-[400px] flex items-center justify-center">
                {isActivePhone && (
                  <img
                    src={`${DOMAIN}${isActivePhone.image}`}
                    alt={`Product Image`}
                    className="w-auto h-full rounded-lg object-cover"
                  />
                )}
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
                  disabled={
                    isActivePhone &&
                    productDetail.findIndex(
                      (item) => item.id === isActivePhone.id
                    ) +
                      1 ===
                      productDetail.length
                  }
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
                {isActivePhone &&
                  productDetail.map((detail, index) => (
                    <img
                      key={index}
                      src={`${DOMAIN}${detail.image}`}
                      alt={`Thumbnail ${index + 1}`}
                      className={`w-12 h-12 rounded-md cursor-pointer ${
                        isActivePhone.id === detail.id
                          ? "border-2 border-blue-500"
                          : ""
                      }`}
                      onClick={() => setisActivePhone(detail)}
                    />
                  ))}
              </div>
            </div>

            <div className=" w-[55%]   h-auto ">
              <div>
                <p className="font-bold text-xl   ">
                  {item.name} {item.capacity}
                </p>
              </div>
              <div className="flex items-center my-2">
                <p className="text-[#fd475a] font-bold mr-2 text-2xl">
                  {isActivePhone ? `${formatPrice(isActivePhone.price)} đ` : 0}
                </p>
                <p className="text-gray-500 font-bold line-through mr-2">
                  {isActivePhone
                    ? `${formatPrice(isActivePhone.discount)} đ`
                    : 0}
                </p>
                <p className="mr-2">|</p>
                <p className="text-base italic text-gray-700 ">
                  Giá đã bao gồm VAT
                </p>
              </div>
              <div className="rounded-lg bg-red-500 flex justify-center items-center uppercase">
                <svg
                  fill="#fff"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  // xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="45px"
                  height="45px"
                  viewBox="0 0 256 140"
                  enable-background="new 0 0 256 140"
                  // xml:space="preserve"
                  stroke="#fff"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path d="M103.123,97.792c-11.112,0-20.104,8.992-20.104,20.104S92.011,138,103.123,138c11.112,0,20.104-8.992,20.104-20.104 S114.235,97.792,103.123,97.792z M103.123,125.597c-4.221,0-7.7-3.479-7.7-7.7c0-4.221,3.479-7.7,7.7-7.7c4.221,0,7.7,3.479,7.7,7.7 C110.823,122.117,107.344,125.597,103.123,125.597z M215.766,97.936c-11.112,0-20.104,8.992-20.104,20.104 s8.992,20.104,20.104,20.104c11.112,0,20.104-8.992,20.104-20.104S226.878,97.936,215.766,97.936z M215.766,125.74 c-4.221,0-7.7-3.479-7.7-7.7c0-4.221,3.479-7.7,7.7-7.7c4.221,0,7.7,3.479,7.7,7.7C223.467,122.261,219.987,125.74,215.766,125.74z M57,106.678c0,3.898,3.486,7.24,7.384,7.24h10.438c0.804,0,1.593-1.009,1.74-1.74c2.193-12.574,13.33-21.259,26.562-21.259 s24.198,8.721,26.391,21.295c0.146,0.804,0.682,1.463,1.486,1.463h20v-111H57V106.678z M252.26,99.132h-4.349V79.997 c0-6.433-4.801-11.307-11.307-11.307h-20.875c-0.439,0-0.956-0.233-1.249-0.525l-32.532-31.665c-1.462-1.462-2.829-2.747-4.949-2.82 h-19v80h30c0.804,0,1.489-0.768,1.635-1.499c2.193-12.574,12.899-22.115,26.131-22.115c13.232,0,24.198,9.577,26.391,22.151 c0.146,0.804,1.471,1.704,2.275,1.704h1.74c4.167,0,7.828-3.751,7.828-7.845v-5.41C254,99.86,253.138,99.132,252.26,99.132z M199.203,68.689H168.76c-0.877,0-1.74-0.862-1.74-1.74L167,44.364c0-0.877,0.882-1.769,1.76-1.769h6.089 c0.439,0,1.325,0.483,1.691,0.775l23.534,22.71C200.95,67.176,200.592,68.689,199.203,68.689z M47,49.678H14v-8h33V49.678z M47,71.678H2v8h45V71.678z M47,56.678H9v8h38V56.678z"></path>{" "}
                  </g>
                </svg>
                <p className="text-white">Miễn phí vận chuyển</p>
              </div>
              {/* //capacity */}
              <div>
                <div className="xl:flex mt-4 justify-center bg-gray-100 rounded-lg">
                  {filteredArray.flat().map((item) => (
                    <NavLink
                      key={item.id}
                      to={`/product_detail/${item.id}`}
                      className={`flex-1 px-5 hover:bg-gray-300 rounded-md py-2 ${
                        selectedOption === item.capacity ? "bg-gray-300" : ""
                      }`}
                      onClick={() => handleSelectOption(item.capacity)}
                    >
                      <div className="">
                        <div className="flex items-center justify-center">
                          <input
                            type="radio"
                            checked={item.capacity === selectedOption}
                            onChange={() => handleSelectOption(item.capacity)}
                          />
                          <p className="text-lg font-semibold flex justify-center">
                            {item.capacity}
                          </p>
                        </div>
                      </div>
                    </NavLink>
                  ))}
                </div>
              </div>
              {/* color */}
              <div>
                <div className="max-w-md  mt-8 flex">
                  {isActivePhone &&
                    productDetail.map((detail, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setisActivePhone(detail);
                        }}
                        className="items-center mx-4 cursor-pointer p-1 flex flex-col "
                        // className={`items-center mx-4 cursor-pointer p-1 flex flex-col ${
                        //   isActivePhone.id === detail.id
                        //     ? "border-2 border-red-300"
                        //     : "border"
                        // }`}
                      >
                        <div
                          className={`w-14 h-14 rounded-lg ${
                            isActivePhone.id === detail.id
                              ? "border-2 border-red-300"
                              : ""
                          }`}
                          style={{ backgroundColor: detail.color }}
                        >
                          <img
                            src={`${DOMAIN}${detail.image}`}
                            alt={`Color ${detail.color}`}
                            className="w-full h-full object-cover py-1 px-1"
                          />
                        </div>
                        <div className="ml-2">
                          <p
                          // className={`${
                          //   isActivePhone.id === detail.id
                          //     ? "text-red-300"
                          //     : ""
                          // }`}
                          >
                            {detail.color}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="mt-3">
                <div className="text-center bg-red-500 py-1  rounded-t-lg text-white uppercase text-sm ">
                  ưu đãi đặc biệt
                </div>
                <div className="flex items-center justify-center py-2 bg-white rounded-b-lg border">
                  <svg
                    fill="#D71313"
                    width="20px"
                    height="20px"
                    viewBox="0 0 512 512"
                    version="1.1"
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
                      <g id="gift_box-box_-heart-love-valentine">
                        {" "}
                        <path d="M408,160h-64c15.55-0.021,28.483-12.719,28.504-28.269c0.021-15.55-12.568-28.139-28.118-28.118 c0.023-17.486-15.9-31.228-34.048-27.504C297.124,78.82,288,91.085,288,104.575v5.667c-4.256-3.838-9.831-6.242-16-6.242h-32 c-6.169,0-11.744,2.404-16,6.242v-5.667c0-13.491-9.124-25.755-22.339-28.467c-18.148-3.724-34.071,10.018-34.048,27.504 c-15.549-0.021-28.138,12.568-28.118,28.118C139.517,147.281,152.45,159.979,168,160h-64c-17.673,0-32,14.327-32,32v8 c0,17.673,14.327,32,32,32h96v16H96v161.28c0,16.966,13.754,30.72,30.72,30.72H200c8.837,0,16-7.163,16-16V168h80v256 c0,8.837,7.163,16,16,16h73.28c16.966,0,30.72-13.754,30.72-30.72V248H312v-16h96c17.673,0,32-14.327,32-32v-8 C440,174.327,425.673,160,408,160z M232,152v-24c0-4.41,3.586-8,8-8h32c4.414,0,8,3.59,8,8v24H232z"></path>{" "}
                      </g>{" "}
                      <g id="Layer_1"></g>{" "}
                    </g>
                  </svg>
                  <p>Bảo hành lên tới 2 năm</p>
                </div>
              </div>
              <div className="mt-3 p-3 bg-gray-100 border ">
                <p className="text-lg pb-1">Khuyến mãi đặc biệt</p>
                <hr className="border mb-1" />
                <div>
                  {item.product_promotion.map((promotion) => (
                    <div className="flex pb-2 items-center " key={promotion.id}>
                      <svg
                        width="20px"
                        height="20px"
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
                            d="M3 12L9 18L21 6"
                            stroke="#36AE7C"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                      <div className="pl-2 w-[100px] h-auto">
                        {" "}
                        <img
                          src={`${DOMAIN}${promotion.image}`}
                          alt="anh khuyen mai"
                        />
                      </div>
                      <p className="pl-2">Tặng ngay 1 {promotion.gift} trị giá 2.000.000 đ</p>
                    </div>
                  ))}

                  <div className="flex pb-2">
                    <svg
                      width="20px"
                      height="20px"
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
                          d="M3 12L9 18L21 6"
                          stroke="#36AE7C"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                    <p>Giảm ngay 500,000đ áp dụng đến 04/12</p>
                  </div>
                  <div className="flex">
                    <svg
                      width="20px"
                      height="20px"
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
                          d="M3 12L9 18L21 6"
                          stroke="#36AE7C"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                    <p>
                      Mua Sim MobiFone Chất Chơi 1T kèm máy điện thoại giảm ngay
                      100.000đ, có ngay 5GB data/ ngày
                    </p>
                  </div>
                </div>
              </div>
              {/* mua ngay */}
              <div>
                <button
                  onClick={addToCart}
                  className="bg-orange-500 text-white font-semibold w-full rounded-lg mt-6 py-2 px-4"
                >
                  Mua Ngay
                </button>
              </div>
              {/* tư vấn  */}
              <div className="flex mt-4 items-center">
                <div className="flex bg-blue-50 px-2 py-1 items-center mr-5 rounded">
                  <img
                    src="https://www.mainguyen.vn/static/images/icons/toolbar/ico-zalo.png"
                    alt=""
                    className="pr-2 w-[40px] h-[30px]"
                  />
                  <p>Chat tư vấn ngay</p>
                </div>
                <div>
                  <p>
                    Gọi <span className="text-red-500">0981.200.888</span> để
                    được tư vấn mua hàng
                  </p>
                </div>
              </div>
              {/* san pham tang kem  */}
            </div>
          </div>

          {/* parameter review */}

          <div div>
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
                <div className="p-4 bg-gray-100">
                  <div dangerouslySetInnerHTML={{ __html: item.parameter }} />
                </div>
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
                    {item.comments &&
                      item.comments.map((comment) => (
                        <div key={comment.id} className="flex  mb-5">
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
                            <p className="font-semibold text-lg">
                              {comment.username}
                            </p>
                            <div className="flex mb-2 mt-2 ">
                              {Array.from({ length: 5 }).map((_, index) => (
                                <svg
                                  key={index}
                                  className={`w-8 h-8 ${
                                    index < comment.rating
                                      ? "text-yellow-300"
                                      : "text-gray-300"
                                  } me-1`}
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 22 20"
                                >
                                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                              ))}

                              {/* <svg
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
                            </svg> */}
                              {/* <svg
                                className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                              >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                              </svg> */}
                            </div>
                            <div>{comment.content}</div>
                            <div className="flex items-center">
                              <div className="flex items-center text-blue-500 font-medium mr-2">
                                <svg
                                  className="w-[20px] h-[30px] mr-1"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g
                                    id="SVGRepo_bgCarrier"
                                    stroke-width="0"
                                  ></g>
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
                              <p className="text-gray-400">
                                {moment(comment.createdAt).format(
                                  "DD-MM-YYYY hh:mm:ss"
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
