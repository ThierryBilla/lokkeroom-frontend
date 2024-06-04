// App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import Login from './components/Login';
import Register from './components/Register';
import { useAuth } from './context/AuthContext';
import './index.css';

axios.defaults.baseURL = 'http://localhost:3000';

function App() {
  const { user, isAdmin } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState(null);

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);  // Set the entire conversation object which includes type and id
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={user ? (
            <>
              <ChatList onLobbySelect={handleConversationSelect} onUserSelect={handleConversationSelect} />
              <ChatWindow selectedItem={selectedConversation} isAdmin={isAdmin} />
            </>
          ) : <Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
