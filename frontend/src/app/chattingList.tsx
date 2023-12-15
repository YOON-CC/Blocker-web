'use client'
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Stomp from 'stompjs';


interface ChattingListProps {
  isVisible: boolean;
  stompClient: Stomp.Client | null;
}

interface ChattingList {
  chatRoomId: number;
  lastChat: number;
  lastChatTime: number;
}

const ChattingList: React.FC<ChattingListProps> = ({ isVisible, stompClient }) => {
  const [chattingListData, setChattingListData] = useState<ChattingList[]>([]);
  const [openChatting, setOpenChatting] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; content: string }[]>([]);

  const access_token = localStorage.getItem('access-token') ?? '';

  const handleChattingList = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/chatrooms`, {
        headers: {
          'Authorization': access_token,
        },
      });
      setChattingListData(response.data);
    } catch (error) {
      console.error('Error', error);
    }
  };

  useEffect(() => {
    handleChattingList();
  }, [isVisible]);

  const handleChatRoomClick = (chatRoomId: number) => {
    if (stompClient) {
      const subscription = stompClient.subscribe(`/sub/${chatRoomId}`, (message: { body: string }) => {
        const newMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, { sender: newMessage.sender, content: newMessage.content }]);
      }, {
        Authorization: access_token, 
      });
      setOpenChatting(true);
      return () => {
        subscription.unsubscribe();
      };
    }
  };

  const sendMessage = () => {
    const messageInput = document.getElementById('messageInput') as HTMLInputElement;
    const message = messageInput.value.trim();
  
    if (!message) {
      alert('Enter a message.');
      return;
    }
  
    if (stompClient) {
      const currentRoomId = 9; 
      const headers = {
        Authorization: access_token,
      };
  
      const chatMessage = {
        content: message,
      };
      stompClient.send(`/pub/message/${currentRoomId}`, headers, JSON.stringify(chatMessage));

    }
      messageInput.value = '';
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
            <ChattingMessageObject id="chatMessages">
              {messages.map((message, index) => (
                <div key={index}>
                  {message.content}
                </div>
              ))}
            </ChattingMessageObject>
              
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