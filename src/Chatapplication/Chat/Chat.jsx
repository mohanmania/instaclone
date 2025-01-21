// import React, { useEffect, useRef, useState } from "react";
// import "./Chat.css";
// import EmojiPicker from "emoji-picker-react";
// import { onSnapshot, doc } from "firebase/firestore";
// import { db } from "../../firebase/firebase";
// import { UseChatStore } from "../../useStore/useChatStore";

// export default function Chat() {
//   const [chat, setChat] = useState();
//   const [open, setOpen] = useState(false);
//   const [text, setText] = useState("");
//   // const { chatId } = UseChatStore(); // Obtain chatId from UseChatStore
//   const endRef = useRef(null);

//   useEffect(() => {
//     endRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chat]); 

//   // useEffect(() => {
//   //   const unSub = onSnapshot(
//   //     doc(db, "chats", id),
//   //     (res) => {
//   //       setChat(res.data());
//   //     }
//   //   );

//   //   return () => {
//   //     unSub();
//   //   };
//   // }, [id]); 

//   const HandleEmoji = (e) => {
//     setText((prev) => prev + e.emoji);
//   };

//   return (
//     <div className="Chat">
//       <div className="top">
//         <div className="user">
//           <img src="https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-1024.png" alt="User Avatar" />
//           <div className="texts">
//             <span>mohan krishna</span>
//             <p>lorem ispon loder</p>
//           </div>
//         </div>
//         <div className="icons">
//           <img src="https://static.vecteezy.com/system/resources/previews/000/442/172/original/vector-video-camera-icon.jpg" alt="Video Icon" />
//           <img src="https://tse2.mm.bing.net/th?id=OIP.d1sTN41laBxAg-Uy_pXvmgHaHx&pid=Api&P=0&h=180" alt="Voice Icon" />
//           <img src="https://cdn3.iconfinder.com/data/icons/roundies-icons/32/more-512.png" alt="More Icon" />
//         </div>
//       </div>
//       <div className="center">
//         {chat?.messages.map((message, index) => (
//           <div className={`message ${message.own ? "own" : ""}`} key={index}>
//             <img src="https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-1024.png" alt="User Avatar" />
//             <div className="texts">
//               {/* <p>{message.text}</p> */}
//               <p>kjhgfdsa</p>
//               {/* <span>{message.timestamp}</span> */}
//               <span>imin ago</span>
//             </div>
//           </div>
//         ))}
//         <div ref={endRef}></div>
//       </div>
//       <div className="bottom">
//         <div className="icons">
//           <img src="https://static.vecteezy.com/system/resources/previews/000/349/672/original/camera-vector-icon.jpg" alt="Camera Icon" />
//           <img src="https://tse2.mm.bing.net/th?id=OIP.mtK8ri_QmETloVRiJCqkhAHaHa&pid=Api&P=0&h=180" alt="Attach Icon" />
//           <img src="https://static.vecteezy.com/system/resources/previews/000/420/512/original/microphone-icon-vector-illustration.jpg" alt="Microphone Icon" />
//         </div>
//         <input
//           type="text"
//           placeholder="Type a message"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />
//         <div className="emoji">
//           <img
//             src="https://w7.pngwing.com/pngs/174/558/png-transparent-black-sad-emoji-illustration-face-sadness-smiley-computer-icons-sad-child-people-emoticon.png"
//             alt="Emoji Picker"
//             onClick={() => setOpen((prev) => !prev)}
//           />
//           <div className="picker">
//             {open && <EmojiPicker onEmojiClick={HandleEmoji} />}
//           </div>
//         </div>
//         <button className="sendButton">Send</button>
//       </div>
//     </div>
//   );
// }



// import React, { useEffect, useRef, useState } from "react";
// import "./Chat.css";
// import EmojiPicker from "emoji-picker-react";
// import { onSnapshot, doc } from "firebase/firestore";
// import { db } from "../../firebase/firebase";
// import { UseChatStore } from "../../useStore/useChatStore";
// import { sendMessage, subscribeToMessages } from "../../firebase/firebaseutilz";
// import { useUserStore } from "../../useStore/userstore";

