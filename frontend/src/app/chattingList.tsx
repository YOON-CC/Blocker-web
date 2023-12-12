'use client'

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ChattingList = () => {

    const access_token = localStorage.getItem('access-token');

    const handleChattingList = async () => {
        
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/chatrooms`, {
                headers: {
                    'Authorization': access_token,
                }
            });
            console.log(response.data)

        } catch (error) {

        }
    };

    useEffect(() => {
        handleChattingList();
    }, []);



    return (
        <ListContainer>

        </ListContainer>
    );
};

const ListContainer = styled.div`
    background: white;
    position: fixed;
    width: 250px;
    height: 400px;
    margin-top: -130px;
    margin-left : -100px;
    top: 78%;
    left: 96%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.4);
`;


export default ChattingList;
