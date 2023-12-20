import axios from 'axios';
import { DOMAIN } from '../../utils/settings/config';

export const listProducts = async () => {
    try {
        const response = await axios.get(`${DOMAIN}api/v1/products/`);
        return response.data;
    } catch (error) {
        console.error('Error get products:', error);
        throw error;
    }
};
export const getProductsByCategory = async (id) => {
    try {
        const response = await axios.get(`${DOMAIN}api/v1/products/category/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error get products:', error);
        throw error;
    }
};
export const AddProducts = async (product) => {
    try {
        const response = await axios.post(`${DOMAIN}api/v1/products/`, product, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
export const updateProducts = async (id, product) => {
    try {
        const response = await axios.put(`${DOMAIN}api/v1/products/${id}`, product);
        return response.data;
    } catch (error) {
        console.error('Error update products:', error);
        throw error;
    }
};
export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${DOMAIN}api/v1/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error delete product:', error);
        throw error;
    }
};
// product detail
export const getProductDetail = async (id) => {
    try {
        const response = await axios.get(`${DOMAIN}api/v1/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error get product detail:', error);
        throw error;
    }
};
export const addProductDetail = async (detail) => {
    try {
        const response = await axios.post(`${DOMAIN}api/v1/products/detail`, detail,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        return response.data;
    } catch (error) {
        console.error('Error fetching product detail:', error);
        throw error;
    }
};
export const updateProductDetail = async (id, detail) => {
    try {
        const response = await axios.put(`${DOMAIN}api/v1/products/detail/${id}`, detail,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        return response.data;
    } catch (error) {
        console.error('Error update product detail:', error);
        throw error;
    }
};
export const deleteProductDetail = async (id) => {
    try {
        const response = await axios.delete(`${DOMAIN}api/v1/products/detail/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error Delete product detail:', error);
        throw error;
    }
};
// product promotion

export const addProductPromotion = async (promotion) => {
    try {
        const response = await axios.post(`${DOMAIN}api/v1/products/promotion`, promotion,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        return response.data;
    } catch (error) {
        console.error('Error fetching product detail:', error);
        throw error;
    }
};
export const updateProductPromotion = async (id, promotion) => {
    try {
        const response = await axios.put(`${DOMAIN}api/v1/products/promotion/${id}`, promotion,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        return response.data;
    } catch (error) {
        console.error('Error update product detail:', error);
        throw error;
    }
};
export const deleteProductPromotion = async (id) => {
    try {
        const response = await axios.delete(`${DOMAIN}api/v1/products/promotion/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error Delete product promotion:', error);
        throw error;
    }
};