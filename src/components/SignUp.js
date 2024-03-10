import emailImg from "../images/email.png"
import usernameImg from "../images/username.png"
import passwordImg from "../images/password.png"
import {useState} from "react";
import {userRegistration} from "../services/userService";

export default function SignUp(){

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    function handleUserName(e){
        setUserName(e.target.value);
    }

    function handleEmail(e){
        setEmail(e.target.value);
    }

    function handlePassword(e){
        setPassword(e.target.value);
    }

    function signUp(e){
        e.preventDefault();
        const user = {userName, password,email};
        console.log(user);

        userRegistration(user).then((response) => {
            setResponseMessage(response.data);
        })
    }

    return (
        <div className="signUp-signIn-container">
            <div className="header">
                <h1>Sign Up</h1>
            </div>

            <div>{responseMessage}</div>

            <div className="inputs">
                <div className="input">
                    <img src={usernameImg} alt=""/>
                    <input type="text" name='userName' value={userName} placeholder="Userame" onChange={handleUserName}/>
                </div>

                <div className="input">
                    <img src={emailImg} alt=""/>
                    <input type="email" name='email' value={email} placeholder="Email" onChange={handleEmail}/>
                </div>

                <div className="input">
                    <img src={passwordImg} alt=""/>
                    <input type="password" name='password' value={password} placeholder="Password" onChange={handlePassword}/>
                </div>



                <div className="button-container">
                    <button onClick={signUp}>Sign Up</button>

                </div>
            </div>


        </div>
    )
}