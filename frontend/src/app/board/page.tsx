'use client'
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '@/components/Header';
import Banner from '@/components/Banner';
import axios from 'axios';
import Link from "next/link";
import Login from '../Login';
import Chatting from '@/app/chatting';
import { fetchBoardList } from '@/api/boardList';
import * as Styled from '@/styles/board.styles'

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
            const response = await fetchBoardList();
            console.log(response);

            if (response) {
                setBoardData(response);
            }
        } catch (error) {
            // 오류 처리 로직 추가
            console.error('게시판 목록을 불러오는 중 오류 발생:', error);
        }
    };

    useEffect(() => {
        handleBoardList();
    }, []);

    return (
        <div>
            <Styled.Container>
                <Header></Header>
                <Banner></Banner>
                <Chatting></Chatting>
                <Styled.Board_title>Board list</Styled.Board_title>
                <Styled.Container_board_frame>
                    {boardData.map((item, index) => (
                        <Link href={`/boardObject/${item.boardId}`} style={{ textDecoration: 'none' }}  onClick={() => localStorage.setItem("boardId", item.boardId.toString())}>
                            <Styled.Container_board_item key={index}>
                                <Styled.Container_board_background_img style={{ backgroundImage: `url(${getRandomImageUrl()})` }}>
                                    <Styled.Container_board_item_info>
                                        <img src="../image/see.png" style={{ width: "18px", height: "18px", marginTop:"1px", marginRight:"4px"}}></img>
                                        {item.view}
                                        <img src="../image/bookmark.png" style={{ width: "15px", height: "15px",marginTop:"2px", marginRight:"2px", marginLeft : "7px"}}></img>
                                        {item.bookmarkCount}
                                    </Styled.Container_board_item_info>

                                </Styled.Container_board_background_img>

                                <Styled.Container_board_profile>
                                    <Styled.Container_board_profile_user_info1>
                                            {item.name}
                                            <Styled.Container_board_profile_user_info2>
                                                게시일 : {item.createdAt.split("T")[0]}
                                            </Styled.Container_board_profile_user_info2>
                                            <Styled.Container_board_profile_user_info3>
                                                수정일 : {item.modifiedAt.split("T")[0]}
                                            </Styled.Container_board_profile_user_info3>
                                    </Styled.Container_board_profile_user_info1>
                                    <Styled.Container_board_title_frame>
                                        {item.title.length > 8 ? `${item.title.substring(0, 8)}...` : item.title}
                                    </Styled.Container_board_title_frame>
                                    <Styled.Container_board_content_frame>
                                        {item.content.length > 50 ? `${item.content.substring(0, 50)}...` : item.content}
                                    </Styled.Container_board_content_frame>
                                    <Styled.Container_board_profile_frame>


                                    </Styled.Container_board_profile_frame>
                                </Styled.Container_board_profile>
                            </Styled.Container_board_item>
                        </Link>  
                    ))}
                </Styled.Container_board_frame>
            </Styled.Container>
        </div>
    );
};


export default Board;