import React, { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { listCategories } from "../../../services/categories/categories";
import { AddProducts } from "../../../services/products/product";


const AddProduct = () => {
    const [categories, setcategories] = useState([0]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const categoriesData = await listCategories();
                setcategories(categoriesData);
            } catch (error) {
                // Xử lý lỗi nếu cần
            }
        };
        fetchUsers();
    }, []);
    const [product, setProduct] = useState({
        idCategory: '1',
        name: '',
        capacity: '',
        parameter: '',
        product_details: [{ color: '', quantity: '', price: '', discount: '', image: '' }],
    });

    const addDetail = () => {
        setProduct({
            ...product,
            product_details: [...product.product_details, { color: '', quantity: '', price: '', discount: '', image: '' }],
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

        if (field === 'image') {
            const imageFile = event.target.files[0];

            if (imageFile) {
                // Lưu đối tượng File vào state
                newDetails[index][field] = imageFile;

                // Nếu bạn muốn lấy tên file, bạn có thể sử dụng imageFile.name
                console.log('Tên ảnh:', imageFile.name);
            }
        } else {
            newDetails[index][field] = event.target.value;
        }
        setProduct({
            ...product,
            product_details: newDetails,
        });
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('idCategory', product.idCategory);
        formData.append('name', product.name);
        formData.append('capacity', product.capacity);
        formData.append('parameter', product.parameter);
        // Để thêm một mảng JSON vào FormData, bạn không nên sử dụng JSON.stringify, hãy gửi từng phần tử trong mảng một
        // Sử dụng vòng lặp để thêm từng màu sắc vào FormData
        product.product_details.forEach((color, index) => {
            formData.append(`product_details[${index}][color]`, color.color);
            formData.append(`product_details[${index}][quantity]`, color.quantity);
            formData.append(`product_details[${index}][price]`, color.price);
            formData.append(`product_details[${index}][discount]`, color.discount);
            formData.append(`image`, color.image);
        });
        console.log(formData);
        // await AddProducts(formData);

    };
    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Thêm Sản Phẩm</h1>
            <form >
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2" htmlFor="category">
                        Danh mục:
                    </label>
                    <select
                        id="idCategory"
                        name="idCategory"
                        value={product.idCategory}
                        onChange={(event) => handleChange('idCategory', event)}
                        className="w-full py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-400"
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2" htmlFor="name">
                        Tên sản phẩm:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={(event) => handleChange('name', event)}
                        required
                        className="w-full py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-400"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2" htmlFor="capacity">
                        Dung lượng:
                    </label>
                    <input
                        type="text"
                        id="capacity"
                        name="capacity"
                        value={product.capacity}
                        onChange={(event) => handleChange('capacity', event)}
                        className="w-full py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-400"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2" htmlFor="parameter">
                        Thống số:
                    </label>
                    <ReactQuill
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


                {product.product_details.map((detail, index) => (
                    <div key={index} className="mb-4 p-4 border rounded relative">
                        <button
                            type="button"
                            onClick={() => removeDetail(index)}
                            className="bg-red-500 text-white py-1 px-2 rounded absolute top-0 right-0 m-2"
                        >
                            X
                        </button>
                        <label className="block text-sm font-semibold mb-2" htmlFor={`color-${index}`}>
                            Màu sắc:
                        </label>
                        <input
                            type="text"
                            name="color"
                            id={`color-${index}`}
                            value={detail.color}
                            onChange={(event) => handleDetailChange(index, 'color', event)}
                            required
                            className="w-full py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-400"
                        />
                        <label className="block text-sm font-semibold mb-2" htmlFor={`quantity-${index}`}>
                            Số lượng:
                        </label>
                        <input
                            type="number"
                            name="quantity"
                            id={`quantity-${index}`}
                            value={detail.quantity}
                            onChange={(event) => handleDetailChange(index, 'quantity', event)}
                            required
                            className="w-full py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-400"
                        />
                        <label className="block text-sm font-semibold mb-2" htmlFor={`price-${index}`}>
                            Giá:
                        </label>
                        <input
                            type="number"
                            name="price"
                            id={`price-${index}`}
                            value={detail.price}
                            onChange={(event) => handleDetailChange(index, 'price', event)}
                            required
                            className="w-full py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-400"
                        />
                        <label className="block text-sm font-semibold mb-2" htmlFor={`discount-${index}`}>
                            Giảm Giá:
                        </label>
                        <input
                            type="number"
                            name="discount"
                            id={`discount-${index}`}
                            value={detail.discount}
                            onChange={(event) => handleDetailChange(index, 'discount', event)}
                            required
                            className="w-full py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-400"
                        />
                        <label className="block text-sm font-semibold mb-2" htmlFor={`image-${index}`}>
                            Hình ảnh:
                        </label>
                        <input
                            type="file"
                            name="image"
                            id={`image-${index}`}

                            onChange={(event) => handleDetailChange(index, 'image', event)}
                            required
                            className="w-full py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-400"
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addDetail}
                    className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
                >
                    +
                </button>
                <button type="button" onClick={handleSave} className="bg-green-500 text-white py-2 px-4 rounded">
                    Lưu
                </button>
            </form>
        </div>
    );
};

export default AddProduct;