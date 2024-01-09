'use client'

import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Header from '@/components/Header';
import axios from 'axios';
import Link from "next/link";
import { getContractData, editContract } from '@/api/constractEdit';


const Contract_edit= () => {

    const access_token : any = localStorage.getItem('access-token');
    const contractId : any = localStorage.getItem('contractId_1');
    const [contractObject_contractId, setContractObject_contractId] = useState(0); 
    const [contractObject_title, setContractObject_title] = useState(''); 
    const [contractObject_content, setContractObject_content] = useState(''); 

    const handleContarctObject_1 = async () => {
        try {
            const contractData = await getContractData(contractId, access_token);
            setContractObject_contractId(contractData.contractId);
            setContractObject_title(contractData.title);
            setContractObject_content(contractData.content);
        } catch (error) {
            // Handle error
        }
    };

    useEffect(() => {
        // 페이지가 로드될 때 한 번만 호출되는 로직
        handleContarctObject_1();
    }, []);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handletitleChange = (event : any) => {
        setTitle(event.target.value)
    };
    const handlecontentChange = (event : any) => {
        setContent(event.target.value)
    };

    const handleContractEdit = async (event: any) => {
        event.preventDefault();
        try {
            await editContract(contractId, title, content, access_token);
            // Handle success
        } catch (error) {
            // Handle error
        }
    };

    return (
        <div>
            <Header/>
            <Container>
                <Container_title placeholder={contractObject_title} onChange={handletitleChange}></Container_title>
                <Container_content placeholder={contractObject_content} onChange={handlecontentChange}></Container_content>
                <Container_btn_container>
                    <Link href="/contracts" style={{ textDecoration: 'none' }}>
                        <Container_btn_container_b1>취소</Container_btn_container_b1>
                    </Link>
                    <form onSubmit={handleContractEdit}>
                        <Container_btn_container_b2>수정</Container_btn_container_b2>
                    </form>
                </Container_btn_container>
            </Container>
        </div>
    );
};

const Container = styled.div`
    position : absolute;
    // background : red;
    height: fit-content;
    width: 500px;

    top : 50%;
    left : 50%;
    transform : translate(-50%, -50%);
`;

const Container_title = styled.input`
    height: 40px;
    width: 485px;

    display : flex;
    justify-content : center;
    align-items : center;

    font-size : 12px;
    font-weight : bold;
    color : black;

    border : 2px solid #e3e3e3;
    outline : none;

    padding-left : 10px;
    margin-top : 10px;

    border-radius : 4px;
`;
const Container_content = styled.textarea`
    height: 150px;
    width: 477px;

    display : flex;
    justify-content : center;
    align-items : center;

    font-size : 12px;
    font-weight : bold;
    color : black;

    border : 2px solid #e3e3e3;
    outline : none;

    padding : 10px;
    margin-top : 10px;

    font-family: 'Varela Round', sans-serif;

    resize : none;

    border-radius : 4px;
`;
const Container_btn_container = styled.div`
    // background : red;
    height:40px;
    width: 160px;

    display : flex;
    justify-content : space-between;

    font-size : 12px;
    font-weight : bold;
    color : white;

    margin-top : 10px;
    margin-left : 340px;

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
    background : black;
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
export default Contract_edit;