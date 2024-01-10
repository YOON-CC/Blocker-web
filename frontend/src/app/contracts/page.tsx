'use client'

import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
// import Header from '../components/header';
import Header from '@/components/Header';
// import Footer from '../components/footer';
import axios from 'axios';
import Link from "next/link";
import Chatting from '@/app/chatting';
import { getContractsByState, getCancelContractsByState } from '@/api/constracts';
import * as Styled from '@/styles/contracts.styles'


interface ContractItem {
    contractId: number;
    cancelContractId : number;
    title : number;
    content : string;
    createdAt : string;
    modifiedAt : string;
}


const Contracts = () => {

    const access_token = localStorage.getItem('access-token');
    const [contractData_1, setContractData_1] = useState<ContractItem[]>([]); 
    const [contractData_2, setContractData_2] = useState<ContractItem[]>([]); 
    const [contractData_3, setContractData_3] = useState<ContractItem[]>([]); 

    const [contractData_4, setContractData_4] = useState<ContractItem[]>([]); 
    const [contractData_5, setContractData_5] = useState<ContractItem[]>([]); 


    //미체결 게약서 받아오기
    const handleContarctList_1 = async () => {
        try {
            const data = await getContractsByState("NOT_PROCEED", access_token);
            setContractData_1(data);
        } catch (error) {
            // 에러 처리
        }
    };
  
    //진행중 게약서 받아오기
    const handleContarctList_2 = async () => {
        try {
            const data = await getContractsByState("PROCEED", access_token);
            setContractData_2(data);
        } catch (error) {
            // 에러 처리
        }
    };

    //체결 게약서 받아오기
    const handleContarctList_3 = async () => {
        try {
            const data = await getContractsByState("CONCLUDE", access_token);
            setContractData_3(data);
        } catch (error) {
            // 에러 처리
        }
    };

    //파기 진행중 게약서 받아오기
    const handleContarctList_4 = async () => {
        try {
            const data = await getCancelContractsByState("CANCELING", access_token);
            setContractData_4(data);
        } catch (error) {
            // 에러 처리
        }
    };

    //파기 체결 게약서 받아오기
    const handleContarctList_5 = async () => {
        try {
            const data = await getCancelContractsByState("CANCELED", access_token);
            setContractData_5(data);
        } catch (error) {
            // 에러 처리
        }
    };

    useEffect(() => {
        // 페이지가 로드될 때 한 번만 호출되는 로직
        handleContarctList_1();
        handleContarctList_2();
        handleContarctList_3();
        handleContarctList_4();
        handleContarctList_5();
    }, []);

    return (
        <div>
            <Header />
            <Chatting></Chatting>
            <Styled.Banner_img src="../image/contract_banner_img.png" alt="대체 이미지"/>
            <Styled.Container_3_contract_write>
                {/* <StyledLink to="/contractwrite" style={{ textDecoration: 'none' }}> */}
                <Link href="/contractWrite" style={{ textDecoration: 'none' }}>
                    <Styled.Container_3_contract_write_btn>계약서 작성</Styled.Container_3_contract_write_btn>
                </Link>
                {/* </StyledLink>     */}
            </Styled.Container_3_contract_write>
            <Styled.Container_title_1>
                <Styled.Container_title_1_name>🔗나의 계약 현황</Styled.Container_title_1_name>
            </Styled.Container_title_1>
            <Styled.Container_2>
                <Styled.Container_2_contract>
                    {/* <StyledLink to={`/contracts/${boardId}`} style={{ textDecoration: 'none' }}> */}
                    <Styled.Container_2_contract_1>
                        <Styled.Container_2_contract_title_Container>
                            <img src="./image/contracts_logo.png" style={{ width: "30px", height: "30px", marginLeft:"10px", marginTop:"10px"}}></img>
                            <Styled.Container_2_contract_title_Container_content>
                                <Styled.Container_2_contract_title_Container_content_1>미체결 계약서</Styled.Container_2_contract_title_Container_content_1>
                            </Styled.Container_2_contract_title_Container_content>
                        </Styled.Container_2_contract_title_Container>
                        <Styled.Container_2_contract_line></Styled.Container_2_contract_line>

                        <Styled.Container_2_contarcts_container>
                            {contractData_1.map((item, index) => (
                                <Link href={`/contractObject/${item.contractId}`} style={{ textDecoration: 'none' }} onClick={() => 
                                    {localStorage.setItem("contractId", item.contractId.toString());
                                    localStorage.setItem("state", "NOT_PROCEED");}} key={index}>
                                    <Styled.Container_2_contarcts_1>
                                        <Styled.Container_2_contarcts_1_title>{item.title}</Styled.Container_2_contarcts_1_title>
                                        <Styled.Container_2_contarcts_1_content>{item.content}</Styled.Container_2_contarcts_1_content>
                                        <Styled.Container_2_contarcts_1_info>
                                            <Styled.Container_2_contarcts_1_info_content_id>번호 : {item.contractId}</Styled.Container_2_contarcts_1_info_content_id>
                                            <Styled.Container_2_contarcts_1_info_content>작성일 : {item.createdAt.split("T")[0]}</Styled.Container_2_contarcts_1_info_content>
                                            <Styled.Container_2_contarcts_1_info_content>수정일 : {item.modifiedAt.split("T")[0]}</Styled.Container_2_contarcts_1_info_content>
                                        </Styled.Container_2_contarcts_1_info>                            
                                    </Styled.Container_2_contarcts_1>
                                </Link>
                            ))}
                        </Styled.Container_2_contarcts_container>

                    </Styled.Container_2_contract_1>
                    <Styled.Container_2_contract_2> 
                        <Styled.Container_2_contract_title_Container>
                            <img src="./image/contracts_logo.png" style={{ width: "30px", height: "30px", marginLeft:"10px", marginTop:"10px"}}></img>
                            <Styled.Container_2_contract_title_Container_content>
                                <Styled.Container_2_contract_title_Container_content_1>진행중 계약서</Styled.Container_2_contract_title_Container_content_1>
                            </Styled.Container_2_contract_title_Container_content>
                        </Styled.Container_2_contract_title_Container>
                        <Styled.Container_2_contract_line></Styled.Container_2_contract_line>

                        <Styled.Container_2_contarcts_container>
                            {contractData_2.map((item, index) => (
                                <Link href={`/contractObject/${item.contractId}`} style={{ textDecoration: 'none' }} onClick={() => 
                                    {localStorage.setItem("contractId", item.contractId.toString());
                                    localStorage.setItem("state", "PROCEED");}} key={index}>
                                    <Styled.Container_2_contarcts_1>
                                        <Styled.Container_2_contarcts_1_title>{item.title}</Styled.Container_2_contarcts_1_title>
                                        <Styled.Container_2_contarcts_1_content>{item.content}</Styled.Container_2_contarcts_1_content>
                                        <Styled.Container_2_contarcts_1_info>
                                            <Styled.Container_2_contarcts_1_info_content>작성일 : {item.createdAt.split("T")[0]}</Styled.Container_2_contarcts_1_info_content>
                                            <Styled.Container_2_contarcts_1_info_content>수정일 : {item.modifiedAt.split("T")[0]}</Styled.Container_2_contarcts_1_info_content>
                                        </Styled.Container_2_contarcts_1_info>
                                    </Styled.Container_2_contarcts_1>
                                </Link>
                            ))}
                        </Styled.Container_2_contarcts_container>

                    </Styled.Container_2_contract_2>
                    <Styled.Container_2_contract_3>
                        <Styled.Container_2_contract_title_Container>
                            <img src="./image/contracts_logo.png" style={{ width: "30px", height: "30px", marginLeft:"10px", marginTop:"10px"}}></img>
                            <Styled.Container_2_contract_title_Container_content>
                                <Styled.Container_2_contract_title_Container_content_1>체결 계약서</Styled.Container_2_contract_title_Container_content_1>
                            </Styled.Container_2_contract_title_Container_content>
                        </Styled.Container_2_contract_title_Container> 
                        <Styled.Container_2_contract_line></Styled.Container_2_contract_line>

                        <Styled.Container_2_contarcts_container>
                            {contractData_3.map((item, index) => (
                                <Link href={`/contractObject/${item.contractId}`} style={{ textDecoration: 'none' }} onClick={() => 
                                    {localStorage.setItem("contractId", item.contractId.toString());
                                    localStorage.setItem("state", "CONCLUDE");}} key={index}>
                                    <Styled.Container_2_contarcts_1>
                                        <Styled.Container_2_contarcts_1_title>{item.title}</Styled.Container_2_contarcts_1_title>
                                        <Styled.Container_2_contarcts_1_content>{item.content}</Styled.Container_2_contarcts_1_content>
                                        <Styled.Container_2_contarcts_1_info>
                                            <Styled.Container_2_contarcts_1_info_content>작성일 : {item.createdAt.split("T")[0]}</Styled.Container_2_contarcts_1_info_content>
                                            <Styled.Container_2_contarcts_1_info_content>수정일 : {item.modifiedAt.split("T")[0]}</Styled.Container_2_contarcts_1_info_content>
                                        </Styled.Container_2_contarcts_1_info>
                                    </Styled.Container_2_contarcts_1>
                                </Link>
                            ))}
                        </Styled.Container_2_contarcts_container>

                    </Styled.Container_2_contract_3>
                    
                </Styled.Container_2_contract>

            </Styled.Container_2>
            <Styled.Container_title_2>
                <Styled.Container_title_2_name>🔗파기 계약 현황</Styled.Container_title_2_name>
            </Styled.Container_title_2>
            {/* 파기 */}
            <Styled.Container_3>
                <Styled.Container_3_contract>
                    <Styled.Container_3_contract_1>
                        <Styled.Container_2_contract_title_Container>
                            <img src="./image/login_logo.png" style={{ width: "30px", height: "30px", marginLeft:"10px", marginTop:"10px"}}></img>
                            <Styled.Container_2_contract_title_Container_content>
                                <Styled.Container_2_contract_title_Container_content_1>파기 진행중 계약서</Styled.Container_2_contract_title_Container_content_1>
                            </Styled.Container_2_contract_title_Container_content>
                        </Styled.Container_2_contract_title_Container>
                        <Styled.Container_2_contract_line></Styled.Container_2_contract_line>

                        <Styled.Container_2_contarcts_container>
                            {contractData_4.map((item, index) => (
                                <Link href={`/cancelContractObject/${item.cancelContractId}`} style={{ textDecoration: 'none' }} onClick={() => 
                                    {localStorage.setItem("contractId", item.cancelContractId.toString());
                                    localStorage.setItem("state", "CANCELING");}} key={index}>
                                    <Styled.Container_2_contarcts_1>
                                        <Styled.Container_2_contarcts_1_title>{item.title}</Styled.Container_2_contarcts_1_title>
                                        <Styled.Container_2_contarcts_1_content>{item.content}</Styled.Container_2_contarcts_1_content>
                                        <Styled.Container_2_contarcts_1_info>
                                            <Styled.Container_2_contarcts_1_info_content>작성일 : {item.createdAt.split("T")[0]}</Styled.Container_2_contarcts_1_info_content>
                                            <Styled.Container_2_contarcts_1_info_content>수정일 : {item.modifiedAt.split("T")[0]}</Styled.Container_2_contarcts_1_info_content>
                                        </Styled.Container_2_contarcts_1_info>                            
                                    </Styled.Container_2_contarcts_1>
                                </Link>
                            ))}
                        </Styled.Container_2_contarcts_container>
                    </Styled.Container_3_contract_1>

                    <Styled.Container_3_contract_2>
                    <Styled.Container_2_contract_title_Container>
                            <img src="./image/login_logo.png" style={{ width: "30px", height: "30px", marginLeft:"10px", marginTop:"10px"}}></img>
                            <Styled.Container_2_contract_title_Container_content>
                                <Styled.Container_2_contract_title_Container_content_1>파기 체결 계약서</Styled.Container_2_contract_title_Container_content_1>
                            </Styled.Container_2_contract_title_Container_content>
                        </Styled.Container_2_contract_title_Container>
                        <Styled.Container_2_contract_line></Styled.Container_2_contract_line>

                        <Styled.Container_2_contarcts_container>
                            {contractData_5.map((item, index) => (
                                <Link href={`/cancelContractObject/${item.cancelContractId}`} style={{ textDecoration: 'none' }} onClick={() => 
                                    {localStorage.setItem("contractId", item.cancelContractId.toString());
                                    localStorage.setItem("state", "CANCELED");}} key={index}>
                                    <Styled.Container_2_contarcts_1>
                                        <Styled.Container_2_contarcts_1_title>{item.title}</Styled.Container_2_contarcts_1_title>
                                        <Styled.Container_2_contarcts_1_content>{item.content}</Styled.Container_2_contarcts_1_content>
                                        <Styled.Container_2_contarcts_1_info>
                                            <Styled.Container_2_contarcts_1_info_content>작성일 : {item.createdAt.split("T")[0]}</Styled.Container_2_contarcts_1_info_content>
                                            <Styled.Container_2_contarcts_1_info_content>수정일 : {item.modifiedAt.split("T")[0]}</Styled.Container_2_contarcts_1_info_content>
                                        </Styled.Container_2_contarcts_1_info>                            
                                    </Styled.Container_2_contarcts_1>
                                </Link>
                            ))}
                        </Styled.Container_2_contarcts_container>
                    </Styled.Container_3_contract_2>
                </Styled.Container_3_contract>
            </Styled.Container_3>
            <Styled.Footer></Styled.Footer>

        </div>
    );
};


export default Contracts;