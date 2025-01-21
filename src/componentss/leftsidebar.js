import "./leftSide.css";
import React, { useState, createContext, useEffect } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import textlogo from "../images/textlogo.png";
import ligthed from "../images/ligthed.png";
import { db } from "../firebase/firebase";
import HomeIcon from "@mui/icons-material/HomeTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import PlayArrowIcon from "@mui/icons-material/PlayArrowTwoTone";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import AddIcon from "@mui/icons-material/Add";
import { Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

export const SearchUserProvider = createContext();

function Leftnav({ userId }) {
  const navigate = useNavigate();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showNotificationDetails, setShowNotificationDetails] = useState(false);
  const [notificationContent, setNotificationContent] = useState("");
  const [showDrawer, setShowDrawer] = useState(false);
  const [dailyLimit, setDailyLimit] = useState(null);
  const [timer, setTimer] = useState(null);

  const handleSearch = async () => {
    if (!searchInput.trim()) {
      setErrorMessage("Please enter a valid username.");
      return;
    }

    try {
      setErrorMessage("");
      setSearchResult(null);
      const usersRef = collection(db, "usersdetails");
      const q = query(usersRef, where("name", "==", searchInput.trim()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setSearchResult("User not found");
      } else {
        const userData = querySnapshot.docs.map((doc) => doc.data());
        setSearchResult(userData[0]);
      }
    } catch (error) {
      console.error("Error searching for user:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const handleNotificationClick = (content) => {
    setNotificationContent(content);
    setShowNotificationDetails(true);
  };

  const closeNotificationDetails = () => {
    setShowNotificationDetails(false);
  };

  const notifications = [
    {
      username: 'Mohan_Mania_1',
      photo: 'https://images.pexels.com/photos/938639/pexels-photo-938639.jpeg?auto=compress&cs=tinysrgb&w=600',
      message: 'Mohan_Mania_1 started following you',
      details: 'Mohan is a travel enthusiast and loves sharing photos from his adventures.'
    },
    {
      username: 'Anviyth@let-one',
      photo: 'https://images.pexels.com/photos/30092632/pexels-photo-30092632/free-photo-of-young-man-overlooking-scenic-lake-in-india.jpeg?auto=compress&cs=tinysrgb&w=600',
      message: 'Anviyth@let-one started following you',
      details: 'Anviyth is a fitness coach who shares tips and motivation for a healthy lifestyle.'
    },
    
  ];

  useEffect(() => {
    if (dailyLimit !== null) {
      const currentTime = Date.now();
      const endTime = currentTime + dailyLimit;
      const remainingTime = endTime - currentTime;

      setTimer(setTimeout(() => {
        alert('Your daily limit has been reached!');
      }, remainingTime));
    }

    return () => clearTimeout(timer);
  }, [dailyLimit]);

  const handleDailyLimitChange = (limit) => {
    clearTimeout(timer);
    const currentTime = Date.now(); 
    const endTime = currentTime + limit; 
    const remainingTime = endTime - currentTime; 

    setTimer(setTimeout(() => {
      alert('Your daily limit has been reached!');
    }, remainingTime));

    setDailyLimit(limit);
  };

  return (
    <div className="leftSidepart">
      <div className="logo">
        <img className="logoImg" src={textlogo} alt="logo text" />
      </div>
      <div className="navLinkpart">
        <div className="navlink">
          <HomeIcon sx={{ fontSize: "35px", margin: "0px 10px" }} />
          <div className="navName">Home</div>
        </div>
        <div className="navlink" onClick={() => setShowSearchBar(!showSearchBar)}>
          <SearchTwoToneIcon sx={{ fontSize: "35px", margin: "0px 10px" }} />
          <div className="navName">Search</div>
        </div>
        <div className="navlink" onClick={()=> navigate("/reels")}>
          <PlayArrowIcon sx={{ fontSize: "35px", margin: "0px 10px" }} />
          <div className="navName">Reels</div>
        </div>
        <div className="navlink" onClick = {()=>navigate("/message")}>
          <MessageOutlinedIcon sx={{ fontSize: "35px", margin: "0px 10px" }} />
          <div className="navName">Messages</div>
        </div>
        <div className="navlink" onClick={() => handleNotificationClick('Sample Notification Content')}>
          <FavoriteBorderRoundedIcon sx={{ fontSize: "35px", margin: "0px 10px" }} />
          <div className="navName">Notifications</div>
        </div>
        <div className="navlink">
          <AddIcon sx={{ fontSize: "35px", margin: "0px 10px" }} />
          <div className="navName">Create</div>
        </div>
        <div className="navlink" onClick={()=>navigate("/userprofile")}>
          <Avatar alt="Profile " src={ligthed} sx={{ width: 24, height: 24 }} />
          <div className="navName">Profile</div>
        </div>
        <div className="navlink" onClick={() => setShowDrawer(!showDrawer)}>
          <MenuIcon sx={{ fontSize: "35px", margin: "0px 10px" }} />
          <div className="navName">More</div>
        </div>
      </div>

      {showSearchBar && (
        <div className="searchBarOverlay">
          <div className="searchBar">
            <input
              type="text"
              placeholder="Search username"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <div className="searchResults">
              {errorMessage && <p className="errorMessage">{errorMessage}</p>}
              {searchResult && typeof searchResult === "string" ? (
                <p>{searchResult}</p>
              ) : searchResult ? (
                <div className="userResult">
                  <img
                    src={searchResult.photoURL}
                    alt={searchResult.username}
                    className="userPhoto"
                  />
                  {console.log(searchResult.id)}
                  <p onClick={() => navigate("/userprofile")}>{searchResult.name}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {showDrawer && (
        <div className={`drawer ${showDrawer ? 'open' : ''}`}>
          <h2>More Options</h2>
          <div className="drawer-option" onClick={() => alert('Logging out...')}>Logout</div>
          <div className="drawer-option">Account Details</div>
          <div className="drawer-option">Help</div>
          <div className="drawer-option">
            Daily Limit
            <div className="daily-limit-options">
              <button onClick={() => handleDailyLimitChange(10000)}>10 seconds</button>
              <button onClick={() => handleDailyLimitChange(600000)}>10 minutes</button>
              <button onClick={() => handleDailyLimitChange(1800000)}>30 minutes</button>
            </div>
          </div>
        </div>
      )}

      {showNotificationDetails && (
        <div className={`notificationDetails ${showNotificationDetails ? 'open' : ''}`}>
          <h2>Notification Details</h2>
          <p>{notificationContent}</p>
          <div className="notifications">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="notification"
                onClick={() => handleNotificationClick(`${notification.message} - ${notification.details}`)}
              >
                <img
                  src={notification.photo}
                  alt={notification.username}
                  className="follower-photo"
                />
                <span>{notification.message}</span>
              </div>
            ))}
          </div>
          <button onClick={closeNotificationDetails}>Close</button>
        </div>
      )}
    </div>
  );
}


export default Leftnav









// import React, { useState, createContext, useEffect } from "react";
// import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
// import textlogo from "../images/textlogo.png";
// import ligthed from "../images/ligthed.png";
// import { db } from "../firebase/firebase";
// import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
// import AddIcon from "@mui/icons-material/Add";
// import { Avatar } from "@mui/material";
// import HomeIcon from "@mui/icons-material/HomeTwoTone";
// import PlayArrowIcon from "@mui/icons-material/PlayArrowTwoTone";
// import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
// import MenuIcon from "@mui/icons-material/Menu";
// import { useNavigate } from "react-router-dom";
// import "./leftSide.css"; // Import the CSS file

// export const SearchUserProvider = createContext();

// function Leftnav({ userId }) {
//   const navigate = useNavigate();
//   const [showSearchBar, setShowSearchBar] = useState(false);
//   const [searchInput, setSearchInput] = useState("");
//   const [searchResult, setSearchResult] = useState(null);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [showNotificationDetails, setShowNotificationDetails] = useState(false);
//   const [notificationContent, setNotificationContent] = useState("");
//   const [showDrawer, setShowDrawer] = useState(false);
//   const [dailyLimit, setDailyLimit] = useState(null);
//   const [timer, setTimer] = useState(null);

//   const handleSearch = async () => {
//     if (!searchInput.trim()) {
//       setErrorMessage("Please enter a valid username.");
//       return;
//     }

//     try {
//       setErrorMessage("");
//       setSearchResult(null);
//       const usersRef = collection(db, "usersdetails");
//       const q = query(usersRef, where("name", "==", searchInput.trim()));
//       const querySnapshot = await getDocs(q);

//       if (querySnapshot.empty) {
//         setSearchResult("User not found");
//       } else {
//         const userData = querySnapshot.docs.map((doc) => doc.data());
//         setSearchResult(userData[0]);
//       }
//     } catch (error) {
//       console.error("Error searching for user:", error);
//       setErrorMessage("An error occurred. Please try again.");
//     }
//   };

//   const handleNotificationClick = (content) => {
//     setNotificationContent(content);
//     setShowNotificationDetails(true);
//   };

//   const closeNotificationDetails = () => {
//     setShowNotificationDetails(false);
//   };

//   const notifications = [
//     {
//       username: 'Mohan_Mania_1',
//       photo: 'https://images.pexels.com/photos/938639/pexels-photo-938639.jpeg?auto=compress&cs=tinysrgb&w=600',
//       message: 'Mohan_Mania_1 started following you',
//       details: 'Mohan is a travel enthusiast and loves sharing photos from his adventures.'
//     },
//     {
//       username: 'Anviyth@let-one',
//       photo: 'https://images.pexels.com/photos/30092632/pexels-photo-30092632/free-photo-of-young-man-overlooking-scenic-lake-in-india.jpeg?auto=compress&cs=tinysrgb&w=600',
//       message: 'Anviyth@let-one started following you',
//       details: 'Anviyth is a fitness coach who shares tips and motivation for a healthy lifestyle.'
//     },
//   ];

//   useEffect(() => {
//     if (dailyLimit !== null) {
//       const currentTime = Date.now();
//       const endTime = currentTime + dailyLimit;
//       const remainingTime = endTime - currentTime;

//       setTimer(setTimeout(() => {
//         alert('Your daily limit has been reached!');
//       }, remainingTime));
//     }

//     return () => clearTimeout(timer);
//   }, [dailyLimit]);

//   const handleDailyLimitChange = (limit) => {
//     clearTimeout(timer);
//     const currentTime = Date.now(); 
//     const endTime = currentTime + limit; 
//     const remainingTime = endTime - currentTime; 

//     setTimer(setTimeout(() => {
//       alert('Your daily limit has been reached!');
//     }, remainingTime));

//     setDailyLimit(limit);
//   };

//   return (
//     <>
//       <div className="leftSidepart">
//         <div className="logo">
//           <img className="logoImg" src={textlogo} alt="logo text" />
//         </div>
//         <div className="navLinkPart">
//           <div className="navlink">
//             <HomeIcon sx={{ fontSize: "35px", margin: "0px 10px" }} />
//             <div className="navName">Home</div>
//           </div>
//           <div className="navlink" onClick={()=> navigate("/reels")}>
//             <PlayArrowIcon sx={{ fontSize: "35px", margin: "0px 10px" }} />
//             <div className="navName">Reels</div>
//           </div>
//           <div className="navlink" onClick = {()=>navigate("/message")}>
//             <MessageOutlinedIcon sx={{ fontSize: "35px", margin: "0px 10px" }} />
//             <div className="navName">Messages</div>
//           </div>
//           <div className="navlink" onClick={() => setShowDrawer(!showDrawer)}>
//             <MenuIcon sx={{ fontSize: "35px", margin: "0px 10px" }} />
//             <div className="navName">More</div>
//           </div>
//         </div>

//         {/* Bottom Navigation for small screens */}
//         <div className="bottom-nav">
//           <div className="navlink" onClick={() => navigate("/")}>
//             <HomeIcon sx={{ fontSize: "35px", margin: "0px 10px" }} />
//           </div>
//           <div className="navlink" onClick={() => navigate("/reels")}>
//             <PlayArrowIcon sx={{ fontSize: "35px", margin: "0px 10px" }} />
//           </div>
//           <div className="navlink">
//           <SearchTwoToneIcon sx={{ fontSize: "35px", margin: "0px 10px" }} />
//           <div className="navName">search</div>
//         </div>
//           <div className="navlink" onClick={() => navigate("/message")}>
//             <MessageOutlinedIcon sx={{ fontSize: "35px", margin: "0px 10px" }} />
//           </div>

//           <div className="navlink" onClick={() => setShowDrawer(!showDrawer)}>
//             <MenuIcon sx={{ fontSize: "35px", margin: "0px 10px" }} />
//           </div>
//           <div className="navlink">
//           <AddIcon sx={{ fontSize: "35px", margin: "0px 10px" }} />
//           <div className="navName">create</div>
//         </div>
//         <div className="navlink">
//           <Avatar
//             alt="Profile "
//             src={ligthed}
//             sx={{ width: 24, height: 24 }}
//           />

//           <div className="navName">Profile</div>
//         </div>
//         <div className="navlink">
//           <MenuIcon sx={{ fontSize: "35px", margin: "0px 10px" }} />
//           <div className="navName">More</div>
//         </div>
//       </div>
//         </div>

//         {showSearchBar && (
//           <div className="searchBarOverlay">
//             <div className="searchBar">
//               <input
//                 type="text"
//                 placeholder="Search username"
//                 value={searchInput}
//                 onChange={(e) => setSearchInput(e.target.value)}
//               />
//               <button onClick={handleSearch}>Search</button>
//               <div className="searchResults">
//                 {errorMessage && <p className="errorMessage">{errorMessage}</p>}
//                 {searchResult && typeof searchResult === "string" ? (
//                   <p>{searchResult}</p>
//                 ) : searchResult ? (
//                   <div className="userResult">
//                     <img
//                       src={searchResult.photoURL}
//                       alt={searchResult.username}
//                       className="userPhoto"
//                     />
//                     {console.log(searchResult.id)}
//                     <p onClick={() => navigate("/userprofile")}>{searchResult.name}</p>
//                   </div>
//                 ) : null}
//               </div>
//             </div>
//           </div>
//         )}

//         {showDrawer && (
//           <div className={`drawer ${showDrawer ? 'open' : ''}`}>
//             <h2>More Options</h2>
//             <div className="drawer-option" onClick={() => alert('Logging out...')}>Logout</div>
//             <div className="drawer-option">Account Details</div>
//             <div className="drawer-option">Help</div>
//             <div className="drawer-option">
//               Daily Limit
//               <div className="daily-limit-options">
//                 <button onClick={() => handleDailyLimitChange(10000)}>10 seconds</button>
//                 <button onClick={() => handleDailyLimitChange(600000)}>10 minutes</button>
//                 <button onClick={() => handleDailyLimitChange(1800000)}>30 minutes</button>
//               </div>
//             </div>
//           </div>
//         )}

//         {showNotificationDetails && (
//           <div className={`notificationDetails ${showNotificationDetails ? 'open' : ''}`}>
//             <h2>Notification Details</h2>
//             <p>{notificationContent}</p>
//             <div className="notifications">
//               {notifications.map((notification, index) => (
//                 <div
//                   key={index}
//                   className="notification"
//                   onClick={() => handleNotificationClick(`${notification.message} - ${notification.details}`)}
//                 >
//                   <img
//                     src={notification.photo}
//                     alt={notification.username}
//                     className="follower-photo"
//                   />
//                   <span>{notification.message}</span>
//                 </div>
//               ))}
//             </div>
//             <button onClick={closeNotificationDetails}>Close</button>
//           </div>
//         )}
//     </>
  
//   );
// }

// export default Leftnav;















// import "./leftSide.css";
// import React from "react";
// import textlogo from "../images/textlogo.png";
// import ligthed from "../images/ligthed.png";
// import HomeIcon from "@mui/icons-material/HomeTwoTone";
// import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
// import PlayArrowIcon from "@mui/icons-material/PlayArrowTwoTone";
// import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
// import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
// import AddIcon from "@mui/icons-material/Add";
// import { Avatar } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import HomeData from "./iconsData/HomeIcon";
// function Leftnav() {


//   return (
//     <div className="leftSidepart">
//       <div className="logo">
//         <img className="logoImg" src={textlogo} alt="logo text" />
//       </div>
//       <div className="navLinkpart" onClick={HomeData}>
//         <div className="navlink">
//           <HomeIcon sx={{ fontSize: "35px", margin: "0px 10px" }} />
//           <div className="navName">home</div>
//         </div>
//         <div className="navlink">
//           <SearchTwoToneIcon sx={{ fontSize: "35px", margin: "0px 10px" }} />
//           <div className="navName">search</div>
//         </div>
//         <div className="navlink">
//           <PlayArrowIcon sx={{ fontSize: "35px", margin: "0px 10px" }} />
//           <div className="navName">Reels</div>
//         </div>
//         <div className="navlink">
//           <MessageOutlinedIcon sx={{ fontSize: "35px", margin: "0px 10px" }} />
//           <div className="navName">Messages</div>
//         </div>

//         <div className="navlink">
//           <FavoriteBorderRoundedIcon
//             sx={{ fontSize: "35px", margin: "0px 10px" }}
//           />
//           <div className="navName">Notifications</div>
//         </div>
//         <div className="navlink">
//           <AddIcon sx={{ fontSize: "35px", margin: "0px 10px" }} />
//           <div className="navName">create</div>
//         </div>
//         <div className="navlink">
//           <Avatar
//             alt="Profile "
//             src={ligthed}
//             sx={{ width: 24, height: 24 }}
//           />

//           <div className="navName">Profile</div>
//         </div>

//         <div className="navlink">
//           <MenuIcon sx={{ fontSize: "35px", margin: "0px 10px" }} />
//           <div className="navName">More</div>
//         </div>
//       </div>
//     </div>
//   );

//   // }
// }

// export default Leftnav;
