import axios from 'axios';
import { DOMAIN } from '../../utils/settings/config';

export const createComment = async (data) => {
    try {
        const response = await axios.post(`${DOMAIN}api/v1/comments/`, data);
        return response.data;
    } catch (error) {
        console.error('Error fetching comment:', error);
        throw error;
    }
};
export const getComments = async (id) => {
    try {
        const response = await axios.get(`${DOMAIN}api/v1/comments/${id}`,);
        return response.data;
    } catch (error) {
        console.error('Error get comment ', error);
        throw error;
    }
};
export const getCommentsPrivate = async () => {
    try {
        const response = await axios.get(`${DOMAIN}api/v1/comments/private`);
        return response.data;
    } catch (error) {
        console.error('Error get comment Private:', error);
        throw error;
    }
};
export const getCommentsPublic = async () => {
    try {
        const response = await axios.get(`${DOMAIN}api/v1/comments/public`);
        return response.data;
    } catch (error) {
        console.error('Error get comments Public:', error);
        throw error;
    }
};
export const updateComments = async (id, data) => {
    try {
        const response = await axios.put(`${DOMAIN}api/v1/comments/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error update comments Public:', error);
        throw error;
    }
};
export const deleteComments = async (id) => {
    try {
        const response = await axios.delete(`${DOMAIN}api/v1/comments/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error get comments Public:', error);
        throw error;
    }
};