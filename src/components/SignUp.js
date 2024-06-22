import emailImg from "../images/email.png"
import usernameImg from "../images/username.png"
import passwordImg from "../images/password.png"
import companyImg from "../images/company.png"
import nicImg from "../images/nic.png"
import telImg from "../images/tel.png"
import locationImg from "../images/location.png"
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
    const [isShowCompanyDetailPanel, setIsShowCompanyDetailPanel] = useState(false);

    const [travelServiceName, setTravelServiceName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [address, setAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [nic,setNic] = useState('');
    const [passengerMobile,setPassengerMobile] = useState('');
    const [isShowPassengerDetailPanel, setIsShowPassengerDetailPanel] = useState(false);

    function handleUserName(e){
        setUserName(e.target.value);
    }

    function handleEmail(e){
        setEmail(e.target.value);
    }

    function handlePassword(e){
        setPassword(e.target.value);
    }

    function handleCompanyName(e) {
        setTravelServiceName(e.target.value);
    }

    function handleCompanyTel(e) {
        setMobileNo(e.target.value);
    }

    function handleCompanyAddress(e) {
        setAddress(e.target.value);
    }


    function handleOptionChange(e){
        const selectedUserType = e.target.value;
        setUserType(selectedUserType);

        if(selectedUserType === 'busOwner') {
            setTravelServiceName('');
            setMobileNo('');
            setAddress('');
            setNic('');
            setPassengerMobile('');
            setIsShowCompanyDetailPanel(true);
            setIsShowPassengerDetailPanel(false);
        } else if(selectedUserType === 'passenger'){
            setTravelServiceName('');
            setMobileNo('');
            setAddress('');
            setNic('');
            setPassengerMobile('');
            setIsShowPassengerDetailPanel(true);
            setIsShowCompanyDetailPanel(false);
        }

    }

    function signUp(e){
        e.preventDefault();

        let  selectedUserType;
        let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
        let mobileNoRegex = /^\d*$/;

        if(userName.trim() === "" && email.trim() === "" && password.trim() === "" && userType === ""){
            setErrorMessage("Please fill the data");
        } else if(userName.trim() === "") {
            setErrorMessage("Please enter the userName.");
        }else if(email.trim() === ""){
            setErrorMessage("Please enter the email address.")
        }else if(!emailRegex.test(email)){
            setErrorMessage("Please enter valid email address.")
        }else if(password.trim() === ""){
            setErrorMessage("Please enter the password.")
        }else if(userType === ""){
            setErrorMessage("Please select the user type.")
        }else if(userType === "busOwner" && travelServiceName.trim()===""){
            setErrorMessage("Please enter company name.")
        }else if(userType === "busOwner" && mobileNo.trim()===""){
            setErrorMessage("Please enter mobile no.")
        }else if(userType === "busOwner" && !mobileNoRegex.test(mobileNo) && (mobileNo.length < 10 || mobileNo.length>10)){
            setErrorMessage("Please enter 10 digits length mobile no.")
        }else if(userType === "busOwner" && address.trim() === ""){
            setErrorMessage("Please enter company address.")
        }else if(userType === "passenger" && nic.trim() === ""){
            setErrorMessage("Please enter NIC.")
        } else if (userType === "passenger" && passengerMobile.trim() === ""){
            setErrorMessage("Please enter mobile no.")
        }else if(userType === "passenger" && !mobileNoRegex.test(passengerMobile) && (passengerMobile.length < 10 || passengerMobile.length>10)) {
            setErrorMessage("Please enter 10 digits length mobile no.")
        }else{

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
            const busOwner  ={travelServiceName, mobileNo, address};
            const tempPassenger = {nic,mobileNo:passengerMobile};
            let userData = {};

            if(userType === "passenger"){
                userData = {
                    user: user,
                    tempPassenger: tempPassenger
                };
            }else{
                userData = {
                    user: user,
                    busOwner: busOwner

                };
            }
            console.log(userData);

            userRegistration(userData).then((response) => {
                setResponseMessage(response.data);
                setErrorMessage('');
            })

        }


    }

    function handlePassengerMobile(e) {
        setPassengerMobile(e.target.value);
    }

    function handleNIC(e) {
        setNic(e.target.value);
    }

    return (
        <div className="signUp-signIn-container" style={{marginBottom : "5%"}}>
            <div className="header">
                <h1>Sign Up</h1>
            </div>

            <div>{responseMessage}</div>
            <div style={{color : 'red'}}>{errorMessage}</div>

            <div className="inputs">

                <div className="input">
                    <img src={usernameImg} alt=""/>
                    <input type="text" name='userName' value={userName} placeholder="Userame" onChange={handleUserName} required/>
                </div>

                <div className="input">
                    <img src={emailImg} alt=""/>
                    <input type="email" name='email' value={email} placeholder="Email" onChange={handleEmail} required/>
                </div>

                <div className="input">
                    <img src={passwordImg} alt=""/>
                    <input type="password" name='password' value={password} placeholder="Password" onChange={handlePassword} required/>
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

                {isShowCompanyDetailPanel && (

                    <div className="inputs">
                        <div className="input">
                            <img src={companyImg} alt=""/>
                            <input type="text" name='companyName' placeholder="Company Name" value={travelServiceName} onChange={handleCompanyName}/>

                        </div>

                        <div className="input">
                            <img src={telImg} alt=""/>
                            <input type="number" maxLength="10" name='companyTel' placeholder="Company Tel." value={mobileNo} onChange={handleCompanyTel}/>

                        </div>

                        <div className="input">
                            <img src={locationImg} alt=""/>
                            <input type="text" name='companyAddress' placeholder="Company Address" value={address} onChange={handleCompanyAddress}/>

                        </div>


                    </div>
                )}

                {isShowPassengerDetailPanel &&
                    <div className="inputs">
                        <div className="input">
                            <img src={nicImg} alt=""/>
                            <input type="text" name='nic' placeholder="NIC" value={nic} onChange={handleNIC}/>

                        </div>

                        <div className="input">
                            <img src={telImg} alt=""/>
                            <input type="number" maxLength="10" name='passengerMobile' placeholder="Mobile No." value={passengerMobile} onChange={handlePassengerMobile}/>

                        </div>



                    </div>
                }



                <div className="button-container">
                    <button onClick={signUp}>Sign Up</button>

                </div>
            </div>


        </div>
    )
}