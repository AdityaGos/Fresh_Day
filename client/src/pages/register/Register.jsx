import "./register.css"
import { useRef} from "react";
import { useHistory } from "react-router";
import axios from "axios";
export default function Register() {
    const email =useRef();
    const username =useRef();
    const password = useRef();
    const passwordagain = useRef();
    const history=useHistory();

    const handleClick= async(e)=>{
        e.preventDefault();
        if(passwordagain.current.value !== password.current.value){
            passwordagain.current.setCustomValidity("Password don't match")
        }
        else{
            const user={
                username:username.current.value,
                email:email.current.value,
                password:password.current.value,
            }
        
        try{
            await axios.post("auth/register",user);
            history.push("/login");

        }catch(err){ console.log(err)}
    }

    }
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">FreshDay</h3>
                    <span className="loginDesc">Connect with friend and the world around</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                    <input placeholder="Username" required ref={username} className="loginInput" />
                        <input placeholder="Email" required ref={email} type="email" className="loginInput" />
                        <input placeholder="Password"  required ref={password} type="password" className="loginInput" />
                        <input placeholder="Password Again" required ref={passwordagain} type="password" className="loginInput" />
                 
                        <button className="loginButton" type="submit">Sign In</button>
                        <button className="loginRegistrationButton">Log into Account</button>
                       
                    </form>
                </div>
            </div>
            
        </div>
    )
}