// export default function Chat() {
//   const [chat, setChat] = useState({ messages: [] }); 
//   const [text, setText] = useState("");
//   const [open, setOpen] = useState(false);
//   const endRef = useRef(null);
//   const { currentUser } = useUserStore();
//   const { chatId } = UseChatStore(); 
//   // console.log("chatId",chatId)

//   // Scroll to the latest message
//   useEffect(() => {
//     endRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chat]);

  
//   useEffect(() => {
//     if (!chatId) return; 

//     const unsubscribe = onSnapshot(doc(db, "chats", chatId), (res) => {
//       setChat(res.data());
//     });

//     return () => unsubscribe();
//   }, [chatId]);

  
//   const handleSend = () => {
//     if (text.trim() && currentUser && chatId) {
//       sendMessage(text, currentUser.id, chatId);
//       setText("");
//     }
//   };


//   const handleEmoji = (e) => {
//     setText((prev) => prev + e.emoji);
//   };

//   return (
//     <div className="Chat">
//       <div className="top">
//         <div className="user">
//           <img
//             src="https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-1024.png"
//             alt="User Avatar"
//           />
//           <div className="texts">
//             <span>mohan krishna</span>
//             <p>lorem ispon loder</p>
//           </div>
//         </div>
//         <div className="icons">
//           <img
//             src="https://static.vecteezy.com/system/resources/previews/000/442/172/original/vector-video-camera-icon.jpg"
//             alt="Video Icon"
//           />
//           <img
//             src="https://tse2.mm.bing.net/th?id=OIP.d1sTN41laBxAg-Uy_pXvmgHaHx&pid=Api&P=0&h=180"
//             alt="Voice Icon"
//           />
//           <img
//             src="https://cdn3.iconfinder.com/data/icons/roundies-icons/32/more-512.png"
//             alt="More Icon"
//           />
//         </div>
//       </div>
//       <div className="center">
//         <div className="message own">
//           <div className="texts">
//             <p>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quam sunt non quisquam cupiditate tempora animi. Ad illo quidem repellat ut amet eligendi modi nihil accusantium reprehenderit, libero consequuntur possimus.
//             </p>
//             </div>
//           </div>
//           <div className="message ">
//           <div className="texts">
//             <p>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quam sunt non quisquam cupiditate tempora animi. Ad illo quidem repellat ut amet eligendi modi nihil accusantium reprehenderit, libero consequuntur possimus.
//             </p>
//             </div>
//           </div>
//           <div className="message own">
//           <div className="texts">
//             <p>
//               rokkkkkkkkkkkkkhhhhhhhhhhhhhhytrds lkhr srtytf   yugtyds uhuy gfjuy sgdjg fhxhrrfsimus.
//             </p>
//             </div>
//           </div>
//           <div className="message own">
//           <div className="texts">
//             <p>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quam sunt non quisquam cupiditate tempora animi. Ad illo quidem repellat ut amet eligendi modi nihil accusantium reprehenderit, libero consequuntur possimus.
//             </p>
//             </div>
//           </div>
//           <div className="message ">
//           <div className="texts">
//             <p>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quam sunt non quisquam cupiditate tempora animi. Ad illo quidem repellat ut amet eligendi modi nihil accusantium reprehenderit, libero consequuntur possimus.
//             </p>
//             </div>
//           </div>
         
//         </div>

       
//        <div ref={endRef}></div>

//       <div className="bottom">
//         <div className="icons">
//           <img
//             src="https://static.vecteezy.com/system/resources/previews/000/349/672/original/camera-vector-icon.jpg"
//             alt="Camera Icon"
//           />
//           <img
//             src="https://tse2.mm.bing.net/th?id=OIP.mtK8ri_QmETloVRiJCqkhAHaHa&pid=Api&P=0&h=180"
//             alt="Attach Icon"
//           />
//           <img
//             src="https://static.vecteezy.com/system/resources/previews/000/420/512/original/microphone-icon-vector-illustration.jpg"
//             alt="Microphone Icon"
//           />
//         </div>
//         <input
//           type="text"
//           placeholder="Type a message"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />
//         <div className="emoji">
//           <img
//             src="https://w7.pngwing.com/pngs/174/558/png-transparent-black-sad-emoji-illustration-face-sadness-smiley-computer-icons-sad-child-people-emoticon.png"
//             alt="Emoji Picker"
//             onClick={() => setOpen((prev) => !prev)}
//           />
//           <div className="picker">
//             {open && <EmojiPicker onEmojiClick={handleEmoji} />}
//           </div>
//         </div>
//         <button className="sendButton" onClick={handleSend}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }













