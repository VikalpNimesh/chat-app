import React, { useState } from 'react';

const ChatFooter = ({socket,name,typing ,setTyping,sendToDetails ,setMessages,userName}) => {
  const [message, setMessage] = useState('');
  // console.log(name);

  const handleTyping = (e) => {
    setMessage(e.target.value)
    
    console.log(typing);
    setTyping(true) 
    if(!typing){

      console.log(typing);
      socket.emit("typing",`${userName} is typing `)
      // setTyping(false) 
    }
    let lastTypingTime = new Date().getTime()
    var timerLength = 1000

    setTimeout(() => {
            // setTyping(true) 

      var timeNow =  new Date().getTime()
      var timeDiff = timeNow - lastTypingTime;
      // console.log("1", timeDiff, typing);
      if(timeDiff >= timerLength && typing){
        // console.log("2");

        socket.emit("stop typing" , "")
        setTyping(false)
      }

    }, timerLength);
  }

   
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && userName) {
      const newMessage = {
        text: message,
        name: userName,
        id: Date.now(),
        socketID: socket.id,
        recipientId:name? sendToDetails.socketID : undefined
      };
  
      if(sendToDetails.socketID && name){
        setMessages(prevMessages => [...prevMessages, newMessage]);
      }
        socket.emit('message', newMessage);
    }
    setMessage('');
    socket.emit("stop typing" , "")
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={handleTyping}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
