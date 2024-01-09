import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_REACT_APP_API_URL;

export const getCancelingContractData = async (contractId: string, access_token: string) => {
    try {
        const response = await axios.get(`${API_URL}/cancel-contracts/canceling/${contractId}`, {
            headers: {
                'Authorization': access_token,
            }
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error getting canceling contract data:', error);
        throw error;
    }
};

export const getCanceledContractData = async (contractId: string, access_token: string) => {
    try {
        const response = await axios.get(`${API_URL}/cancel-contracts/canceled/${contractId}`, {
            headers: {
                'Authorization': access_token,
            }
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error getting canceled contract data:', error);
        throw error;
    }
};

export const patchCancelSign = async (contractId: string, access_token: string) => {
    try {
        const response = await axios.patch(`${API_URL}/cancel-signs/cancel-contract/${contractId}`, {}, {
            headers: {
                'Authorization': access_token,
            }
        });

        if (response.status === 200) {
            return true;
        }
    } catch (error) {
        console.error('Error patching cancel sign:', error);
        throw error;
    }
};

export const patchAgreementSign = async (contractId: string, access_token: string) => {
    try {
        const response = await axios.patch(`${API_URL}/agreement-signs/contract/${contractId}`, {}, {
            headers: {
                'Authorization': access_token,
            }
        });

        if (response.status === 200) {
            return true;
        }
    } catch (error) {
        console.error('Error patching agreement sign:', error);
        throw error;
    }
};
