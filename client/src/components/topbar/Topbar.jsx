import "./topbar.css";
// import { useState } from "react"
import { Person, Search ,Chat, Notifications} from "@material-ui/icons";
import {Link} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
export default function Topbar() {
    // const [i,seti]=useState(0);
    // const list=['alex','adi','shrikant']
    // const [name,setName]=useState('Aditya');
    // // const [isclick,setclick]=useState(false);
    // const handleClick=()=>{
    //     setName(list[i]);
    //     seti(i+1);
    //     if(i==list.length-1){ console.log("Reached lenght"); seti(0);}

    // }
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const {user}=useContext(AuthContext);
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style ={{textDecoration:"none"}}> <span className="logo">Freshday</span> </Link>
                
            </div>

            <div className="topbarCenter">
                <div className="searchBar">
                    <Search className="searchIcon" />
                    <input
                        placeholder="Search for friend,post or video"
                        className="searchInput"
                    />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLink">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                    {/* <span className="topbarLink">{name}</span>
                    
                    
                    <button onClick={handleClick}>clickme</button>
                    <span className="topbarLink">{i}</span> */}

                </div>

                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconbadge"> 1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconbadge"> 1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconbadge"> 1</span>
                    </div>
                </div>
                <Link to ={`/profile/${user.username}`}>
                        
                <img src={ user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"}
                 alt="" className="topbarImg" />
                </Link>

           
            </div>
        </div>
    );
}
