import axios from 'axios';

export const getBoardData = async (boardId: string, access_token: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/boards/${boardId}`, {
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

export const uploadImages = async (selectedImages: File[], access_token: string) => {
    if (selectedImages.length === 0) {
        return [];
    }

    try {
        const formData = new FormData();
        const lastIndex = selectedImages.length - 1;
        formData.append('image', selectedImages[lastIndex], 'image.png');

        const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/images`, formData, {
            headers: {
                'Authorization': access_token,
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status === 201) {
            return [response.data.address];
        }
    } catch (error) {
        console.error('Error uploading images:', error);
        throw error;
    }
};

export const editBoard = async (boardId: string, title: string, content: string, images: string[], removeImg: number[], access_token: string) => {
    try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/boards/${boardId}`, {
            title,
            content,
            info: "부산 남구 대연동 부경대학교",
            representImage: images[0],
            contractId: 6,
            deleteImageIds: removeImg,
            addImageAddresses: images,
        }, {
            headers: {
                'Authorization': access_token,
            }
        });

        if (response.status === 201) {
            console.log("Board edited successfully");
        }
    } catch (error) {
        console.error('Error editing board:', error);
        throw error;
    }
};