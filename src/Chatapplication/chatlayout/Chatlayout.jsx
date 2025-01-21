// import React, { useEffect, useState } from "react";
// import List from "../List/List";
// import Detail from "../detail/Detail";
// import Chat from "../Chat/Chat";
// import "./chatlayout.css";
// import Login from "../../componentss/Login/Login";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../../firebase/firebase";
// import { useUserStore } from "../../useStore/userstore";
// import ChatApp from "../Chat/Chat";
// // import { UseChatStore } from "../../useStore/useChatStore";

// export default function Chatlayout() {
//   const { currentUser, isLoading, fetchUserInfo } = useUserStore();
//   // const [isLoading, setIsLoading] = useState(true);
//     const user = false;

//   // useEffect(() => {
//   //   console.log("Current User Updated:", currentUser); 
//   // }, [currentUser]);

//   useEffect(() => {
//     const unSub = onAuthStateChanged(auth, (user) => {
//       console.log("usersid:",user.uid);
//       fetchUserInfo(user.uid)
//     });

//     return () => {
//       unSub();
//     };
//   }, [fetchUserInfo]);
// console.log("correcuser:",currentUser)

//   if(!isLoading) return <div className="Loading">Loading...</div>

//   return (
//     <div className="container">
      
//        <List />
//        <ChatApp />
//        <Detail />
         
//     </div>
//   );
// }




// import React, { useState, useEffect } from "react";
// import { Chat } from "../Chat/Chat.jsx";
// import { Auth } from "../../Appwraper/Auth.js";
// import { AppWrapper } from "../../Appwraper/AppWrapper.js";
// import Cookies from "universal-cookie";
// import "./App.css";

// const cookies = new Cookies();

// function ChatApp() {
//   const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
//   const [isInChat, setIsInChat] = useState(null);
//   const [room, setRoom] = useState("");

//   if (!isAuth) {
//     return (
//       <AppWrapper
//         isAuth={isAuth}
//         setIsAuth={setIsAuth}
//         setIsInChat={setIsInChat}
//       >
//         <Auth setIsAuth={setIsAuth} />
//       </AppWrapper>
//     );
//   }

//   return (
//     <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
//       {!isInChat ? (
//         <div className="room">
//           <label> Type room name: </label>
//           <input onChange={(e) => setRoom(e.target.value)} />
//           <button
//             onClick={() => {
//               setIsInChat(true);
//             }}
//           >
//             Enter Chat
//           </button>
//         </div>
//       ) : (
//         <Chat room={room} />
//       )}
//     </AppWrapper>
//   );
// }

// export default ChatApp;


