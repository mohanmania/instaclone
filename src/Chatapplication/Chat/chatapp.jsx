import React, { useState } from "react";
import ChatList from "./components/ChatList/ChatList";
import Chat from "./components/Chat/Chat";
import "./App.css";
function ChatApp() {
  const [selectedChat, setSelectedChat] = useState(null);
  return (
    <div className="chat-app">
      {" "}
      <ChatList onSelectChat={setSelectedChat} />{" "}
      {selectedChat && <Chat chatId={selectedChat.id} />}{" "}
    </div>
  );
}
export default ChatApp;
