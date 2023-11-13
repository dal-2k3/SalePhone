import axios from 'axios';
import { DOMAIN } from '../../utils/settings/config';


// Thay thế bằng API của bạn

export const listProducts = async () => {
    try {
        const response = await axios.get(`${DOMAIN}/api/v1/products/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
export const AddProducts = async (product) => {
    try {
        const response = await axios.post(`${DOMAIN}/api/v1/products/`, product, {
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
// product detail
export const getProductDetail = async (id) => {
    try {
        const response = await axios.get(`${DOMAIN}/api/v1/products/detail/`, id);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};