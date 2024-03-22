import usernameImg from "../images/username.png";
import passwordImg from "../images/password.png";
import {useState} from "react";
import {userLogin} from "../services/userService";
import {useNavigate} from "react-router-dom";

export default function SignIn({ loggedIn, updateLoggedIn }){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    //const [loggedIn, setLoggedIn] = useState(false);

    const navigate = useNavigate();

    function handleEmail(e){
        setEmail(e.target.value);
    }

    function handlePassword(e){
        setPassword(e.target.value);
    }

    async function signIn(e) {
        e.preventDefault();
        const user = {password, email};
        console.log(user);

        try {
            const response = await userLogin(user);
            console.log(response.data);
            if (response.data === "Invalid") {
                console.error('Login failed');
                setResponseMessage(response.data);

            } else {
                //setLoggedIn(true);
                const { userTypeId, userName } = response.data;

                updateLoggedIn(true, userTypeId, userName);
                //navigate(response.data);
                if(userTypeId === 1){
                    navigate("/admin-dashboard");
                }else if(userTypeId === 2){

                }else if(userTypeId === 3){
                    navigate("/passenger-dashboard");
                }else if(userTypeId === 4){

                }else if(userTypeId === 5){

                }

            }
        } catch (error) {
            console.error('Failed to sign in:', error);
            setResponseMessage('Failed to sign in. Please try again later.');
        }

    }



    return (
        <div className="signUp-signIn-container">
            <div className="header">
                <h1>Sign In</h1>
            </div>

            <div>{responseMessage}</div>

            <div className="inputs">
                <div className="input">
                    <img src={usernameImg} alt=""/>
                    <input type="text" placeholder="User email" value={email} name="email" onChange={handleEmail}/>
                </div>

                <div className="input">
                    <img src={passwordImg} alt=""/>
                    <input type="password" placeholder="Password" value={password} name="password" onChange={handlePassword}/>
                </div>

                <div className="forgot-password">
                    Forgot Password <span style={{ cursor : 'pointer', color: 'blue'}}>Click Here !</span>
                </div>

                <div className="button-container">
                    <button onClick={signIn}>Sign In</button>

                </div>
            </div>


        </div>
    )
}


