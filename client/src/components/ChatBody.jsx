import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatBody = ({setName,IsTyping,name,messages,lastMessageRef,userName , typing , socket}) => {
  // console.log(typing);
  // console.log(IsTyping);
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    navigate('/');
    window.location.reload();
  };

const handleDeleteUser=()=>{
  setName(null)
}

  return (
    <>
      <header className="chat__mainHeader">Send To
        <p onClick={handleDeleteUser} > {name? name : "Everyone"}</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      {/*This shows messages sent from you*/}
      <div className="message__container">

      {messages.map((message) =>
          message.name === userName ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text} </p>
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
          { IsTyping ? <div>{typing}</div> : (<></>)  }
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;