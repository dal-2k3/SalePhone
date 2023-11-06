// api.js
import axios from 'axios';
const apiUrl = 'http://localhost:8000/api/v1/users/'; // Thay thế bằng API của bạn

export const getUsers = async () => {
    try {
        const response = await axios.get(`${apiUrl}all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
export const updateUser = async (userId, user) => {
    const response = await fetch(`${apiUrl}/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    const data = await response.json();
    return data;
};
export const deleteUser = async (userId) => {
    await fetch(`${apiUrl}/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },

    });

};
