'use client'

import React, { useState, useEffect} from 'react';
// import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Header from '@/components/Header';
import axios from 'axios';
import { uploadImages, postBoard } from '@/api/postWrite';
import * as Styled from '@/styles/postwrite.styles'


const Postwrite = () => {
    const access_token = localStorage.getItem('access-token');
    console.log(access_token)
    

    //로컬에서 이미지 가져오는 코드
    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const newSelectedImages = Array.from(selectedFiles).filter(file => file.type === 'image/png');
            setSelectedImages(prevImages => [...prevImages, ...newSelectedImages]);
        }
    };

    //png 파일을 서버에 보내고 주소를 받는 코드
    const [images, setImages] = useState<string[]>([]);

    const handlePngToUrl = async () => {
        const images = await uploadImages(selectedImages, access_token);
        setImages(prevImages => [...prevImages, ...images]);
    };

    useEffect(() => {
        // 페이지가 로드될 때 한 번만 호출되는 로직
        handlePngToUrl();
    }, [selectedImages]);

    // 전체 데이터 전송 코드
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [selectContract, setSelectContract] = useState('');
    const [content, setContent] = useState('');

    const handletitleChange = (event : any) => {
        setTitle(event.target.value)
    };

    const handlelocationChange = (event : any) => {
        setLocation(event.target.value)
    };
    
    const handleSelectContract = (event : any) => {
        setSelectContract(event.target.value)
    };

    const handlecontentChange = (event : any) => {
        setContent(event.target.value)
    };

    const handleBoardPost = async (event: any) => {
        event.preventDefault();
        try {
            const success = await postBoard({
                title: title,
                content: content,
                info: location,
                representImage: images[0],
                contractId: selectContract,
                images: images,
            }, access_token);

            if (success) {
                console.log("옴");
            }

        } catch (error) {
            // 에러 처리 코드
        }
    };

    return (
        <div>
            <Header />
            <Styled.Container>
                <Styled.Container_tip>🙌게시글을 작성하고, 동업자를 구해보세요!</Styled.Container_tip>
                <Styled.Container_title placeholder='제목을 작성해주세요.' onChange={handletitleChange}></Styled.Container_title>
                <Styled.Container_img_select>
                    {selectedImages.map((image, index) => (
                        <div key={index}>
                            <Styled.Container_img src={URL.createObjectURL(image)} alt={`Selected ${index}`} style={{ width: 'fit-content', height: '50px', marginRight : '30px'}}></Styled.Container_img>
                        </div>
                    ))}
                    <Styled.StyledLabel htmlFor="upload">+</Styled.StyledLabel>
                    <Styled.Container_img_select_btn type="file" accept="image/png" multiple onChange={handleImageChange} id="upload"></Styled.Container_img_select_btn>
                </Styled.Container_img_select>
                <Styled.Container_info_container>
                    <Styled.Container_info_container_select_location  placeholder='위치를 입력해주세요.' onChange={handlelocationChange}></Styled.Container_info_container_select_location>
                    <Styled.Container_info_container_select_contract placeholder='계약서 번호를 입력해주세요' onChange={handleSelectContract}></Styled.Container_info_container_select_contract>
                </Styled.Container_info_container>
                <Styled.Container_content placeholder='내용을 작성해주세요.' onChange={handlecontentChange}></Styled.Container_content>
                <form onSubmit={handleBoardPost}>
                    <Styled.Container_btn_container>
                        {/* <StyledLink to="/board" style={{ textDecoration: 'none' }}> */}
                            <Styled.Container_btn_container_b1>취소</Styled.Container_btn_container_b1>
                        {/* </StyledLink> */}
                        <Styled.Container_btn_container_b2>작성</Styled.Container_btn_container_b2>
                    </Styled.Container_btn_container>
                </form>
    
            </Styled.Container>
        </div>
    );
};




export default Postwrite;