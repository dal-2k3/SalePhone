import axios from 'axios';
import { DOMAIN } from '../../utils/settings/config';


export const createOrder = async (data) => {
    try {
        const response = await axios.post(`${DOMAIN}api/v1/orders/`, data);
        return response.data;
    } catch (error) {
        console.error('Error feching order:', error);
        throw error;
    }
};
export const getOrders = async () => {
    try {
        const response = await axios.get(`${DOMAIN}api/v1/orders/`);
        return response.data;
    } catch (error) {
        console.error('Error get orders list:', error);
        throw error;
    }
};
export const getOrderByPhone = async (phone) => {
    try {
        const response = await axios.get(`${DOMAIN}api/v1/orders/order/${phone}`);
        return response.data;
    } catch (error) {
        console.error('Error get orders list:', error);
        throw error;
    }
};
export const updateOrder = async (id, data) => {
    try {
        const response = await axios.put(`${DOMAIN}api/v1/orders/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error update order list:', error);
        throw error;
    }
};
export const deleteOrder = async (id) => {
    try {
        const response = await axios.delete(`${DOMAIN}api/v1/orders/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error update order list:', error);
        throw error;
    }
};
// order detail
export const getOrderDetail = async (id) => {
    try {
        const response = await axios.get(`${DOMAIN}api/v1/orders/detail/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error update order list:', error);
        throw error;
    }
};
