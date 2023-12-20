import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  getProductsByCategory,
  listProducts,
} from "../services/products/product";
import { listCategories } from "../services/categories/categories";
import { DOMAIN } from "../utils/settings/config";
import "./snow.css";
import ReactPaginate from "react-paginate";
// import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";

export default function ListProducts() {
  const [categories, setcategories] = useState([0]);
  const [products, setProducts] = useState([0]);
  const [reload, setReload] = useState(false);
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 2;
  const handleGet = async (id) => {
    try {
      const product = await getProductsByCategory(id);
      setProducts(product);

      // console.log(id);
    } catch (error) {
      console.log(error);
    }
  };
  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  // get list products and productById
  useEffect(() => {
    if (id) {
      const fetchProducts = async () => {
        try {
          const productsData = await getProductsByCategory(id);
          console.log(productsData);
          setProducts(productsData);
        } catch (error) {
          console.log(error);
        }
      };
      fetchProducts();
    } else {
      const fetchAllProducts = async () => {
        try {
          const productsData = await listProducts();
          // console.log(productsData);
          setProducts(productsData);
        } catch (error) {
          // Xử lý lỗi nếu cần
          console.log(error);
        }
      };
      fetchAllProducts();
    }
  }, [id]);

  // get list categories
  const fetchProducts = async () => {
    try {
      const productsData = await getProductsByCategory(id);
      console.log("product ne", productsData);
      const totalCount = productsData.length;
      console.log(totalCount);
      setTotalPages(Math.ceil(totalCount / itemsPerPage));
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentProducts = productsData.slice(startIndex, endIndex);
      setProducts(currentProducts);
    } catch (error) {
      console.log(error);
    }
  };
  const numbers = [...Array(totalPages + 1).keys()].slice(1);
  useEffect(() => {
    fetchProducts();
    const fetchCategories = async () => {
      try {
        const categoriesData = await listCategories();
        setcategories(categoriesData);
      } catch (error) {
        // Xử lý lỗi nếu cần
      }
    };
    fetchCategories();
  }, [currentPage, id]);
  const changePage = (id) => {
    setCurrentPage(id);
  };

  // get list products
  // useEffect(() => {
  //   const fetchAllProducts = async () => {
  //     try {
  //       const productsData = await listProducts();
  //       console.log('abc', productsData);
  //       setProducts(productsData);
  //     } catch (error) {
  //       // Xử lý lỗi nếu cần
  //       console.log(error);
  //     }
  //   };
  //   fetchAllProducts();
  // }, [reload]);



  // const calculateTotal = () => {
  //   return cart.reduce((total, product) => {
  //     return total + product.price * (product.quantity || 1);
  //   }, 0);
  // };
  // let container = document.getElementById("container");

  // if (container) {
  //   let count = 30;

  //   for (var i = 0; i < count; i++) {
  //     let leftSnow = Math.floor(Math.random() * container.clientWidth);
  //     let topSnow = Math.floor(Math.random() * container.clientHeight);
  //     let widthSnow = Math.floor(Math.random() * 30);
  //     let timeSnow = Math.floor(Math.random() * 5 + 5);
  //     let blurSnow = Math.floor(Math.random() * 10);
  //     // console.log(leftSnow);
  //     let div = document.createElement("div");
  //     div.classList.add("snow");
  //     div.style.left = leftSnow + "px";
  //     div.style.top = topSnow + "px";
  //     div.style.width = widthSnow + "px";
  //     div.style.height = widthSnow + "px";
  //     div.style.animationDuration = timeSnow + "s";
  //     div.style.filter = "blur(" + blurSnow + "px)";
  //     container.appendChild(div);
  //   }
  // } else {
  //   console.error("Không tìm thấy phần tử 'container'");
  // }
  return (
    <div className="py-20 bg-gray-100">
      <div className="grid max-w-[95%]  px-4 pb-8 mx-auto ">
        <div className="flex w-[100%] px-5">
          <div className=" w-[17%]   h-auto mr-5">
            <h2 className="font-semibold text-3xl  leading-6">Danh mục</h2>
            {categories.map((item) => (
              <NavLink to={`/listproducts/${item.id}`}>
                <button
                  key={item.id}
                  onClick={() => handleGet(item.id)}
                  className="w-[100%] bg-white shadow-md px-4 flex items-center justify-between mt-5 py-1 rounded-xl mb-3"
                >
                  <span className="mr-2 font-medium text-lg">{item.name}</span>
                  <img
                    src={`${DOMAIN}${item.logo}`}
                    alt=""
                    className="w-[70px] h-[40px]"
                  />
                </button>
              </NavLink>
            ))}
          </div>
          <div className=" w-[83%] ">
            <div id="container">
              <div className="snow"></div>

              <div className="w-full h-[400px] rounded-3xl border border-solid bg-gray-50 bg-[url('https://fptshop.com.vn/Uploads/Originals/2021/12/20/637756009768148153_265645987_602450154204219_586930114020575363_n.png')] bg-no-repeat bg-center bg-cover"></div>
            </div>

            <div className="mt-2">
              <div className="flex items-center justify-between ">
                <h2 className="font-medium text-2xl "> </h2>

                <button className="bg-white px-4 py-2 rounded-lg ">
                  Tìm kiếm
                </button>
              </div>

              <div className="grid grid-cols-4 gap-4 mt-2">
                {products.map((item) => (
                  <div
                    key={item.id}
                    class="row-span-1  border border-solid rounded-3xl bg-white shadow-xl"
                  >
                    {item.product_detail &&
                      item.product_detail.map((detail, index) => (
                        <div
                          key={index}
                          className="py-8 flex flex-col items-center lg:relative"
                        >
                          <NavLink to={`/product_detail/${item.id}`}>
                            <div className="mb-4 xl:w-[200px] ">
                              <img
                                src={`${DOMAIN}${detail.image}`}
                                alt={`${detail.image}`}
                              />
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
                                Giảm{" "}
                                {formatPrice(
                                  `${detail.discount - detail.price} ₫`
                                )}
                              </p>
                            </div>
                          </NavLink>

                          <div className="text-center">
                            <div className="mb-2 px-4 min-h-[72px]">
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
                            {/* <div className="">
                              <span className="font-medium text-slate-800  text-lg">
                                {formatPrice(`${detail.color} `)}
                              </span>
                            </div> */}
                            {/* <div className="mb-4">
                              <span className="line-through text-gray-400 ">
                                {detail.discount}
                              </span>
                              <span className="ml-2 px-1 bg-orange-300 text-red-600 rounded-md font-normal">
                                -20%
                              </span>
                            </div> */}
                            <div>
                              <NavLink to={`/product_detail/${item.id}`}>
                                <button class="py-2 px-5 rounded-full bg-blue-400 text-white font-bold transition duration-500 transform hover:bg-blue-300 hover:scale-110 active:bg-blue-700 active:scale-98 focus:outline-none">
                                  Mua ngay
                                </button>
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
              {/* <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              /> */}
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
                {/* <ReactPaginate
                  nextLabel="next >"
                  onPageChange={changePage}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  pageCount={10}
                  previousLabel="< previous"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
                /> */}
              </div>
              {/* <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
