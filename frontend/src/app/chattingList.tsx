// 'use client'
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Stomp from 'stompjs';

interface ChattingListProps {
  stompClient: React.RefObject<Stomp.Client> | null;
}

interface ChattingList {
  chatRoomId: number;
  lastChat: number;
  lastChatTime: number;
}

const ChattingList: React.FC<ChattingListProps> = ({ stompClient }) => {
  const [chattingListData, setChattingListData] = useState<ChattingList[]>([]);
  const access_token = localStorage.getItem('access-token') ?? '';
  const socket = new WebSocket('ws://43.202.127.236:8080/chat');
  let stompClientInstance: Stomp.Client | null = null;

  stompClientInstance = Stomp.over(socket);

  const headers = {
    Authorization: access_token,
  };

  stompClientInstance.connect(headers, (frame) => {
    console.log('소켓 연결됨.');
  }, (error) => {
    console.log('Error: ' + error);
  });

  const handleChattingList = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/chatrooms`, {
        headers: {
          'Authorization': access_token,
        },
      });
      setChattingListData(response.data);
    } catch (error) {
      console.error('채팅방 목록을 불러오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    handleChattingList();
  }, []);

  const handleChatRoomClick = (chatRoomId: number) => {
    console.log('채팅방 클릭');
    if (stompClientInstance) {
      const subscription = stompClientInstance.subscribe(`/sub/${chatRoomId}`, (message: { body: string }) => {
        const chatMessages = document.getElementById('chatMessages') as HTMLUListElement;
        const messageText = JSON.parse(message.body).content;
        const sender = JSON.parse(message.body).sender;
        const messageElement = document.createElement('li');
        messageElement.textContent = sender + ': ' + messageText;
        chatMessages.appendChild(messageElement);
      }, {
        Authorization: access_token,
      });

      return () => {
        // 컴포넌트가 언마운트될 때 채널 구독 해제
        subscription.unsubscribe();
      };
    }
  };

  const sendMessage = () => {
    const messageInput = document.getElementById('messageInput') as HTMLInputElement;
    const message = messageInput.value.trim();

    if (!message) {
      alert('메시지를 입력하세요.');
      return;
    }

    if (stompClientInstance && stompClientInstance.connected) {
      const currentRoomId = 9; // 실제로 사용하는 방법으로 대체
      const headers = {
        Authorization: access_token,
      };

      const chatMessage = {
        content: message,
      };

      stompClientInstance.send(`/pub/message/${currentRoomId}`, headers, JSON.stringify(chatMessage));

      messageInput.value = '';
    } else {
      alert('소켓에 연결되어 있지 않습니다.');
    }
  };

  return (
    <ListContainer>
      {chattingListData.map((item, index) => (
        <ListContainerFrame key={index} onClick={() => handleChatRoomClick(item.chatRoomId)}>
          {item.chatRoomId}
          {item.lastChat}
          {item.lastChatTime}
        </ListContainerFrame>
      ))}
      <div>
        <input type="text" id="messageInput" placeholder="메시지를 입력하세요" />
        <button onClick={sendMessage}>전송</button>
        <ul id="chatMessages"></ul>
      </div>
    </ListContainer>
  );
};

const ListContainer = styled.div`
  background: white;
  position: fixed;
  width: 250px;
  height: 400px;
  margin-top: -130px;
  margin-left: -100px;
  top: 78%;
  left: 96%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.4);
`;

const ListContainerFrame = styled.div`
  background: #e3e3e3;
  width: 240px;
  height: 60px;
  margin-top: 5px;
  margin-left: 5px;
  border-radius: 3px;
`;

export default ChattingList;
