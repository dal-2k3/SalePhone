// import Swiper JS
import { useEffect, useState } from "react";
// import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// const swiper = new Swiper('.swiper', {
//   // configure Swiper to use modules
//   modules: [Navigation, Pagination],

// });
import "swiper/swiper-bundle.css";
import { listCategories } from "../services/categories/categories";
import { DOMAIN } from "../utils/settings/config";
import { NavLink } from "react-router-dom";
import { listProducts } from "../services/products/product";
export default function Home() {
  const products2 = [
    {
      id: 1,
      name: "Iphone 15 Pro (128GB) - Chính hãng VN/A",
      capacity: "128G",
      price: "10.000.000",
      discount: "12.000.000",
      image:
        "https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/15-Pro-3.jpg",
    },
    {
      id: 2,
      name: "Iphone 15 Pro Max (128GB) - Chính hãng VN/A",
      capacity: "256G",
      price: "12.000.000",
      discount: "14.000.000",
      image:
        "https://bizweb.dktcdn.net/100/116/615/products/refurb-iphone-13-pro-max-gold-2023-jpeg.jpg?v=1680336505547",
    },
    {
      id: 3,
      name: "Iphone 13 (128GB) - Chính hãng VN/A",
      capacity: "512G",
      price: "15.000.000₫",
      discount: "17.000.000₫",
      image:
        "https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-thumbnew-600x600.jpg",
    },
    {
      id: 4,
      name: "Iphone 14 Pro (128GB) - Chính hãng VN/A",
      capacity: "512G",
      price: "13.000.000₫",
      discount: "15.000.000₫",
      image:
        "https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/15-Pro-3.jpg",
    },
    {
      id: 5,
      name: "Iphone 11 Pro (256GB) - Chính hãng VN/A",
      capacity: "512G",
      price: "15.000.000₫",
      discount: "17.000.000₫",
      image:
        "https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/15-Pro-3.jpg",
    },
    {
      id: 6,
      name: "Iphone 16 Pro",
      capacity: "512G",
      price: "15.000.000₫",
      discount: 10,
      image:
        "https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/15-Pro-3.jpg",
    },
    {
      id: 7,
      name: "Iphone 17 Pro",
      capacity: "512G",
      price: "15.000.000₫",
      discount: 10,
      image:
        "https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/15-Pro-3.jpg",
    },
    {
      id: 8,
      name: "Iphone 18 Pro",
      capacity: "512G",
      price: "15.000.000₫",
      discount: 10,
      image:
        "https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/15-Pro-3.jpg",
    },
    {
      id: 9,
      name: "Iphone 19 Pro",
      capacity: "512G",
      price: "15.000.000₫",
      discount: 10,
      image:
        "https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/15-Pro-3.jpg",
    },
    {
      id: 10,
      name: "Iphone 20 Pro",
      capacity: "512G",
      price: "15.000.000₫",
      discount: 10,
      image:
        "https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/15-Pro-3.jpg",
    },
  ];

  const [reload, setReload] = useState(false);
  const [categories, setcategories] = useState([0]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await listCategories();
        setcategories(categoriesData);
      } catch (error) {
        // Xử lý lỗi nếu cần
      }
    };
    fetchCategories();
  }, [reload]);

  //all product
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await listProducts();
        // console.log(productsData);
        setProducts(productsData);
      } catch (error) {
        // Xử lý lỗi nếu cần
        console.log(error);
      }
    };
    fetchProducts();
  }, [reload]);
  console.log(products);
  const iphone = "IPHONE";
  const filteredArrayIphone = products.filter(
    (item) => item.Categorie.name == iphone
  );
  console.log("filter", filteredArrayIphone);
  const samsung = "SAMSUNG";
  const filteredArraySamsung = products.filter(
    (item) => item.Categorie.name == samsung
  );
  console.log("filter", filteredArraySamsung);

  const [startIndex, setStartIndex] = useState(0);
  const [productsToShow, setProductsToShow] = useState([]);
  useEffect(() => {
    const getProductsToShow = () => {
      const endIndex = (startIndex + 5) % products2.length;
      if (endIndex >= startIndex) {
        return products2.slice(startIndex, endIndex);
      } else {
        return [
          ...products2.slice(startIndex, products2.length),
          ...products2.slice(0, endIndex),
        ];
      }
    };

    setProductsToShow(getProductsToShow());
  }, [startIndex, products.length]);

  const nextSlide = () => {
    setStartIndex((startIndex + 1) % products.length);
  };

  const prevSlide = () => {
    const newStartIndex = (startIndex - 1 + products.length) % products.length;
    setStartIndex(newStartIndex);
  };
  // BACK_TOP
  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return (
    <section className="mt-5 sm:w-full">
      <div className="lg:grid max-w-[95%] lg:grid-cols-3 mx-auto lg:gap-4  sm:grid sm:grid-flow-row sm:grid-row-3 pt-12 ">
        <div className="lg:col-span-2">
          <div
            id="indicators-carousel"
            className="relative w-full h-full"
            data-carousel="static"
          >
            <div className="relative lg:h-full overflow-hidden rounded-lg sm:h-96 ">
              <div
                class="hidden duration-700 ease-in-out "
                data-carousel-item="active"
              >
                <img
                  src="https://img.meta.com.vn/Data/2020/Thang12/giang-sinh-720x445.png"
                  className="cover absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover"
                  alt="..."
                />
              </div>

              <div class="hidden duration-700 ease-in-out" data-carousel-item>
                <img
                  src="https://stcv4.hnammobile.com/contents/800x420.jpg"
                  className="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover"
                  alt="..."
                />
              </div>

              <div class="hidden duration-700 ease-in-out" data-carousel-item>
                <img
                  src="https://baotinmobile.vn/uploads/2023/03/sl-iphone-14-promax.jpg.webp"
                  className="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover"
                  alt="..."
                />
              </div>

              <div class="hidden duration-700 ease-in-out" data-carousel-item>
                <img
                  src="https://baotinmobile.vn/uploads/2023/09/banner-15.jpg.webp"
                  class="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  alt="..."
                />
              </div>

              <div class="hidden duration-700 ease-in-out" data-carousel-item>
                <img
                  src="https://clevertech.vn/wp-content/uploads/2023/10/banner-clv-thang8202312-iphone152.png"
                  class="absolute block w-full  h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover"
                  alt="..."
                />
              </div>
            </div>

            <div class="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
              <button
                type="button"
                class="w-3 h-3 rounded-full"
                aria-current="true"
                aria-label="Slide 1"
                data-carousel-slide-to="0"
              ></button>
              <button
                type="button"
                class="w-3 h-3 rounded-full"
                aria-current="false"
                aria-label="Slide 2"
                data-carousel-slide-to="1"
              ></button>
              <button
                type="button"
                class="w-3 h-3 rounded-full"
                aria-current="false"
                aria-label="Slide 3"
                data-carousel-slide-to="2"
              ></button>
              <button
                type="button"
                class="w-3 h-3 rounded-full"
                aria-current="false"
                aria-label="Slide 4"
                data-carousel-slide-to="3"
              ></button>
              <button
                type="button"
                class="w-3 h-3 rounded-full"
                aria-current="false"
                aria-label="Slide 5"
                data-carousel-slide-to="4"
              ></button>
            </div>

            <button
              type="button"
              class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-prev
            >
              <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg
                  class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
                <span class="sr-only">Previous</span>
              </span>
            </button>
            <button
              type="button"
              class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-next
            >
              <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg
                  class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span class="sr-only">Next</span>
              </span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-1  lg:grid grid-rows-2 grid-flow-col gap-4">
          <div className="bg-red-500 border rounded-3xl flex items-center justify-between px-10">
            <div className="text-white py-2">
              <p className="text-xl font-medium uppercase">Oppo</p>
              <p className="text-sm">Phản hồi tức thì</p>
              <p className="text-2xl mb-1">Giữ nhịp vui cuộc sống</p>
              <button class="py-1 px-3 rounded-full bg-blue-400 text-white font-bold transition duration-500 transform hover:bg-blue-300 hover:scale-110 active:bg-blue-700 active:scale-98 focus:outline-none">
                Mua ngay
              </button>
            </div>
            <div className="w-[120px] h-[120px]">
              <img
                src="https://www.oppo.com/content/dam/oppo/product-asset-library/find/find-n2-series/global/find-n2-flip/v1/assets/images-pet-en-keepFlow-1.png.webp"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="bg-yellow-300 border rounded-3xl flex items-center justify-between px-10 sm:mt-2 ">
            <div className="text-white py-2">
              <p className="text-xl font-medium uppercase ">SAMSUNG</p>

              <p className="text-sm">GALAXY S23 ULTRA </p>
              <p className="text-2xl mb-1 ">
                “Tân vương của điện thoại camera”
              </p>
              <button class="py-1 px-3 rounded-full bg-blue-400 text-white font-bold transition duration-500 transform hover:bg-blue-300 hover:scale-110 active:bg-blue-700 active:scale-98 focus:outline-none">
                Mua ngay
              </button>
            </div>
            <div className="w-[120px] h-[120px]">
              <img
                src="https://www.pngall.com/wp-content/uploads/13/Galaxy-S23-Ultra-PNG-HD-Image.png"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      {/* THƯƠNG HIỆU  */}
      <div className="bg-gray-100 mt-4  ">
        <div className="grid max-w-[95%]  px-4  mx-auto">
          <div>
            <h1 className="text-3xl  font-medium py-5 text-red-500 text-center">
              Danh mục thịnh hành
            </h1>
          </div>
          <div className="flex flex-wrap mx-auto items-center w-full justify-between pb-5 ">
            {categories.map((item) => (
              <NavLink
                className=" px-4 flex-1 flex-col drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]"
                to={`/listproducts/${item.id}`}
              >
                <div className="p-4 bg-white h-[100px] rounded-lg ">
                  <img
                    src={`${DOMAIN}${item.logo}`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-center font-medium mt-2 text-lg">
                  {item.name}
                </p>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      {/* có gì mới */}
      <div className="bg-gray-100 ">
        <div>
          <h1 className="text-3xl py-5 font-bold	text-center text-red-500">
            Có gì mới
          </h1>
        </div>
        <div className="grid max-w-[95%]  px-4   mx-auto">
          <div className=" grid grid-cols-2 gap-4">
            <div className="row-span-1 border">
              <a href="">
                <div className="relative inline-block border-box w-full h-full pointer ">
                  <img
                    className="h-full"
                    src="https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/PCD_B5_Whats-new_684X684_pc_alt.jpg?$684_684_JPG$"
                    alt=""
                  />
                  <div className="absolute inline-block top-[24px] left-[24px] z-600">
                    <span className="bg-cyan-500 h-20 px-6 py-2 rounded-full text-xs leading-4 font-semibold text-black  shadow-text-white animate-badge-appear">
                      Mới
                    </span>
                  </div>
                  <div className="absolute text-center z-600 bottom-0 mb-20 left-1/2 transform -translate-x-1/2">
                    <span className="font-bold texl-2xl leading-5 ">
                      Iphone Galaxy
                    </span>
                  </div>
                </div>
              </a>
            </div>
            <div class="col-span-1 grid grid-cols-2 grid-rows-2 gap-4 border ">
              <div className="row-span-1 bg-cyan-300">
                <a href="">
                  <div className="relative inline-block border-box w-full h-full pointer ">
                    <img
                      className="h-full"
                      src="https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/PCD_B5_Whats-new_684X684_pc_alt.jpg?$684_684_JPG$"
                      alt=""
                    />
                    <div className="absolute inline-block top-[24px] left-[24px] z-600">
                      <span className="bg-cyan-500 h-20 px-6 py-2 rounded-full text-xs leading-4 font-semibold text-black  shadow-text-white animate-badge-appear">
                        Mới
                      </span>
                    </div>
                    <div className="absolute text-center z-600 bottom-0 mb-10 left-1/2 transform -translate-x-1/2">
                      <span className="font-bold texl-2xl leading-5 ">
                        Iphone Galaxy
                      </span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="row-span-1 bg-cyan-300">
                {" "}
                <a href="">
                  <div className="relative inline-block border-box w-full h-full pointer ">
                    <img
                      className="h-full"
                      src="https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/PCD_B5_Whats-new_684X684_pc_alt.jpg?$684_684_JPG$"
                      alt=""
                    />
                    <div className="absolute inline-block top-[24px] left-[24px] z-600">
                      <span className="bg-cyan-500 h-20 px-6 py-2 rounded-full text-xs leading-4 font-semibold text-black  shadow-text-white animate-badge-appear">
                        Mới
                      </span>
                    </div>
                    <div className="absolute text-center z-600 bottom-0 mb-10 left-1/2 transform -translate-x-1/2">
                      <span className="font-bold texl-2xl leading-5 ">
                        Iphone Galaxy
                      </span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="row-span-1 bg-cyan-300">
                {" "}
                <a href="">
                  <div className="relative inline-block border-box w-full h-full pointer ">
                    <img
                      className="h-full"
                      src="https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/PCD_B5_Whats-new_684X684_pc_alt.jpg?$684_684_JPG$"
                      alt=""
                    />
                    <div className="absolute inline-block top-[24px] left-[24px] z-600">
                      <span className="bg-cyan-500 h-20 px-6 py-2 rounded-full text-xs leading-4 font-semibold text-black  shadow-text-white animate-badge-appear">
                        Mới
                      </span>
                    </div>
                    <div className="absolute text-center z-600 bottom-0 mb-10 left-1/2 transform -translate-x-1/2">
                      <span className="font-bold texl-2xl leading-5 ">
                        Iphone Galaxy
                      </span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="row-span-1 bg-cyan-300">
                {" "}
                <a href="">
                  <div className="relative inline-block border-box w-full h-full pointer ">
                    <img
                      className="h-full"
                      src="https://images.samsung.com/is/image/samsung/assets/vn/2307/pcd/PCD_B5_Whats-new_684X684_pc_alt.jpg?$684_684_JPG$"
                      alt=""
                    />
                    <div className="absolute inline-block top-[24px] left-[24px] z-600">
                      <span className="bg-cyan-500 h-20 px-6 py-2 rounded-full text-xs leading-4 font-semibold text-black  shadow-text-white animate-badge-appear">
                        Mới
                      </span>
                    </div>
                    <div className="absolute text-center z-600 bottom-0 mb-10 left-1/2 transform -translate-x-1/2">
                      <span className="font-bold texl-2xl leading-5 ">
                        Iphone Galaxy
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            {/* <div class="row-span-2 col-span-2 bg-cyan-300">03</div> */}
          </div>
        </div>
      </div>

      {/* samsung */}
      <div className="bg-gray-100">
        <div className=" grid max-w-[100%]  mx-auto lg:gap-8  lg:pt-10">
          <div className="relative">
            <img
              src="https://www.didongmy.com/vnt_upload/news/12_2022/tinh-nang-moi-cua-galaxy-s23-man-hinh-oled-didongmy.jpg"
              alt=""
              className="w-full h-[500px] object-cover  "
            />
            <div className="absolute bottom-[200px] left-[50px]">
              <a href="">
                <button class="py-2 px-5 rounded-full bg-blue-400 text-white font-bold transition duration-500 transform hover:bg-blue-300 hover:scale-110 active:bg-blue-700 active:scale-98 focus:outline-none">
                  Mua ngay
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className="grid  max-w-[95%] px-4  mx-auto lg:gap-8 py-5 bg-gray-100">
          <div class="grid grid-cols-5 gap-4 xl:px-[100px]">
            {filteredArraySamsung.slice(0, 4).map((item) => (
              <div
                key={item.id}
                class="row-span-1  border border-solid rounded-3xl bg-white  shadow-lg"
              >
                {item.product_detail &&
                  item.product_detail.map((detail, index) => (
                    <div
                      key={index}
                      className="py-8 flex flex-col items-center lg:relative group "
                    >
                      <NavLink to={`/product_detail/${item.id}`}>
                        <div className="mb-4 relative overflow-hidden transition-transform duration-500 ease-in-out transform-gpu group-hover:-translate-y-3">
                          <img
                            className="max-h-[200px]"
                            src={`${DOMAIN}${detail.image}`}
                            alt={`${detail.image}`}
                          />
                        </div>
                      </NavLink>
                      <div className="flex items-center lg:absolute top-[200px] left-0 rounded-r-xl bg-red-600">
                        <svg
                          height="20px"
                          width="20px"
                          version="1.1"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          // xmlns:xlink="http://www.w3.org/1999/xlink"
                          viewBox="0 0 512 512"
                          // xml:space="preserve"
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
                            <path
                              style={{ fill: "#FF5023" }}
                              d="M141.005,339.641H16.696c-5.788,0-11.157-3.082-14.201-7.995c-3.043-4.924-3.32-11.117-0.733-16.29 L31.42,256.02L1.761,196.695c-2.587-5.173-2.31-11.249,0.733-16.174c3.043-4.913,8.413-7.837,14.201-7.837h124.31 c5.978,0,11.5,3.114,14.473,8.299c2.979,5.173,2.962,11.513-0.049,16.677c-10.815,18.566-16.299,38.186-16.299,58.36 s5.484,39.805,16.299,58.37c3.011,5.163,3.027,11.62,0.049,16.794C152.505,336.368,146.983,339.641,141.005,339.641z"
                            ></path>{" "}
                            <path
                              style={{ fill: "#CD2A00" }}
                              d="M495.304,339.641h-124.31c-5.978,0-11.5-3.277-14.473-8.462c-2.978-5.173-2.962-11.595,0.049-16.758 c10.815-18.566,16.299-38.226,16.299-58.4s-5.484-39.826-16.299-58.39c-3.011-5.163-3.027-11.467-0.049-16.641 c2.973-5.185,8.495-8.304,14.473-8.304h124.31c5.788,0,11.157,2.918,14.201,7.831c3.043,4.924,3.32,11.036,0.733,16.209 l-29.658,59.295l29.658,59.305c2.587,5.173,2.31,11.402-0.733,16.326C506.461,336.564,501.092,339.641,495.304,339.641z"
                            ></path>{" "}
                            <path
                              style={{ fill: "#FFDA44" }}
                              d="M253.773,406.261c-82.853,0-148.033-67.402-148.033-150.261S173.147,105.739,256,105.739 S406.261,173.142,406.261,256S336.625,406.261,253.773,406.261z"
                            ></path>{" "}
                            <path
                              style={{ fill: "#FFA733" }}
                              d="M406.261,256c0-82.858-67.408-150.261-150.261-150.261l-2.227,300.521 C336.625,406.261,406.261,338.858,406.261,256z"
                            ></path>{" "}
                            <path
                              style={{ fill: "#FFEB99" }}
                              d="M300.13,333.434c-2.658,0-5.326-0.63-7.771-1.924L256,312.39l-36.359,19.12 c-5.635,2.978-12.446,2.468-17.582-1.261c-5.147-3.739-7.718-10.065-6.647-16.337l6.94-40.478l-29.413-28.684 c-4.549-4.445-6.185-11.076-4.217-17.12c1.962-6.044,7.19-10.446,13.478-11.359l40.647-5.902l18.179-36.837 c2.815-5.695,8.619-9.304,14.973-9.304c6.353,0,12.158,3.608,14.973,9.304l18.179,36.837l40.647,5.902 c6.288,0.913,11.517,5.315,13.478,11.359c1.968,6.044,0.332,12.674-4.217,17.12l-29.413,28.684l6.94,40.478 c1.071,6.272-1.5,12.597-6.647,16.337C307.032,332.358,303.591,333.434,300.13,333.434z"
                            ></path>{" "}
                            <path
                              style={{ fill: "#FFDA44" }}
                              d="M292.357,331.51c2.445,1.293,5.114,1.924,7.772,1.924c3.462,0,6.902-1.076,9.81-3.184 c5.147-3.739,7.718-10.065,6.647-16.337l-6.94-40.478l29.413-28.684c4.549-4.445,6.185-11.076,4.217-17.12 c-1.962-6.044-7.19-10.446-13.478-11.359l-40.647-5.902l-18.179-36.837c-2.815-5.695-8.294-9.304-14.973-9.304v148.162 L292.357,331.51z"
                            ></path>{" "}
                          </g>
                        </svg>
                        <p className=" px-1 py-1  text-white text-xs">
                          Giảm
                          {formatPrice(`${detail.discount - detail.price} ₫`)}
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="mb-2 px-4">
                          <a
                            href={`/product_detail/${item.id}`}
                            className="font-bold text-sm"
                          >
                            {item.name} ({item.capacity}) - Chính hãng VN/A
                          </a>
                        </div>
                        <div className="mb-2 flex text-center items-center justify-center gap-1">
                          <span className="text-red-500 text-[18px] font-medium">
                            {formatPrice(`${detail.price} ₫`)}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(`${detail.discount} ₫`)}
                          </span>
                        </div>
                        <div className="mb-4"></div>
                        <div>
                          <button class="py-2 px-5 rounded-full bg-blue-400 text-white font-bold transition duration-500 transform hover:bg-blue-300 hover:scale-110 active:bg-blue-700 active:scale-98 focus:outline-none">
                            Mua ngay
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ))}

            {/* <div class="row-span-1  border border-solid rounded-3xl bg-white shadow-lg">
              <div className="py-8 flex flex-col items-center lg:relative ">
                <div className="mb-4  ">
                  <img
                    src="https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2023/02/02/s23-xang.png"
                    alt=""
                  />
                </div>
                <div className="flex items-center lg:absolute top-[230px] left-0 rounded-xl bg-red-500">
                  <svg
                    height="20px"
                    width="20px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    // xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512 512"
                    // xml:space="preserve"
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
                      <path
                        style={{ fill: "#FF5023" }}
                        d="M141.005,339.641H16.696c-5.788,0-11.157-3.082-14.201-7.995c-3.043-4.924-3.32-11.117-0.733-16.29 L31.42,256.02L1.761,196.695c-2.587-5.173-2.31-11.249,0.733-16.174c3.043-4.913,8.413-7.837,14.201-7.837h124.31 c5.978,0,11.5,3.114,14.473,8.299c2.979,5.173,2.962,11.513-0.049,16.677c-10.815,18.566-16.299,38.186-16.299,58.36 s5.484,39.805,16.299,58.37c3.011,5.163,3.027,11.62,0.049,16.794C152.505,336.368,146.983,339.641,141.005,339.641z"
                      ></path>{" "}
                      <path
                        style={{ fill: "#CD2A00" }}
                        d="M495.304,339.641h-124.31c-5.978,0-11.5-3.277-14.473-8.462c-2.978-5.173-2.962-11.595,0.049-16.758 c10.815-18.566,16.299-38.226,16.299-58.4s-5.484-39.826-16.299-58.39c-3.011-5.163-3.027-11.467-0.049-16.641 c2.973-5.185,8.495-8.304,14.473-8.304h124.31c5.788,0,11.157,2.918,14.201,7.831c3.043,4.924,3.32,11.036,0.733,16.209 l-29.658,59.295l29.658,59.305c2.587,5.173,2.31,11.402-0.733,16.326C506.461,336.564,501.092,339.641,495.304,339.641z"
                      ></path>{" "}
                      <path
                        style={{ fill: "#FFDA44" }}
                        d="M253.773,406.261c-82.853,0-148.033-67.402-148.033-150.261S173.147,105.739,256,105.739 S406.261,173.142,406.261,256S336.625,406.261,253.773,406.261z"
                      ></path>{" "}
                      <path
                        style={{ fill: "#FFA733" }}
                        d="M406.261,256c0-82.858-67.408-150.261-150.261-150.261l-2.227,300.521 C336.625,406.261,406.261,338.858,406.261,256z"
                      ></path>{" "}
                      <path
                        style={{ fill: "#FFEB99" }}
                        d="M300.13,333.434c-2.658,0-5.326-0.63-7.771-1.924L256,312.39l-36.359,19.12 c-5.635,2.978-12.446,2.468-17.582-1.261c-5.147-3.739-7.718-10.065-6.647-16.337l6.94-40.478l-29.413-28.684 c-4.549-4.445-6.185-11.076-4.217-17.12c1.962-6.044,7.19-10.446,13.478-11.359l40.647-5.902l18.179-36.837 c2.815-5.695,8.619-9.304,14.973-9.304c6.353,0,12.158,3.608,14.973,9.304l18.179,36.837l40.647,5.902 c6.288,0.913,11.517,5.315,13.478,11.359c1.968,6.044,0.332,12.674-4.217,17.12l-29.413,28.684l6.94,40.478 c1.071,6.272-1.5,12.597-6.647,16.337C307.032,332.358,303.591,333.434,300.13,333.434z"
                      ></path>{" "}
                      <path
                        style={{ fill: "#FFDA44" }}
                        d="M292.357,331.51c2.445,1.293,5.114,1.924,7.772,1.924c3.462,0,6.902-1.076,9.81-3.184 c5.147-3.739,7.718-10.065,6.647-16.337l-6.94-40.478l29.413-28.684c4.549-4.445,6.185-11.076,4.217-17.12 c-1.962-6.044-7.19-10.446-13.478-11.359l-40.647-5.902l-18.179-36.837c-2.815-5.695-8.294-9.304-14.973-9.304v148.162 L292.357,331.51z"
                      ></path>{" "}
                    </g>
                  </svg>
                  <p className=" px-1 py-1  text-white text-xs">
                    Giảm 2.000.000 đ
                  </p>
                </div>
                <div className="text-center">
                  <div className="mb-2 px-4">
                    <a href="" className="font-bold text-sm">
                      Samsung Galaxy S23 Plus - 8GB/256GB - Chính hãng
                    </a>
                  </div>
                  <div className="mb-2 flex text-center items-center justify-center gap-1">
                    <span className="text-red-500 text-[18px] font-medium">
                      31.000.000 đ
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      10.000 đ
                    </span>
                  </div>
                  <div className="mb-4"></div>
                  <div>
                    <button class="py-2 px-5 rounded-full bg-blue-400 text-white font-bold transition duration-500 transform hover:bg-blue-300 hover:scale-110 active:bg-blue-700 active:scale-98 focus:outline-none">
                      Mua ngay
                    </button>
                  </div>
                </div>
              </div>
            </div>
             */}
            <div class="row-span-1  border border-solid rounded-3xl bg-white bg-[url('https://images.samsung.com/is/image/samsung/assets/vn/2302/pcd/smartphones/PCD_DM3_KV_Promotion-Card_264x698_pc.jpg?$264_N_JPG$')] bg-cover bg-center bg-no-repeat shadow-lg	">
              <div className="py-8 flex flex-col items-center lg:relative ">
                <div className="mb-4  ">
                  <img
                    src="https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2023/02/02/s23-xang.png"
                    alt=""
                    style={{ visibility: "hidden" }}
                  />
                </div>
                {/* <div className="flex items-center lg:absolute top-[230px] left-0 rounded-xl bg-red-500">
                  <svg
                    height="20px"
                    width="20px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    // xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512 512"
                    // xml:space="preserve"
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
                      <path
                        style={{ fill: '#FF5023' }}
                        d="M141.005,339.641H16.696c-5.788,0-11.157-3.082-14.201-7.995c-3.043-4.924-3.32-11.117-0.733-16.29 L31.42,256.02L1.761,196.695c-2.587-5.173-2.31-11.249,0.733-16.174c3.043-4.913,8.413-7.837,14.201-7.837h124.31 c5.978,0,11.5,3.114,14.473,8.299c2.979,5.173,2.962,11.513-0.049,16.677c-10.815,18.566-16.299,38.186-16.299,58.36 s5.484,39.805,16.299,58.37c3.011,5.163,3.027,11.62,0.049,16.794C152.505,336.368,146.983,339.641,141.005,339.641z"
                      ></path>{" "}
                      <path
                      style={{ fill: '#CD2A00' }}
                        
                        d="M495.304,339.641h-124.31c-5.978,0-11.5-3.277-14.473-8.462c-2.978-5.173-2.962-11.595,0.049-16.758 c10.815-18.566,16.299-38.226,16.299-58.4s-5.484-39.826-16.299-58.39c-3.011-5.163-3.027-11.467-0.049-16.641 c2.973-5.185,8.495-8.304,14.473-8.304h124.31c5.788,0,11.157,2.918,14.201,7.831c3.043,4.924,3.32,11.036,0.733,16.209 l-29.658,59.295l29.658,59.305c2.587,5.173,2.31,11.402-0.733,16.326C506.461,336.564,501.092,339.641,495.304,339.641z"
                      ></path>{" "}
                      <path
                       
                        style={{ fill: '#FFDA44' }}
                        d="M253.773,406.261c-82.853,0-148.033-67.402-148.033-150.261S173.147,105.739,256,105.739 S406.261,173.142,406.261,256S336.625,406.261,253.773,406.261z"
                      ></path>{" "}
                      <path
                       
                        style={{ fill: '#FFA733' }}
                        d="M406.261,256c0-82.858-67.408-150.261-150.261-150.261l-2.227,300.521 C336.625,406.261,406.261,338.858,406.261,256z"
                      ></path>{" "}
                      <path
                        
                        style={{ fill: '#FFEB99' }}
                        d="M300.13,333.434c-2.658,0-5.326-0.63-7.771-1.924L256,312.39l-36.359,19.12 c-5.635,2.978-12.446,2.468-17.582-1.261c-5.147-3.739-7.718-10.065-6.647-16.337l6.94-40.478l-29.413-28.684 c-4.549-4.445-6.185-11.076-4.217-17.12c1.962-6.044,7.19-10.446,13.478-11.359l40.647-5.902l18.179-36.837 c2.815-5.695,8.619-9.304,14.973-9.304c6.353,0,12.158,3.608,14.973,9.304l18.179,36.837l40.647,5.902 c6.288,0.913,11.517,5.315,13.478,11.359c1.968,6.044,0.332,12.674-4.217,17.12l-29.413,28.684l6.94,40.478 c1.071,6.272-1.5,12.597-6.647,16.337C307.032,332.358,303.591,333.434,300.13,333.434z"
                      ></path>{" "}
                      <path

                        style={{ fill: '#FFDA44' }}
                        d="M292.357,331.51c2.445,1.293,5.114,1.924,7.772,1.924c3.462,0,6.902-1.076,9.81-3.184 c5.147-3.739,7.718-10.065,6.647-16.337l-6.94-40.478l29.413-28.684c4.549-4.445,6.185-11.076,4.217-17.12 c-1.962-6.044-7.19-10.446-13.478-11.359l-40.647-5.902l-18.179-36.837c-2.815-5.695-8.294-9.304-14.973-9.304v148.162 L292.357,331.51z"
                      ></path>{" "}
                    </g>
                  </svg>
                  <p className=" px-1 py-1  text-white text-xs">
                    Giảm 2.000.000 đ
                  </p>
                </div> */}
                <div className="text-center">
                  <div className="mb-2">
                    <a
                      href=""
                      className="font-bold text-sm"
                      style={{ visibility: "hidden" }}
                    >
                      Samsung Galaxy S23 Plus - 8GB/256GB - Chính hãng
                    </a>
                  </div>
                  <div
                    className="mb-2 flex text-center items-center justify-center gap-1 "
                    style={{ visibility: "hidden" }}
                  >
                    <span className="text-red-500 text-[18px] font-medium">
                      31.000.000 đ
                    </span>
                    <span
                      className="text-sm text-gray-500 line-through"
                      style={{ visibility: "hidden" }}
                    >
                      10.000 đ
                    </span>
                  </div>
                  <div className="mb-4"></div>
                  <div>
                    <button class="py-2 px-5 rounded-full bg-blue-400 text-white font-bold transition duration-500 transform hover:bg-blue-300 hover:scale-110 active:bg-blue-700 active:scale-98 focus:outline-none">
                      Mua ngay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              type="button"
              className="py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-blue-500 rounded-full border border-gray-200  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Xem tất cả
            </button>
          </div>
        </div>
      </div>

      {/* Iphone */}
      <div className="  pt-20  mx-auto lg:gap-8  lg:py-0 ">
        <div className="relative">
          <img
            src="https://crops.giga.de/0e/6e/26/60e4a2fd327bfad09767ff17bf_YyAxOTM1eDEwMTArMys0NgJyZSAxMjAwIDYyNwMwZTY0ZjJmMDZmYg==.jpg"
            alt=""
            className="w-full h-[500px] object-cover  "
          />
          <div className="absolute text-center z-600 top-1/2 left-1/2 transform -translate-x-1/2">
            <div>
              <div className="text-white font-bold  text-4xl">Titanium</div>
              <div className="text-white font-bold  text-2xl ">
                Mạnh mẽ - Nhẹ nhàng - Chuyên nghiệp
              </div>
            </div>
            <a href="">
              <button
                type="button"
                className="mt-5 py-2.5 px-5 text-sm font-medium text-black focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Mua ngay
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className="bg-gray-100" 
      // style={{ backgroundColor: "#f0f4f7" }}
      >
        <div className="grid  max-w-[95%] px-4  mx-auto lg:gap-8 py-5 bg-gray-100">
          <div class="grid grid-cols-5 gap-4 xl:px-[100px]">
            {filteredArrayIphone.slice(0, 4).map((item) => (
              <div
                key={item.id}
                class="row-span-1  border border-solid rounded-3xl bg-white  shadow-lg"
              >
                {item.product_detail &&
                  item.product_detail.map((detail, index) => (
                    <div
                      key={index}
                      className="py-8 flex flex-col items-center lg:relative group "
                    >
                      <NavLink to={`/product_detail/${item.id}`}>
                        <div className="mb-4 relative overflow-hidden transition-transform duration-500 ease-in-out transform-gpu group-hover:-translate-y-3">
                          <img
                            className="max-h-[200px]"
                            src={`${DOMAIN}${detail.image}`}
                            alt={`${detail.image}`}
                          />
                        </div>
                      </NavLink>
                      <div className="flex items-center lg:absolute top-[200px] left-0 rounded-r-xl bg-red-600">
                        <svg
                          height="20px"
                          width="20px"
                          version="1.1"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          // xmlns:xlink="http://www.w3.org/1999/xlink"
                          viewBox="0 0 512 512"
                          // xml:space="preserve"
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
                            <path
                              style={{ fill: "#FF5023" }}
                              d="M141.005,339.641H16.696c-5.788,0-11.157-3.082-14.201-7.995c-3.043-4.924-3.32-11.117-0.733-16.29 L31.42,256.02L1.761,196.695c-2.587-5.173-2.31-11.249,0.733-16.174c3.043-4.913,8.413-7.837,14.201-7.837h124.31 c5.978,0,11.5,3.114,14.473,8.299c2.979,5.173,2.962,11.513-0.049,16.677c-10.815,18.566-16.299,38.186-16.299,58.36 s5.484,39.805,16.299,58.37c3.011,5.163,3.027,11.62,0.049,16.794C152.505,336.368,146.983,339.641,141.005,339.641z"
                            ></path>{" "}
                            <path
                              style={{ fill: "#CD2A00" }}
                              d="M495.304,339.641h-124.31c-5.978,0-11.5-3.277-14.473-8.462c-2.978-5.173-2.962-11.595,0.049-16.758 c10.815-18.566,16.299-38.226,16.299-58.4s-5.484-39.826-16.299-58.39c-3.011-5.163-3.027-11.467-0.049-16.641 c2.973-5.185,8.495-8.304,14.473-8.304h124.31c5.788,0,11.157,2.918,14.201,7.831c3.043,4.924,3.32,11.036,0.733,16.209 l-29.658,59.295l29.658,59.305c2.587,5.173,2.31,11.402-0.733,16.326C506.461,336.564,501.092,339.641,495.304,339.641z"
                            ></path>{" "}
                            <path
                              style={{ fill: "#FFDA44" }}
                              d="M253.773,406.261c-82.853,0-148.033-67.402-148.033-150.261S173.147,105.739,256,105.739 S406.261,173.142,406.261,256S336.625,406.261,253.773,406.261z"
                            ></path>{" "}
                            <path
                              style={{ fill: "#FFA733" }}
                              d="M406.261,256c0-82.858-67.408-150.261-150.261-150.261l-2.227,300.521 C336.625,406.261,406.261,338.858,406.261,256z"
                            ></path>{" "}
                            <path
                              style={{ fill: "#FFEB99" }}
                              d="M300.13,333.434c-2.658,0-5.326-0.63-7.771-1.924L256,312.39l-36.359,19.12 c-5.635,2.978-12.446,2.468-17.582-1.261c-5.147-3.739-7.718-10.065-6.647-16.337l6.94-40.478l-29.413-28.684 c-4.549-4.445-6.185-11.076-4.217-17.12c1.962-6.044,7.19-10.446,13.478-11.359l40.647-5.902l18.179-36.837 c2.815-5.695,8.619-9.304,14.973-9.304c6.353,0,12.158,3.608,14.973,9.304l18.179,36.837l40.647,5.902 c6.288,0.913,11.517,5.315,13.478,11.359c1.968,6.044,0.332,12.674-4.217,17.12l-29.413,28.684l6.94,40.478 c1.071,6.272-1.5,12.597-6.647,16.337C307.032,332.358,303.591,333.434,300.13,333.434z"
                            ></path>{" "}
                            <path
                              style={{ fill: "#FFDA44" }}
                              d="M292.357,331.51c2.445,1.293,5.114,1.924,7.772,1.924c3.462,0,6.902-1.076,9.81-3.184 c5.147-3.739,7.718-10.065,6.647-16.337l-6.94-40.478l29.413-28.684c4.549-4.445,6.185-11.076,4.217-17.12 c-1.962-6.044-7.19-10.446-13.478-11.359l-40.647-5.902l-18.179-36.837c-2.815-5.695-8.294-9.304-14.973-9.304v148.162 L292.357,331.51z"
                            ></path>{" "}
                          </g>
                        </svg>
                        <p className=" px-1 py-1  text-white text-xs">
                          Giảm{" "}
                          {formatPrice(`${detail.discount - detail.price} ₫`)}
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="mb-2 px-4">
                          <a
                            href={`/product_detail/${item.id}`}
                            className="font-bold text-sm"
                          >
                            {item.name} ({item.capacity}) - Chính hãng VN/A
                          </a>
                        </div>
                        <div className="mb-2 flex text-center items-center justify-center gap-1">
                          <span className="text-red-500 text-[18px] font-medium">
                            {formatPrice(`${detail.price} ₫`)}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(`${detail.discount} ₫`)}
                          </span>
                        </div>
                        <div className="mb-4"></div>
                        <div>
                          <button class="py-2 px-5 rounded-full bg-blue-400 text-white font-bold transition duration-500 transform hover:bg-blue-300 hover:scale-110 active:bg-blue-700 active:scale-98 focus:outline-none">
                            Mua ngay
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ))}

            <div class="row-span-1  border border-solid rounded-3xl bg-white bg-[url('https://www.guidingtech.com/wp-content/uploads//Preppy-Christmas-Wallpaper-768x939.jpg')] bg-cover bg-center bg-no-repeat	">
              <div className="py-8 flex flex-col items-center lg:relative ">
                <div className="mb-4  ">
                  <img
                    className="max-h-[200px]"
                    src="https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2023/02/02/s23-xang.png"
                    alt=""
                    style={{ visibility: "hidden" }}
                  />
                </div>
                <div className="text-center">
                  <div className="mb-2 px-7">
                    <a href="" className="font-bold text-sm ">
                      Mua ngay - Phát quà liền tay
                    </a>
                  </div>
                  <div className="mb-2  text-center ">
                    <span className="text-red-500 text-sm font-medium">
                      Còn chờ gì nữa
                    </span>
                    {/* <span className="text-sm text-gray-500 line-through" style={{ visibility: 'hidden' }}>
                        10.000 đ
                      </span> */}
                  </div>
                  <div className="mb-4"></div>
                  <div>
                    <button class="py-2 px-5 rounded-full bg-blue-400 text-white font-bold transition duration-500 transform hover:bg-blue-300 hover:scale-110 active:bg-blue-700 active:scale-98 focus:outline-none">
                      Mua ngay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
            style={{backgroundColor: '#fac57d'}}
              type="button"
              className="py-2.5 px-5 text-sm font-medium text-white focus:outline-none  rounded-full border border-gray-200  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Xem tất cả
            </button>
          </div>
        </div>
      </div>

      {/* banner */}
      <div>
        <div>
          <h1 className="text-3xl py-5 font-bold	text-center text-red-500">
            Điện thoại nào phù hợp với bạn?
          </h1>
        </div>
        <div className="grid  px-4  pb-5 mx-auto lg:gap-8  ">
          <div className="grid grid-cols-2 gap-4">
            <div className="row-span-1 ">
              <a href="">
                <div className="relative inline-block border-box w-full h-full pointer ">
                  <img
                    className="h-[108px] w-full"
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:640:0/q:80/plain/https://cellphones.com.vn/media/wysiwyg/SIS_Banner_Mobile_U_u_a_i.png "
                    alt=""
                  />
                </div>
              </a>
            </div>
            <div className="row-span-1 ">
              <a href="">
                <div className="relative inline-block border-box w-full h-full pointer ">
                  <img
                    className="h-full"
                    src="https://cdn.hoanghamobile.com/i/home/Uploads/2023/11/04/m34.jpg"
                    alt=""
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ưa thích */}
      <div>
        <div>
          <h1 className="text-3xl py-5 font-bold	text-center text-red-500">
            Có thể bạn sẽ thích
          </h1>
        </div>
        <div className="flex flex-row overflow-hidden px-4  max-w-[95%] mx-auto lg:gap-8  pb-5 relative xl:px-[50px] ">
          <button
            className="absolute left-[0px] top-1/2 transform -translate-y-1/2 "
            onClick={prevSlide}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {productsToShow.map((product) => (
            <div className="flex-1 w-full border border-solid rounded-3xl bg-white z-50 shadow-lg">
              <div key={product.id} className="">
                {/* Your product display code here */}
                {/* <div className="py-4 flex flex-col items-center">
                  <div className="mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="text-center">
                    <div className="mb-2">
                      <a href="#" className="font-bold">
                        {product.name}
                      </a>
                    </div>
                    <div className="mb-2">
                      <span>{product.price}</span>
                    </div>
                    <div className="mb-4">
                      <span>{product.discountedPrice}</span>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-black rounded-full border border-gray-200  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Mua ngay
                      </button>
                    </div>
                  </div>
                </div> */}
                <div className="py-8 flex flex-col items-center lg:relative group ">
                  <div className="mb-4 relative overflow-hidden transition-transform duration-500 ease-in-out transform-gpu group-hover:-translate-y-3">
                    <img src={product.image} alt="" className="transform-gpu" />
                  </div>
                  <div className="flex items-center lg:absolute top-[200px] left-0 rounded-r-xl bg-red-600">
                    <svg
                      height="20px"
                      width="20px"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      // xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 512 512"
                      // xml:space="preserve"
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
                        <path
                          style={{ fill: "#FF5023" }}
                          d="M141.005,339.641H16.696c-5.788,0-11.157-3.082-14.201-7.995c-3.043-4.924-3.32-11.117-0.733-16.29 L31.42,256.02L1.761,196.695c-2.587-5.173-2.31-11.249,0.733-16.174c3.043-4.913,8.413-7.837,14.201-7.837h124.31 c5.978,0,11.5,3.114,14.473,8.299c2.979,5.173,2.962,11.513-0.049,16.677c-10.815,18.566-16.299,38.186-16.299,58.36 s5.484,39.805,16.299,58.37c3.011,5.163,3.027,11.62,0.049,16.794C152.505,336.368,146.983,339.641,141.005,339.641z"
                        ></path>{" "}
                        <path
                          style={{ fill: "#CD2A00" }}
                          d="M495.304,339.641h-124.31c-5.978,0-11.5-3.277-14.473-8.462c-2.978-5.173-2.962-11.595,0.049-16.758 c10.815-18.566,16.299-38.226,16.299-58.4s-5.484-39.826-16.299-58.39c-3.011-5.163-3.027-11.467-0.049-16.641 c2.973-5.185,8.495-8.304,14.473-8.304h124.31c5.788,0,11.157,2.918,14.201,7.831c3.043,4.924,3.32,11.036,0.733,16.209 l-29.658,59.295l29.658,59.305c2.587,5.173,2.31,11.402-0.733,16.326C506.461,336.564,501.092,339.641,495.304,339.641z"
                        ></path>{" "}
                        <path
                          style={{ fill: "#FFDA44" }}
                          d="M253.773,406.261c-82.853,0-148.033-67.402-148.033-150.261S173.147,105.739,256,105.739 S406.261,173.142,406.261,256S336.625,406.261,253.773,406.261z"
                        ></path>{" "}
                        <path
                          style={{ fill: "#FFA733" }}
                          d="M406.261,256c0-82.858-67.408-150.261-150.261-150.261l-2.227,300.521 C336.625,406.261,406.261,338.858,406.261,256z"
                        ></path>{" "}
                        <path
                          style={{ fill: "#FFEB99" }}
                          d="M300.13,333.434c-2.658,0-5.326-0.63-7.771-1.924L256,312.39l-36.359,19.12 c-5.635,2.978-12.446,2.468-17.582-1.261c-5.147-3.739-7.718-10.065-6.647-16.337l6.94-40.478l-29.413-28.684 c-4.549-4.445-6.185-11.076-4.217-17.12c1.962-6.044,7.19-10.446,13.478-11.359l40.647-5.902l18.179-36.837 c2.815-5.695,8.619-9.304,14.973-9.304c6.353,0,12.158,3.608,14.973,9.304l18.179,36.837l40.647,5.902 c6.288,0.913,11.517,5.315,13.478,11.359c1.968,6.044,0.332,12.674-4.217,17.12l-29.413,28.684l6.94,40.478 c1.071,6.272-1.5,12.597-6.647,16.337C307.032,332.358,303.591,333.434,300.13,333.434z"
                        ></path>{" "}
                        <path
                          style={{ fill: "#FFDA44" }}
                          d="M292.357,331.51c2.445,1.293,5.114,1.924,7.772,1.924c3.462,0,6.902-1.076,9.81-3.184 c5.147-3.739,7.718-10.065,6.647-16.337l-6.94-40.478l29.413-28.684c4.549-4.445,6.185-11.076,4.217-17.12 c-1.962-6.044-7.19-10.446-13.478-11.359l-40.647-5.902l-18.179-36.837c-2.815-5.695-8.294-9.304-14.973-9.304v148.162 L292.357,331.51z"
                        ></path>{" "}
                      </g>
                    </svg>
                    <p className=" px-1 py-1  text-white text-xs">
                      Giảm 2.000.000 đ
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="mb-2 px-4">
                      <a href="" className="font-bold text-sm">
                        {product.name}
                      </a>
                    </div>
                    <div className="mb-2 flex text-center items-center justify-center gap-1">
                      <span className="text-red-500 text-[18px] font-medium">
                        {product.price} đ
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {product.discount}
                      </span>
                    </div>
                    <div className="mb-4"></div>
                    <div>
                      <button class="py-2 px-5 rounded-full bg-blue-400 text-white font-bold transition duration-500 transform hover:bg-blue-300 hover:scale-110 active:bg-blue-700 active:scale-98 focus:outline-none">
                        Mua ngay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            className="absolute right-[0px] top-1/2 transform -translate-y-1/2 "
            onClick={nextSlide}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* banner  */}
      <div className="mb-28">
        <div className=" grid max-w-[95%]  mx-auto lg:gap-8  lg:pt-5 ">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1 bg-gray-100 border rounded-3xl group ">
              <div className="px-6 py-6 ">
                <p className="text-xl font-medium uppercase">Iphone</p>
                <p className="text-2xl max-w-[200px] py-3">
                  Hãy nói theo cách của bạn
                </p>
                <NavLink to="/listproducts/1">
                  <button class="rounded-full bg-sky-300 px-4 py-2">
                    Mua ngay
                  </button>
                </NavLink>
              </div>
              <div className="w-[300px] h-[200px] pl-20  group-hover:scale-110 transition-transform duration-500 ease-in-out delay-100">
                <img
                  className="h-full w-full object-cover transform-gpu z-10"
                  src="https://png.monster/wp-content/uploads/2023/09/png.monster-237.png"
                  alt=""
                />
              </div>
            </div>
            <div className="col-start-2 col-end-4  grid grid-rows-2 grid-flow-col gap-4">
              <div className="bg-red-500 border rounded-3xl flex items-center justify-between px-10 group">
                <div className="text-white">
                  <p className="text-xl font-medium uppercase pb-3">Oppo</p>

                  <p className="text-sm">Phản hồi tức thì</p>
                  <p className="text-3xl">Giữ nhịp vui cuộc sống</p>
                  <button className="rounded-full bg-sky-300 px-3 py-1 text-black my-2">
                    Mua ngay
                  </button>
                </div>
                <div className="w-[150px] h-[150px] group-hover:scale-110 transition-transform duration-500 ease-in-out delay-100">
                  <img
                    src="https://www.oppo.com/content/dam/oppo/product-asset-library/find/find-n2-series/global/find-n2-flip/v1/assets/images-pet-en-keepFlow-1.png.webp"
                    alt=""
                    className="w-full h-full object-cover transform-gpu z-10"
                  />
                </div>
              </div>
              <div className="bg-black border rounded-3xl flex items-center justify-between  group ">
                <div className="text-white pl-10">
                  <p className="text-xl font-medium uppercase pb-3">Redmi</p>
                  <p className="text-2xl">Sống bật chất</p>
                  <button className="rounded-full bg-sky-300 px-3 py-1 text-black my-2">
                    Mua ngay
                  </button>
                </div>
                <div className="w-auto h-[150px] group-hover:translate-x-[-3%] transition-transform duration-500 ease-in-out delay-100">
                  <img
                    src="https://cdn.nguyenkimmall.com/images/companies/_1/Content/dien-thoai/Xiaomi/note-12-pro-4g/dien-thoai-xiaomi-redmi-note-12-pro-12.png"
                    alt=""
                    className="w-full h-full object-cover transform-gpu z-10"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-1 bg-teal-400 border rounded-3xl flex flex-col justify-center items-center group">
              <div className="px-6 py-6">
                <p className="text-xl font-medium uppercase">Samsung</p>
                <p className="text-2xl max-w-full py-3">
                  Hãy tưởng tượng những điều tuyệt vời mà chúng ta có thể thực
                  hiện
                </p>
                <button className="rounded-full bg-sky-300 px-4 py-2">
                  Mua ngay
                </button>
              </div>
              <div className="w-[250px] h-[250px] flex items-center justify-center group-hover:-translate-y-3 transition-transform duration-500 ease-in-out delay-100">
                <img
                  className="h-full w-full object-cover transform-gpu z-10"
                  src="https://www.pngall.com/wp-content/uploads/13/Galaxy-S23-Ultra-PNG-Image-File.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
