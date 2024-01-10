'use client'

import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Header from '@/components/Header';
import axios from 'axios';
import Link from "next/link";
import { getContractData, editContract } from '@/api/constractEdit';
import * as Styled from '@/styles/contractEdit.styles'



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
            <Styled.Container>
                <Styled.Container_title placeholder={contractObject_title} onChange={handletitleChange}></Styled.Container_title>
                <Styled.Container_content placeholder={contractObject_content} onChange={handlecontentChange}></Styled.Container_content>
                <Styled.Container_btn_container>
                    <Link href="/contracts" style={{ textDecoration: 'none' }}>
                        <Styled.Container_btn_container_b1>취소</Styled.Container_btn_container_b1>
                    </Link>
                    <form onSubmit={handleContractEdit}>
                        <Styled.Container_btn_container_b2>수정</Styled.Container_btn_container_b2>
                    </form>
                </Styled.Container_btn_container>
            </Styled.Container>
        </div>
    );
};

export default Contract_edit;