import React, { Fragment, useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getProductsByCategory, listProducts } from "../services/products/product";
import { listCategories } from "../services/categories/categories";
import { DOMAIN } from "../utils/settings/config";

export default function ListProducts() {
  const [categories, setcategories] = useState([0]);
  const [products, setProducts] = useState([0]);
  const [reload, setReload] = useState(false);
  const { id } = useParams();
  const handleGet = async (id) => {
    try {
      const product = await getProductsByCategory(id);
      console.log(id)
      setProducts(product);
    } catch (error) {
      console.log(error)
    }
  };
  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  // get list categories
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
  // get list products
  useEffect(() => {
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
  }, [reload]);

  return (
    <div>
      <div className="grid max-w-[95%]  px-4 pt-20 pb-8 mx-auto lg:gap-8  lg:py-16 lg:pt-10 bg-cyan-100">
        <div className="flex w-[100%] px-5">
          <div className=" w-[17%]   h-auto mr-5">
            <h2 className="font-semibold text-3xl  leading-6">Danh mục</h2>
            {categories.map((item) => (
              <button key={item.id}
                onClick={() => handleGet(item.id)}
                className="w-[100%] bg-gray-50 px-4 flex items-center justify-between mt-5 py-1 rounded-xl mb-3">
                <span className="mr-2 font-medium text-lg">{item.name}</span>
                <img
                  src={`${DOMAIN}${item.logo}`}
                  alt=""
                  className="w-[70px] h-[40px]"
                />
              </button>
            ))}

          </div>
          <div className=" w-[83%] ">
            <div className="w-full h-[400px] rounded-3xl border border-solid bg-gray-50 bg-[url('https://i.imgur.com/jY5KJsC.jpg')] bg-no-repeat bg-center bg-cover">
              {/* <img src="https://i.imgur.com/jY5KJsC.jpg" alt="" className="w-full h-full oject-cover" /> */}
            </div>
            {products.map((item) => (
              <div className="mt-5">
                <div className="flex items-center justify-between ">
                  {item.Categorie && typeof item.Categorie === "object" && (
                    <h2 className="font-medium text-2xl "> {item.Categorie.name}</h2>
                  )}
                  <button className="bg-white px-4 py-2 rounded-lg ">
                    Filter
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-4 mt-4">
                  <div key={item.id} class="row-span-1  border border-solid rounded-3xl bg-white shadow-xl">
                    {item.product_detail &&
                      item.product_detail.map((detail, index) => (
                        <div key={index} className="py-8 flex flex-col items-center">
                          <NavLink to={`/product_detail/${item.id}`}>
                            <div className="mb-4 xl:w-[200px] ">
                              <img
                                src={`${DOMAIN}${detail.image}`}
                                alt={`${detail.image}`}
                              />
                            </div>
                          </NavLink>

                          <div className="text-center">
                            <div className="mb-2">

                              <a href={`/product_detail/${item.id}`} className="font-bold">
                                {item.name} {item.capacity}
                              </a>

                            </div>
                            <div className="">
                              <span className="font-medium text-orange-500 text-lg">
                                {formatPrice(`${detail.price} ₫`)}
                              </span>
                            </div>
                            <div className="">
                              <span className="font-medium text-slate-800  text-lg">
                                {formatPrice(`${detail.color} `)}
                              </span>
                            </div>
                            <div className="mb-4">
                              <span className="line-through text-gray-400 ">
                                {detail.discount}
                              </span>
                              <span className="ml-2 px-1 bg-orange-300 text-red-600 rounded-md font-normal">
                                -20%
                              </span>
                            </div>
                            <div>
                              <NavLink to={`/product_detail/${item.id}`}>
                                <button
                                  type="button"
                                  className="py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-blue-400 rounded-full border border-gray-200  focus:z-10 focus:ring-4  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                >
                                  Mua ngay
                                </button>
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                </div>
              </div>))}
          </div>
        </div>
      </div>
    </div>
  );
}
