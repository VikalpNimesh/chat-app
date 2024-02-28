import React, { useEffect, useState } from 'react';

const ChatBar = ({socket}) => {
  const [users, setUsers] = useState([]);
  // const [socketid, setSocketid] = useState(null);

  // console.log(socketid);


  useEffect(() => {
    socket.on("newUserResponse",(data)=>(
        
      setUsers(data.filter((user)=>user.userName !==  localStorage.getItem('userName')))))
  }, [socket,users])

  const handlePrivateUser = (user) =>{
    // setSocketid(user.socketID)

    socket.emit("private_user" , user )
    
  }

  return (
    <div className="chat__sidebar">
      <h2>{localStorage.getItem('userName')}</h2>

      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
        {users.map((user) => (
            <p style={{cursor:"pointer"}} onClick={()=>handlePrivateUser(user)} key={user.socketID}>{user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
