import { DOMAIN } from "../../utils/settings/config";
import axios from "axios";

export const loginUser = async (user) => {
  try {
    const response = await axios.post(`${DOMAIN}api/v1/users/login`, user);
    const token = response.data.token;
    // Lưu token vào localStorage
    localStorage.setItem('token', token);
    return response.data;
  } catch (err) {
    console.log('Error login:', err);
    throw err;
  }
};

export const registerUser = async (user) => {
  try {
    await axios.post(`${DOMAIN}api/v1/users/register`, user);
  } catch (err) {
    console.log('Error register:', err);
    throw err;
  }
};
export const logoutUser = async () => {
  try {
    // Xóa token khỏi localStorage
    localStorage.removeItem('token');
  } catch (error) {
    console.log('Error Logout:', error);
    throw error;
  }

};