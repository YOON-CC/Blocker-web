'use client'

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '@/components/Header';
import axios from 'axios';

import Link from "next/link";
import appStore from '@/store/appStore';
import Chatting from '@/app/chatting';
import { getBoardList1, getBoardList2, getSignatures } from '@/api/mypage';
import * as Styled from '@/styles/mypage.styles'

interface BoardItem1 {
    boardId: number;
    content : string;
    name : string;
    title : string;
    contractState : string;
}

interface BoardItem2 {
    boardId: number;
    content : string;
    name : string;
    title : string;
    contractState : string;
}

const Contracts_object = () => {

    const access_token = localStorage.getItem('access-token');
    const [boardData_1, setBoardData_1] = useState<BoardItem1[]>([]); 
    const [boardData_2, setBoardData_2] = useState<BoardItem2[]>([]);
    const [imageURL, setImageURL] = useState<string | null>(null); 

    const myPageData = async () => {
        try {
            const data1 = await getBoardList1(access_token);
            setBoardData_1(data1);

            const data2 = await getBoardList2(access_token);
            setBoardData_2(data2);

            const signatureURL = await getSignatures(access_token);
            setImageURL(signatureURL);
        } catch (error) {
            // 에러 처리
        }
    };

    useEffect(() => {
        // 페이지가 로드될 때 한 번만 호출되는 로직
        myPageData();
    }, []);

    const handleButtonClick = () => {
        appStore.setValue(4);
      };
    return (
        <div>
            <Header></Header>
            <Chatting></Chatting>
            <Styled.Container>
                <Styled.Container_1>
                    <Styled.Container_1_title>내가 찜한 게시글</Styled.Container_1_title>
                    <Styled.Container_1_board_container>
                        {boardData_1.map((item, index) => (
                            <Link  key={index} href={`/boardObject/${item.boardId}`} style={{ textDecoration: 'none' }}  onClick={() => localStorage.setItem("boardId", item.boardId.toString())}>
                                <Styled.Container_1_board_container_frame>
                                    <Styled.Container_1_board_container_frame_title>{item.title}</Styled.Container_1_board_container_frame_title>
                                    {/*<Container_2_contarcts_1_content>{item.content}</Container_2_contarcts_1_content>   */}
                                    <Styled.Container_1_board_container_frame_info>
                                        <Styled.Container_1_board_container_frame_info_content>{item.content}</Styled.Container_1_board_container_frame_info_content>
                                        {/* <Container_1_board_container_frame_info_state1>● 미체결</Container_1_board_container_frame_info_state1> */}
                                        <Styled.Container_1_board_container_frame_info_state2>● 진행중</Styled.Container_1_board_container_frame_info_state2>
                                        {/* <Container_1_board_container_frame_info_state3>● 체결</Container_1_board_container_frame_info_state3> */}
                                    </Styled.Container_1_board_container_frame_info>                          
                                </Styled.Container_1_board_container_frame>
                            </Link>
                            // <div>{item.title}</div>
                        ))}
                    </Styled.Container_1_board_container>
                </Styled.Container_1>
                <Styled.Container_2>
                    <Styled.Container_1_title>내가 쓴 게시글</Styled.Container_1_title>
                        <Styled.Container_1_board_container>
                            {boardData_2.map((item, index) => (
                                <Link  key={index} href={`/boardObject/${item.boardId}`} style={{ textDecoration: 'none' }}  onClick={() => localStorage.setItem("boardId", item.boardId.toString())}>
                                    <Styled.Container_1_board_container_frame>
                                        <Styled.Container_1_board_container_frame_title>{item.title}</Styled.Container_1_board_container_frame_title>
                                        {/*<Container_2_contarcts_1_content>{item.content}</Container_2_contarcts_1_content>   */}
                                        <Styled.Container_1_board_container_frame_info>
                                            <Styled.Container_1_board_container_frame_info_content>{item.content}</Styled.Container_1_board_container_frame_info_content>
                                            {/* <Container_1_board_container_frame_info_state1>● 미체결</Container_1_board_container_frame_info_state1> */}
                                            <Styled.Container_1_board_container_frame_info_state2>● 진행중</Styled.Container_1_board_container_frame_info_state2>
                                            {/* <Container_1_board_container_frame_info_state3>● 체결</Container_1_board_container_frame_info_state3> */}
                                        </Styled.Container_1_board_container_frame_info>                          
                                    </Styled.Container_1_board_container_frame>
                                </Link>
                                // <div>{item.title}</div>
                            ))}
                        </Styled.Container_1_board_container>
                </Styled.Container_2>
                <Styled.Container_3>
                    <Styled.Container_3_title>나의 서명</Styled.Container_3_title>
                    <Styled.Container_1_img><img src={imageURL as string} alt="이미지" style={{ width: "100%", height: "100%", marginTop:"1px"}}/></Styled.Container_1_img>
                    <Styled.Container_3_btn onClick={handleButtonClick}>수정하기</Styled.Container_3_btn>
                </Styled.Container_3>
            </Styled.Container>
        </div>
    );
};


export default Contracts_object;