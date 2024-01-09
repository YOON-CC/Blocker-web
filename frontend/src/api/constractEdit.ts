import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_REACT_APP_API_URL;

export const getContractData = async (contractId: string, access_token: string) => {
    try {
        const response = await axios.get(`${API_URL}/contracts/${contractId}`, {
            params: {
                state: "NOT_CONCLUDED",
            },
            headers: {
                'Authorization': access_token,
            }
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error getting contract data:', error);
        throw error;
    }
};

export const editContract = async (contractId: string, title: string, content: string, access_token: string) => {
    try {
        const response = await axios.patch(`${API_URL}/contracts/${contractId}`, {
            title,
            content,
        }, {
            headers: {
                'Authorization': access_token,
            }
        });

        if (response.status === 200) {
            return true;
        }
    } catch (error) {
        console.error('Error editing contract:', error);
        throw error;
    }
};