// import React, { useState, useEffect } from "react";
// import { db, auth, storage } from "../../firebase/firebase";
// import {
//   collection,
//   addDoc,
//   query,
//   orderBy,
//   onSnapshot,
//   where,
//   serverTimestamp,
// } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import EmojiPicker from "emoji-picker-react";
// import "../styles/Chat.css";

// export const Chat = ({ room }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [file, setFile] = useState(null);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);

//   const messagesRef = collection(db, "messages");

//   useEffect(() => {
//     const queryMessages = query(
//       messagesRef,
//       where("room", "==", room),
//       orderBy("createdAt", "asc")
//     );

//     const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
//       let fetchedMessages = snapshot.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//       }));

//       console.log("Fetched Messages from Firestore:", fetchedMessages);

//       setMessages(fetchedMessages);
//     });

//     return () => unsubscribe();
//   }, [room]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!newMessage.trim() && !file) return;

//     let fileURL = null;

//     if (file) {
//       const fileRef = ref(storage, `chat_files/${file.name}`);
//       await uploadBytes(fileRef, file);
//       fileURL = await getDownloadURL(fileRef);
//       console.log("File Uploaded:", fileURL);
//     }

//     const message = {
//       text: newMessage || "",
//       file: fileURL || null,
//       createdAt: new Date(),
//       user: auth.currentUser?.displayName || "Unknown",
//       userProfilePhoto: auth.currentUser?.photoURL || "",
//       room,
//     };

//     setMessages((prevMessages) => [...prevMessages, message]);

//     await addDoc(messagesRef, {
//       ...message,
//       createdAt: serverTimestamp(),
//     });

//     setNewMessage("");
//     setFile(null);
//   };

//   return (
//     <div className="chat-app">
//       <div className="header">
//         <h1>Welcome to: {room.toUpperCase()}</h1>
//       </div>

//       <div className="messages">
//         {messages.length > 0 ? (
//           messages.map((message) => {
//             console.log("Rendering Message:", message);
//             console.log("Message Text:", message.text);

//             const isCurrentUser = message.user === auth.currentUser?.displayName;
//             const messageClass = isCurrentUser ? "current-user" : "other-user";

//             const timestamp =
//               message.createdAt?.seconds
//                 ? new Date(message.createdAt.seconds * 1000).toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })
//                 : "Just now";

//             return (
//               <div key={message.id} className={`message ${messageClass}`}>
//                 <span className="user">{message.user}:</span>
//                 <img
//                   src={message.userProfilePhoto || "default-avatar.png"}
//                   alt="User profile"
//                   className="user-profile-photo"
//                 />
//                 <span className="text">{message.text || "[No Message]"}</span>

//                 {message.file && (
//                   <div className="file-container">
//                     {message.file.match(/\.(jpeg|jpg|png|gif)$/) ? (
//                       <img src={message.file} alt="Sent file" className="chat-image" />
//                     ) : (
//                       <a href={message.file} target="_blank" rel="noopener noreferrer" className="file-link">
//                         📎 Download File
//                       </a>
//                     )}
//                   </div>
//                 )}

//                 <span className="timestamp">{timestamp}</span>
//               </div>
//             );
//           })
//         ) : (
//           <p>No messages yet...</p>
//         )}
//       </div>

//       <form onSubmit={handleSubmit} className="new-message-form">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(event) => setNewMessage(event.target.value)}
//           className="new-message-input"
//           placeholder="Type your message here..."
//         />

