'use client'
import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Header from '@/components/Header';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBookmark, faEye, faCheck, faComment, faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from "next/link";
import Banner from '@/components/Banner';


const Post = () => {

    library.add(faBookmark);
    library.add(faEye);
    library.add(faCheck);
    library.add(faComment);
    library.add(faBullhorn);

    const access_token = localStorage.getItem('access-token');
    const boardId = localStorage.getItem('boardId');

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
    const handleBoardBookmark_1 = async (event : any) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/bookmarks`, {
                boardId: boardId,
            }, 
            {
                headers: {
                    'Authorization': access_token,
                }
            });
            if (response.status == 200){
                setPostObject_isBookmark(true);
            }
        }
        catch (error) {

        }
    }

    //북마크 삭제
    const handleBoardBookmark_2 = async (event: any) => {
        event.preventDefault();
    
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/bookmarks/${boardId}`, // 경로 변수 사용
                {
                    headers: {
                        Authorization: access_token,
                    },
                }
            );
    
            if (response.status === 200) {
                setPostObject_isBookmark(false);
            }
        } catch (error) {
            // 에러 처리 코드 추가
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
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/boards/${boardId}`, // 경로 변수 사용
                {
                    headers: {
                        Authorization: access_token,
                    },
                }
            );
            console.log(response.status)

        } catch (error) {
            // 에러 처리 코드 추가
        }
    };
    return (
        <div>
            <Header/>
            <AllContainer>
            {postObject_isWriter === true && 
                <Edit_container>
                    <Edit_container_btn_container>
                        <Link href={`/boardEdit/${boardId}}`} style={{ textDecoration: 'none' }}>
                            <Edit_container_b1>편집</Edit_container_b1>
                        </Link>
                        <form onSubmit={handleBoardDelete}>
                            <Edit_container_b2>삭제</Edit_container_b2>
                        </form>
                    </Edit_container_btn_container>
                </Edit_container>
            }
            <Container_1>
                {modalImage && (
                    <ModalContainer onClick={handleCloseModal}>
                        <ModalImage src={modalImage} alt="확대 이미지" />
                    </ModalContainer>
                )}
                <Container_1_c1>
                {postObject_representImage ? (<img src={postObject_representImage} alt="이미지" style={{ width: '530px', height: '330px', borderRadius : '5px'}}/>
                ) : (<img src="../image/no_img.png" alt="대체 이미지" style={{ width: '530px', height: '330px' , borderRadius : '5px'}}/>)}
                </Container_1_c1>
                <Container_1_c2>
                    <Container_1_c2_title>{postObject_title}</Container_1_c2_title>
                    <Container_1_c2_info>
                        <Container_1_c2_info_1>
                            <FontAwesomeIcon icon="eye" style={{ color: '#b6b6b6', fontSize : "16px", marginRight : "5px", marginTop : "1px"}} />  
                            {postObject_view}
                        </Container_1_c2_info_1>
                        <Container_1_c2_info_2>
                            <FontAwesomeIcon icon="bookmark" style={{ color: '#b6b6b6', fontSize : "15px", marginRight : "5px"}}/>
                            {postObject_bookmarkCount}
                        </Container_1_c2_info_2>
                        <Container_1_c2_info_3>
                            작성일 : {postObject_createdAt.split("T")[0]}
                        </Container_1_c2_info_3>
                        <Container_1_c2_info_4>
                            수정일 : {postObject_modifiedAt.split("T")[0]}
                        </Container_1_c2_info_4>
                    </Container_1_c2_info>
                    <Container_1_c2_detail>
                        <Container_1_c2_detail_1>
                            <Container_1_c2_detail_1_text1>• 작성자</Container_1_c2_detail_1_text1>
                            {postObject_name}
                        </Container_1_c2_detail_1>
                        <Container_1_c2_detail_2>
                            <Container_1_c2_detail_2_text2>• 주소</Container_1_c2_detail_2_text2>
                            {postObject_info}
                        </Container_1_c2_detail_2>
                        <Container_1_c2_detail_3>
                            <Container_1_c2_detail_3_text3>• 서명</Container_1_c2_detail_3_text3>
                            <FontAwesomeIcon icon="check" style={{ color: '#00ff6a', fontSize : "14px", marginRight : "5px", marginLeft : "2px"}}></FontAwesomeIcon>
                        </Container_1_c2_detail_3>
                    </Container_1_c2_detail>
                    <Container_1_c2_btn>
                    <form onSubmit={handleBoardBookmark}>
                        {postObject_isBookmark == false && <Container_1_c2_btn_1_false><FontAwesomeIcon icon="bookmark" style={{ color: '#ffffff', fontSize : "20px", marginRight : "5px"}} />찜</Container_1_c2_btn_1_false>}
                        {postObject_isBookmark == true && <Container_1_c2_btn_1_true><FontAwesomeIcon icon="bookmark" style={{ color: '#00ff6a', fontSize : "20px", marginRight : "5px"}} />찜</Container_1_c2_btn_1_true>}
                    </form>
                    {/* <StyledLink to="/chat" style={{ textDecoration: 'none' }}> */}
                        <Container_1_c2_btn_2><FontAwesomeIcon icon="comment" style={{ color: '#ffffff', fontSize : "20px", marginRight : "5px"}} />채팅하기</Container_1_c2_btn_2>
                    {/* </StyledLink> */}
                    <form>  
                        <Container_1_c2_btn_3><FontAwesomeIcon icon="bullhorn" style={{ color: '#ffffff', fontSize : "20px", marginRight : "5px"}} />신고하기</Container_1_c2_btn_3>
                    </form>  
                    </Container_1_c2_btn>
                    <Container_1_c2_content>
                        {postObject_content}
                    </Container_1_c2_content>

                </Container_1_c2>
            </Container_1>
            <Container_2>
                <Container_2_img_container>
                    {postObject_images_idx.map((id, index) => (
                        <div key={id} onClick={() => handleImageClick(index)}>
                            <img src={postObject_images_addr[index]} alt="이미지" style={{ width: '50px', height: '50px', marginLeft: '15px', cursor : 'pointer' , borderRadius : '5px'}}/>
                        </div>
                    ))}
                </Container_2_img_container>
            </Container_2>
            </AllContainer>
            <Footor>
                <img src='../image/footer_img.png' alt="이미지" style={{ width: '100%', height: '100%'}}/>
            </Footor>
        </div>
    );
};
const AllContainer = styled.div`
    position : absolute;
    width : 1000px;
    height : 400px;
    background : white;
    padding : 20px;
    top : 48%;
    left : 50%;
    transform : translate(-50%, -50%);
    display : flex;
    justify-content : end;
    border-radius : 8px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

    // border : 1px solid #000000;
