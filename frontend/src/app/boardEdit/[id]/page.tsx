'use client'

import React, { useState, useEffect} from 'react';
// import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Header from '@/components/Header';
import axios from 'axios';
import { getBoardData, uploadImages, editBoard } from '@/api/boardEdit';
import * as Styled from '@/styles/boardEdit.styles'


const Postedit = () => {
    const access_token : any = localStorage.getItem('access-token');
    console.log(access_token)
    const boardId : any = localStorage.getItem('boardId');


    //게시글객체 기본 정보
    const [postObject_boardId, setPostObject_boardId] = useState(0); 
    const [postObject_title, setPostObject_title] = useState(''); 
    const [postObject_name, setPostObject_name] = useState(''); 
    const [postObject_content, setPostObject_content] = useState(''); 
    const [postObject_representImage, setPostObject_representImage] = useState(''); 
    const [postObject_view, setPostObject_view] = useState(0); 
    const [postObject_bookmarkCount, setPostObject_bookmarkCount] = useState(0); 
    const [postObject_createdAt, setPostObject_createdAt] = useState(''); 
    const [postObject_modifiedAt, setPostObject_modifiedAt] = useState(''); 
    const [postObject_images_idx, setPostObject_images_idx] = useState([]); 
    const [postObject_images_addr, setPostObject_images_addr] = useState([]); 

    const [postObject_info, setPostObject_info] = useState(''); 
    const [postObject_contractId, setPostObject_contractId] = useState(0); 
    const [postObject_isWriter, setPostObject_isWriter] = useState(false); 
    const [postObject_isBookmark, setPostObject_isBookmark] = useState(false); 

    //북마크 여부


    //초반 데이터
    const handlePostObject = async () => {
        try {
            const boardData = await getBoardData(boardId, access_token);

            setPostObject_boardId(boardData.boardId);
            setPostObject_title(boardData.title);
            setPostObject_name(boardData.name);
            setPostObject_content(boardData.content);
            setPostObject_representImage(boardData.representImage);
            setPostObject_view(boardData.view);
            setPostObject_bookmarkCount(boardData.bookmarkCount);
            setPostObject_createdAt(boardData.createdAt);
            setPostObject_modifiedAt(boardData.modifiedAt);
            setPostObject_images_idx(boardData.images.map((image: { imageId: number; }) => image.imageId));
            setPostObject_images_addr(boardData.images.map((image: { imageAddress: string; }) => image.imageAddress));
            setPostObject_info(boardData.info);
            setPostObject_contractId(boardData.contractId);
            setPostObject_isWriter(boardData.isWriter);
            setPostObject_isBookmark(boardData.isBookmark);
    
        } catch (error) {
            // Handle error
            console.error('Error fetching board data:', error);
        }
    };

    useEffect(() => {
        // 페이지가 로드될 때 한 번만 호출되는 로직
        handlePostObject();
    }, []);


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
        try {
            const newImages : any = await uploadImages(selectedImages, access_token);
            setImages((prevImages) => [...prevImages, ...newImages]);
        } catch (error) {
            // 에러 처리
        }
    };

    useEffect(() => {
        // 페이지가 로드될 때 한 번만 호출되는 로직
        handlePngToUrl();
    }, [selectedImages]);

    // 전체 데이터 전송 코드
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handletitleChange = (event : any) => {
        setTitle(event.target.value)
    };

    const handlecontentChange = (event : any) => {
        setContent(event.target.value)
    };

    const handleBoardEdit = async (event: any) => {
        event.preventDefault();
        try {
            await editBoard(boardId, title, content, images, removeImg, access_token);
            // 성공 처리
        } catch (error) {
            // 에러 처리
        }
    };


    //삭제할 이미지
    const [removeImg, setRemoveImg] = useState<number[]>([]);

    const handleImageClick = (number: number) => {
        if (removeImg.includes(number)) {
            // 이미 선택된 숫자라면 선택 해제
            setRemoveImg(removeImg.filter(item => item !== number));
        } else {
            // 선택되지 않은 숫자라면 선택 추가
            setRemoveImg([...removeImg, number]);
        }
    };

    console.log(removeImg)

    return (
        <div>
            <Header />
            <Styled.Container>
                <Styled.Container_tip>✏️계시글을 다시 수정해보세요!</Styled.Container_tip>
                <Styled.Container_title placeholder={postObject_title} onChange={handletitleChange}></Styled.Container_title>
                <Styled.Container_default_img>
                    {postObject_images_idx.map((id, index) => (
                        <div key={id} onClick={() => handleImageClick(index)}>
                            <img src={postObject_images_addr[index]} alt="이미지" style={{ width: '50px', height: '50px', marginLeft: '15px', cursor : 'pointer', filter: removeImg.includes(index) ? 'brightness(0.3)' : 'none'}}/>
                        </div>
                    ))}
                </Styled.Container_default_img>
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
                    <Styled.Container_info_container_select_location>위치검색</Styled.Container_info_container_select_location>
                    <Styled.Container_info_container_select_contract>미체결 계약서 선택</Styled.Container_info_container_select_contract>
                </Styled.Container_info_container>
                <Styled.Container_content placeholder={postObject_content} onChange={handlecontentChange}></Styled.Container_content>
                <form onSubmit={handleBoardEdit}>
                    <Styled.Container_btn_container>
                        {/* <StyledLink to={`/board/${boardId}`} style={{ textDecoration: 'none' }}> */}
                            <Styled.Container_btn_container_b1>취소</Styled.Container_btn_container_b1>
                        {/* </StyledLink> */}
                        <Styled.Container_btn_container_b2>작성</Styled.Container_btn_container_b2>
                    </Styled.Container_btn_container>
                </form>
            </Styled.Container>
        </div>
    );
};


export default Postedit;