// api.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_REACT_APP_API_URL;

export const getContractData = async (contractId: string, access_token: string) => {
    try {
        const response = await axios.get(`${API_URL}/contracts/not-proceed/${contractId}`, {
            headers: {
                'Authorization': access_token,
            },
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error getting contract data:', error);
        throw error;
    }
};

export const getProceedContractData = async (contractId: string, access_token: string) => {
    try {
        const response = await axios.get(`${API_URL}/contracts/proceed/${contractId}`, {
            headers: {
                'Authorization': access_token,
            },
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error getting proceed contract data:', error);
        throw error;
    }
};

export const getConcludeContractData = async (contractId: string, access_token: string) => {
    try {
        const response = await axios.get(`${API_URL}/contracts/conclude/${contractId}`, {
            headers: {
                'Authorization': access_token,
            },
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error getting conclude contract data:', error);
        throw error;
    }
};

export const getCancelingContractData = async (contractId: string, access_token: string) => {
    try {
        const response = await axios.get(`${API_URL}/cancel-contracts/canceling/${contractId}`, {
            headers: {
                'Authorization': access_token,
            },
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
            },
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error getting canceled contract data:', error);
        throw error;
    }
};

export const searchUser = async (keyword: string, access_token: string) => {
    try {
        const response = await axios.get(`${API_URL}/users/search`, {
            params: {
                keyword,
            },
            headers: {
                'Authorization': access_token,
            },
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error searching user:', error);
        throw error;
    }
};

export const proceedContract = async (contractId: string, contractors: string[], access_token: string) => {
    try {
        const response = await axios.post(`${API_URL}/agreement-signs`, {
            contractId,
            contractors,
        }, {
            headers: {
                'Authorization': access_token,
            },
        });

        if (response.status === 201) {
            return true;
        }
    } catch (error) {
        console.error('Error proceeding contract:', error);
        throw error;
    }
};

export const signContract = async (contractId: string, access_token: string) => {
    try {
        const response = await axios.patch(`${API_URL}/agreement-signs/contract/${contractId}`, {}, {
            headers: {
                'Authorization': access_token,
            },
        });

        if (response.status === 200) {
            return true;
        }
    } catch (error) {
        console.error('Error signing contract:', error);
        throw error;
    }
};

export const registerCancelSign = async (contractId: string, access_token: string) => {
    try {
        const response = await axios.patch(`${API_URL}/cancel-signs/contract/${contractId}`, {}, {
            headers: {
                'Authorization': access_token,
            },
        });

        if (response.status === 200) {
            return true;
        }
    } catch (error) {
        console.error('Error registering cancel sign:', error);
        throw error;
    }
};

export const deleteContract = async (contractId: string, access_token: string) => {
    try {
        const response = await axios.delete(`${API_URL}/agreement-signs/contract/${contractId}`, {
            headers: {
                'Authorization': access_token,
            },
        });

        if (response.status === 200) {
            return true;
        }
    } catch (error) {
        console.error('Error deleting contract:', error);
        throw error;
    }
};

export const deleteAllRelatedBoards = async (contractId: string, access_token: string) => {
    try {
        const response = await axios.delete(`${API_URL}/contracts/with-boards/${contractId}`, {
            headers: {
                'Authorization': access_token,
            },
        });

        if (response.status === 200) {
            return true;
        }
    } catch (error) {
        console.error('Error deleting all related boards:', error);
        throw error;
    }
};

