import "./closeFriend.css"
export default function closeFriend({user}) {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="sidebarFriend">
                        <img className="sidebarFriendImg" src={PF+user.profilePicture} alt="" />
                            
                        <span className="sidebarFriendName">{user.username}</span>
                    </li>
    )
}
