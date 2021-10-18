import "./share.css"
import { PermMedia,Label,Room,EmojiEmotions } from "@material-ui/icons"
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {

    const {user}=useContext(AuthContext)

    const PF=process.env.REACT_APP_PUBLIC_FOLDER;

    const desc=useRef();

    const [file,setfile]=useState(null);
    
    // uploading file in server side 
    //uploading images to server is not good idea because of the huge traffic and load 
    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
          userId: user._id,
          desc: desc.current.value,
        };
        if (file) {
          const data = new FormData();
          const fileName = Date.now() + file.name;
          data.append("name", fileName);
          data.append("file", file);
          newPost.img = fileName;
          console.log(newPost);
          try {
            await axios.post("/upload", data);
          } catch (err) {}
        }
        try {
          await axios.post("/posts", newPost);
          window.location.reload();
        } catch (err) {}
      };
    return (
        <div className ="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img  className="shareProfileImg"src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            } alt="" />
                    <input placeholder={"Whats in your mind "+user.username+"?"} className="shareInput" ref={desc} />
                </div>
                <hr className="shareHr"/>
                                                        {/* submithandler is event */}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato"className="shareIcon"/>
                            <span className="shareOptionText"> Photo and Videos</span>
                            <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jfif,.jpg " onChange={(e)=>setfile(e.target.files[0])} />
                            </label>
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
                    <button className="shareButton" type="submit">Share</button>
                </form>
            </div>
        </div>
    )
}
