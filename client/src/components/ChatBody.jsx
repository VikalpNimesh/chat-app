import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatBody = ({name,messages,lastMessageRef , typingStatus , socket}) => {
  console.log(messages);
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };




  return (
    <>
      <header className="chat__mainHeader">
        <p>{name}</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      {/*This shows messages sent from you*/}
      <div className="message__container">

      {messages.map((message) =>
          message.name === localStorage.getItem('userName') ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;