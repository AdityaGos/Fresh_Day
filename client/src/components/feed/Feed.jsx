import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import{ useState, useEffect} from "react"
import axios from "axios"


export default function Feed() {
    const [posts,setPosts]=useState([]);
  
    useEffect(() => {
        const fetchPosts = async ()=>{
            const res= await axios.get("posts/timeline/616498f1252c5de4515b6e8b");
            // console.log(res);
            setPosts(res.data)
        };
        fetchPosts();
    },[]);

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