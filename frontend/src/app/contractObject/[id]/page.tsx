'use client'

import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from "react-router-dom";
import SignatureCanvas from 'react-signature-canvas';
import styled from 'styled-components';
// import Header from '../components/header';
import Header from '@/components/Header';
import axios from 'axios';
import Link from "next/link";
import Swal from 'sweetalert2';
import Chatting from '@/app/chatting';
import {
    getContractData,
    getProceedContractData,
    getConcludeContractData,
    getCancelingContractData,
    getCanceledContractData,
    searchUser,
    proceedContract,
    signContract,
    registerCancelSign,
    deleteContract,
    deleteAllRelatedBoards,
} from '@/api/contractObject';

interface Paticipation {
    contractor: string;
    signState: string;
}

const Contracts_object = () => {

    const access_token : any = localStorage.getItem('access-token');
    const contractId : any = localStorage.getItem('contractId');
    const contractType : any = localStorage.getItem('state');

    const [contractObject_contractId, setContractObject_contractId] = useState(0); 
    const [contractObject_title, setContractObject_title] = useState(''); 
    const [contractObject_content, setContractObject_content] = useState(''); 
    const [contractObject_createdAt, setContractObject_createdAt] = useState(''); 
    const [contractObject_modifiedAt, setContractObject_modifiedAt] = useState(''); 
    const [contractObject_participation, setContractObject_participation] = useState<Paticipation[]>([])
    const [contractObject_destroy_participation, setContractObject_destroy_participation] = useState<Paticipation[]>([])



    //계약참여자 찾기 모달 상태
    const [contractSearchModal, setContractSearchModal] = useState(false); 

    //전자서명 하기
    const [contractSignModal, setContractSignModal] = useState(false); 


    //계약참여자 검색 
    const [searchUserContent, setSearchUserContent] = useState('');

    //계약참여자 정보 받기
    const [searchUserContentEmail, setSearchUserContentEmail] = useState<string[]>([]);
    const [searchUserContentName, setSearchUserContentName] = useState(''); 


    //해당 index에 따른 미체결 계약서 내용 가져오는 api

    const handleContarctObject_1 = async () => {
        try {
            const contractData = await getContractData(contractId, access_token);
            setContractObject_contractId(contractData.contractId);
            setContractObject_title(contractData.title);
            setContractObject_content(contractData.content);
            setContractObject_createdAt(contractData.createdAt);
            setContractObject_modifiedAt(contractData.modifiedAt);
        } catch (error) {
            // Handle error
        }
    };

    //해당 index에 따른 진행중 계약서 내용 가져오는 api
    const handleContarctObject_2 = async () => {
        try {
            const contractData = await getProceedContractData(contractId, access_token);
            setContractObject_contractId(contractData.contractId);
            setContractObject_title(contractData.title);
            setContractObject_content(contractData.content);
            setContractObject_createdAt(contractData.createdAt);
            setContractObject_modifiedAt(contractData.modifiedAt);
            setContractObject_participation(contractData.contractorAndSignStates);
        } catch (error) {
            // Handle error
        }
    };

    const handleContarctObject_3 = async () => {
        try {
            const contractData = await getConcludeContractData(contractId, access_token);
            setContractObject_contractId(contractData.contractId);
            setContractObject_title(contractData.title);
            setContractObject_content(contractData.content);
            setContractObject_createdAt(contractData.createdAt);
            setContractObject_modifiedAt(contractData.modifiedAt);
        } catch (error) {
            // Handle error
        }
    };

    const handleContarctObject_4 = async () => {
        try {
            const contractData = await getCancelingContractData(contractId, access_token);
            setContractObject_contractId(contractData.contractId);
            setContractObject_title(contractData.title);
            setContractObject_content(contractData.content);
            setContractObject_createdAt(contractData.createdAt);
            setContractObject_modifiedAt(contractData.modifiedAt);
            setContractObject_destroy_participation(contractData.contractorAndSignStates)
        } catch (error) {
            // Handle error
        }
    };


    const handleContarctObject_5 = async () => {
        try {
            const contractData = await getCanceledContractData(contractId, access_token);
            setContractObject_contractId(contractData.contractId);
            setContractObject_title(contractData.title);
            setContractObject_content(contractData.content);
            setContractObject_createdAt(contractData.createdAt);
            setContractObject_modifiedAt(contractData.modifiedAt);
        } catch (error) {
            // Handle error
        }
    };

    useEffect(() => {
        if (contractType === 'NOT_PROCEED'){
            handleContarctObject_1();
        }
        else if (contractType === 'PROCEED'){
            handleContarctObject_2();
        }
        else if (contractType === 'CONCLUDE'){
            handleContarctObject_3();
        }
        else if (contractType === 'CANCELING'){
            handleContarctObject_4();
        }
        else if (contractType === 'CANCELED'){
            handleContarctObject_5();
        }


    }, []);

    //모든 계약서 관련 게시글 삭제
    const handleContractDeleteAll = async () => {
        try {
            const response = await deleteAllRelatedBoards(contractId, access_token);
            // 처리할 로직 추가
        } catch (error) {
            // 에러 처리
        }
    };

    //계약서 삭제
    const handleContractDelete = async (event : any) => {
        event.preventDefault();
        try {
            const response = await deleteContract(contractId, access_token);
            // 처리할 로직 추가
        } catch (error) {
            Swal.fire({

                text: '계약서와 관련된 게시글이 모두 삭제됩니다.',
                icon: 'warning',
                
                showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
                confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
                cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
                confirmButtonText: '승인', // confirm 버튼 텍스트 지정
                cancelButtonText: '취소', // cancel 버튼 텍스트 지정
                
                reverseButtons: true, // 버튼 순서 거꾸로
                
            }).then(result => {
                // 만약 Promise리턴을 받으면,
                if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면
                
                    handleContractDeleteAll()
                }
            });
        }
    }


    //유저검색 input 변화
    const handleSearchUserChange = (event : any) => {
        setSearchUserContent(event.target.value)
    };

    //유저 찾기
    const handleSearchUser = async (event: any) => {
        event.preventDefault();
        try {
            const response = await searchUser(searchUserContent, access_token);
            // 처리할 로직 추가
        } catch (error) {
            // 에러 처리
        }
    };
 
    //계약 진행하기 버튼
    const handleContractToProceed = async (event: any) => {
        event.preventDefault();
        try {
            const response = await proceedContract(contractId, searchUserContentEmail, access_token);
            // 처리할 로직 추가
        } catch (error) {
            // 에러 처리
        }
    };

    //진행중 전자서명
    const handleContractSign1 = async (event: any) => {
        try {
            const response = await signContract(contractId, access_token);
            // 처리할 로직 추가
        } catch (error) {
            // 에러 처리
        }
    };

    //전자서명 등록
    const handleContractSign2 = async (event: any) => {
        try {
            const response = await registerCancelSign(contractId, access_token);
            // 처리할 로직 추가
        } catch (error) {
            // 에러 처리
        }
    };
    

    //진행중 계약서 삭제
    const handleContractDestruction = async (event: any) => {
        event.preventDefault();
        try {
            const response = await deleteContract(contractId, access_token);
            // 처리할 로직 추가
        } catch (error) {
            // 에러 처리
        }
    };


    //파기계약서 작성
    const handleContractToCanceling = async (event: any) => {
        event.preventDefault();
        try {
            const response = await registerCancelSign(contractId, access_token);
            // 처리할 로직 추가
        } catch (error) {
            // 에러 처리
        }
    };

    return (
        <div>
            <Header/>
            <Chatting></Chatting>
            <Container>
                <Container_1>계약서</Container_1>
                <Container_2>
                    <Container_2_title>제목</Container_2_title>
                    <Container_2_content>{contractObject_title}</Container_2_content>
                </Container_2>
                <Container_3>
                    <Container_3_title>작성일자</Container_3_title>
                    <Container_3_content>{contractObject_createdAt.split("T")[0]}</Container_3_content>
                    <Container_3_title>수정일자</Container_3_title>
                    <Container_3_content>{contractObject_modifiedAt.split("T")[0]}</Container_3_content>
                </Container_3>
                <Container_4>
                    <Container_4_title>내용</Container_4_title>
                    <Container_4_content>{contractObject_content}</Container_4_content>
                </Container_4>
            </Container>
            {contractType === 'NOT_PROCEED' && (
                <Container_btn_container>
                    <Container_btn_container_b1>취소</Container_btn_container_b1>
                    <Link href='/contractEdit' style={{ textDecoration: 'none' }} onClick={() => localStorage.setItem("contractId", contractObject_contractId.toString())}>
                        <Container_btn_container_b2>편집</Container_btn_container_b2>
                    </Link>
                    <form onSubmit={handleContractDelete}>
                        <Container_btn_container_b3>삭제</Container_btn_container_b3>
                    </form>
                    <Container_btn_container_b4 onClick={() => setContractSearchModal(!contractSearchModal)}>계약참여자 검색</Container_btn_container_b4>
                </Container_btn_container>
            )}
            {contractType === 'PROCEED' && (
                <Container_btn_container>
                    <form onSubmit={handleContractDestruction}>
                        <Container_btn_container_b3>삭제</Container_btn_container_b3>
                    </form>
                    <Container_participation_list>
                    {contractObject_participation.map((item, index) => (
                        <Container_participation_list_container key={index}>
                            <Container_participation_list_container_name style={{ background: item.signState === 'Y' ? 'lime' : '#f1f1f1' }}>
                                {item.contractor}
                             </Container_participation_list_container_name>
                            <Container_participation_list_container_state style={{ background: item.signState === 'Y' ? 'lime' : '#f1f1f1' }}>
                                {item.signState}
                            </Container_participation_list_container_state>
                        </Container_participation_list_container>
                    ))}
                    </Container_participation_list>
                    <form onSubmit={handleContractSign1}>
                        <Container_btn_container_b5>전자서명 등록</Container_btn_container_b5>
                    </form>
                </Container_btn_container>
            )}
            {contractType === 'CONCLUDE' && (
                <Container_btn_container>
                    <form onSubmit={handleContractToCanceling}>
                        <Container_3_contract_write_btn>파기 계약서 작성</Container_3_contract_write_btn>
                    </form>
                </Container_btn_container>
            )}
            {/* 파기계약서 */}
            {contractType === 'CANCELING' && (
                <Container_btn_container>
                    <Container_participation_list>
                    {contractObject_destroy_participation.map((item, index) => (
                        <Container_participation_list_container key={index}>
                            <Container_participation_list_container_name style={{ background: item.signState === 'Y' ? 'lime' : '#f1f1f1' }}>
                                {item.contractor}
                             </Container_participation_list_container_name>
                            <Container_participation_list_container_state style={{ background: item.signState === 'Y' ? 'lime' : '#f1f1f1' }}>
                                {item.signState}
                            </Container_participation_list_container_state>
                        </Container_participation_list_container>
                    ))}
                    </Container_participation_list>
                    <form onSubmit={handleContractSign2}>
                        <Container_btn_container_b5>전자서명 등록</Container_btn_container_b5>
                    </form>
                </Container_btn_container>
            )}

            {contractSearchModal && (
                <Container_search_user>
                    <Container_search_user_frame>
                        <Container_search_user_frame_1>
                            <Container_search_user_frame_1_input onChange={handleSearchUserChange}></Container_search_user_frame_1_input>
                            <form onSubmit={handleSearchUser}>
                                <Container_search_user_frame_1_btn>🔗</Container_search_user_frame_1_btn>
                            </form>
                        </Container_search_user_frame_1>


                        <Container_search_user_frame_2>
                            {searchUserContentEmail.map((item, index) => (
                                <Container_search_user_frame_2_container key={index}>{item}</Container_search_user_frame_2_container>
                            ))}
                        </Container_search_user_frame_2>


                        <Container_search_user_frame_3>
                            <Container_search_user_frame_3_b1 onClick={() => setContractSearchModal(!contractSearchModal)}>취소</Container_search_user_frame_3_b1>
                            <form onSubmit={handleContractToProceed}>
                                <Container_search_user_frame_3_b2>진행</Container_search_user_frame_3_b2>
                            </form>
                        </Container_search_user_frame_3>
                    </Container_search_user_frame>
                </Container_search_user>
            )}
        </div>
    );
};


