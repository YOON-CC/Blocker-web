'use client'

import React, { useState, useEffect} from 'react';
// import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Header from '@/components/Header';
import axios from 'axios';
import { uploadImages, postBoard } from '@/api/postWrite';


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
            <Container>
                <Container_tip>🙌게시글을 작성하고, 동업자를 구해보세요!</Container_tip>
                <Container_title placeholder='제목을 작성해주세요.' onChange={handletitleChange}></Container_title>
                <Container_img_select>
                    {selectedImages.map((image, index) => (
                        <div key={index}>
                            <Container_img src={URL.createObjectURL(image)} alt={`Selected ${index}`} style={{ width: 'fit-content', height: '50px', marginRight : '30px'}}></Container_img>
                        </div>
                    ))}
                    <StyledLabel htmlFor="upload">+</StyledLabel>
                    <Container_img_select_btn type="file" accept="image/png" multiple onChange={handleImageChange} id="upload"></Container_img_select_btn>
                </Container_img_select>
                <Container_info_container>
                    <Container_info_container_select_location  placeholder='위치를 입력해주세요.' onChange={handlelocationChange}></Container_info_container_select_location>
                    <Container_info_container_select_contract placeholder='계약서 번호를 입력해주세요' onChange={handleSelectContract}></Container_info_container_select_contract>
                </Container_info_container>
                <Container_content placeholder='내용을 작성해주세요.' onChange={handlecontentChange}></Container_content>
                <form onSubmit={handleBoardPost}>
                    <Container_btn_container>
                        {/* <StyledLink to="/board" style={{ textDecoration: 'none' }}> */}
                            <Container_btn_container_b1>취소</Container_btn_container_b1>
                        {/* </StyledLink> */}
                        <Container_btn_container_b2>작성</Container_btn_container_b2>
                    </Container_btn_container>
                </form>
    
            </Container>
        </div>
    );
};

const Container = styled.div`
    // background : #e8edf1;
    position : absolute;
    height: 500px;
    width: 600px;

    top : 55%;
    left : 50%;
    transform : translate(-50%, -50%);
`;
const Container_tip = styled.div`
    background : #435DF1;
    height: 40px;
    width: 100%;

    display : flex;
    justify-content : center;
    align-items : center;

    font-size : 12px;
    font-weight : bold;
    color : white;
    border-radius : 3px;
`;
const Container_title = styled.input`
    height: 40px;
    width: 585px;

    display : flex;
    justify-content : center;
    align-items : center;

    font-size : 12px;
    font-weight : bold;
    color : black;

    border : 2px solid #e3e3e3;
    outline : none;

    padding-left : 10px;
    margin-top : 10px;

    border-radius : 4px;
`;
const Container_img_select = styled.div`
    height: 100px;
    width: 596px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: bold;
    color: white;
    margin-top: 10px;
    border-radius: 4px;
    border: 2px dotted #e3e3e3;
    overflow-y: hidden; 
    overflow-x: auto; 

    // background : #f0f0f0;
`;
const Container_img = styled.img`
    position: relative;
    width: fit-content;
    height: 50px;
    margin-right: 30px;
    cursor: pointer;
    transition: filter 0.3s; /* 효과 전환 시간 설정 */

    &:hover {
        filter: brightness(0.3); /* 호버 시 필터 적용 */
    }
`;
const StyledLabel = styled.label`
    padding-left: 9px;
    padding-right: 9px;
    padding-bottom: 5px;
    background-color: #e3e3e3;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;

    font-size : 20px;
    

`;
const Container_img_select_btn = styled.input`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip:rect(0,0,0,0);
    border: 0;
`;
const Container_info_container = styled.div`
    background: linear-gradient(to right, #a3a3a3, #c9c9c9);
    height:40px;
    width: 100%;

    display : flex;
    justify-content : center;
    align-items : center;

    font-size : 12px;
    font-weight : bold;
    color : white;

    margin-top : 10px;

    display : flex;
    justify-content : space-between;

    border-radius : 3px;

`;
const Container_info_container_select_location = styled.input`
    height:100%;
    width: 300px;

    display : flex;
    justify-content:center;
    align-items: center;
    outline : none;
`;
const Container_info_container_select_contract = styled.input`
    height:100%;
    width: 300px;

    display : flex;
    justify-content:center;
    align-items: center;
    outline : none;
`;
const Container_content = styled.textarea`
    height: 150px;
    width: 577px;

    display : flex;
    justify-content : center;
    align-items : center;

    font-size : 12px;
    font-weight : bold;
    color : black;

    border : 2px solid #e3e3e3;
    outline : none;

    padding : 10px;
    margin-top : 10px;

    font-family: 'Varela Round', sans-serif;

    resize : none;

    border-radius : 4px;
`;
const Container_btn_container = styled.div`
    // background : red;
    height:40px;
    width: 160px;

    display : flex;
    justify-content : space-between;

    font-size : 12px;
    font-weight : bold;
    color : white;

    margin-top : 10px;
    margin-left : 440px;

`;
const Container_btn_container_b1 = styled.div`
    background : #CFCFCF;
    height:100%;
    width: 75px;

    display : flex;
    justify-content : center;
    align-items: center;

    font-size : 12px;
    font-weight : bold;
    color : white;

    border-radius : 4px;
    
    cursor:pointer;
`;
const Container_btn_container_b2 = styled.button`
    background : #435DF1;
    height:100%;
    width: 75px;

    display : flex;
    justify-content : center;
    align-items: center;

    font-size : 12px;
    font-weight : bold;
    color : white;

    border-radius : 4px;
    border : none;

    cursor:pointer;
`;


export default Postwrite;