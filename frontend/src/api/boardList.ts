import axios from 'axios';

export const fetchBoardList = async () => {
    try {
        const access_token = localStorage.getItem('access-token');
        const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/boards`, {
            params: {
                size: 8,
                page: 0,
            },
            headers: {
                'Authorization': access_token,
            },
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
        throw error;
    }
};