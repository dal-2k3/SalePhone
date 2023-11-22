import axios from 'axios';
import { DOMAIN } from '../../utils/settings/config';// Thay thế bằng API của bạn

export const listCategories = async () => {
    try {
        const response = await axios.get(`${DOMAIN}api/v1/categories/all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
export const AddCategories = async (category) => {
    try {
        const response = await axios.post(`${DOMAIN}api/v1/categories/`, category, {
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
export const updateCategory = async (id, category) => {
    try {
        const response = await axios.put(`${DOMAIN}api/v1/categories/${id}`, category, {
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
export const deleteCategory = async (id) => {
    try {
        const response = await axios.delete(`${DOMAIN}api/v1/categories/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};