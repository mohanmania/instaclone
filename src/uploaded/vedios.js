import React, { useState } from "react";
import "./vedios.css";
import { IconButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

const demoVideos = [
 
    { id: 1, title: "Food Video", category: "food", src:"https://videos.pexels.com/video-files/854196/854196-hd_1920_1080_30fps.mp4" },
    { id: 2, title: "Food Video", category: "food", src:"https://videos.pexels.com/video-files/4253333/4253333-uhd_1440_2732_25fps.mp4" },
    { id: 3, title: "Food Video", category: "food", src:"https://videos.pexels.com/video-files/4253333/4253333-uhd_1440_2732_25fps.mp4" },
  
    { id: 4, title: "Food Video", category: "food", src:"https://videos.pexels.com/video-files/852122/852122-hd_1920_1080_30fps.mp4" },
    { id: 5, title: "Food Video", category: "food", src:"https://videos.pexels.com/video-files/855421/855421-hd_1920_1080_25fps.mp4" },
    { id: 6, title: "Food Video", category: "food", src:"https://videos.pexels.com/video-files/2758322/2758322-uhd_2560_1440_30fps.mp4" },
    { id: 7, title: "Food Video", category: "food", src:"https://videos.pexels.com/video-files/1908426/1908426-uhd_2560_1440_25fps.mp4" },
  
    { id: 8, title: "Sports Video", category: "sports", src: "https://videos.pexels.com/video-files/856132/856132-hd_1920_1080_30fps.mp4" },
    { id: 9, title: "Sports Video", category: "sports", src: "https://videos.pexels.com/video-files/8053662/8053662-uhd_1440_2560_25fps.mp4" },
    { id: 8, title: "Sports Video", category: "sports", src: "https://www.w3schools.com/html/movie.mp4" },
    { id: 8, title: "Sports Video", category: "sports", src: "https://www.w3schools.com/html/movie.mp4" },
    { id: 8, title: "Sports Video", category: "sports", src: "https://www.w3schools.com/html/movie.mp4" },
    { id: 8, title: "Sports Video", category: "sports", src: "https://www.w3schools.com/html/movie.mp4" },
    { id: 8, title: "Sports Video", category: "sports", src: "https://www.w3schools.com/html/movie.mp4" },
    { id: 8, title: "Sports Video", category: "sports", src: "https://www.w3schools.com/html/movie.mp4" },
    { id: 8, title: "Sports Video", category: "sports", src: "https://www.w3schools.com/html/movie.mp4" },
    { id: 8, title: "Sports Video", category: "sports", src: "https://www.w3schools.com/html/movie.mp4" },
    { id: 8, title: "Sports Video", category: "sports", src: "https://www.w3schools.com/html/movie.mp4" },
    { id: 8, title: "Sports Video", category: "sports", src: "https://www.w3schools.com/html/movie.mp4" },
  
    { id: 3, title: "Song Video", category: "songs", src: "https://www.w3schools.com/html/movie.mp4" },
    { id: 4, title: "Comedy Video", category: "comedy", src: "https://www.w3schools.com/html/movie.mp4" },
];

export default function Vedios() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [liked, setLiked] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [shareModal, setShareModal] = useState(false);
  const [shared, setShared] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedVideo(URL.createObjectURL(file));
    }
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleCommentSubmit = async () => {
    if (comment.trim() === "") return;
    try {
      const commentData = {
        comment: comment,
        timestamp: new Date(),
      };
      await addDoc(collection(db, "comments"), commentData);
      setComment("");
      setShowCommentBox(false);
      alert("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  const handleShare = () => {
    setShareModal(true);
  };

  const handleShareSubmit = () => {
    setShared(true);
    setTimeout(() => {
      setShareModal(false);
      alert("Video shared successfully!");
    }, 500);
  };

  const filterVideos = (category) => {
    setSelectedCategory(category);
    setIsDoubleClicked(false);
  };

  const filteredVideos =
    selectedCategory === "all"
      ? demoVideos
      : demoVideos.filter((video) => video.category === selectedCategory);

  const handleVideoClick = (event) => {
    if (event.target.paused) {
      event.target.play();
    } else {
      event.target.pause();
    }
  };

  const handleVideoDoubleClick = (videoIndex) => {
    setIsDoubleClicked(true);
    setCurrentVideoIndex(videoIndex);
  };

  const playNextVideo = () => {
    const nextIndex = currentVideoIndex + 1;
    if (nextIndex < filteredVideos.length) {
      setCurrentVideoIndex(nextIndex);
    } else {
      alert("No more videos to play.");
    }
  };

  return (
    <div className="main-div">
      {/* Filter Buttons */}
      <div className="filter-options">
        <button onClick={() => filterVideos("all")}>All</button>
        <button onClick={() => filterVideos("food")}>Food</button>
        <button onClick={() => filterVideos("sports")}>Sports</button>
        <button onClick={() => filterVideos("songs")}>Songs</button>
        <button onClick={() => filterVideos("comedy")}>Comedy</button>
      </div>

      {!isDoubleClicked ? (
        <div className={`video-container ${selectedCategory === "all" ? "all" : ""}`}>
          {filteredVideos.map((video, index) => (
            <div key={video.id} className={`video-item ${selectedCategory === "all" ? "grid" : ""}`}>
              <video
                src={video.src}
                autoPlay
                loop
                muted
                className="uploaded-video"
                onClick={handleVideoClick}
                onDoubleClick={() => handleVideoDoubleClick(index)}
              ></video>
              <div className="icon-container">
              
                <IconButton onClick={handleLike}>
                  {liked ? (
                    <FavoriteIcon fontSize="small" style={{ color: "red" }} />
                  ) : (
                    <FavoriteBorderIcon fontSize="small" />
                  )}
                </IconButton>
               
                <IconButton onClick={handleShare}>
                  <ShareIcon fontSize="small" />
                </IconButton>
              
                <IconButton>
                  <BookmarkBorderIcon fontSize="small" />
                </IconButton>
              </div>
              {/* Comment Box */}
              {showCommentBox && (
                <div className="comment-box">
                  <textarea
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="comment-textarea"
                  ></textarea>
                  <button onClick={handleCommentSubmit} className="comment-button">
                    Send
                  </button>
                </div>
              )}
              {/* Share Modal */}
              {shareModal && !shared && (
                <div className="share-modal">
                  <div className="share-content">
                    <p>Share this video with a random account</p>
                    <button onClick={handleShareSubmit} className="share-button">
                      Send
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="double-click-video-container">
          <video
            src={filteredVideos[currentVideoIndex]?.src}
            autoPlay
            controls
            onEnded={playNextVideo}
            className="fullscreen-video"
          ></video>
        </div>
      )}
    </div>
  );
}
