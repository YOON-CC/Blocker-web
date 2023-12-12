'use client'

import React, { useState } from 'react';
import styled from 'styled-components';
import ChattingList from './chattingList';

const Chatting = () => {
    const [isChattingListVisible, setIsChattingListVisible] = useState(false);

    const toggleVisibility = () => {
        setIsChattingListVisible(!isChattingListVisible);
    };

    return (
        <div>
            <Container onClick={toggleVisibility}>
                <img src="./image/login_logo.png" style={{ width: "85%", height: "85%", marginLeft: '4px', marginTop: '3.5px' }}></img>
            </Container>
            {isChattingListVisible && <ChattingList />}
        </div>
    );
};

const Container = styled.div`
    background: white;
    position: fixed;
    width: 50px;
    height: 50px;
    margin-top: 100px;
    top: 78%;
    left: 96%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.4);
    &:hover {
        filter: brightness(0.9);
    }
`;


export default Chatting;
