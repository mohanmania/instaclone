import React from "react";
import logo from "../../images/logo.png";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import "./post.css"

export default function Post(){
    return(
        
<div className="postSection">
        <div className="post">
          <div className="postinfo">
            <img
              className="profileInfoimg"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Mahesh_Babu_in_Spyder.jpg/800px-Mahesh_Babu_in_Spyder.jpg"
            />
            <div className="postInfoUserName">Tiger sharif</div>
            <div className="timingInfo">..39min</div>
          </div>
          <div className="postImg">
            <img className="post-img" src="https://media.istockphoto.com/id/1313390800/photo/multiple-exposure-of-young-man-and-nature.jpg?s=2048x2048&w=is&k=20&c=BjQsumF29u57nnQhub5RV0H_c-Ai8nOBY83IR9sVlac=" />
          </div>
          <div className="post-Icon-Blocks" style={{ height: "45px" }}>
            <div className="leftIcon">
              <FavoriteBorderOutlinedIcon />

              <ModeCommentOutlinedIcon />
              <ShareOutlinedIcon />
            </div>
            <div className="righticon">
              <BookmarkBorderOutlinedIcon />
            </div>
          </div>
          <div className="likeSection">
            <div className="imageslike">
        <img className="imglike" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Mahesh_Babu_in_Spyder.jpg/800px-Mahesh_Babu_in_Spyder.jpg"/>
        <img className="imglike2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Mahesh_Babu_in_Spyder.jpg/800px-Mahesh_Babu_in_Spyder.jpg"/>

            </div>
            <div className="noOflikes">
                122,34Likes
            </div>

            </div>
            <div className="postAbout">
            <div className="postAboutName">
                kjhgfds
            </div>
            <div className="infoComment">helo Evryone's..</div>
            </div>
            <div className="noOfComments">
                 12,233,Cpmments
            </div>
        </div>
      </div>

    )
}


