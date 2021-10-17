import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import{ useState, useEffect, useContext} from "react"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext";


export default function Feed({username}) {
    const [posts,setPosts]=useState([]);
    const {user}=useContext(AuthContext)
  
    useEffect(() => {
        const fetchPosts = async ()=>{
            console.log(username)
            const res= username 
            ? await axios.get("/posts/profile/"+username)
            :await axios.get("posts/timeline/"+user._id);
            // if(username){ console.log(username); const res= await axios.get("localhost:8800/api/posts/profile/"+username); setPosts(res.data)}
            // else{ const res=await axios.get("posts/timeline/616498d3252c5de4515b6e89"); setPosts(res.data)}
           setPosts(res.data);
        };
        fetchPosts();
    },[username,user._id]);

  return (
    <div className="feed">
   
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}