`;
const Edit_container = styled.div`
    position : absolute;
    // background : red;
    height : 20px;
    width: 1000px;
    display : flex;
    justify-content : end;
    margin-top : -10px

    // border : 1px solid #000000;
`;
const Edit_container_btn_container = styled.div`
    // position : absolute;
    // background : aqua;
    height : 20px;
    width: 95px;

    display : flex;
    justify-content : space-between;

    // border : 1px solid #000000;
`;
const Edit_container_b1 = styled.button`
    background : #e8edf1;
    height : 100%;
    width: 45px;

    font-size : 10px;
    font-weight : bold;
    color : grey;
    display : flex;
    justify-content : center;
    align-items : center;

    border-radius : 2px;
    cursor : pointer;
    border : none;
`;
const Edit_container_b2 = styled.button`
    background : #e8edf1;
    height : 100%;
    width: 45px;

    font-size : 10px;
    font-weight : bold;
    color : grey;
    display : flex;
    justify-content : center;
    align-items : center;

    border-radius : 2px;
    cursor : pointer;
    border : none;
`;
const Container_1 = styled.div`
    position : absolute;
    // background : red;
    height : 330px;
    width: 1000px;
    margin-top : 25px;

    display : flex;
    justify-content : space-between;

    // border : 1px solid #000000;
`;
const Container_1_c1 = styled.div`
    // background : red;
    height : 100%;
    width: 530px;
    display: flex;
    justify-content: center;
    align-items: center;

`;
const Container_1_c2 = styled.div`
    // background : blue;
    height : 100%;
    width: 450px;
`;
const Container_1_c2_title = styled.div`
    // background : aqua;
    height : fit-content;
    width: 100%;

    display : flex;
    align-items : center;

    font-size : 20px;
    font-weight : bold;

    border-bottom : 2px solid #e8edf1;
    padding-bottom : 10px;
`;
const Container_1_c2_info = styled.div`
    // background : aqua;
    height : 15px;
    width: 100%;

    display : flex;

    font-size : 20px;
    margin-top:10px;
`;
const Container_1_c2_info_1 = styled.div`
    // background : red;
    height : 15px;
    width: fit-content;

    display : flex;

    font-size : 14px;
    color : #b6b6b6;
`;
const Container_1_c2_info_2 = styled.div`
    // background : red;
    height : 15px;
    width: fit-content;

    display : flex;

    font-size : 14px;
    color : #b6b6b6;

    margin-left : 15px;
`;
const Container_1_c2_info_3 = styled.div`
    // background : red;
    height : 15px;
    width: fit-content;

    display : flex;

    font-size : 12px;
    font-weight : bold;
    color : #b6b6b6;

    margin-left : 15px;
`;
const Container_1_c2_info_4 = styled.div`
    // background : red;
    height : 15px;
    width: fit-content;

    display : flex;

    font-size : 12px;
    font-weight : bold;
    color : #b6b6b6;

    margin-left : 5px;
