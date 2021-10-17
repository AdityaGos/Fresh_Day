import "./share.css"
import { PermMedia,Label,Room,EmojiEmotions } from "@material-ui/icons"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
export default function Share() {
    const {user}=useContext(AuthContext)
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className ="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img  className="shareProfileImg"src={ 
                        user.profilePicture
                        ? PF + user.profilePicture
                        : PF + "person/noAvatar.png"} alt="" />
                    <input placeholder="Whats in your mind Ankit" className="shareInput" />
                </div>
                <hr className="shareHr"/>

                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <PermMedia htmlColor="tomato"className="shareIcon"/>
                            <span className="shareOptionText"> Photo and Videos</span>
                            </div>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon"/>
                            <span className="shareOptionText"> Tag</span>
                            </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon"/>
                            <span className="shareOptionText"> Location</span>
                            </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="orange" className="shareIcon"/>
                            <span className="shareOptionText"> Feeling</span>
                            </div>
                    </div>
                    <button className="shareButton">Share</button>
                </div>
            </div>
        </div>
    )
}
