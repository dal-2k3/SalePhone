import React, { Fragment, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AddProducts,
  deleteProduct,
  listProducts,
  updateProducts,
} from "../../../services/products/product";
import { Dialog, Transition } from "@headlessui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { DOMAIN } from "../../../utils/settings/config";
import { listCategories } from "../../../services/categories/categories";
import EditProduct from "./EditProduct";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function ListProducts() {
  const [products, setProducts] = useState([0]);
  const [reload, setReload] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const cancelButtonRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    idCategory: "",
    name: "",
    capacity: "",
    parameter: "",
    product_details: [
      { color: "", quantity: "", price: "", discount: "", image: "" },
    ],
    promotions: [{ gift: "", giftImage: "" }],
  });
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await listCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);
  const addDetail = () => {
    setProduct({
      ...product,
      product_details: [
        ...product.product_details,
        { color: "", quantity: "", price: "", discount: "", image: "" },
      ],
    });
  };

  const removeDetail = (index) => {
    const newDetails = [...product.product_details];
    newDetails.splice(index, 1);
    setProduct({
      ...product,
      product_details: newDetails,
    });
  };

  const handleChange = (field, event) => {
    setProduct({
      ...product,
      [field]: event.target.value,
    });
  };

  const handleDescriptionChange = (value) => {
    setProduct({ ...product, parameter: value });
  };

  const handleDetailChange = (index, field, event) => {
    const newDetails = [...product.product_details];
    if (field === "image") {
      const imageFile = event.target.files[0];
      if (imageFile) {
        newDetails[index][field] = imageFile;
      }
    } else {
      newDetails[index][field] = event.target.value;
    }
    setProduct({
      ...product,
      product_details: newDetails,
    });
  };

  const addPromotion = () => {
    setProduct({
      ...product,
      promotions: [...product.promotions, { gift: "", giftImage: "" }],
    });
  };

  const removePromotion = (index) => {
    const newPromotions = [...product.promotions];
    newPromotions.splice(index, 1);
    setProduct({
      ...product,
      promotions: newPromotions,
    });
  };

  const handlePromotionChange = (index, field, event) => {
    const newPromotions = [...product.promotions];
    if (field === "giftImage") {
      const imageFile = event.target.files[0];
      if (imageFile) {
        newPromotions[index][field] = imageFile;
      }
    } else {
      newPromotions[index][field] = event.target.value;
    }
    setProduct({
      ...product,
      promotions: newPromotions,
    });
  };
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("idCategory", product.idCategory);
      formData.append("name", product.name);
      formData.append("capacity", product.capacity);
      formData.append("parameter", product.parameter);

      if (product.product_details.length > 0) {
        product.product_details.forEach((detail, index) => {
          formData.append(`product_details[${index}][color]`, detail.color);
          formData.append(
            `product_details[${index}][quantity]`,
            detail.quantity
          );
          formData.append(`product_details[${index}][price]`, detail.price);
          formData.append(
            `product_details[${index}][discount]`,
            detail.discount
          );
          formData.append(`image`, detail.image);
        });
      }

      if (product.promotions.length > 0) {
        product.promotions.forEach((promotion, index) => {
          formData.append(`promotions[${index}][gift]`, promotion.gift);
          formData.append(`giftImage`, promotion.giftImage);
        });
      }
      await AddProducts(formData);
      setOpenAdd(false);
      setReload((prevReload) => !prevReload);
      setProduct({
        idCategory: "",
        name: "",
        capacity: "",
        parameter: "",
        product_details: [
          { color: "", quantity: "", price: "", discount: "", image: "" },
        ],
        promotions: [{ gift: "", giftImage: "" }],
      });
      toast.success('thêm sản phẩm thành công');
    } catch (error) {

      console.log(error);
      // Xử lý lỗi và hiển thị thông báo
      if (error.response) {
        // Nếu có response từ server
        const statusCode = error.response.status;
        if (statusCode === 500) {
          // Xử lý lỗi 500, 501 và hiển thị thông báo
          toast.warn('hình ảnh của bạn (phải là file ảnh)');
        } else {
          // Xử lý các lỗi khác và hiển thị thông báo
          const errorMessage = error.response.data.message || 'Đã xảy ra lỗi khi thêm sản phẩm.';
          toast.error(errorMessage);
        }
      } else {
        // Nếu không có response từ server (ví dụ: không thể kết nối đến server)
        toast.error('Unable to connect to the server. Please try again later.');
      }
    }
  };

  // edit product

  const handleEdit = (product) => {
    setEditingProduct(product);
  };
  const handleCancelEdit = () => {
    setEditingProduct(null);
  };
  const handleSaveEdit = async (editedProduct) => {
    try {
      // Gọi API để cập nhật thông tin product
      const updatedProduct = await updateProducts(
        editingProduct.id,
        editedProduct
      );
      // Cập nhật danh sách product
      const updatedProducts = products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
      console.log(editedProduct);
      setReload(!reload);
      setProducts(updatedProducts);
      setEditingProduct(null);
      toast.success("sửa sản phẩm thành công 😒")
    } catch (error) {
      console.error("Error updating Product:", error);
    }
  };
  // delete product 
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setReload(!reload);
      toast.success('xóa sản phẩm thành công');
    } catch (error) {
      console.log(error);
      if (error.response) {
        // Nếu có response từ server
        const statusCode = error.response.status;
        if (statusCode === 500) {
          // Xử lý lỗi 500, 501 và hiển thị thông báo
          toast.error('sản phẩm này đã tồn tại trong Order');
        } else {
          // Xử lý các lỗi khác và hiển thị thông báo
          const errorMessage = error.response.data.message || 'Đã xảy ra lỗi khi xóa sản phẩm.';
          toast.error(errorMessage);
        }
      } else {
        // Nếu không có response từ server (ví dụ: không thể kết nối đến server)
        toast.error('Unable to connect to the server. Please try again later.');
      }

    }
  }
  //  get list Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await listProducts();
        console.log(productsData);
        setProducts(productsData);
      } catch (error) {
        // Xử lý lỗi nếu cần
        console.log(error);
      }
    };
    fetchProducts();
  }, [reload]);
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

      <div className="max-w-full overflow-x-auto">
        <div className="mb-20">
          <div className="flex justify-between items-center mb-3">
            <div className="text-xl font-bold">Tất cả sản phẩm</div>
            <button
              onClick={() => setOpenAdd(true)}
              className=" bg-green-600 text-white py-1 px-2 mr-2 rounded transition duration-150 ease-in-out ..."
            >
              Add Product
            </button>
          </div>
          <hr className="border-1 border-solid mb-4" />
          <Transition.Root show={openAdd} as={Fragment}>
            <Dialog
              as="div"
              className=" relative z-50"
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
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-screen-xl ">
                      <button
                        type="button"
                        onClick={() => setOpenAdd(false)}
                        ref={cancelButtonRef}
                        className="absolute top-0 right-0 m-4 p-2 py-0.5 bg-red-500 text-white rounded"
                      >
                        X
                      </button>{" "}
                      <form>
                        <div className="w-5/5  mx-auto p-8 bg-white ">
                          <div className="flex sm:items-center">
                            <h1 className="  text-teal-700 text-2xl font-bold pl-5">
                              Add product
                            </h1>
                          </div>
                          <hr className=" border-solid border-[1.5px] my-5" />
                          <div className="grid grid-cols-1 md:grid-cols-3   gap-8">
                            {/* Cột 1 */}

                            <div className="col-span-1">
                              <div className="mb-4">
                                <label
                                  className="block text-lg font-bold mb-2 "
                                  htmlFor="category"
                                >
                                  Category:
                                </label>
                                <select
                                  id="idCategory"
                                  name="idCategory"
                                  value={product.idCategory}
                                  onChange={(event) =>
                                    handleChange("idCategory", event)
                                  }
                                  className="w-full py-2 px-3 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-400"
                                >
                                  <option selected>Danh Mục</option>
                                  {categories.map((category) => (

                                    <option
                                      key={category.id}
                                      value={category.id}
                                    >
                                      {category.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="mb-4">
                                <label
                                  className="block text-lg font-semibold mb-2"
                                  htmlFor="name"
                                >
                                  Product name:
                                </label>
                                <input
                                  type="text"
                                  id="name"
                                  name="name"
                                  value={product.name}
                                  onChange={(event) =>
                                    handleChange("name", event)
                                  }
                                  required
                                  placeholder="Type here..."
                                  className="w-full py-2 px-3 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-400"
                                />
                              </div>
                              <div className="mb-4">
                                <label
                                  className="block text-lg font-semibold mb-2"
                                  htmlFor="capacity"
                                >
                                  Capacity:
                                </label>
                                <input
                                  type="text"
                                  id="capacity"
                                  name="capacity"
                                  value={product.capacity}
                                  onChange={(event) =>
                                    handleChange("capacity", event)
                                  }
                                  required
                                  className="w-full py-2 px-3 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-400"
                                />
                              </div>
                              <div className="mb-4">
                                <label
                                  className="block text-lg font-semibold mb-2"
                                  htmlFor="parameter"
                                >
                                  Parameter:
                                </label>
                                <ReactQuill
                                  name="parameter"
                                  id="parameter"
                                  theme="snow"

                                  value={product.parameter}
                                  onChange={handleDescriptionChange}
                                  modules={{
                                    toolbar: [
                                      [{ font: [] }],
                                      [{ header: [1, 2, 3, 4, 5, 6, false] }],
                                      ["bold", "italic", "underline", "strike"],
                                      [{ color: [] }, { background: [] }],
                                      [{ script: "sub" }, { script: "super" }],
                                      ["blockquote", "code-block"],
                                      [{ list: "ordered" }, { list: "bullet" }],
                                      [
                                        { indent: "-1" },
                                        { indent: "+1" },
                                        { align: [] },
                                      ],
                                      ["link", "image", "video"],
                                      ["clean"],
                                    ],
                                  }}
                                />
                              </div>
                            </div>

                            {/* Cột 2 */}
                            <div className="col-span-1">
                              {/* Nội dung cột 2 */}
                              <label className="block text-2xl font-bold mb-2 text-sky-600">
                                Thêm quà tặng
                              </label>
                              {product.promotions.map((promotion, index) => (
                                <div
                                  key={index}
                                  className="mb-4 p-4 border rounded relative"
                                >
                                  <button
                                    type="button"
                                    onClick={() => removePromotion(index)}
                                    className="bg-red-500 text-white py-0.5 px-2 rounded absolute top-0 right-0 m-2 "
                                  >
                                    X
                                  </button>
                                  <label
                                    className="block text-lg font-semibold mb-2"
                                    htmlFor={`gift-${index}`}
                                  >
                                    Quà tặng:
                                  </label>
                                  <select
                                    name="gift"
                                    id={`gift-${index}`}
                                    value={promotion.gift}
                                    onChange={(event) =>
                                      handlePromotionChange(
                                        index,
                                        "gift",
                                        event
                                      )
                                    }
                                    required
                                    className="w-full py-2 px-3 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-400"
                                  >
                                    <option selected> chọn</option>
                                    <option
                                      className="bg-gray-100"
                                      value="tai nghe"
                                    >
                                      Tai nghe
                                    </option>
                                    <option
                                      className="bg-gray-100"
                                      value="sạc dự phòng"
                                    >
                                      Sạc dự phòng
                                    </option>
                                  </select>
                                  <label
                                    className="block text-lg font-semibold mb-2"
                                    htmlFor={`giftImage-${index}`}
                                  >
                                    Hình ảnh:
                                  </label>
                                  <input
                                    type="file"
                                    name="giftImage"
                                    id={`giftImage-${index}`}
                                    onChange={(event) =>
                                      handlePromotionChange(
                                        index,
                                        "giftImage",
                                        event
                                      )
                                    }
                                    required
                                    className="w-full py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-400"
                                  />
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={addPromotion}
                                className="border rounded-md border-dotted text-black py-2 px-4 mr-2 w-full mb-4"
                              >
                                <div className="flex justify-center items-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                  >
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v4h4v2h-4v4h-2v-4H7v-2h4z" />
                                  </svg>
                                  <p className="pl-1">Add New Field</p>
                                </div>
                              </button>
                            </div>

                            {/* Cột 3 */}
                            <div className="col-span-1">
                              {/* Nội dung cột 3 */}
                              <label className="block text-2xl font-bold mb-2 text-sky-600">
                                Thêm chi tiết sản phẩm
                              </label>
                              {product.product_details.map((detail, index) => (
                                <div
                                  key={index}
                                  className="mb-4 p-4 border rounded relative"
                                >
                                  <button
                                    type="button"
                                    onClick={() => removeDetail(index)}
                                    className="bg-red-500 text-white py-0.5 px-2 rounded absolute top-0 right-0 m-2"
                                  >
                                    X
                                  </button>
                                  <label
                                    className="block text-lg font-semibold mb-2"
                                    htmlFor={`color-${index}`}
                                  >
                                    Màu sắc:
                                  </label>
                                  <input
                                    type="text"
                                    name="color"
                                    id={`color-${index}`}
                                    value={detail.color}
                                    onChange={(event) =>
                                      handleDetailChange(index, "color", event)
                                    }
                                    required
                                    className="w-full py-2 px-3 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-400"
                                  />
                                  <label
                                    className="block text-lg font-semibold mb-2"
                                    htmlFor={`quantity-${index}`}
                                  >
                                    Số lượng:
                                  </label>
                                  <input
                                    type="number"
                                    name="quantity"
                                    id={`quantity-${index}`}
                                    value={detail.quantity}
                                    onChange={(event) =>
                                      handleDetailChange(
                                        index,
                                        "quantity",
                                        event
                                      )
                                    }
                                    required
                                    className="w-full py-2 px-3 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-400"
                                  />
                                  <label
                                    className="block text-lg font-semibold mb-2"
                                    htmlFor={`price-${index}`}
                                  >
                                    Giá:
                                  </label>
                                  <input
                                    type="number"
                                    name="price"
                                    id={`price-${index}`}
                                    value={detail.price}
                                    onChange={(event) =>
                                      handleDetailChange(index, "price", event)
                                    }
                                    required
                                    className="w-full py-2 px-3 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-400"
                                  />
                                  <label
                                    className="block text-lg font-semibold mb-2"
                                    htmlFor={`discount-${index}`}
                                  >
                                    Giảm Giá:
                                  </label>
                                  <input
                                    type="number"
                                    name="discount"
                                    id={`discount-${index}`}
                                    value={detail.discount}
                                    onChange={(event) =>
                                      handleDetailChange(
                                        index,
                                        "discount",
                                        event
                                      )
                                    }
                                    required
                                    className="w-full py-2 px-3 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-400"
                                  />
                                  <label
                                    className="block text-lg font-semibold mb-2"
                                    htmlFor={`image-${index}`}
                                  >
                                    Hình ảnh:
                                  </label>
                                  <input
                                    type="file"
                                    name="image"
                                    id={`image-${index}`}
                                    onChange={(event) =>
                                      handleDetailChange(index, "image", event)
                                    }
                                    required
                                    className="w-full py-2 px-3 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-400"
                                  />
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={addDetail}
                                className="border rounded-md border-dotted text-black py-2 px-4 mr-2 w-full mb-4"
                              >
                                <div className="flex justify-center items-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                  >
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v4h4v2h-4v4h-2v-4H7v-2h4z" />
                                  </svg>
                                  <p className="pl-1">Add New Field</p>
                                </div>
                              </button>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={handleSave}
                            className="bg-green-400 rounded-md  text-white py-2 px-4 w-full mb-4"
                          >
                            Add product
                          </button>
                        </div>
                      </form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>

          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Name
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Category
                </th>

                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Capacity
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Promotion
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id}>
                  {item.product_detail &&
                    item.product_detail.map((detail, index) => (
                      <td
                        key={index}
                        className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                          <div className="w-12 rounded-md">
                            <img
                              className="max-w-full"
                              src={`${DOMAIN}${detail.image}`}
                              alt=""
                            />
                          </div>

                          <b className="text-xs text-black dark:text-white">
                            {item.name}
                          </b>
                        </div>
                      </td>
                    ))}

                  {item.Categorie && typeof item.Categorie === "object" && (
                    <td
                      key={item.Categorie.id}
                      className="border-b border-[#eee] py-5 px-4 dark:border-strokedark"
                    >
                      <p
                        style={{ transition: "1s" }}
                        className="inline-flex rounded-full bg-amber-200 bg-opacity-50 hover:bg-slate-100 py-1 px-3 text-sm font-medium text-black"
                      >
                        {item.Categorie.name}
                      </p>
                    </td>
                  )}

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="inline-flex rounded-full bg-red-300 bg-opacity-50 py-1 px-3 text-sm font-medium text-orange-600">
                      {item.capacity}
                    </p>
                  </td>

                  {!item.product_promotion ||
                    item.product_promotion.length === 0 ? (
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <p className="inline-flex rounded-full bg-red-300 bg-opacity-0 py-1 px-3 text-sm font-medium text-orange-600">
                        Không có quà tặng nha..
                      </p>
                    </td>
                  ) : (
                    <td
                      className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11"
                    >

                      {item.product_promotion.map((promotion, index) => (
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center pb-3">
                          <div className="w-12 rounded-md">
                            <img
                              className="max-w-full"
                              src={`${DOMAIN}${promotion.image}`}
                              alt=""
                            />
                          </div>
                          <b className="text-xs text-black dark:text-white">
                            {promotion.gift}
                          </b>
                        </div>
                      ))}
                    </td>
                  )}

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="inline-flex rounded-full bg-green-200 bg-opacity-50 py-1 px-3 text-sm font-medium text-green-600">
                      {item.status}
                    </p>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <NavLink to={`/products/detail/${item.id}`}>
                        <button className="hover:text-primary">
                          <svg
                            className="fill-current text-indigo-600"
                            width="20"
                            height="20"
                            viewBox="0 -3 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                              fill=""
                            />
                            <path
                              d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                              fill=""
                            />
                          </svg>
                        </button>
                      </NavLink>

                      <button className="hover:text-primary"
                        onClick={() => handleDelete(item.id)}
                      >
                        <svg
                          className="fill-current text-red-500"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                            fill=""
                          />
                          <path
                            d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                            fill=""
                          />
                          <path
                            d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                            fill=""
                          />
                          <path
                            d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                            fill=""
                          />
                        </svg>
                      </button>
                      <button
                        className="hover:text-primary"
                        onClick={() => handleEdit(item)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="fill-current text-green-600"
                          width="18"
                          height="18"
                          enable-background="new 0 0 32 32"
                          viewBox="0 0 32 32"
                          id="update"
                        >
                          <path d="M23.7207 8.1641c-3.7872-3.7316-9.6125-4.1499-13.8605-1.2914L9.8483 5.2317c-.002-.2762-.2276-.4985-.5039-.4963L8.3445 4.7432C8.0684 4.7453 7.8464 4.9708 7.8484 5.2468L7.876 8.9893c.0039.5498.4512.9922 1 .9922.002 0 .0049 0 .0078 0l3.743-.0276c.2762-.002.4984-.2277.4963-.5039l-.0078-1.0001c-.0021-.2761-.2276-.4981-.5036-.4961l-.6362.0046c3.3478-1.6712 7.5305-1.1391 10.341 1.6295 2.6972 2.6588 3.4342 6.6558 1.9015 10.0831-.1091.244-.0197.5283.2183.65l.8925.456c.2529.1292.5727.0251.6901-.2334C27.9255 16.3433 27.0319 11.4282 23.7207 8.1641zM23.124 22.0186c-.002 0-.0049 0-.0078 0l-3.743.0275c-.2762.0021-.4984.2277-.4963.5039l.0078 1.0001c.0021.276.2276.498.5036.4961l.6356-.0046c-3.348 1.6708-7.53 1.1382-10.3404-1.6295-2.6972-2.6588-3.4342-6.6559-1.9015-10.0831.1091-.244.0197-.5283-.2183-.65l-.8925-.456c-.2529-.1292-.5727-.0251-.6901.2334-1.9068 4.2002-1.0131 9.1153 2.298 12.3795 2.1396 2.1084 4.9307 3.1592 7.7197 3.1592 2.1475 0 4.2929-.6252 6.1407-1.869l.0119 1.6421c.002.2762.2276.4985.5039.4964l.9999-.0078c.2761-.0022.4981-.2277.4961-.5037l-.0276-3.7424C24.1201 22.4609 23.6729 22.0186 23.124 22.0186z"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {editingProduct && (
                <EditProduct
                  product={editingProduct}
                  categories={categories}
                  onSave={handleSaveEdit}
                  onCancel={handleCancelEdit}
                />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
