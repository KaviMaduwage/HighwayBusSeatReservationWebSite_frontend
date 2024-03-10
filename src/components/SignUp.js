import emailImg from "../images/email.png"
import usernameImg from "../images/username.png"
import passwordImg from "../images/password.png"
import Select from "react-select";
import {useState} from "react";
import {userRegistration} from "../services/userService";
import {RadioGroup} from "@mui/material";

export default function SignUp(){

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [userType, setUserType] = useState('');

    function handleUserName(e){
        setUserName(e.target.value);
    }

    function handleEmail(e){
        setEmail(e.target.value);
    }

    function handlePassword(e){
        setPassword(e.target.value);
    }

    function handleOptionChange(e){
        setUserType(e.target.value);
    }

    function signUp(e){
        e.preventDefault();

        let  selectedUserType;
        if(userType === "passenger"){
            selectedUserType= {
                userTypeId: 3,
                description: 'passenger'
            }
        }else{
            selectedUserType= {
                userTypeId: 2,
                description: 'bus owner'
            }
        }
        const user = {userName, password,email, userType: selectedUserType };
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

                <div>
                    <label style={{ padding: '5%' }}>
                        <input type="radio" value="passenger" checked={userType === "passenger"} onChange={handleOptionChange} />
                        Passenger registration
                    </label>

                    <label style={{ padding: '5%' }}>
                        <input type="radio" value="busOwner" checked={userType === "busOwner"} onChange={handleOptionChange} />
                        Bus owner registration
                    </label>
                </div>



                <div className="button-container">
                    <button onClick={signUp}>Sign Up</button>

                </div>
            </div>


        </div>
    )
}