// import React, { useEffect, useState } from "react";
// import "./chatlist.css";
// import { db } from "../../../firebase/firebase";
// import { getDoc, onSnapshot, doc } from "firebase/firestore";
// import { useUserStore } from "../../../useStore/userstore";
// import AddUser from "../../../Adduser/adduser";

// export default function ChatList() {
//   const [addMode, setMode] = useState(false);
//   const [chats, setChats] = useState([]);
//   const { currentUser } = useUserStore();
//   const [loading, setLoading] = useState(true);
//    console.log("currentuser",currentUser)
//   useEffect(() => {
//     const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
//       setLoading(true);
//       const items = res.data()?.chats || [];
      
//       if (items.length === 0) {
//         setChats([]);
//         setLoading(false);
//         return;
//       }

//       const promises = items.map(async (item) => {
//         try {
//           const userDocRef = doc(db, "usersdetails", item.receiverId); 
//           const userDocSnap = await getDoc(userDocRef);

//           if (!userDocSnap.exists()) {
//             console.error("User not found for id:", item.receiverId);
//             return null;
//           }

//           const user = userDocSnap.data();
//           return user ? { ...item, user } : null;
//         } catch (error) {
//           console.error("Error fetching user:", error);
//           return null;
//         }
//       });

//       const chatData = await Promise.all(promises);
//       const filteredChatData = chatData.filter(item => item !== null);
//       setChats(filteredChatData.sort((a, b) => b.updatedAt - a.updatedAt));
//       setLoading(false);
//     });

//     return () => {
//       unSub();
//     };
//   }, [currentUser]);

//   const handleSearchClick = () => {
//     setMode(true);
//   };

//   return (
//     <div className="chatlist">
//       {loading ? (
//         <div>Loading...</div>
//       ) : !addMode ? (
//         <div className="search">
//           <div className="searchBar" onClick={handleSearchClick}>
//             <input type="text" placeholder="Search" readOnly />
//           </div>
//           {chats.map((chat) => (
//             <div className="item" key={chat.receiverId}>
//               <img
//                 src={chat.user?.photoURL || "https://via.placeholder.com/150"}
//                 alt="User Avatar"
//               />
//               <div className="texts">
//                 <span>{chat.user?.name || "Unknown User"}</span>
//                 <p>{chat.lastMessage || "No messages yet"}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <AddUser />
//       )}
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import "./chatlist.css";
// import { db } from "../../../firebase/firebase";
// import { getDoc, onSnapshot, doc } from "firebase/firestore";
// import { useUserStore } from "../../../useStore/userstore";
// import AddUser from "../../../Adduser/adduser";
// import ChatItem from "../../Chat/chatItem";

// export default function ChatList({ onSelectChat }) {
//   const [addMode, setMode] = useState(false);
//   const [chats, setChats] = useState([]);
//   const { currentUser } = useUserStore();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!currentUser.id) {
//       return;
//     }
//     const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
//       setLoading(true);
//       const items = res.data()?.chats || [];
      
//       if (items.length === 0) {
//         setChats([]);
//         setLoading(false);
//         return;
//       }

//       const promises = items.map(async (item) => {
//         try {
//           const userDocRef = doc(db, "usersdetails", item.receiverId); 
//           const userDocSnap = await getDoc(userDocRef);

//           if (!userDocSnap.exists()) {
//             console.error("User not found for id:", item.receiverId);
//             return null;
//           }

//           const user = userDocSnap.data();
//           return user ? { ...item, user } : null;
//         } catch (error) {
//           console.error("Error fetching user:", error);
//           return null;
//         }
//       });

//       const chatData = await Promise.all(promises);
//       const filteredChatData = chatData.filter(item => item !== null);
//       setChats(filteredChatData.sort((a, b) => b.updatedAt - a.updatedAt));
//       setLoading(false);
//     });

//     return () => {
//       unSub();
//     };
//   }, [currentUser.id]);

//   const handleChatClick = (chat) => {
//     onSelectChat(chat);
//   };

//   const handleSearchClick = () => {
//     setMode(true);
//   };

//   return (
//     <div className="chatlist">
//       {loading ? (
//         <div>Loading...</div>
//       ) : !addMode ? (
//         <div className="search">
//           <div className="searchBar" onClick={handleSearchClick}>
//             <input type="text" placeholder="Search" readOnly />
//           </div>
//           {chats.map((chat) => (
//             <ChatItem chat={chat} onChatClick={handleChatClick} key={chat.receiverId} />
//           ))}
//         </div>
//       ) : (
//         <AddUser />
//       )}
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import "./chatlist.css";
// import { db } from "../../../firebase/firebase";
// import { getDoc, onSnapshot, doc } from "firebase/firestore";
// import { useUserStore } from "../../../useStore/userstore";
// import AddUser from "../../../Adduser/adduser";
// import ChatItem from "../../Chat/chatItem";

