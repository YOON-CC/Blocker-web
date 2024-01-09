import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_REACT_APP_API_URL;

export const getBoardData = async (boardId: string, access_token: string) => {
    try {
        const response = await axios.get(`${API_URL}/boards/${boardId}`, {
            headers: {
                'Authorization': access_token,
            }
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error getting board data:', error);
        throw error;
    }
};

export const addBookmark = async (boardId: string, access_token: string) => {
    try {
        const response = await axios.post(`${API_URL}/bookmarks`, { boardId }, {
            headers: {
                'Authorization': access_token,
            }
        });

        if (response.status === 200) {
            return true;
        }
    } catch (error) {
        console.error('Error adding bookmark:', error);
        throw error;
    }
};

export const removeBookmark = async (boardId: string, access_token: string) => {
    try {
        const response = await axios.delete(`${API_URL}/bookmarks/${boardId}`, {
            headers: {
                'Authorization': access_token,
            }
        });

        if (response.status === 200) {
            return true;
        }
    } catch (error) {
        console.error('Error removing bookmark:', error);
        throw error;
    }
};

export const deleteBoard = async (boardId: string, access_token: string) => {
    try {
        const response = await axios.delete(`${API_URL}/boards/${boardId}`, {
            headers: {
                'Authorization': access_token,
            }
        });

        if (response.status === 200) {
            return true;
        }
    } catch (error) {
        console.error('Error deleting board:', error);
        throw error;
    }
};

export const createChatroom = async (boardId: string, access_token: string) => {
    try {
        const response = await axios.get(`${API_URL}/chatrooms/boards/${boardId}`, {
            headers: {
                'Authorization': access_token,
            }
        });

        if (response.status === 200) {
            return true;
        }
    } catch (error) {
        console.error('Error creating chatroom:', error);
        throw error;
    }
};