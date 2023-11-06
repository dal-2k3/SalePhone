import axios from 'axios';
const apiUrl = 'http://localhost:8000/api/v1/products/'; // Thay thế bằng API của bạn

export const listProducts = async () => {
    try {
        const response = await axios.get(`${apiUrl}all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
export const AddProducts = async (product) => {
    try {
        const response = await axios.post(`${apiUrl}`, product, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

// image

export const AddImages = async (idProduct, images) => {
    try {
        const response = await axios.post(`${apiUrl}upload/`, idProduct, images);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
// product detail
export const AddProductDetail = async (productdetail) => {
    try {
        const response = await axios.post(`${apiUrl}detail/`, productdetail);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};