const Container = styled.div`
    background : #e8edf1;
    position : absolute;
    height: 300px;
    width: 600px;

    top : 50%;
    left : 50%;
    transform : translate(-50%, -50%);
    border : 1px solid #dfdfdf;
`;
const Container_1 = styled.div`
    background : black;
    position : relative;
    height: 40px;
    width: 100%;

    display : flex;
    justify-content : center;
    align-items: center;

    color : #ffffff;
`;
const Container_2 = styled.div`
    position : relative;
    // background : red;
    height: 40px;
    width: 100%;

    display : flex;
`;
const Container_2_title = styled.div`
    position : relative;
    // background : green;
    height: 100%;
    width: 100px;

    display : flex;
    justify-content : center;
    align-items: center;

    color : #000000;

    font-size : 13px;

`;
const Container_2_content = styled.div`
    position : relative;
    // background : #ffffff;
    height: 100%;
    width: 500px;

    display : flex;
    justify-content : center;
    align-items: center;
`;
const Container_3 = styled.div`
    position : relative;
    background : #ffffff;
    height: 40px;
    width: 100%;

    display : flex;
`;
const Container_3_title = styled.div`
    position : relative;
    // background : green;
    height: 100%;
    width: 100px;

    display : flex;
    justify-content : center;
    align-items: center;

    color : #000000;

    font-size : 13px;

`;
const Container_3_content = styled.div`
    position : relative;
    // background : blue;
    height: 100%;
    width: 200px;

    display : flex;
    justify-content : center;
    align-items: center;
`;
const Container_4 = styled.div`
    position : relative;
    // background : #ffffff;
    height: 180px;
    width: 100%;

    display : flex;
`;
const Container_4_title = styled.div`
    position : relative;
    // background : green;
    height: 100%;
    width: 100px;

    display : flex;
    justify-content : center;
    align-items: center;

    color : #000000;

    font-size : 13px;

`;
const Container_4_content = styled.div`
    position : relative;
    // background : blue;
    height: 100%;
    width: 500px;

    display : flex;
    justify-content : center;
    align-items: center;
`;

