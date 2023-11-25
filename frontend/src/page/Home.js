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
export default function Home() {
  const products = [
    {
      id: 1,
      name: "Iphone 11 Pro",
      capacity: "128G",
      price: "10.000.000₫",
      discount: 10,
      image:
        "https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/15-Pro-3.jpg",
    },
    {
      id: 2,
      name: "Iphone 12 Pro",
      capacity: "256G",
      price: "12.000.000₫",
      discount: 10,
      image:
        "https://bizweb.dktcdn.net/100/116/615/products/refurb-iphone-13-pro-max-gold-2023-jpeg.jpg?v=1680336505547",
    },
    {
      id: 3,
      name: "Iphone 13 Pro",
      capacity: "512G",
      price: "15.000.000₫",
      discount: 10,
      image:
        "https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-thumbnew-600x600.jpg",
    },
    {
      id: 4,
      name: "Iphone 14 Pro",
      capacity: "512G",
      price: "15.000.000₫",
      discount: 10,
      image:
        "https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/15-Pro-3.jpg",
    },
    {
      id: 5,
      name: "Iphone 15 Pro",
      capacity: "512G",
      price: "15.000.000₫",
      discount: 10,
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
  const [startIndex, setStartIndex] = useState(0);
  const [productsToShow, setProductsToShow] = useState([]);
  useEffect(() => {
    const getProductsToShow = () => {
      const endIndex = (startIndex + 5) % products.length;
      if (endIndex >= startIndex) {
        return products.slice(startIndex, endIndex);
      } else {
        return [
          ...products.slice(startIndex, products.length),
          ...products.slice(0, endIndex),
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
  return (
    <section className="mt-5">
      {/* có gì mới */}
      <div>
        <h1 className="text-3xl leading-4 font-bold	text-center">Có gì mới</h1>
        <div className="grid max-w-[95%]  px-4 pt-20 pb-8 mx-auto lg:gap-8  lg:py-16 lg:pt-10">
          <div class=" grid grid-cols-2 gap-4">
            <div class="row-span-1 ">
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
            <div class="col-span-1 grid grid-cols-2 grid-rows-2 gap-4 ">
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
      {/* THƯƠNG HIỆU  */}
      <div className="grid max-w-[95%]  px-4 pt-20 pb-8 mx-auto lg:gap-8  lg:py-16 lg:pt-10">
        <div className="flex flex-wrap mx-auto items-center bg-gray-50 w-full justify-center">
          {categories.map((item) => (
            <NavLink
              className=" px-4 w-[150px] h-[60px] my-5"
              to={`/listproducts/${item.id}`}
            >
              <img
                src={`${DOMAIN}${item.logo}`}
                alt=""
                className="w-full h-full "
              />
            </NavLink>
          ))}
        </div>
      </div>

      {/* samsung */}
      <div className=" grid max-w-[95%]  pt-20  mx-auto lg:gap-8  lg:py-0 lg:pt-10">
        <div className="relative">
          <img
            src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/News/News_expe_8207/8207.png"
            alt=""
            className="w-full h-[500px] object-cover  "
          />
          <div className="absolute bottom-[200px] left-[50px]">
            <a href="">
              <button
                type="button"
                className="py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-black rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Mua ngay
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className="grid  max-w-[95%] px-4  mx-auto lg:gap-8  lg:py-16 lg:pt bg-gray-100">
        <div class="grid grid-cols-4 gap-4 xl:px-[150px]">
          <div class="row-span-1  border border-solid rounded-3xl bg-white">
            <div className="py-8 flex flex-col items-center">
              <div className="mb-4">
                <img
                  src="https://images.samsung.com/is/image/samsung/p6pim/vn/2302/gallery/vn-galaxy-s23-s918-sm-s918bliwxxv-thumb-534859247?$216_216_PNG$"
                  alt=""
                />
              </div>
              <div className="text-center">
                <div className="mb-2">
                  <a href="" className="font-bold">
                    Galaxy S23 Ultra
                  </a>
                </div>
                <div className="mb-2">
                  <span>31.000.000 đ</span>
                </div>
                <div className="mb-4">
                  <span>10.000 đ</span>
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
            </div>
          </div>
          <div class="row-span-1  border border-solid rounded-3xl bg-white">
            <div className="py-8 flex flex-col items-center">
              <div className="mb-4">
                <img
                  src="https://images.samsung.com/is/image/samsung/p6pim/vn/2302/gallery/vn-galaxy-s23-s918-sm-s918bliwxxv-thumb-534859247?$216_216_PNG$"
                  alt=""
                />
              </div>
              <div className="text-center">
                <div className="mb-2">
                  <a href="" className="font-bold">
                    Galaxy S23 Ultra
                  </a>
                </div>
                <div className="mb-2">
                  <span>31.000.000 đ</span>
                </div>
                <div className="mb-4">
                  <span>10.000 đ</span>
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
            </div>
          </div>
          <div class="row-span-1  border border-solid rounded-3xl bg-white">
            <div className="py-8 flex flex-col items-center">
              <div className="mb-4">
                <img
                  src="https://images.samsung.com/is/image/samsung/p6pim/vn/2302/gallery/vn-galaxy-s23-s918-sm-s918bliwxxv-thumb-534859247?$216_216_PNG$"
                  alt=""
                />
              </div>
              <div className="text-center">
                <div className="mb-2">
                  <a href="" className="font-bold">
                    Galaxy S23 Ultra
                  </a>
                </div>
                <div className="mb-2">
                  <span>31.000.000 đ</span>
                </div>
                <div className="mb-4">
                  <span>10.000 đ</span>
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
            </div>
          </div>
          <div class="row-span-1  border border-solid rounded-3xl bg-white">
            <div className="py-8 flex flex-col items-center">
              <div className="mb-4">
                <img
                  src="https://images.samsung.com/is/image/samsung/p6pim/vn/2302/gallery/vn-galaxy-s23-s918-sm-s918bliwxxv-thumb-534859247?$216_216_PNG$"
                  alt=""
                />
              </div>
              <div className="text-center">
                <div className="mb-2">
                  <a href="" className="font-bold">
                    Galaxy S23 Ultra
                  </a>
                </div>
                <div className="mb-2">
                  <span>31.000.000 đ</span>
                </div>
                <div className="mb-4">
                  <span>10.000 đ</span>
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

      {/* Iphone */}
      <div className="  pt-20  mx-auto lg:gap-8  lg:py-0 lg:pt-10">
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
      <div className="grid  px-4  mx-auto lg:gap-8  lg:py-16 lg:pt bg-gray-100">
        <div class="grid grid-cols-4 gap-4 xl:px-[150px]">
          <div class="row-span-1  border border-solid rounded-3xl bg-white">
            <div className="py-8 flex flex-col items-center">
              <div className="mb-4">
                <img
                  src="https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/15-Pro-3.jpg"
                  alt=""
                />
              </div>
              <div className="text-center">
                <div className="mb-2">
                  <a href="" className="font-bold">
                    Iphone 15 Pro 128G
                  </a>
                </div>
                <div className="mb-2">
                  <span>31.000.000 đ</span>
                </div>
                <div className="mb-4">
                  <span>10.000 đ</span>
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
            </div>
          </div>
          <div class="row-span-1  border border-solid rounded-3xl bg-white">
            <div className="py-8 flex flex-col items-center">
              <div className="mb-4">
                <img
                  src="https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/15-Pro-3.jpg"
                  alt=""
                />
              </div>
              <div className="text-center">
                <div className="mb-2">
                  <a href="" className="font-bold">
                    Iphone 15 Pro 128G
                  </a>
                </div>
                <div className="mb-2">
                  <span>31.000.000 đ</span>
                </div>
                <div className="mb-4">
                  <span>10.000 đ</span>
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
            </div>
          </div>
          <div class="row-span-1  border border-solid rounded-3xl bg-white">
            <div className="py-8 flex flex-col items-center">
              <div className="mb-4">
                <img
                  src="https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/15-Pro-3.jpg"
                  alt=""
                />
              </div>
              <div className="text-center">
                <div className="mb-2">
                  <a href="" className="font-bold">
                    Iphone 15 Pro 128G
                  </a>
                </div>
                <div className="mb-2">
                  <span>31.000.000 đ</span>
                </div>
                <div className="mb-4">
                  <span>10.000 đ</span>
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
            </div>
          </div>
          <div class="row-span-1  border border-solid rounded-3xl bg-white">
            <div className="py-8 flex flex-col items-center">
              <div className="mb-4">
                <img
                  src="https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/15-Pro-3.jpg"
                  alt=""
                />
              </div>
              <div className="text-center">
                <div className="mb-2">
                  <a href="" className="font-bold">
                    Iphone 15 Pro 128G
                  </a>
                </div>
                <div className="mb-2">
                  <span>31.000.000 đ</span>
                </div>
                <div className="mb-4">
                  <span>10.000 đ</span>
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
            </div>
          </div>
        </div>
      </div>

      {/* banner */}
      <div>
        <h1 className="text-3xl leading-4 font-bold	text-center mt-10">
          Điện thoại nào phù hợp với bạn?
        </h1>
        <div className="grid  px-4 pt-20 pb-8 mx-auto lg:gap-8  lg:py-16 lg:pt-10">
          <div class="grid grid-cols-2 gap-4">
            <div class="row-span-1 ">
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
            <div class="row-span-1 ">
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
        <h1 className="text-3xl leading-4 font-bold	text-center mt-10">
          Có thể bạn sẽ thích
        </h1>
        <div className="flex flex-row overflow-hidden  duration-300 max-w-[90%] mx-auto lg:gap-8 lg:py-16 lg:pt mt-5 relative px-[50px]">
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
            <div className="flex-1 w-full">
              <div
                key={product.id}
                className="border border-solid rounded-3xl bg-white px-3"
              >
                {/* Your product display code here */}
                <div className="py-4 flex flex-col items-center">
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
      <div>
        <div className=" grid max-w-[95%]  pt-20  mx-auto lg:gap-8  lg:py-0 lg:pt-10 ">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1 bg-gray-100 border rounded-3xl">
              <div className="px-6 py-6">
                <p className="text-xl font-medium uppercase">Iphone</p>
                <p className="text-2xl max-w-[200px] py-3">
                  Hãy nói theo cách của bạn
                </p>
                <NavLink to="/listproducts/1" >
                <button class="rounded-full bg-sky-300 px-4 py-2">
                  Mua ngay
                </button>
                </NavLink>
              </div>
              <div className="w-[300px] h-[200px] pl-20">
                <img
                  className="h-full w-full object-cover"
                  src="https://png.monster/wp-content/uploads/2023/09/png.monster-237.png"
                  alt=""
                />
              </div>
            </div>
            <div className="col-start-2 col-end-4  grid grid-rows-2 grid-flow-col gap-4">
              <div className="bg-red-500 border rounded-3xl flex items-center justify-between px-10">
                <div className="text-white">
                <p className="text-xl font-medium uppercase pb-3">Oppo</p>
                  <p className="text-sm">Phản hồi tức thì</p>
                  <p className="text-3xl">Giữ nhịp vui cuộc sống</p>
                  <button className="rounded-full bg-sky-300 px-3 py-1 text-black my-2">
                    Mua ngay
                  </button>
                </div>
                <div className="w-[150px] h-[150px]">
                  <img
                    src="https://www.oppo.com/content/dam/oppo/product-asset-library/find/find-n2-series/global/find-n2-flip/v1/assets/images-pet-en-keepFlow-1.png.webp"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="bg-black border rounded-3xl flex items-center justify-between ">
                <div className="text-white pl-10">
                <p className="text-xl font-medium uppercase pb-3">Redmi</p>

                  <p className="text-2xl">Sống bật chấttt</p>
                  <button className="rounded-full bg-sky-300 px-3 py-1 text-black my-2">
                    Mua ngay
                  </button>
                </div>
                <div className="w-auto h-[150px]">
                  <img
                    src="https://cdn.nguyenkimmall.com/images/companies/_1/Content/dien-thoai/Xiaomi/note-12-pro-4g/dien-thoai-xiaomi-redmi-note-12-pro-12.png"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-1 bg-teal-400 border rounded-3xl flex flex-col justify-center items-center">
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
              <div className="w-[250px] h-[250px] flex items-center justify-center">
                <img
                  className="h-full w-full object-cover"
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
