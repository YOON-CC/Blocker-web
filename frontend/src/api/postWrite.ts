import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_REACT_APP_API_URL;

export const uploadImages = async (images: File[], access_token: string | null) => {
    try {
        if (images.length === 0) {
            return [];
        }

        const formData = new FormData();
        const lastIndex = images.length - 1;
        formData.append('image', images[lastIndex], 'image.png'); 

        const response = await axios.post(`${API_URL}/images`, formData, {
            headers: {
                'Authorization': access_token,
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status === 201) {
            return [response.data.address];
        }

        return [];
    } catch (error) {
        // 에러 처리
        throw error;
    }
};

export const postBoard = async (boardData: {title: string; content: string; info: string; representImage: string; contractId: string; images: string[]; }, access_token: string | null) => {
    try {
        const response = await axios.post(`${API_URL}/boards`, boardData, {
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