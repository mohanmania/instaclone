import "./userinfo.css";
import { useUserStore } from "../../../useStore/userstore";

function UserInfo() {
    const { currentUser } = useUserStore();

    // If currentUser is null or undefined, return a fallback UI
    if (!currentUser) {
        return <div>Loading user info...</div>;
    }

    return (
        <div className="userInfo">
            <div className="user">
                <img
                    style={{ height: "15px" }}
                    src={currentUser.photoURL || "https://icon-library.com/images/profile-icon/profile-icon-4.jpg"}
                    alt="User Profile"
                />
                <h3>{currentUser.name || "Unknown User"}</h3>
            </div>
            <div className="icons">
                <img
                    src="https://static.vecteezy.com/system/resources/previews/000/442/172/original/vector-video-camera-icon.jpg"
                    alt="Video Camera Icon"
                />
                <img
                    src="https://tse2.mm.bing.net/th?id=OIP.d1sTN41laBxAg-Uy_pXvmgHaHx&pid=Api&P=0&h=180"
                    alt="Some Icon"
                />
                <img
                    src="https://cdn3.iconfinder.com/data/icons/roundies-icons/32/more-512.png"
                    alt="More Options Icon"
                />
            </div>
        </div>
    );
}

export default UserInfo;
