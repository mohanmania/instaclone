import React from 'react';
import "./List.css";
import UserInfo from './UserInfo/userinfo';
import ChatList from './ChatList/chatlist';
export default function List() {
  return (
    <div className='list'>
      <UserInfo/>
      <ChatList/>
    </div>
  )
}
