import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_REACT_APP_API_URL;

export const getContractsByState = async (state: string, access_token: string | null) => {
    try {
        const response = await axios.get(`${API_URL}/contracts`, {
            params: {
                state: state,
            },
            headers: {
                'Authorization': access_token,
            }
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        // 에러 처리
        throw error;
    }
};

export const getCancelContractsByState = async (state: string, access_token: string | null) => {
    try {
        const response = await axios.get(`${API_URL}/cancel-contracts`, {
            params: {
                state: state,
            },
            headers: {
                'Authorization': access_token,
            }
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        // 에러 처리
        throw error;
    }
};