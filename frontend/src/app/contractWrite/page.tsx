'use client'

import React, { useState } from 'react';
// import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Header from '@/components/Header';
import axios from 'axios';
import Link from "next/link";
import { postContract } from '@/api/contractWrite';
import * as Styled from '@/styles/contractWrite.styled'


const Contractwrite = () => {

    const access_token = localStorage.getItem('access-token');


    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handletitleChange = (event : any) => {
        setTitle(event.target.value)
    };
    const handlecontentChange = (event : any) => {
        setContent(event.target.value)
    };

    const handleContractPost = async (event: any) => {
        event.preventDefault();
        try {
            const success = await postContract(title, content, access_token);

            if (success) {
                console.log("옴");
            }
        } catch (error) {
            // 에러 처리
        }
    };

    return (
        <div>
            <Header/>
            <Styled.Container>
                <Styled.Container_title placeholder='제목을 작성해주세요.' onChange={handletitleChange}></Styled.Container_title>
                <Styled.Container_content placeholder='내용을 작성해주세요.' onChange={handlecontentChange}></Styled.Container_content>
                <Styled.Container_btn_container>
                    {/* <StyledLink to="/contracts" style={{ textDecoration: 'none' }}> */}
                    <Link href="/contracts" style={{ textDecoration: 'none' }}>
                        <Styled.Container_btn_container_b1>취소</Styled.Container_btn_container_b1>
                    </Link>
                    {/* </StyledLink> */}
                    <form onSubmit={handleContractPost}>
                        <Styled.Container_btn_container_b2>작성</Styled.Container_btn_container_b2>
                    </form>
                </Styled.Container_btn_container>
            </Styled.Container>
        </div>
    );
};


export default Contractwrite;