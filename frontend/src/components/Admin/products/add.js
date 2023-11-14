import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { listCategories } from "../../../services/categories/categories";
import { AddProducts } from "../../../services/products/product"; // Đổi tên hàm gọi API để tuân thủ quy tắc đặt tên

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    idCategory: "1",
    name: "",
    capacity: "",
    parameter: "",
    product_details: [
      { color: "", quantity: "", price: "", discount: "", image: "" },
    ],
    promotions: [{ gift: "", image: "" }],
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
      promotions: [...product.promotions, { gift: "", image: "" }],
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
    if (field === "image") {
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

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("idCategory", product.idCategory);
      formData.append("name", product.name);
      formData.append("capacity", product.capacity);
      formData.append("parameter", product.parameter);

      product.product_details.forEach((detail, index) => {
        formData.append(`product_details[${index}][color]`, detail.color);
        formData.append(`product_details[${index}][quantity]`, detail.quantity);
        formData.append(`product_details[${index}][price]`, detail.price);
        formData.append(`product_details[${index}][discount]`, detail.discount);
        formData.append(`image`, detail.image);
      });

      if (product.promotions.length > 0) {
        product.promotions.forEach((promotion, index) => {
          formData.append(`promotions[${index}][gift]`, promotion.gift);
          formData.append(`image`, promotion.image);
        });
      }

      await AddProducts(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-300">
      <div className="w-[40rem] mx-auto p-8 bg-white">
        <div className="flex  sm:items-center">
          <img
            src="https://cdn.iconscout.com/icon/premium/png-256-thumb/product-development-5785359-4839159.png"
            alt=""
            className="w-[50px] h-[50px] "
          />
          <h1 className="text-2xl font-bold pl-2">Thêm Sản Phẩm</h1>
        </div>
        <hr className=" border-solid border-[1.5px] my-5" />
        <form>
          <div className="mb-4">
            <label className="block text-lg font-bold mb-2 " htmlFor="category">
              Danh mục
            </label>
            <select
              id="idCategory"
              name="idCategory"
              value={product.idCategory}
              onChange={(event) => handleChange("idCategory", event)}
              className="w-full py-2 px-3 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-400"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2" htmlFor="name">
              Tên sản phẩm:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={(event) => handleChange("name", event)}
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
              Dung lượng:
            </label>
            <input
              type="text"
              id="capacity"
              name="capacity"
              value={product.capacity}
              onChange={(event) => handleChange("capacity", event)}
              className="w-full py-2 px-3 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-lg font-semibold mb-2"
              htmlFor="parameter"
            >
              Thống số:
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
                  [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
                  ["link", "image", "video"],
                  ["clean"],
                ],
              }}
            />
          </div>
          <label className="block text-2xl font-bold mb-2 text-cyan-400">
            Thêm quà tặng
          </label>
          {product.promotions.map((promotion, index) => (
            <div key={index} className="mb-4 p-4 border rounded relative">
              <button
                type="button"
                onClick={() => removePromotion(index)}
                className="bg-red-500 text-white py-1 px-2 rounded absolute top-0 right-0 m-2 "
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
                  handlePromotionChange(index, "gift", event)
                }
                required
                className="w-full py-2 px-3 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-400"
              >
                <option className="bg-gray-100" value="tai nghe">
                  Tai nghe
                </option>
                <option className="bg-gray-100" value="sạc dự phòng">
                  Sạc dự phòng
                </option>
              </select>
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
                  handlePromotionChange(index, "image", event)
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

          <label className="block text-2xl font-bold mb-2 text-cyan-400 ">
            {" "}
            Thêm chi tiết sản phẩm
          </label>

          {product.product_details.map((detail, index) => (
            <div key={index} className="mb-4 p-4 border rounded relative">
              <button
                type="button"
                onClick={() => removeDetail(index)}
                className="bg-red-500 text-white py-1 px-2 rounded absolute top-0 right-0 m-2"
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
                onChange={(event) => handleDetailChange(index, "color", event)}
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
                  handleDetailChange(index, "quantity", event)
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
                onChange={(event) => handleDetailChange(index, "price", event)}
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
                  handleDetailChange(index, "discount", event)
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
                onChange={(event) => handleDetailChange(index, "image", event)}
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
          <button
            type="button"
            onClick={handleSave}
            className="bg-green-500 rounded-md  text-white py-2 px-4 w-full mb-4"
          >
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
