import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_REACT_APP_API_URL;

export const getBoardList1 = async (access_token: string | null) => {
    try {
        const response = await axios.get(`${API_URL}/bookmarks/boards`, {
            params: {
                size: 8,
                page: 0,
            },
            headers: {
                'Authorization': access_token,
            }
        });

        if (response.status === 200) {
            return response.data;
        }

        return [];
    } catch (error) {
        // 에러 처리
        throw error;
    }
};

export const getBoardList2 = async (access_token: string | null) => {
    try {
        const response = await axios.get(`${API_URL}/boards`, {
            params: {
                size: 8,
                page: 0,
            },
            headers: {
                'Authorization': access_token,
            }
        });

        if (response.status === 200) {
            return response.data;
        }

        return [];
    } catch (error) {
        // 에러 처리
        throw error;
    }
};

export const getSignatures = async (access_token: string | null) => {
    try {
        const response = await axios.get(`${API_URL}/signatures`, {
            headers: {
                'Authorization': access_token,
            }
        });

        if (response.status === 200) {
            return response.data.address;
        }

        return null;
    } catch (error) {
        // 에러 처리
        throw error;
    }
};