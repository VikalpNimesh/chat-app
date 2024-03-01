import React, { useEffect, useRef, useState } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

const ChatPage = ({ socket ,userName ,setUserName }) => {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [IsTyping, setIsTyping] = useState(false)
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
        // console.log(data);
        setMessages(prevMessages => [...prevMessages, data]);
      });
      return () => {
        socket.off("messageResponse");
      };
    }, [socket, setMessages]);
    

  useEffect(() => { 
    socket.on("typing", (data) => {setIsTyping(true),setTyping(data)});
    socket.on("stop typing", () => setIsTyping(false));
  }, [socket]);


  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [messages])
  
  
  return (
    <div className="chat">
      <ChatBar userName={userName} socket={socket} />
      <div className="chat__main">
      
        <ChatBody  IsTyping={IsTyping} setIsTyping={setIsTyping} userName={userName} setUserName={setUserName} name={name} setName={setName}  messages={messages} lastMessageRef={lastMessageRef} typing={typing}  socket={socket}/>

        <ChatFooter typing={typing} setTyping={setTyping}  name={name} userName={userName} setMessages={setMessages} socket={socket} sendToDetails={sendToDetails} />

      </div>
    </div>
  );
};

export default ChatPage;