//         <button type="button" className="emoji-button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
//           😀
//         </button>
//         {showEmojiPicker && <EmojiPicker onEmojiClick={(emojiObject) => setNewMessage((prev) => prev + emojiObject.emoji)} />}

//         <label htmlFor="file" className="file-label">📎</label>
//         <input type="file" style={{ display: "none" }} id="file" onChange={(e) => setFile(e.target.files[0])} />

//         <button type="submit" className="send-button">Send</button>
//       </form>
//     </div>
//   );
// };


import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase/firebase";
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, getDocs, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase";  
import { useUser } from "../../useStore/userstore";
import "./Chat.css"

const ChatRoom = () => {
  const [message, setMessage] = useState("");
  const { currentUser } = useUser();
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [file, setFile] = useState(null);
  const [expiryTime, setExpiryTime] = useState(null);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (roomName !== "") {
      const q = query(collection(db, roomName), orderBy("timestamp"));
      onSnapshot(q, (querySnapshot) => {
        setMessages(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
    }
  }, [roomName]);

  const loadRooms = async () => {
    const roomsSnapshot = await getDocs(collection(db, "rooms"));
    setRooms(roomsSnapshot.docs.map((doc) => doc.id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      messages.forEach(async (msg) => {
        const elapsed = (new Date() - msg.timestamp.toDate()) / 1000;
        if (expiryTime && elapsed > expiryTime) {
          await deleteDoc(doc(db, roomName, msg.id));
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [messages, expiryTime, roomName]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (message !== "" && roomName !== "") {
      try {
        let fileURL = null;
        if (file) {
          const storageRef = ref(storage, `files/${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file);
          fileURL = await new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              null,
              (error) => reject(error),
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then(resolve);
              }
            );
          });
        }

        await addDoc(collection(db, roomName), {
          username: auth.currentUser.displayName,
          profilePhoto: auth.currentUser.photoURL,
          message: message,
          fileURL: fileURL,
          timestamp: new Date(),
        });
        setMessage("");
        setFile(null);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    } else {
      alert("Please enter a valid message and room name.");
    }
  };

  const handleCreateRoom = async () => {
    if (roomName !== "") {
      try {
        const roomRef = collection(db, "rooms");
        await addDoc(roomRef, { message: "Room created!", creator: auth.currentUser.displayName });
        loadRooms(); 
      } catch (error) {
        console.error("Error creating room: ", error);
      }
    } else {
      alert("Please enter a valid room name.");
    }
  };

  return (
    <div className="chatroom-container">
      <div className="sidebar">
        <h3>Rooms</h3>
        <ul>
          {rooms.map((room, index) => (
            <li key={index} onClick={() => setRoomName(room)}>{room}</li>
          ))}
        </ul>
      </div>

      <div className="chat-content">
        <div className="create-room">
          <input
            type="text"
            placeholder="Enter Room Name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button onClick={handleCreateRoom} disabled={!roomName}>Create Room</button>
        </div>

        {roomName && (
          <div className="chat-box">
            <div className="messages">
              {messages.map((msg, index) => (
                <div key={index} className="message">
                  <img src={msg.profilePhoto} alt="Profile" width="30" height="30" />
                  <strong>{msg.username}: </strong>{msg.message}
                  {/* {msg.fileURL && 
                    // <div>
                    //   {msg.fileURL.match(/\.(jpeg|jpg|gif|png)$/) ? (
                    //     <img src={msg.fileURL} alt="Uploaded file" width="100" />
                    //   ) : (
                    //     <a href={msg.fileURL} target="_blank" rel="noopener noreferrer">File</a>
                    //   )}
                    // </div>
                  } */}
                </div>
              ))}
            </div>

            <form onSubmit={handleSend}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
                disabled={!roomName}
              />
              {/* <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              /> */}
              <button type="submit" disabled={!message || !roomName}>Send</button>
            </form>

            <div className="message-expiry">
              <label>Message Expiry Time:</label>
              <select onChange={(e) => setExpiryTime(Number(e.target.value))}>
                <option value="">Select</option>
                <option value={10}>10 seconds</option>
                <option value={3600}>1 hour</option>
                <option value={86400}>24 hours</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