`;
const Container_1_c2_detail = styled.div`
    // background : aqua;
    height : fit-content;
    width: 100%;

    font-size : 20px;
    font-weight : bold;
    margin-top: 12px;
`;
const Container_1_c2_detail_1 = styled.div`
    // background : red;
    height : 20px;
    width: fit-content;

    display : flex;
    align-items:center;

    font-size : 12px;
    font-weight : bold;
`;
const Container_1_c2_detail_1_text1 = styled.div`
    // background : blue;
    height : 100%;
    width : 60px;

    display : flex;
    align-items : center;
    font-size : 10px;
    font-weight : bold;
    color : #b6b6b6;
`;
const Container_1_c2_detail_2 = styled.div`
    // background : red;
    height : 20px;
    width: fit-content;

    display : flex;
    align-items:center;

    font-size : 12px;
    font-weight : bold;
    margin-top : 5px;
`;
const Container_1_c2_detail_2_text2 = styled.div`
    // background : blue;
    height : 100%;
    width : 60px;

    display : flex;
    align-items : center;
    font-size : 10px;
    font-weight : bold;
    color : #b6b6b6;
`;
const Container_1_c2_detail_3 = styled.div`
    // background : red;
    height : 20px;
    width: fit-content;

    display : flex;
    align-items:center;

    font-size : 12px;
    font-weight : bold;
    margin-top : 5px;
`;
const Container_1_c2_detail_3_text3 = styled.div`
    // background : blue;
    height : 100%;
    width : 60px;

    display : flex;
    align-items : center;
    font-size : 10px;
    font-weight : bold;
    color : #b6b6b6;
`;
const Container_1_c2_btn = styled.div`
    background: linear-gradient(to right, #4324dc, #7197ff);
    height : 45px;
    width : 450px;

    display : flex;
    justify-content : space-between;
    font-size : 13px;
    font-weight : bold;
    color : #b6b6b6;
    margin-top : 15px;
    border-radius : 5px;
`;
const Container_1_c2_btn_1_false = styled.button`
    // background : #d7d7d7;
    background  : none;

    height : 100%;
    width : 150px;

    display : flex;
    justify-content : center;
    align-items : center;

    font-size : 14px;
    font-weight : bold;
    color : white;

    border : none;
    outline : none;
    cursor : pointer;

    &:hover {
        background-color : rgba(0, 0, 0, 0.1);
    }
`;
const Container_1_c2_btn_1_true = styled.button`
    // background : #e5ff00;
    background  : none;

    height : 100%;
    width : 150px;

    display : flex;
    justify-content : center;
    align-items : center;

    font-size : 14px;
    font-weight : bold;
    color : #00ff6a;

    border : none;
    outline : none;

    cursor : pointer;

    &:hover {
        background-color : rgba(0, 0, 0, 0.1);
    }

`;
const Container_1_c2_btn_2 = styled.button`
    // background : #435DF1;
    background  : none;

    height : 100%;
    width : 150px;

    display : flex;
    justify-content : center;
    align-items : center;

    font-size : 14px;
    font-weight : bold;
    color : white;

    border : none;
    outline : none;

    cursor : pointer;
    &:hover {
        background-color : rgba(0, 0, 0, 0.1);
    }

`;
const Container_1_c2_btn_3 = styled.button`
    // background : #ff002b;
    background  : none;
    height : 100%;
    width : 150px;

    display : flex;
    justify-content : center;
    align-items : center;

    font-size : 14px;
    font-weight : bold;
    color : white;

    border : none;
    outline : none;

    cursor : pointer;

    &:hover {
        background-color : rgba(0, 0, 0, 0.1);
    }
`;
const Container_2 = styled.div`
    position : absolute;
    // background : blue;
    height : 50px;
    width : 533px;

    left : 50%;
    transform : translate(-93.7%);

    margin-top : 363px;


    display : flex;
    justify-content : space-between;

    // border : 1px solid #000000;
`;
const Container_2_img_container = styled.div`
    position : absolute;
    // background : #e8edf1;
    height : 100%;
    width : 565px;
    display : flex;

    left : 50%;
    transform : translate(-50%);

`;
const Container_1_c2_content = styled.div`
    background : #f1f1f1;
    height : fit-content;
    width : 440px;
    border-radius : 5px;

    color : grey;
    font-size : 12px;
    font-weight : bold;
    margin-top : 10px;
    padding:5px;
`;

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(2.5px); 
`;

const ModalImage = styled.img`
    max-width: fit-content;
    max-height: 330px;
`;
const Footor = styled.div`
    position: fixed;
    width : 100%;
    background: linear-gradient(to right, #1938ff, #5f92ff);
    height : 40%;
    bottom: 0;
    left: 0;
    z-index : -1;
`;
export default Post;