import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { listProducts } from "../services/products/product";
import { DOMAIN } from "../utils/settings/config";
import { logoutUser } from "../services/API/authApi";
import Transition from "../utils/transition";
import { listCategories } from "../services/categories/categories";

export default function Header({ align }) {
  const [products, setProducts] = useState([]);
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [hasToken, setHasToken] = useState(false);
  const [categories, setcategories] = useState([0]);
  const [reload, setReload] = useState(false);

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
  console.log("list", categories);
  useEffect(() => {
    // Kiểm tra xem key 'token' có tồn tại trong localStorage không
    const storedToken = localStorage.getItem("token");
    setHasToken(!!storedToken); // Chuyển đổi thành giá trị boolean

    // Nếu bạn muốn cập nhật hasToken khi key 'token' thay đổi, bạn có thể sử dụng sự kiện storage
    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem("token");
      setHasToken(!!updatedToken);
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup để tránh memory leak
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  const fetchProducts = async (value) => {
    try {
      const productsData = await listProducts();
      // console.log(productsData);
      setProducts(productsData);
      const results = productsData.filter((product) => {
        return (
          value &&
          product &&
          product.name &&
          product.name.toLowerCase().includes(value)
        );
      });
      setResult(results);
      // console.log('result',results);
    } catch (error) {
      // Xử lý lỗi nếu cần
      console.log(error);
    }
  };
  // useEffect(() => {

  //   fetchProducts();
  // }, []);
  console.log(products);
  const handleChange = (value) => {
    setInput(value);
    fetchProducts(value);
  };
  const resetValue = () => {
    setInput("");
    setResult("");
  };
  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  const handleLogout = async () => {
    try {
      await logoutUser();
      // Chuyển hướng về trang đăng nhập hoặc trang chính (tùy thuộc vào yêu cầu của bạn)
      window.location.reload();
      // navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });
  return (
    <header className="sm:w-full  top-0 left-0 right-0 z-1 fixed ">
      <nav
        className=" border-gray-200 dark:bg-gray-900 box-border "
        style={{ background: "#008e49" }}
      >
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
          <NavLink to="/">
            <a href="#" className="flex items-center h-[60px] w-[150px] ">
              <img
                src="/image/SP3.png"
                // width="100px"
                // height='150px'
                className=" mr-3 w-full h-full"
                alt="SalePhone Logo"
              />
            </a>
          </NavLink>
          <div className="flex items-center lg:order-2">
            <div className="hidden sm:inline-block ">
              <div class="relative">
                <input
                  type="text"
                  style={{ background: "#eae9ee" }}
                  value={input}
                  onChange={(e) => handleChange(e.target.value)}
                  class="border border-solid   rounded-2xl p-4 w-full py-2 pl-8 pr-4  focus:outline-none focus:border-blue-500"
                  placeholder="Tìm kiếm sản phẩm"
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
            <div className="ml-3 w-10 h-10  text-center rounded-full border-2 border-gray-300 text-gray-700 text-lg cursor-pointer flex items-center justify-center">
              <svg
                fill="#fff"
                width="28px"
                height="28px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M20.808,11.079C19.829,16.132,12,20.5,12,20.5s-7.829-4.368-8.808-9.421C2.227,6.1,5.066,3.5,8,3.5a4.444,4.444,0,0,1,4,2,4.444,4.444,0,0,1,4-2C18.934,3.5,21.773,6.1,20.808,11.079Z"></path>
                </g>
              </svg>
            </div>
            <div className=" mx-3 w-10 h-10 leading-12 text-center rounded-full  border-2 border-gray-300 text-gray-700 text-lg cursor-pointer flex items-center justify-center">
              <svg
                width="25px"
                height="25px"
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
                    d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                    stroke="#fff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </div>

            {hasToken && (
              <div className="mr-3 relative inline-flex">
                <button
                  ref={trigger}
                  className="inline-flex justify-center items-center group"
                  aria-haspopup="true"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-expanded={dropdownOpen}
                >
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png"
                    width="32"
                    height="32"
                    alt="User"
                  />
                  <div className="flex items-center truncate">
                    <svg
                      className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
                      viewBox="0 0 12 12"
                    >
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </div>
                </button>

                <Transition
                  className={`origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${
                    align === "right" ? "right-0" : "left-0"
                  }`}
                  show={dropdownOpen}
                  enter="transition ease-out duration-200 transform"
                  enterStart="opacity-0 -translate-y-2"
                  enterEnd="opacity-100 translate-y-0"
                  leave="transition ease-out duration-200"
                  leaveStart="opacity-100"
                  leaveEnd="opacity-0"
                >
                  <div
                    ref={dropdown}
                    onFocus={() => setDropdownOpen(true)}
                    onBlur={() => setDropdownOpen(false)}
                  >
                    <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200 dark:border-slate-700">
                      <p className="font-medium text-slate-800  dark:text-slate-100">
                        Quản lý
                      </p>
                      <div className="text-xs text-slate-500 dark:text-slate-400 italic">
                        Administrator
                      </div>
                    </div>
                    <ul>
                      <li>
                        <Link
                          className="font-medium text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-3"
                          to="/admin"
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                          Truy cập quản lý
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="font-medium text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-3"
                          onClick={() => handleLogout()}
                        >
                          Đăng xuất
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Transition>
              </div>
            )}

            <a
              href=""
              style={{ background: "#eae9ee" }}
              className="text-black  focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0  focus:outline-none "
            >
              Kiểm tra đơn hàng
            </a>
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <div
            className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-6 lg:mt-0 text-white">
              <li className="relative">
                <a
                  href="/listproduct"
                  className="relative block py-2 pl-3 pr-4 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-yellow-200 lg:p-0"
                >
                  <div className="flex items-center">
                    <p>Danh mục </p>
                    <svg
                      width="17px"
                      height="17px"
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
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"
                          fill="#eeeeee"
                        ></path>{" "}
                      </g>
                    </svg>
                  </div>
                </a>
                <ul className="w-auto absolute bg-white shadow-2xl text-black z-50 hidden dropdown-category  py-1 rounded-md mt-1">
                  {categories.map((item, index) => (
                    <li className="block py-1  pl-2 pr-10 hover:bg-gray-200">
                      <a href="#" className="">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <a
                  href="/listproducts"
                  className="block py-2 pl-3 pr-4  border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-yellow-200 lg:p-0  "
                >
                  Tất cả sản phẩm
                </a>
              </li>
              <li>
                <a
                  href="news"
                  className="block py-2 pl-3 pr-4  border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-yellow-200 lg:p-0 "
                >
                  Tin tức
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="block py-2 pl-3 pr-4  border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-yellow-200 lg:p-0 "
                >
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="bg-white grid grid-cols-2 rounded-lg w-[50%] mx-auto mt-1 shadow-lg">
        {result &&
          result.map((items) => (
            <div>
              {items.product_detail.map((item, id) => (
                <div className="px-3 py-1 hover:bg-gray-200 flex items-center">
                  <NavLink
                    onClick={resetValue}
                    to={`/product_detail/${items.id}`}
                  >
                    <div className="w-[60px] h-[60px pr-1">
                      <img
                        className="w-full h-full"
                        src={`${DOMAIN}${item.image}`}
                        alt=""
                      />
                    </div>
                  </NavLink>
                  <div>
                    <a
                      href={`/product_detail/${items.id}`}
                      className="text-[14px]"
                    >
                      {items.name} {items.capacity} - Chính hãng VN/A
                    </a>
                    <div>
                      <span className="text-[12px] text-red-500 font-medium">
                        {formatPrice(`${item.price} ₫`)}
                      </span>
                      <span className="text-[11px] text-gray-500 line-through text-gray-500 line-through">
                        {formatPrice(`${item.discount} ₫`)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </header>
  );
}
