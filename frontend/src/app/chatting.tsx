'use client'

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs'; 
import ChattingList from './chattingList';

const Chatting: React.FC = () => {
  const access_token = localStorage.getItem('access-token');
  const [isVisible, setIsVisible] = useState(false);
  let stompClient: Stomp.Client | null = null;

  const handleShowChattingList = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <Container onClick={handleShowChattingList}>
        <img src="./image/login_logo.png" style={{ width: "85%", height: "85%", marginLeft: '4px', marginTop: '3.5px' }} alt="로고"></img>
      </Container>
      {isVisible && <ChattingList isVisible={isVisible} />}
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