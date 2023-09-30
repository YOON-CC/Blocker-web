'use client'
import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Header from '@/components/Header';
import Banner from '@/components/Banner';
import axios from 'axios';
import Link from "next/link";


interface BoardItem {
    boardId: number;
    bookmarkCount : number;
    content : string;
    createdAt : string;
    modifiedAt : string;
    name : string;
    representImage : string;
    title : string;
    view : number;
}

const imageUrls = [
    '../image/boardbackgroundimg1.png',
    '../image/boardbackgroundimg2.png',
    '../image/boardbackgroundimg3.png',
    // Add more image URLs as needed
];
function getRandomImageUrl() {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
}

const Board = () => {
    const [boardData, setBoardData] = useState<BoardItem[]>([]); 




    const access_token = localStorage.getItem('access-token');
    console.log(access_token)

    const handleBoardList = async () => {

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/boards`, {
                params: {
                    size: 8,
                    page: 0,
                },
                headers: {
                    'Authorization': access_token,
                }
            });

            console.log(response.data)
            if (response.status === 200) {
                console.log("옴")
                setBoardData(response.data);
            }

        } catch (error) {

        }

    };

    useEffect(() => {
        // 페이지가 로드될 때 한 번만 호출되는 로직
        handleBoardList();

        // 일정 시간 간격으로 배너 이미지 변경
    }, []);

    return (
        <div>
            <Container>
                <Header></Header>
 
                <Banner></Banner>
                <Board_title>Board list</Board_title>
                <Container_board_frame>
                    {boardData.map((item, index) => (
                        <Link href={`/boardObject/${item.boardId}`} style={{ textDecoration: 'none' }}  onClick={() => localStorage.setItem("boardId", item.boardId.toString())}>
                            <Container_board_item key={index}>
                                <Container_board_background_img style={{ backgroundImage: `url(${getRandomImageUrl()})` }}>
                                    <Container_board_item_info>
                                        <img src="../image/see.png" style={{ width: "18px", height: "18px", marginTop:"1px", marginRight:"4px"}}></img>
                                        {item.view}
                                        <img src="../image/bookmark.png" style={{ width: "15px", height: "15px",marginTop:"2px", marginRight:"2px", marginLeft : "7px"}}></img>
                                        {item.bookmarkCount}
                                    </Container_board_item_info>

                                </Container_board_background_img>

                                <Container_board_profile>
                                    <Container_board_profile_user_info1>
                                            {item.name}
                                            <Container_board_profile_user_info2>
                                                게시일 : {item.createdAt.split("T")[0]}
                                            </Container_board_profile_user_info2>
                                            <Container_board_profile_user_info3>
                                                수정일 : {item.modifiedAt.split("T")[0]}
                                            </Container_board_profile_user_info3>
                                    </Container_board_profile_user_info1>
                                    <Container_board_title_frame>
                                        {item.title.length > 8 ? `${item.title.substring(0, )}...` : item.title}
                                    </Container_board_title_frame>
                                    <Container_board_content_frame>
                                        {item.content.length > 50 ? `${item.content.substring(0, 50)}...` : item.content}
                                    </Container_board_content_frame>
                                    <Container_board_profile_frame>


                                    </Container_board_profile_frame>
                                </Container_board_profile>
                            </Container_board_item>
                        </Link>  
                    ))}
                </Container_board_frame>
            </Container>
        </div>
    );
};

const Container = styled.div`
    // background : red;
    height: fit-content;
    width: 100%;
`;
const Board_title = styled.div`
    position : absolute;
    // background : aqua;

    height: fit-content;
    height : fit-content;
    width: 1260px;
    margin-top : 220px;

    left : 50%;
    transform : translate(-50%);

    font-size : 30px;
    font-weight : bold;
    color : #aeaeae;

    border-bottom : 1px solid #e4e4e4;
    padding-bottom : 15px;
`;
const Container_board_frame = styled.div`
    position : absolute;
    // background : red;

    height: fit-content;
    height : fit-content;
    width: 1300px;
    margin-top : 240px;

    left : 50%;
    transform : translate(-50%);

    display : flex;
    flex-wrap: wrap;
`;

const Container_board_item = styled.div`
    // background : red;

    width : 406px;
    height : 330px;
    margin-top :50px;
    margin-left : 20px;
    border-radius : 3px;
`;

const Container_board_background_img = styled.div`
    background-size: 100% 100%;
    background-repeat: no-repeat;
    // background : green;
    height : 250px;
    border-radius : 5px;

    &:hover {
        filter: brightness(95%); 
        cursor : pointer;
    }

`;
const Container_board_item_info = styled.div`
    // background : blue;
    position : relative;
    height : 20px;
    width : 396px;
    // background : red;
    display: flex;
    justify-content: flex-end; /* 자식 요소들을 오른쪽 끝으로 정렬 */
    font-size : 14px;
    padding-right : 10px;
    padding-top : 7px;
    color : #ffffff;
    
`;

const Container_board_profile = styled.div`
    // background : #d1d1d1;
    height : 80px;
    width : 100%;  
`;

const Container_board_profile_frame = styled.div`
    // background : aqua;
    height : 100%;
    width : 140px;  
`;
const Container_board_profile_user_info1 = styled.div`
    // background : green;
    width : 100%;
    height : 20px;

    font-size : 15px;
    font-weight : bold;
    color : #435DF1;

    display : flex;
    align-items : center;

    margin-top : 5px;
`;
const Container_board_profile_user_info2 = styled.div`
    // background : yellow;
    width : 140px;
    height : 20px;

    display : flex;
    justify-content : center;
    align-items : center;

    font-size : 12px;
    color : grey;
    
`;

const Container_board_profile_user_info3 = styled.div`
    // background : yellow;
    width : 140px;
    height : 20px;

    display : flex;
    justify-content : center;
    align-items : center;

    font-size : 12px;
    color : grey;
    
`;
const Container_board_title_frame = styled.div`
    // background : blue;
    height : 40px;
    width : 280px;
    
    display : flex;
    align-items:center;
    
    font-size : 30px;
    font-weight:bold;

    color : black;
`;
const Container_board_content_frame = styled.div`
    // background : yellow;
    height : 20px;
    width : 100%;
    
    display : flex;
    align-items:center;

    color: grey;
    font-size : 13px;
    font-weight:bold;
`;


export default Board;