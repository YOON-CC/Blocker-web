// 'use client'
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Stomp from 'stompjs';


interface ChattingListProps {
  isVisible: boolean; // 새로운 값 추가
}

interface ChattingList {
  chatRoomId: number;
  lastChat: number;
  lastChatTime: number;
}

const ChattingList: React.FC<ChattingListProps> = ({ isVisible }) => {

  const [chattingListData, setChattingListData] = useState<ChattingList[]>([]);
  const [openChatting, setOpenChatting] = useState(false);
  
  let stompClientInstance: Stomp.Client | null = null;
  
  const access_token = localStorage.getItem('access-token') ?? '';
  const socket = new WebSocket('ws://43.202.127.236:8080/chat');


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
  }, [isVisible]);

  const handleChatRoomClick = (chatRoomId: number) => {
    setOpenChatting(true)

    if (stompClientInstance) {
      const subscription = stompClientInstance.subscribe(`/sub/${chatRoomId}`, (message: { body: string }) => {
        const chatMessages = document.getElementById('chatMessages') as HTMLUListElement;
        const messageText = JSON.parse(message.body).content;
        const sender = JSON.parse(message.body).sender;
        const messageElement = document.createElement('div');
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
    <div>
      <ListContainer>
        {chattingListData.map((item, index) => (
          <ListContainerFrame key={index} onClick={() => handleChatRoomClick(item.chatRoomId)}>
            {item.chatRoomId}
            {item.lastChat}
            {item.lastChatTime}
          </ListContainerFrame>
        ))}
      </ListContainer>
        {openChatting && (
          <ChattingObjectContainer>
            <ChattingObjectFrame>
              <ChattingMessageObject id="chatMessages"></ChattingMessageObject>
            </ChattingObjectFrame>
            <ChattingOjbectMessageFrame>
              <ChattingInput type="text" id="messageInput"/>
              <ChattingButton onClick={sendMessage}><img src="../image/button_logo.png" style={{ width: "140%", height: "110%", marginTop : "-1.5px", marginLeft : '-3px'}}></img></ChattingButton>
            </ChattingOjbectMessageFrame>

          </ChattingObjectContainer>
        )}
    </div>
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
  &:hover {
    filter: brightness(0.9);
  }
`;

const ChattingObjectContainer = styled.div`
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  width: 250px;
  height: 400px;
  margin-top: -130px;
  margin-left: -350px;
  top: 78%;
  left: 96%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.4);
`;

const ChattingObjectFrame = styled.div`
  position : relative;
  // background: rgba(0, 0, 0, 0.5);
  width: 240px;
  height: 350px;
  margin-top:5px;
  margin-left : 5px;

  border-radius: 5px;
  cursor: pointer;
  overflow: auto; /* 스크롤 추가 */
  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #e3e3e3;
  }
`;
const ChattingMessageObject = styled.div`
  & > div {
    margin-top: 5px;
    background: linear-gradient(to right, #435DF1, #4324dc); 
    width : fit-content;
    padding : 5px;
    border-radius : 5px;
    color : white;
  }
`
const ChattingOjbectMessageFrame = styled.div`
  // background : red;
  width : 100%;
  height : 35px;
  margin-top : 5px;
  display : flex;

`
const ChattingInput = styled.input`
  position : relative;
  background: rgba(0, 0, 0, 0.5);
  width: 195px;
  margin-left : 5px;
  height: 96%;
  outline : none;
  border-radius : 5px;
  border : none;
  padding-left : 5px;
  color : white;
`;
const ChattingButton = styled.button`
  background : none;
  width : 37px;
  height: 100%;
  border : none;
  // margin-left : 5px;
  &:hover {
    filter: brightness(0.9);
  }
  cursor : pointer;
`

export default ChattingList;