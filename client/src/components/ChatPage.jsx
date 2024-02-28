import React, { useEffect, useRef, useState } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef(null);
  const [sendToDetails, setSendToDetails] = useState("")

  useEffect(() => {
    socket.on("private_user_response" ,(data)=>
    setSendToDetails(data) ) }, [])

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
    console.log(messages);
  }, [socket, messages]);


  useEffect(() => {
    socket.on("typingResponse", (data) => setTypingStatus(data));
  }, [socket]);


  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [messages])
  
  
  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody name={sendToDetails.userName} messages={messages} lastMessageRef={lastMessageRef} typingStatus={typingStatus}  socket={socket}/>
        <ChatFooter socket={socket} sendToDetails={sendToDetails} />
      </div>
    </div>
  );
};

export default ChatPage;
