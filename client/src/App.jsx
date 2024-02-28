import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPage from './components/ChatPage.jsx';
import socketIO from 'socket.io-client';
import Home from './components/Home.jsx';
import "./App.css"
import { useState } from 'react';

const socket = socketIO.connect('http://localhost:4000');
function App() {
  const [userName, setUserName] = useState('');

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home userName={userName} setUserName={setUserName} socket={socket} />}></Route>
          <Route path="/chat" element={<ChatPage userName={userName} setUserName={setUserName} socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
