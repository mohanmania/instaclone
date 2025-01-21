import "./detail.css";

const Detail = () => {
  return (
    <div className="detail">
      <div className="user">
        {/* <img src="" alt="profile" /> */}
        <h2>mohan krishna</h2>
        {/* <p>Lorem, ipsum dolor.</p> */}
      </div>
      <div className="info">
        <div className="option">
          <div className="titile">
            <span>chat settings</span>
            <img src="" alt="profil1" />
          </div>
        </div>
        <div className="option">
          <div className="titile">
            <span>privacy % help</span>
            <img src="" alt="profil2" />
          </div>
        </div>
        <div className="option">
          <div className="titile">
            <span>shared photos</span>
            <img src="" alt="profil1" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-1024.png"
                  alt="User Avatar"
                />
                <span>photo_url_2024.png</span>
              </div>
              <img src="" alt="" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-1024.png"
                  alt="User Avatar"
                />
                <span>photo_url_2024.png</span>
              </div>
              <img src="" alt="" />
            </div>
          
        </div>
        <div className="option">
          <div className="titile">
            <span>shared files</span>
            <img src="" alt="profil1" />
          </div>
        </div>
        
      </div>
      <button>Block user</button>
    </div>
  
    </div>
  );
};
export default Detail;
