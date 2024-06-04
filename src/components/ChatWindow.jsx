//ChatWindow.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

function ChatWindow({ selectedItem, isAdmin }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLobbyAdmin, setIsLobbyAdmin] = useState(isAdmin);

  useEffect(() => {
    if (!selectedItem || !selectedItem.id) {
      console.log("No conversation or ID is undefined.");
      return;
    }

    const actualId = selectedItem.type === 'dm' ? selectedItem.id.split('-')[2] : selectedItem.id;
    selectedItem.type === 'dm' ? fetchDMMessages(actualId) : fetchLobbyMessages(actualId);
  }, [selectedItem, isAdmin]);

  const fetchLobbyMessages = async (lobbyId) => {
    try {
        const response = await axios.get(`/api/lobby/${lobbyId}/messages`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const userId = localStorage.getItem('userId');
        console.log('Current User ID:', userId);
        console.log('Messages:', response.data.messages);

        setMessages(response.data.messages.map(msg => ({
            ...msg,
            sender: msg.user_id.toString() === userId,
            showOptions: false
        })));
        setIsLobbyAdmin(response.data.isAdmin);
    } catch (error) {
        console.error("Failed to fetch lobby messages:", error);
    }
};

const fetchDMMessages = async (dmId) => {
    try {
        const response = await axios.get(`/api/direct-messages/${dmId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const userId = localStorage.getItem('userId');
        console.log('Current User ID:', userId);
        console.log('Direct Messages:', response.data);

        const messagesData = [...response.data.sent, ...response.data.received];
        setMessages(messagesData.map(msg => ({
            ...msg,
            sender: msg.user_id.toString() === userId,
            showOptions: false
        })));
    } catch (error) {
        console.error("Failed to fetch DM messages:", error);
    }
};



  const toggleOptions = (index) => {
    setMessages(currentMessages =>
      currentMessages.map((msg, i) =>
        i === index ? { ...msg, showOptions: !msg.showOptions } : msg
      )
    );
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedItem) {
      console.log("No message to send or conversation is undefined.");
      return;
    }

    const actualId = selectedItem.type === 'dm' ? selectedItem.id.split('-')[2] : selectedItem.id;
    const url = selectedItem.type === 'dm' ? `/api/direct-messages/${actualId}/send` : `/api/lobby/${actualId}/post-message`;
    try {
      const response = await axios.post(url, { message: newMessage }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.data && response.data.id) {
        const newMsg = { message: newMessage, sender: true, id: response.data.id, showOptions: false };
        setMessages(prevMessages => [...prevMessages, newMsg]);
        setNewMessage('');
      } else {
        console.error("Message posted but no ID returned:", response);
        alert('Message posted but no ID returned.');
      }
    } catch (error) {
      console.error(`Failed to send message:`, error);
      alert('Failed to send message. Please try again.');
    }
  };

  const handleEditMessage = async (messageId) => {
    const messageToEdit = messages.find(msg => msg.id === messageId)?.message;
    const newMessageText = prompt("Edit the message:", messageToEdit);
    if (newMessageText === null || newMessageText.trim() === "") {
      alert("Message cannot be empty.");
      return;
    }
    try {
      const response = await axios.put(`/api/message/${messageId}/edit`, {
        newMessage: newMessageText
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.data) {
        setMessages(messages.map(msg => msg.id === messageId ? { ...msg, message: newMessageText } : msg));
        
      }
    } catch (error) {
      console.error("Failed to edit message:", error);
      alert("Failed to edit message.");  
    }
};


  const handleDeleteMessage = async (messageId) => {
    try {
      const response = await axios.delete(`/api/message/${messageId}/delete`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.data) {
        setMessages(messages.filter(msg => msg.id !== messageId));
        
      }
    } catch (error) {
      console.error("Failed to delete message:", error);
      alert("Failed to delete message."); 
    }
};

  return (
    <div className="chat-window">
      <div className="chat-header">{selectedItem ? `${selectedItem.name} - Chat Room` : 'Select a Conversation'}</div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className="message-container">
            <div className={`message ${msg.sender ? 'sent' : 'received'}`}>
              {msg.message}
            </div>
            {(isLobbyAdmin || msg.sender) && (
              <div>
                <div className="message-options-button" onClick={() => toggleOptions(index)}>⋮</div>
                {msg.showOptions && (
                  <div className="message-options-menu">
                    <button onClick={() => handleEditMessage(msg.id)}>
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                    <button onClick={() => handleDeleteMessage(msg.id)}>
                      <FontAwesomeIcon icon={faTrashAlt} /> Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>
          <FontAwesomeIcon icon={faPaperPlane} size="lg" />
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
