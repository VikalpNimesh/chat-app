import React, { useEffect, useState } from 'react';

const ChatBar = ({socket,userName}) => {
  const [users, setUsers] = useState([]);
  // const [socketid, setSocketid] = useState(null);

  // console.log(socketid);


  useEffect(() => {
    socket.on("newUserResponse",(data)=>(
        
      setUsers(data.filter((user)=>user.userName !==  userName))))
  }, [socket,users])

  const handlePrivateUser = (user) =>{
    // setSocketid(user.socketID)

    socket.emit("private_user" , user )
    
  }

  return (
    <div className="chat__sidebar">
      <h2>{userName}</h2>

      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
        {users.map((user) => (
            <p style={{cursor:"pointer"}} onClick={()=>handlePrivateUser(user)} key={user.socketID}>{user.userName} <span>.</span> </p>
            
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
