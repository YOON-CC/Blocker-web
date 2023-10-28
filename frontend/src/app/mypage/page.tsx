'use client'

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '@/components/Header';
import axios from 'axios';

import Link from "next/link";
import appStore from '@/store/appStore';


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

    const handleBoardList_1 = async () => {
        
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
                console.log(response.data, "dd")
                setBoardData_1(response.data);
            }
        } catch (error) {

        }

    };

    const handleBoardList_2 = async () => {
        
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
                console.log(response.data, "dd")
                setBoardData_2(response.data);
            }
        } catch (error) {

        }

    };

    
    const handleSignatures = async () => {
        
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/signatures`, {
                headers: {
                    'Authorization': access_token,
                }
            });
            console.log(response.data)
            if (response.status === 200) {
                setImageURL(response.data.address);
            }
        } catch (error) {

        }

    };

    useEffect(() => {
        // 페이지가 로드될 때 한 번만 호출되는 로직
        handleBoardList_1();
        handleBoardList_2();
        handleSignatures();
    }, []);

    const handleButtonClick = () => {
        appStore.setValue(3);
      };
    return (
        <div>
            <Header></Header>
            <Container>
                <Container_1>
                    <Container_1_title>내가 찜한 게시글</Container_1_title>
                    <Container_1_board_container>
                        {boardData_1.map((item, index) => (
                            <Link  key={index} href={`/boardObject/${item.boardId}`} style={{ textDecoration: 'none' }}  onClick={() => localStorage.setItem("boardId", item.boardId.toString())}>
                                <Container_1_board_container_frame>
                                    <Container_1_board_container_frame_title>{item.title}</Container_1_board_container_frame_title>
                                    {/*<Container_2_contarcts_1_content>{item.content}</Container_2_contarcts_1_content>   */}
                                    <Container_1_board_container_frame_info>
                                        <Container_1_board_container_frame_info_content>{item.content}</Container_1_board_container_frame_info_content>
                                        {/* <Container_1_board_container_frame_info_state1>● 미체결</Container_1_board_container_frame_info_state1> */}
                                        <Container_1_board_container_frame_info_state2>● 진행중</Container_1_board_container_frame_info_state2>
                                        {/* <Container_1_board_container_frame_info_state3>● 체결</Container_1_board_container_frame_info_state3> */}
                                    </Container_1_board_container_frame_info>                          
                                </Container_1_board_container_frame>
                            </Link>
                            // <div>{item.title}</div>
                        ))}
                    </Container_1_board_container>
                </Container_1>
                <Container_2>
                    <Container_1_title>내가 쓴 게시글</Container_1_title>
                        <Container_1_board_container>
                            {boardData_2.map((item, index) => (
                                <Link  key={index} href={`/boardObject/${item.boardId}`} style={{ textDecoration: 'none' }}  onClick={() => localStorage.setItem("boardId", item.boardId.toString())}>
                                    <Container_1_board_container_frame>
                                        <Container_1_board_container_frame_title>{item.title}</Container_1_board_container_frame_title>
                                        {/*<Container_2_contarcts_1_content>{item.content}</Container_2_contarcts_1_content>   */}
                                        <Container_1_board_container_frame_info>
                                            <Container_1_board_container_frame_info_content>{item.content}</Container_1_board_container_frame_info_content>
                                            {/* <Container_1_board_container_frame_info_state1>● 미체결</Container_1_board_container_frame_info_state1> */}
                                            <Container_1_board_container_frame_info_state2>● 진행중</Container_1_board_container_frame_info_state2>
                                            {/* <Container_1_board_container_frame_info_state3>● 체결</Container_1_board_container_frame_info_state3> */}
                                        </Container_1_board_container_frame_info>                          
                                    </Container_1_board_container_frame>
                                </Link>
                                // <div>{item.title}</div>
                            ))}
                        </Container_1_board_container>
                </Container_2>
                <Container_3>
                    <Container_3_title>나의 서명</Container_3_title>
                    <Container_1_img><img src={imageURL as string} alt="이미지" style={{ width: "100%", height: "100%", marginTop:"1px"}}/></Container_1_img>
                    <Container_3_btn onClick={handleButtonClick}>수정하기</Container_3_btn>
                </Container_3>
            </Container>
        </div>
    );
};

const Container = styled.div`
    // background : red;
    position : absolute;
    height: 400px;
    width: 800px;
    display : flex;
    justify-content : space-between;

    top : 50%;
    left : 50%;
    transform : translate(-50%, -50%);
`;
const Container_1 = styled.div`
    background : white;
    height: 100%;
    width: 260px;
    border-radius : 8px;
    box-shadow: 0px 0px 10px 2px rgb(230, 230, 230);
`;

const Container_2 = styled.div`
    background : white;
    height: 100%;
    width: 260px;
    border-radius : 8px;
    box-shadow: 0px 0px 10px 2px rgb(230, 230, 230);
`;

const Container_3 = styled.div`
    background : rgb(186, 186, 186);
    height: 300px;
    width: 260px;
    border-radius : 8px;
    box-shadow: 0px 0px 10px 2px rgb(230, 230, 230);
`;
const Container_1_title = styled.div`
    // background : red;
    height: 70px;
    width: 100%;
    display : flex;
    justify-content : center;
    align-items:center;
    
    font-size : 17px;
    font-weight : bold;
    color : grey;
`;
const Container_3_title = styled.div`
    // background : red;
    height: 70px;
    width: 100%;
    display : flex;
    justify-content : center;
    align-items:center;
    
    font-size : 17px;
    font-weight : bold;
    color : white;
`;


const Container_1_board_container = styled.div`
    position : absolute;
    // background : green;
    height: 320px;
    width: 245px;
    margin-left : 10px;
    overflow : auto;

    /* 스크롤바 스타일링 */
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
    
    &::-webkit-scrollbar {
        width: 8px;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
        background-color: rgba(0, 0, 0, 0.4);
    }
    
    &::-webkit-scrollbar-track {
        background: transparent;
    }
`;
const Container_1_board_container_frame = styled.div`
    position : relative;
    background : #e4e4e4;
    height: 70px;
    width: 220px;
    border-radius : 4px;
    margin-top : 10px;
    margin-left : 8px;
    cursor : pointer;

    &:hover {
        filter: brightness(90%); 
    }

    color : black;
`;
const Container_1_board_container_frame_title = styled.div`
    
    // background : blue;
    height: 40px;
    width: 100%;
    margin-top : 7px;

    display : flex;
    justify-content : center;
    align-items: center;

    font-weight : bold;
    font-size : 17px;
    color : #ffffff;
`;
const Container_1_board_container_frame_info = styled.div`
    // background : yellow;
    height: 30px;
    width: 100%;
    display : flex;
    justify-content : space-evenly;
`;
const Container_1_board_container_frame_info_content = styled.div`
    // background : red;
    height: 30px;
    width: 140px;

    display : flex;
    justify-content : center;
    align-items: center;

    font-size : 12px;
    color : #a9a9a9;
`;
const Container_1_board_container_frame_info_state1 = styled.div`
    // background : red;
    height: 30px;
    width: 60px;

    display : flex;
    justify-content : center;
    align-items: center;

    font-size : 12px;
    color : red;
    font-weight : bold;
`;
const Container_1_board_container_frame_info_state2 = styled.div`
    // background : red;
    height: 30px;
    width: 60px;

    display : flex;
    justify-content : center;
    align-items: center;

    font-size : 12px;
    color : green;
    font-weight : bold;
`;
const Container_1_board_container_frame_info_state3 = styled.div`
    // background : red;
    height: 30px;
    width: 60px;

    display : flex;
    justify-content : center;
    align-items: center;

    font-size : 12px;
    color : grey;
    font-weight : bold;
`;
const Container_1_img = styled.div`
    // background : red;
    height: 100px;
    width: 230px;
    margin-left : 15px;
`
const Container_3_btn = styled.button`
    background : white;
    height: 60px;
    width: 230px;
    margin-left : 15px;
    margin-top : 45px;

    border-radius : 5px;
    border : none;

    font-size : 15px;
    font-weight : bold;
    cursor : pointer;
    color : grey;
    &:hover {
        filter: brightness(90%); 
    }
`
export default Contracts_object;