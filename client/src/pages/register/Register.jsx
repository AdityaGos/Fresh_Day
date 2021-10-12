import "./register.css"
export default function Register() {
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">FreshDay</h3>
                    <span className="loginDesc">Connect with friend and the world around</span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                    <input placeholder="Username" className="loginInput" />
                        <input placeholder="Email" className="loginInput" />
                        <input placeholder="Password" className="loginInput" />
                        <input placeholder="Password Again" className="loginInput" />
                 
                        <button className="loginButton">Sign In</button>
                        <button className="loginRegistrationButton">Log into Account</button>
                       
                    </div>
                </div>
            </div>
            
        </div>
    )
}
