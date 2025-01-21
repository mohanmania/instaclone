import React from "react";
import "../../Chatapplication/List/ChatList/chatlist.css";

const ChatItem = ({ chat, onChatClick }) => {
  return (
    <div className="item" key={chat.receiverId} onClick={() => onChatClick(chat)}>
      <img
        src={chat.user?.photoURL || "https://via.placeholder.com/150"}
        alt="User Avatar"
      />
      <div className="texts">
        <span>{chat.user?.name || "Unknown User"}</span>
        <p>{chat.lastMessage || "No messages yet"}</p>
      </div>
    </div>
  );
};

export default ChatItem;
