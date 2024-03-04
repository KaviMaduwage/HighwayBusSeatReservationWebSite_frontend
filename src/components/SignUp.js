import emailImg from "../images/email.png"
import usernameImg from "../images/username.png"
import passwordImg from "../images/password.png"

export default function SignUp(){
    return (
        <div className="signUp-signIn-container">
            <div className="header">
                <h1>Sign Up</h1>
            </div>

            <div className="inputs">
                <div className="input">
                    <img src={usernameImg} alt=""/>
                    <input type="text" placeholder="Userame"/>
                </div>

                <div className="input">
                    <img src={emailImg} alt=""/>
                    <input type="email" placeholder="Email"/>
                </div>

                <div className="input">
                    <img src={passwordImg} alt=""/>
                    <input type="password" placeholder="Password"/>
                </div>

                <div className="forgot-password">
                    Lost Password <span style={{ cursor : 'pointer', color: 'blue'}}>Click Here !</span>
                </div>

                <div className="button-container">
                    <button>Sign Up</button>

                </div>
            </div>


        </div>
    )
}