import React, { useState } from 'react';

const ChatFooter = ({socket ,sendToDetails ,setMessages,userName}) => {
  const [message, setMessage] = useState('');

  const handleTyping = () => socket.emit("typing",`${userName} is typing `)

  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && userName) {
      const newMessage = {
        text: message,
        name: userName,
        id: Date.now(),
        socketID: socket.id,
        recipientId: sendToDetails.socketID
      };
  
      // Update messages state
      if(sendToDetails.socketID){

        setMessages(prevMessages => [...prevMessages, newMessage]);
      }
  
      // Emit the message to the server
      socket.emit('message', newMessage);
    }
    setMessage('');
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onKeyDown={handleTyping}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