// export default function ChatList({ onSelectChat }) {
//   const [addMode, setMode] = useState(false);
//   const [chats, setChats] = useState([]);
//   const { currentUser } = useUserStore();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!currentUser.id) return;
//     const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
//       setLoading(true);
//       const items = res.data()?.chats || [];
//       if (items.length === 0) {
//         setChats([]);
//         setLoading(false);
//         return;
//       }
//       const promises = items.map(async (item) => {
//         try {
//           const userDocRef = doc(db, "usersdetails", item.receiverId);
//           const userDocSnap = await getDoc(userDocRef);
//           if (!userDocSnap.exists()) {
//             console.error("User not found for id:", item.receiverId);
//             return null;
//           }
//           const user = userDocSnap.data();
//           return { ...item, user };
//         } catch (error) {
//           console.error("Error fetching user:", error);
//           return null;
//         }
//       });
//       const chatData = await Promise.all(promises);
//       const filteredChatData = chatData.filter(item => item !== null);
//       setChats(filteredChatData.sort((a, b) => b.updatedAt - a.updatedAt));
//       setLoading(false);
//     });
//     console.log(currentUser)
//     return () => unSub();
//   }, [currentUser.id]);

//   const handleChatClick = (chat) => {
//     onSelectChat(chat);
//   };

//   const handleSearchClick = () => {
//     setMode(true);
//   };

//   return (
//     <div className="chatlist">
//       {loading ? (
//         <div>Loading...</div>
//       ) : addMode ? (
//         <AddUser />
//       ) : (
//         <div className="search">
//           <div className="searchBar" onClick={handleSearchClick}>
//             <input type="text" placeholder="Search" readOnly />
//           </div>
//           {chats.map((chat) => (
//             <ChatItem chat={chat} onChatClick={handleChatClick} key={chat.receiverId} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import "./chatlist.css";
import { db } from "../../../firebase/firebase";
import { getDoc, onSnapshot, doc } from "firebase/firestore";
import { useUserStore } from "../../../useStore/userstore";
import AddUser from "../../../Adduser/adduser";

export default function ChatList() {
  const [addMode, setMode] = useState(false);
  const [chats, setChats] = useState([]);
  const { currentUser } = useUserStore();
  const [loading, setLoading] = useState(true);
  // const currentuser = currentUser.id 
  // console.log("----",currentuser)

  useEffect(() => {
    console.log("currentUser:",currentUser)
    if (!currentUser?.id) {
      console.error("Current user ID is not defined");
      return;
    }

    const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
      // setChats(doc.data())
      setLoading(true);
      const items = res.data()?.chats || [];

      if (items.length === 0) {
        setChats([]);
        setLoading(false);
        return;
      }

      const promises = items.map(async (item) => {
        if (!item.receiverId) {
          console.error("Invalid chat item:", item);
          return null;
        }

        try {
          const userDocRef = doc(db, "usersdetails", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          if (!userDocSnap.exists()) {
            console.error("User not found for id:", item.receiverId);
            return null;
          }

          const user = userDocSnap.data();
          return user ? { ...item, user } : null;
        } catch (error) {
          console.error("Error fetching user:", error);
          return null;
        }
      });

      const chatData = await Promise.all(promises);
      const filteredChatData = chatData.filter(item => item !== null);
      setChats(filteredChatData.sort((a, b) => b.updatedAt - a.updatedAt));
      setLoading(false);
      
    });
    

    return () => {
      unSub();
    };
  }, [currentUser]);
  console.log("cur.rentuser id ::",currentUser)
 
  
console.log(chats)
  const handleSearchClick = () => {
    setMode(true);
  };

  return (
    <div className="chatlist">
      <div className="search">
        <div className="searchBar" onClick={handleSearchClick}>
  <input type="text" placeholder="Search user"/>

          <img src=".//" alt="imag1"/>
        </div>
        
      </div>
    {chats.map(()=>(
      <div className="item">
      <img src="" alt="img2"/>
      <div className="texts">
        <span>john duals</span>
        <p>{chats.lastmessage}</p>
      </div>
    </div>
    ))}  
    
    </div>
  );
}

// <div className="search">
// <div className="searchBar" onClick={handleSearchClick}>
//   <input type="text" placeholder="Search user" readOnly />
// </div>
// {chats.map((chat)=>(
//   <div className="item" key = {chat.chatId}>
//     <img src ="" alt="imah1"/>
//     <div className="texts">
//       <span>mohan</span>
//       <p>{chat.lastmessage}</p>
//       </div>
//       </div>
// ))
// }
