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
  const [startIndex, setStartIndex] = useState(0);
  const [productsToShow, setProductsToShow] = useState([]);
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
  }, [startIndex, products]);

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

      {categories.map((item) => (
        <NavLink to={`/listproducts/${item.id}`}>
          <button key={item.id}
            className="w-[100%] bg-gray-50 px-4 flex items-center justify-between mt-5 py-1 rounded-xl mb-3">
            <span className="mr-2 font-medium text-lg">{item.name}</span>
            <img
              src={`${DOMAIN}${item.logo}`}
              alt=""
              className="w-[70px] h-[50px]"
            />
          </button>
        </NavLink>

      ))}
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
        <div className="flex flex-row overflow-hidden  duration-300 max-w-[80%] mx-auto lg:gap-8 lg:py-16 lg:pt mt-5 relative">
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

      <div>
        <div className="grid max-w-[1100px]	  mx-auto mt-5  pt-20 pb-8  lg:gap-8  lg:py-16  bg-blue-50 rounded-2xl sm:w-full ">
          <div class="grid grid-cols-2 gap-4 px-10  ">
            <div class="row-span-1 ">
              <div>
                <p className="font-black  font-3xl">AN TOÀN - TIN CẬY </p>
                <p className="py-[20px] text-gray-700">
                  Chúng tôi tin vào dịch vụ của mình, và bạn biết điều đó.
                </p>
                <hr className="border border-solid border-gray-400 sm:w-full " />
                <div className="pt-5">
                  <a href="">
                    <div className="flex items-center">
                      <span className="pr-1 font-medium text-cyan-500">
                        Khám phá thêm
                      </span>
                      <svg
                        className="w-[20px] h-[20px] fill-cyan-500"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title />
                        <g data-name="Layer 2" id="Layer_2">
                          <path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" />
                        </g>
                      </svg>
                    </div>
                  </a>
                  <a href="">
                    <div className="flex items-center">
                      <span className="pr-1 font-medium text-cyan-500">
                        Khám phá thêm
                      </span>
                      <svg
                        className="w-[20px] h-[20px] fill-cyan-500"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title />
                        <g data-name="Layer 2" id="Layer_2">
                          <path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" />
                        </g>
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-span-1 grid grid-cols-2 grid-rows-2 gap-4 ">
              <div className="row-span-1  flex items-center ">
                <div className="w-[80px] h-[80px] pr-5">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 846.66 846.66"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Layer_x0020_1">
                      <path
                        class="fil0"
                        d="M474.98 748.85l-61.04 -109.6 -63.24 49.63 48.79 87.6 75.49 -27.63zm138.06 -654c42.88,0 77.65,34.76 77.65,77.64 0,14.3 -3.87,27.69 -10.61,39.2 26.85,20.76 42.57,52.62 42.57,86.65 0,11.44 -9.28,20.71 -20.72,20.71l-177.78 0c-11.44,0 -20.71,-9.27 -20.71,-20.71 0,-34.04 15.72,-65.89 42.57,-86.65 -6.74,-11.51 -10.61,-24.9 -10.61,-39.2 0,-42.87 34.77,-77.64 77.64,-77.64zm36.8 146.02c-10.95,5.91 -23.48,9.26 -36.8,9.26 -13.31,0 -25.84,-3.35 -36.79,-9.26 -13.34,8.59 -23.4,21.64 -28.2,36.76l129.98 0c-4.79,-15.11 -14.85,-28.17 -28.19,-36.76zm-36.8 -104.59c-20,0 -36.21,16.21 -36.21,36.21 0,20.01 16.21,36.22 36.21,36.22 20.01,0 36.22,-16.21 36.22,-36.22 0,-20 -16.21,-36.21 -36.22,-36.21zm80.74 272.07l-118.39 153.91c-12.09,15.65 -36.98,6.83 -37,-12.63l-0.06 -141.28 -128.82 0c-11.44,0 -20.71,-9.27 -20.71,-20.71l0 -353.07c0,-11.44 9.27,-20.71 20.71,-20.71l407.07 0c11.43,0 20.71,9.27 20.71,20.71l0 353.07c0,11.44 -9.28,20.71 -20.71,20.71l-122.8 0zm-114.02 80.49l86.55 -112.52c3.7,-5.66 10.09,-9.39 17.35,-9.39l112.2 0 0 -311.65 -365.64 0 0 311.65 128.82 0c11.44,0 20.72,9.27 20.72,20.71l0 101.2zm-359.78 -282.68l83.94 150.72c6.21,11.16 0.89,25.1 -11,29.44l-109.45 40.07c-36.56,46.14 -31.93,108.9 -4.55,158.08 27.37,49.12 78.32,86.08 136.71,79.34l91.8 -71.99c9.95,-7.82 24.61,-4.94 30.8,6.2l84.22 151.21c6.7,11.1 1.68,25.66 -10.63,30.13l-114.75 42c-0.67,0.24 -1.36,0.45 -2.05,0.62 -140.86,43.91 -269.34,-52.35 -335.08,-170.72 -63.48,-114.28 -81.9,-286.74 32.46,-377.03l96.1 -75.47c10.49,-8.25 25.82,-4.5 31.48,7.4zm-73.57 200.79l-46.13 -82.83c-75.98,85.2 -55.53,214.76 -4.26,307.08 51.49,92.69 150.02,177.36 262.86,157.24l-46.16 -82.89c-72.47,4.99 -135.69,-39.63 -169.88,-101.02 -34.18,-61.37 -38.81,-138.62 3.57,-197.58zm109.67 -51.13l-61.04 -109.6 -63.24 49.64 48.79 87.6 75.49 -27.64z"
                      />
                    </g>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-xl">Hotline hỗ trợ</p>
                  <p className="font-medium">113</p>
                </div>
              </div>
              <div className="row-span-1  flex items-center ">
                <div className="w-[80px] h-[80px] pr-5">
                  <svg
                    className="w-full h-full fill-indigo-500"
                    id="icon"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title />
                    <path d="M24,24v2h2.4592A5.94,5.94,0,0,1,22,28a6.0066,6.0066,0,0,1-6-6H14a7.9841,7.9841,0,0,0,14,5.2651V30h2V24Z" />
                    <path d="M22,14a8.04,8.04,0,0,0-6,2.7349V14H14v6h6V18H17.5408A5.94,5.94,0,0,1,22,16a6.0066,6.0066,0,0,1,6,6h2A8.0092,8.0092,0,0,0,22,14Z" />
                    <path d="M12,28H6V24H8V22H6V17H8V15H6V10H8V8H6V4H24v8h2V4a2,2,0,0,0-2-2H6A2,2,0,0,0,4,4V8H2v2H4v5H2v2H4v5H2v2H4v4a2,2,0,0,0,2,2h6Z" />
                  </svg>
                </div>
                <div>
                  <p className="font-normal text-sm">Sản phẩm</p>
                  <p className="font-medium text-lg">CHÍNH HÃNG</p>
                </div>
              </div>
              <div className="row-span-1  flex items-center ">
                <div className="w-[80px] h-[80px] pr-5">
                  <svg
                    className="w-full h-full"
                    id="icon"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title />
                    <path d="M24,24v2h2.4592A5.94,5.94,0,0,1,22,28a6.0066,6.0066,0,0,1-6-6H14a7.9841,7.9841,0,0,0,14,5.2651V30h2V24Z" />
                    <path d="M22,14a8.04,8.04,0,0,0-6,2.7349V14H14v6h6V18H17.5408A5.94,5.94,0,0,1,22,16a6.0066,6.0066,0,0,1,6,6h2A8.0092,8.0092,0,0,0,22,14Z" />
                    <path d="M12,28H6V24H8V22H6V17H8V15H6V10H8V8H6V4H24v8h2V4a2,2,0,0,0-2-2H6A2,2,0,0,0,4,4V8H2v2H4v5H2v2H4v5H2v2H4v4a2,2,0,0,0,2,2h6Z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-xl">Hotline hỗ trợ</p>
                  <p className="font-medium">113</p>
                </div>
              </div>
              <div className="row-span-1  flex items-center ">
                <div className="w-[80px] h-[80px] pr-5">
                  <svg
                    className="w-full h-full"
                    id="icon"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title />
                    <path d="M24,24v2h2.4592A5.94,5.94,0,0,1,22,28a6.0066,6.0066,0,0,1-6-6H14a7.9841,7.9841,0,0,0,14,5.2651V30h2V24Z" />
                    <path d="M22,14a8.04,8.04,0,0,0-6,2.7349V14H14v6h6V18H17.5408A5.94,5.94,0,0,1,22,16a6.0066,6.0066,0,0,1,6,6h2A8.0092,8.0092,0,0,0,22,14Z" />
                    <path d="M12,28H6V24H8V22H6V17H8V15H6V10H8V8H6V4H24v8h2V4a2,2,0,0,0-2-2H6A2,2,0,0,0,4,4V8H2v2H4v5H2v2H4v5H2v2H4v4a2,2,0,0,0,2,2h6Z" />
                  </svg>
                </div>
                <div>
                  <p className="font-normal text-sm">Thủ tục đổi trả</p>
                  <p className="font-medium text-lg">Dễ dàng</p>
                </div>
              </div>
            </div>
            {/* <div class="row-span-2 col-span-2 bg-cyan-300">03</div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
