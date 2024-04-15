import usernameImg from "../images/username.png";
import passwordImg from "../images/password.png";
import {useEffect, useState} from "react";
import {changePassword} from "../services/userService";
import Cookies from "js-cookie";

export default function PasswordReset(){
    const [responseMessage, setResponseMessage] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmedNewPassword, setConfirmedNewPassword] = useState('');


    function handleCurrentPassword(e) {
        setCurrentPassword(e.target.value);
    }

    function handleNewPassword(e) {
        setNewPassword(e.target.value);
    }

    function handleConfirmedNewPassword(e) {
        setConfirmedNewPassword(e.target.value);
    }

    function resetPassword() {
        const cookieData = Cookies.get('auth');
        let user ={};
        if (cookieData) {

            let cookie = JSON.parse(cookieData)
            user = {userId :cookie.userId};

        }else{
            console.log("no cookie");

        }

        if(newPassword !== confirmedNewPassword){
            setResponseMessage("New password and confirmed password are not same.")
        }else{
            changePassword(currentPassword, newPassword, user.userId).then(response =>{
                const{status, message} = response.data;

                setResponseMessage(message);
                if(status === "success"){
                    Cookies.remove("auth");
                }

            })
        }

    }

    return (
        <div  style={{marginBottom : "5%",marginLeft : "6%", width:"80%", }}>
            <div className="header">
                <h1>Reset Password</h1>
            </div>

            <div>{responseMessage}</div>

            <div style={{display : "flex", padding: "20px"}}>
                <label style={{textAlign: "left", verticalAlign:"middle", width:"20%", marginTop: "2%"}} htmlFor="currentPassword">Current Password :</label>
                <div className="input">
                    <img src={passwordImg} alt=""/>
                    <input type="password" placeholder="Current Password" value={currentPassword} name="currentPassword" onChange={handleCurrentPassword} required/>
                </div>
            </div>

            <div style={{display : "flex",padding: "20px"}}>
                <label style={{textAlign: "left", verticalAlign:"middle", width:"20%" , marginTop: "2%"}} htmlFor="newPassword">New Password :</label>
                <div className="input">
                    <img src={passwordImg} alt=""/>
                    <input type="password" placeholder="New Password" value={newPassword} name="newPassword" onChange={handleNewPassword} required/>
                </div>
            </div>

            <div style={{display : "flex",padding: "20px"}}>
                <label style={{textAlign: "left", verticalAlign:"middle", width:"20%", marginTop: "1%"}} htmlFor="confirmedNewPassword">Confirm New Password :</label>
                <div className="input">
                    <img src={passwordImg} alt=""/>
                    <input type="password" placeholder="Confirm New Password" value={confirmedNewPassword} name="confirmedNewPassword" onChange={handleConfirmedNewPassword} required/>
                </div>
            </div>



                <div className="button-container">
                    <button onClick={resetPassword} >Reset</button>

                </div>

        </div>



    );
}