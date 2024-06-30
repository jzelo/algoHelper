import axios from 'axios';

const API_URL = 'http://'

export const createUser = async (username: String, email: String) => {
    try {
        const response = await axios.post(`${API_URL}/users`, {username, email});
        return response.data;
    } catch (error) {
        console.error('Error creating user: ', error);
        throw error;
    }
};

export const createQuestion = async (content: String, userId: String) => {
    try {
        const response = await axios.post(`{API_URL}/questions`, {content, userId: userId});
        return response.data;
    } catch (error) {
        console.error('Error creating question: ', error);
        throw error;
    }
}