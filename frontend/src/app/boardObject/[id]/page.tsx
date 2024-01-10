'use client'

import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Header from '@/components/Header';
import Chatting from '@/app/chatting';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBookmark, faEye, faCheck, faComment, faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from "next/link";
import Banner from '@/components/Banner';
import { getBoardData, addBookmark, removeBookmark, deleteBoard, createChatroom } from '@/api/boardObject';
import * as Styled from '@/styles/boardObject.styles'


const Post = () => {

    library.add(faBookmark);
    library.add(faEye);
    library.add(faCheck);
    library.add(faComment);
    library.add(faBullhorn);

    const access_token : any = localStorage.getItem('access-token');
    const boardId : any = localStorage.getItem('boardId');

    //게시글 object 배열
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
            const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/boards/${boardId}`, {
                headers: {
                    'Authorization': access_token,
                }
            });

            
            if (response.status === 200) {
                setPostObject_boardId(response.data.boardId);
                setPostObject_title(response.data.title);
                setPostObject_name(response.data.name);
                setPostObject_content(response.data.content);
                setPostObject_representImage(response.data.representImage);
                setPostObject_view(response.data.view);
                setPostObject_bookmarkCount(response.data.bookmarkCount);
                setPostObject_createdAt(response.data.createdAt);
                setPostObject_modifiedAt(response.data.modifiedAt);
                setPostObject_images_idx(response.data.images.map((image: { imageId: number; }) => image.imageId));
                setPostObject_images_addr(response.data.images.map((image: { imageAddress: string; }) => image.imageAddress));
                setPostObject_info(response.data.info);
                setPostObject_contractId(response.data.contractId);
                setPostObject_isWriter(response.data.isWriter);
                setPostObject_isBookmark(response.data.isBookmark);
            }
            if (response.status === 403){
                
            }
        } catch (error) {

        }
    };

    useEffect(() => {
        // 페이지가 로드될 때 한 번만 호출되는 로직
        handlePostObject();
    }, []);


    //북마크 등록
    const handleBoardBookmark_1 = async (event: any) => {
        event.preventDefault();

        try {
            await addBookmark(boardId, access_token);
            setPostObject_isBookmark(true);
        } catch (error) {
            // Handle error
            console.error('Error adding bookmark:', error);
        }
    };

    //북마크 삭제
    const handleBoardBookmark_2 = async (event: any) => {
        event.preventDefault();

        try {
            await removeBookmark(boardId, access_token);
            setPostObject_isBookmark(false);
        } catch (error) {
            // Handle error
            console.error('Error removing bookmark:', error);
        }
    };

    const handleBoardBookmark = (event : any) => {
        if (postObject_isBookmark === false) {
            handleBoardBookmark_1(event);
        }
        else {
            handleBoardBookmark_2(event);
        }
    };

    //이미지 클릭 확대
    const [modalImage, setModalImage] = useState(null);

    const handleImageClick = (index : any) => {
        const imageUrl = postObject_images_addr[index];
        setModalImage(imageUrl);
    };

    const handleCloseModal = () => {
        setModalImage(null);
    };

    //게시글 삭제
    const handleBoardDelete = async (event: any) => {
        event.preventDefault();

        try {
            await deleteBoard(boardId, access_token);
        } catch (error) {
            // Handle error
            console.error('Error deleting board:', error);
        }
    };

    //1대1채팅하기
    const handleDirectMessage = async (event: any) => {
        event.preventDefault();

        try {
            await createChatroom(boardId, access_token);
        } catch (error) {
            // Handle error
            console.error('Error creating chatroom:', error);
        }
    };

    return (
        <div>
            <Header/>
            <Chatting></Chatting>
            <Styled.AllContainer>
            
            {postObject_isWriter === true && 
                <Styled.Edit_container>
                    <Styled.Edit_container_btn_container>
                        <Link href={`/boardEdit/${boardId}}`} style={{ textDecoration: 'none' }}>
                            <Styled.Edit_container_b1>편집</Styled.Edit_container_b1>
                        </Link>
                        <form onSubmit={handleBoardDelete}>
                            <Styled.Edit_container_b2>삭제</Styled.Edit_container_b2>
                        </form>
                    </Styled.Edit_container_btn_container>
                </Styled.Edit_container>
            }
            <Styled.Container_1>
                {modalImage && (
                    <Styled.ModalContainer onClick={handleCloseModal}>
                        <Styled.ModalImage src={modalImage} alt="확대 이미지" />
                    </Styled.ModalContainer>
                )}
                <Styled.Container_1_c1>
                {postObject_representImage ? (<img src={postObject_representImage} alt="이미지" style={{ width: '530px', height: '330px', borderRadius : '5px'}}/>
                ) : (<img src="../image/no_img.png" alt="대체 이미지" style={{ width: '530px', height: '330px' , borderRadius : '5px'}}/>)}
                </Styled.Container_1_c1>
                <Styled.Container_1_c2>
                    <Styled.Container_1_c2_title>{postObject_title}</Styled.Container_1_c2_title>
                    <Styled.Container_1_c2_info>
                        <Styled.Container_1_c2_info_1>
                            <FontAwesomeIcon icon="eye" style={{ color: '#b6b6b6', fontSize : "16px", marginRight : "5px", marginTop : "1px"}} />  
                            {postObject_view}
                        </Styled.Container_1_c2_info_1>
                        <Styled.Container_1_c2_info_2>
                            <FontAwesomeIcon icon="bookmark" style={{ color: '#b6b6b6', fontSize : "15px", marginRight : "5px"}}/>
                            {postObject_bookmarkCount}
                        </Styled.Container_1_c2_info_2>
                        <Styled.Container_1_c2_info_3>
                            작성일 : {postObject_createdAt.split("T")[0]}
                        </Styled.Container_1_c2_info_3>
                        <Styled.Container_1_c2_info_4>
                            수정일 : {postObject_modifiedAt.split("T")[0]}
                        </Styled.Container_1_c2_info_4>
                    </Styled.Container_1_c2_info>
                    <Styled.Container_1_c2_detail>
                        <Styled.Container_1_c2_detail_1>
                            <Styled.Container_1_c2_detail_1_text1>• 작성자</Styled.Container_1_c2_detail_1_text1>
                            {postObject_name}
                        </Styled.Container_1_c2_detail_1>
                        <Styled.Container_1_c2_detail_2>
                            <Styled.Container_1_c2_detail_2_text2>• 주소</Styled.Container_1_c2_detail_2_text2>
                            {postObject_info}
                        </Styled.Container_1_c2_detail_2>
                        <Styled.Container_1_c2_detail_3>
                            <Styled.Container_1_c2_detail_3_text3>• 서명</Styled.Container_1_c2_detail_3_text3>
                            <FontAwesomeIcon icon="check" style={{ color: '#00ff6a', fontSize : "14px", marginRight : "5px", marginLeft : "2px"}}></FontAwesomeIcon>
                        </Styled.Container_1_c2_detail_3>
                    </Styled.Container_1_c2_detail>
                    <Styled.Container_1_c2_btn>
                    <form onSubmit={handleBoardBookmark}>
                        {postObject_isBookmark == false && <Styled.Container_1_c2_btn_1_false><FontAwesomeIcon icon="bookmark" style={{ color: '#ffffff', fontSize : "20px", marginRight : "5px"}} />찜</Styled.Container_1_c2_btn_1_false>}
                        {postObject_isBookmark == true && <Styled.Container_1_c2_btn_1_true><FontAwesomeIcon icon="bookmark" style={{ color: '#00ff6a', fontSize : "20px", marginRight : "5px"}} />찜</Styled.Container_1_c2_btn_1_true>}
                    </form>
                    {/* <StyledLink to="/chat" style={{ textDecoration: 'none' }}> */}
                        <Styled.Container_1_c2_btn_2 onClick={handleDirectMessage}><FontAwesomeIcon icon="comment" style={{ color: '#ffffff', fontSize : "20px", marginRight : "5px"}} />채팅하기</Styled.Container_1_c2_btn_2>
                    {/* </StyledLink> */}
                    <form>  
                        <Styled.Container_1_c2_btn_3><FontAwesomeIcon icon="bullhorn" style={{ color: '#ffffff', fontSize : "20px", marginRight : "5px"}} />신고하기</Styled.Container_1_c2_btn_3>
                    </form>  
                    </Styled.Container_1_c2_btn>
                    <Styled.Container_1_c2_content>
                        {postObject_content}
                    </Styled.Container_1_c2_content>

                </Styled.Container_1_c2>
            </Styled.Container_1>
            <Styled.Container_2>
                <Styled.Container_2_img_container>
                    {postObject_images_idx.map((id, index) => (
                        <div key={id} onClick={() => handleImageClick(index)}>
                            <img src={postObject_images_addr[index]} alt="이미지" style={{ width: '50px', height: '50px', marginLeft: '15px', cursor : 'pointer' , borderRadius : '5px'}}/>
                        </div>
                    ))}
                </Styled.Container_2_img_container>
            </Styled.Container_2>
            </Styled.AllContainer>
            <Styled.Footor>
                <img src='../image/footer_img.png' alt="이미지" style={{ width: '100%', height: '100%'}}/>
            </Styled.Footor>
        </div>
    );
};

export default Post;