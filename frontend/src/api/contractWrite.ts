import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_REACT_APP_API_URL;

export const postContract = async (title: string, content: string, access_token: string | null) => {
    try {
        const response = await axios.post(`${API_URL}/contracts`, {
            title: title,
            content: content,
        }, {
            headers: {
                'Authorization': access_token,
            }
        });

        if (response.status === 201) {
            return true;
        }

        return false;
    } catch (error) {
        // 에러 처리
        throw error;
    }
};