const Container_btn_container = styled.div`
    // background : red;
    position : absolute;
    height:40px;
    width: 600px;

    display : flex;
    justify-content : space-between;

    font-size : 12px;
    font-weight : bold;
    color : white;

    margin-top : 180px;

    top : 50%;
    left : 50%;
    transform : translate(-50%, -50%);
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
    background : #a9a9a9;
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
const Container_btn_container_b3 = styled.button`
    background : #828282;
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
const Container_participation_list = styled.div`
    background : #f1f1f1;
    height:100%;
    width: fit-content;

    display : flex;
    justify-content : center;
    align-items: center;

    font-size : 12px;
    font-weight : bold;
    color : grey;

    border : none;

`;
const Container_participation_list_container = styled.div`
    height:100%;
    width: 70px;

`;
const Container_participation_list_container_name = styled.div`
    height:50%;
    width: 100%;
    display : flex;
    justify-content : center;
    align-items: center;
    border : none;
`;
const Container_participation_list_container_state = styled.div`
    height:50%;
    width: 100%;
    display : flex;
    justify-content : center;
    align-items: center;
    border : none;
`;
const Container_btn_container_b4 = styled.button`
    background : #435DF1;
    height:100%;
    width: 350px;

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
const Container_btn_container_b5 = styled.button`
    background : #d4c900;
    height:100%;
    width: 100px;

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
const Container_search_user = styled.div`
    position : fixed;
    height: 100%;
    width: 100%;
    top : 50%;
    left : 50%;
    transform: translate(-50%, -50%);
    z-index : 1;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(2.5px); 
`;
const Container_search_user_frame = styled.div`
    position : absolute;
    background: white;
    height: 390px;
    width: 300px;
    top : 50%;
    left : 50%;
    transform: translate(-50%, -50%);
    border-radius : 5px;
`;
const Container_search_user_frame_1 = styled.div`
    position : absolute;
    // background : blue;
    height: 40px;
    width: 280px;

    margin-top : 10px;
    margin-left : 10px;

    display : flex;
`;
const Container_search_user_frame_1_input = styled.input`
    background : #e3e3e3;
    height: 38px;
    width: 220px;
    outline : none;
    padding-left : 10px;
    border-radius : 5px 0px 0px 5px;
    border : none;
`;
const Container_search_user_frame_1_btn = styled.button`
    height: 40px;
    width: 50px;
    border-radius : 0px 5px 5px 0px;
    border : none;

    cursor : pointer;
`;
const Container_search_user_frame_2 = styled.div`
    position : absolute;
    // background : blue;
    height: 270px;
    width: 280px;

    margin-top : 50px;
    margin-left : 10px;

`;
const Container_search_user_frame_2_container = styled.div`
    background : #a3a3a3;
    height: 30px;
    width: 100%;

    display : flex;
    justify-content : center;
    align-items : center;

    font-size : 15px;
    font-weight : bold;
    color : #ffffff;

    border-radius : 10px;

    margin-top : 10px;
`;


const Container_search_user_frame_3 = styled.div`
    position : absolute;
    // background : green;
    height: 40px;
    width: 280px;

    margin-top : 340px;
    margin-left : 10px;

    display : flex;
    justify-content : space-between;
`;
const Container_search_user_frame_3_b1 = styled.div`
    background : #e0515c;
    height: 100%;
    width: 135px;


    display : flex;
    justify-content : center;
    align-items: center;

    font-size : 12px;
    font-weight : bold;
    color : white;
    border-radius : 5px;

    cursor:pointer;
`;
const Container_search_user_frame_3_b2 = styled.button`
    background : #435DF1;
    height: 100%;
    width: 135px;


    display : flex;
    justify-content : center;
    align-items: center;

    font-size : 12px;
    font-weight : bold;
    color : white;
    border : none;   
    border-radius : 5px; 
    cursor:pointer;

`;
const Container_3_contract_write_btn = styled.button`
    background : purple;
    height: 100%;
    width: 600px;


    display : flex;
    justify-content : center;
    align-items: center;

    font-size : 12px;
    font-weight : bold;
    color : white;
    border : none;   
    border-radius : 5px; 
    cursor:pointer;

`;



export default Contracts_object;