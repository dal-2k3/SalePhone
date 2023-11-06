import axios from 'axios';
const apiUrl = 'http://localhost:8000/api/v1/categories/'; // Thay thế bằng API của bạn

export const listCategories = async () => {
    try {
        const response = await axios.get(`${apiUrl}all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
export const AddCategories = async (category) => {
    try {
        const response = await axios.post(`${apiUrl}`, category, {
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