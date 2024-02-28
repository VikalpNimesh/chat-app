import React, { useEffect, useRef, useState } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

const ChatPage = ({ socket ,userName ,setUserName }) => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef(null);
  const [sendToDetails, setSendToDetails] = useState("")
  const [name, setName] = useState("")

  useEffect(() => {
    socket.on("private_user_response" ,(data)=>{
      setSendToDetails(data)
      setName(data.userName)
    }

    
    ) }, [])

    useEffect(() => {
      socket.on("messageResponse", (data) => {
        console.log(data);
        // Filter out the message sent by the current user
        // if (data.name !== userName) {
        // }
        setMessages(prevMessages => [...prevMessages, data]);
      });
    
      // Clean up the event listener when the component unmounts
      return () => {
        socket.off("messageResponse");
      };
    }, [socket, setMessages]);
    


  useEffect(() => {
    socket.on("typingResponse", (data) => setTypingStatus(data));
  }, [socket]);


  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [messages])
  
  
  return (
    <div className="chat">
      <ChatBar userName={userName} socket={socket} />
      <div className="chat__main">
        <ChatBody userName={userName} setUserName={setUserName} name={name} setName={setName}  messages={messages} lastMessageRef={lastMessageRef} typingStatus={typingStatus}  socket={socket}/>
        <ChatFooter name={name} userName={userName} setMessages={setMessages} socket={socket} sendToDetails={sendToDetails} />
      </div>
    </div>
  );
};

export default ChatPage;
