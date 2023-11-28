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