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
import { createComment, getComments } from "../services/comments";
export default function ProductDetail() {
  const [product, setProduct] = useState([]);
  const { id: productId } = useParams();
  const [reload, setReload] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const cancelButtonRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [comments, setComments] = useState([]);
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

      setReview({
        idProduct: productId,
        rating: rating,
        username: "",
        phone: "",
        content: ""
      });
      setOpenAdd(false);
      setReload()
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
    quantityDB: '',
    color: "",
    idProduct: "",
    idProductDetail: "",
    nameCategory: "",
    imageProductDetail: "",
    id_Promotion: "",
    gift: "",
    imageGift: "",
    discount: "",
  });
  //  get list Products details
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
            id_Promotion: productDetails.product_promotion[0]?.id || null,
            gift: productDetails.product_promotion[0]?.gift || null,
            imageGift: productDetails.product_promotion[0]?.image || null,
            discount: productDetails.product_detail[0]?.discount || null,
          });
        }

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
    const fetchComments = async () => {
      const listcomments = await getComments(productId);
      setComments(listcomments);
      console.log("123", listcomments);
    };
    fetchComments();
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
      quantityDB: isActivePhone.quantity
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

  const navigate = useNavigate();
  const addToCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = storedCart.findIndex(
      (product) =>
        product.name === selectedProduct.name &&
        product.capacity === selectedProduct.capacity &&
        product.color === selectedProduct.color
    );
    console.log(existingIndex);
    if (existingIndex !== -1) {
      // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên
      if (storedCart[existingIndex].quantity == storedCart[existingIndex].quantityDB) {
        // navigate("/cart");
      }
      else {
        storedCart[existingIndex].quantity =
          (storedCart[existingIndex].quantity || 1) + 1;
      }

    } else {
      // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm mới vào
      storedCart.push({ ...selectedProduct, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(storedCart));
    // alert("Product added to cart!");
    // navigate("/cart");
    console.log("local", selectedProduct);
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
                      className={`w-12 h-12 rounded-md cursor-pointer ${isActivePhone.id === detail.id
                        ? "border-2 border-blue-500"
                        : ""
                        }`}
                      onClick={() => setisActivePhone(detail)}
                    />
                  ))}
              </div>
              <div className="mt-3 pl-5">
                <div className="flex items-center mb-2">
                  <svg
                    width="40px"
                    height="40px"
                    viewBox="0 0 1024 1024"
                    fill="#E3651D"
                    class="icon"
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
                      <path d="M678.584675 765.172506v157.995691l75.697852 31.505938V723.768586a429.379161 429.379161 0 0 1-75.697852 41.40392zM269.717473 723.768586V953.098138l75.697852-31.505938v-156.419694a429.309162 429.309162 0 0 1-75.697852-41.40392zM511.999 798.78444a428.955162 428.955162 0 0 1-105.993793-13.241974v238.457534L511.999 979.886086 617.992793 1023.998V785.542466A429.025162 429.025162 0 0 1 511.999 798.78444zM511.999 0C308.479398 0 142.903721 165.575677 142.903721 369.097279S308.479398 738.192558 511.999 738.192558s369.097279-165.575677 369.097279-369.097279S715.520602 0 511.999 0z m0 660.198711c-161.345685 0-292.611428-131.265744-292.611428-292.611429 0-161.347685 131.265744-292.613428 292.611428-292.613428s292.611428 131.265744 292.611428 292.613428c0 161.347685-131.263744 292.611428-292.611428 292.611429zM511.999 135.563735c-127.93575 0-232.021547 104.083797-232.021547 232.023547S384.06325 599.606829 511.999 599.606829s232.021547-104.083797 232.021547-232.021547c0-127.93775-104.083797-232.021547-232.021547-232.021547zM607.360814 502.999018L511.999 452.865115 416.639186 502.999018l18.211965-106.183793-77.14785-75.199853 106.617792-15.49397L511.999 209.509591l47.679907 96.611811 106.617792 15.49397-77.14785 75.199853 18.211965 106.183793z"></path>
                    </g>
                  </svg>
                  <p className="pl-2">12 tháng, chính hãng Apple</p>
                </div>
                <div className="flex items-center">
                  <svg
                    fill="#E3651D"
                    width="40px"
                    height="40px"
                    viewBox="0 0 32 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#E3651D"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <title>box-open-heart</title>{" "}
                      <path d="M30.236 12.816c-0.003-0.021-0.017-0.037-0.021-0.057-0.053-0.173-0.115-0.321-0.19-0.461l0.007 0.014c-0.054-0.073-0.114-0.137-0.179-0.194l-0.001-0.001c-0.038-0.047-0.077-0.089-0.118-0.128l-0.001-0.001c-0.012-0.009-0.028-0.010-0.040-0.018-0.064-0.038-0.138-0.072-0.215-0.099l-0.009-0.003c-0.067-0.034-0.146-0.064-0.228-0.085l-0.008-0.002c-0.015-0.003-0.027-0.013-0.043-0.016l-8-1.23c-0.058-0.010-0.125-0.015-0.193-0.015-0.69 0-1.25 0.56-1.25 1.25 0 0.625 0.458 1.142 1.057 1.235l0.007 0.001 0.441 0.068-5.251 0.909-5.251-0.909 0.441-0.068c0.609-0.090 1.072-0.61 1.072-1.237 0-0.69-0.56-1.25-1.25-1.25-0.072 0-0.142 0.006-0.21 0.018l0.007-0.001-8 1.23c-0.017 0.003-0.029 0.014-0.046 0.017-0.084 0.022-0.157 0.050-0.226 0.083l0.007-0.003c-0.091 0.031-0.17 0.067-0.244 0.111l0.006-0.003c-0.012 0.008-0.028 0.009-0.040 0.018-0.042 0.040-0.081 0.082-0.117 0.126l-0.002 0.002c-0.067 0.058-0.126 0.122-0.178 0.192l-0.002 0.003c-0.035 0.057-0.067 0.124-0.093 0.194l-0.003 0.008c-0.035 0.070-0.065 0.151-0.086 0.236l-0.002 0.008c-0.004 0.021-0.018 0.037-0.021 0.058l-1 6.75c-0.009 0.055-0.013 0.119-0.013 0.183 0 0.602 0.425 1.104 0.991 1.223l0.008 0.001 1.001 0.205v7.315c0 0 0 0.001 0 0.001 0 0.635 0.474 1.16 1.089 1.239l0.006 0.001 12 1.506c0.047 0.006 0.101 0.010 0.155 0.010s0.109-0.004 0.162-0.010l-0.006 0.001 12.001-1.506c0.62-0.080 1.094-0.604 1.094-1.239 0-0 0-0.001 0-0.001v0-7.315l1-0.205c0.575-0.121 1-0.623 1-1.225 0-0.065-0.005-0.128-0.014-0.19l0.001 0.007zM27.951 14.45l0.639 4.312-8.855 1.813-1.94-4.366zM3.41 18.762l0.639-4.312 10.157 1.758-1.94 4.366zM5.25 21.691l7.499 1.534c0.074 0.016 0.16 0.025 0.248 0.025 0.507 0 0.944-0.301 1.143-0.734l0.003-0.008 0.607-1.367v7.442l-9.5-1.193zM26.75 27.391l-9.5 1.193v-7.442l0.607 1.367c0.2 0.441 0.636 0.742 1.143 0.742h0c0.001 0 0.002 0 0.002 0 0.088 0 0.173-0.009 0.256-0.027l-0.008 0.001 7.5-1.534zM15.014 11.137c0.23 0.254 0.56 0.413 0.928 0.413s0.699-0.159 0.927-0.412l0.001-0.001 3.591-3.982c0.808-0.746 1.312-1.81 1.312-2.991 0-0.337-0.041-0.665-0.119-0.979l0.006 0.028c-0.355-1.288-1.349-2.281-2.61-2.631l-0.026-0.006c-0.288-0.077-0.618-0.12-0.959-0.12-0.795 0-1.534 0.239-2.148 0.65l0.014-0.009c-0.546-0.333-1.206-0.53-1.912-0.53-1.049 0-1.996 0.435-2.671 1.135l-0.001 0.001c-0.707 0.68-1.146 1.633-1.146 2.69 0 1.083 0.461 2.058 1.198 2.739l0.002 0.002zM13.114 3.469c0.235-0.236 0.555-0.386 0.91-0.4l0.003-0c0.412 0.020 0.776 0.209 1.029 0.497l0.001 0.002c0.23 0.218 0.541 0.352 0.884 0.352s0.654-0.134 0.884-0.352l-0.001 0.001c0.303-0.368 0.759-0.602 1.27-0.602 0.1 0 0.197 0.009 0.292 0.026l-0.010-0.001c0.422 0.121 0.748 0.447 0.867 0.86l0.002 0.009c0.016 0.086 0.025 0.184 0.025 0.285 0 0.51-0.234 0.965-0.6 1.265l-0.003 0.002-0.043 0.047-2.684 2.976-2.729-3.022c-0.3-0.262-0.49-0.642-0.498-1.067l-0-0.001c0.020-0.344 0.169-0.651 0.399-0.874l0-0z"></path>{" "}
                    </g>
                  </svg>
                  <div className="pl-2">
                    <p>TT gói sản phẩm:</p>
                    <p className="text-sm text-gray-700">{item.name}, cáp sạc USB-C</p>
                  </div>
                </div>
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
                      className={`flex-1 px-5 hover:bg-gray-300 rounded-md py-2 ${selectedOption === item.capacity ? "bg-gray-300" : ""
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
                          className={`w-14 h-14 rounded-lg ${isActivePhone.id === detail.id
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
              <p>số lượng: {isActivePhone ? isActivePhone.quantity : 0}</p>
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
                      <p className="pl-2">
                        Tặng ngay 1 {promotion.gift} trị giá 2.000.000 đ
                      </p>
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

          <div>
            <div className="flex mt-20   justify-center ">
              <button
                className={`py-2 px-4 font-bold text-2xl ${activeTab === 1 ? "text-cyan-600" : "text-black"
                  }`}
                onClick={() => changeTab(1)}
              >
                Thông tin sản phẩm
              </button>
              <button
                className={`py-2 px-4  font-bold text-2xl ${activeTab === 2 ? "text-cyan-600 " : "text-black"
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
                    {comments.length === 0 ? (
                      <p className="text-lg">Sản phẩm này chưa có đánh giá.</p>
                    ) : (
                      comments.map((comment) => (
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
                            <p className="font-semibold text-lg">{comment.username}</p>
                            <div className="flex mb-2 mt-2 ">
                              {Array.from({ length: 5 }).map((_, index) => (
                                <svg
                                  key={index}
                                  className={`w-6 h-6  ${index < comment.rating
                                    ? "text-yellow-500"
                                    : "text-gray-400"
                                    } me-1`}
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 22 20"

                                >
                                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>

                              ))}
                            </div>

                            <hr />
                            <div>{comment.content}</div>
                            <hr />
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
                              <p className="text-gray-400">
                                {moment(comment.createdAt).format("DD-MM-YYYY hh:mm:ss")}
                              </p>
                            </div>
                          </div>
                        </div>
                      )))}


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