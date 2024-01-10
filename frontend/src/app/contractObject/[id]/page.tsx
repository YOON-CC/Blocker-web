'use client'

import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from "react-router-dom";
import SignatureCanvas from 'react-signature-canvas';
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
import * as Styled from '@/styles/contractObject.styled'

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
            <Styled.Container>
                <Styled.Container_1>계약서</Styled.Container_1>
                <Styled.Container_2>
                    <Styled.Container_2_title>제목</Styled.Container_2_title>
                    <Styled.Container_2_content>{contractObject_title}</Styled.Container_2_content>
                </Styled.Container_2>
                <Styled.Container_3>
                    <Styled.Container_3_title>작성일자</Styled.Container_3_title>
                    <Styled.Container_3_content>{contractObject_createdAt.split("T")[0]}</Styled.Container_3_content>
                    <Styled.Container_3_title>수정일자</Styled.Container_3_title>
                    <Styled.Container_3_content>{contractObject_modifiedAt.split("T")[0]}</Styled.Container_3_content>
                </Styled.Container_3>
                <Styled.Container_4>
                    <Styled.Container_4_title>내용</Styled.Container_4_title>
                    <Styled.Container_4_content>{contractObject_content}</Styled.Container_4_content>
                </Styled.Container_4>
            </Styled.Container>
            {contractType === 'NOT_PROCEED' && (
                <Styled.Container_btn_container>
                    <Styled.Container_btn_container_b1>취소</Styled.Container_btn_container_b1>
                    <Link href='/contractEdit' style={{ textDecoration: 'none' }} onClick={() => localStorage.setItem("contractId", contractObject_contractId.toString())}>
                        <Styled.Container_btn_container_b2>편집</Styled.Container_btn_container_b2>
                    </Link>
                    <form onSubmit={handleContractDelete}>
                        <Styled.Container_btn_container_b3>삭제</Styled.Container_btn_container_b3>
                    </form>
                    <Styled.Container_btn_container_b4 onClick={() => setContractSearchModal(!contractSearchModal)}>계약참여자 검색</Styled.Container_btn_container_b4>
                </Styled.Container_btn_container>
            )}
            {contractType === 'PROCEED' && (
                <Styled.Container_btn_container>
                    <form onSubmit={handleContractDestruction}>
                        <Styled.Container_btn_container_b3>삭제</Styled.Container_btn_container_b3>
                    </form>
                    <Styled.Container_participation_list>
                    {contractObject_participation.map((item, index) => (
                        <Styled.Container_participation_list_container key={index}>
                            <Styled.Container_participation_list_container_name style={{ background: item.signState === 'Y' ? 'lime' : '#f1f1f1' }}>
                                {item.contractor}
                             </Styled.Container_participation_list_container_name>
                            <Styled.Container_participation_list_container_state style={{ background: item.signState === 'Y' ? 'lime' : '#f1f1f1' }}>
                                {item.signState}
                            </Styled.Container_participation_list_container_state>
                        </Styled.Container_participation_list_container>
                    ))}
                    </Styled.Container_participation_list>
                    <form onSubmit={handleContractSign1}>
                        <Styled.Container_btn_container_b5>전자서명 등록</Styled.Container_btn_container_b5>
                    </form>
                </Styled.Container_btn_container>
            )}
            {contractType === 'CONCLUDE' && (
                <Styled.Container_btn_container>
                    <form onSubmit={handleContractToCanceling}>
                        <Styled.Container_3_contract_write_btn>파기 계약서 작성</Styled.Container_3_contract_write_btn>
                    </form>
                </Styled.Container_btn_container>
            )}
            {/* 파기계약서 */}
            {contractType === 'CANCELING' && (
                <Styled.Container_btn_container>
                    <Styled.Container_participation_list>
                    {contractObject_destroy_participation.map((item, index) => (
                        <Styled.Container_participation_list_container key={index}>
                            <Styled.Container_participation_list_container_name style={{ background: item.signState === 'Y' ? 'lime' : '#f1f1f1' }}>
                                {item.contractor}
                             </Styled.Container_participation_list_container_name>
                            <Styled.Container_participation_list_container_state style={{ background: item.signState === 'Y' ? 'lime' : '#f1f1f1' }}>
                                {item.signState}
                            </Styled.Container_participation_list_container_state>
                        </Styled.Container_participation_list_container>
                    ))}
                    </Styled.Container_participation_list>
                    <form onSubmit={handleContractSign2}>
                        <Styled.Container_btn_container_b5>전자서명 등록</Styled.Container_btn_container_b5>
                    </form>
                </Styled.Container_btn_container>
            )}

            {contractSearchModal && (
                <Styled.Container_search_user>
                    <Styled.Container_search_user_frame>
                        <Styled.Container_search_user_frame_1>
                            <Styled.Container_search_user_frame_1_input onChange={handleSearchUserChange}></Styled.Container_search_user_frame_1_input>
                            <form onSubmit={handleSearchUser}>
                                <Styled.Container_search_user_frame_1_btn>🔗</Styled.Container_search_user_frame_1_btn>
                            </form>
                        </Styled.Container_search_user_frame_1>


                        <Styled.Container_search_user_frame_2>
                            {searchUserContentEmail.map((item, index) => (
                                <Styled.Container_search_user_frame_2_container key={index}>{item}</Styled.Container_search_user_frame_2_container>
                            ))}
                        </Styled.Container_search_user_frame_2>


                        <Styled.Container_search_user_frame_3>
                            <Styled.Container_search_user_frame_3_b1 onClick={() => setContractSearchModal(!contractSearchModal)}>취소</Styled.Container_search_user_frame_3_b1>
                            <form onSubmit={handleContractToProceed}>
                                <Styled.Container_search_user_frame_3_b2>진행</Styled.Container_search_user_frame_3_b2>
                            </form>
                        </Styled.Container_search_user_frame_3>
                    </Styled.Container_search_user_frame>
                </Styled.Container_search_user>
            )}
        </div>
    );
};


export default Contracts_object;