import {useEffect, useState} from "react";
import {
    findBusCrewByUserId,
    findBusOwnerByUserId,
    findPassengerByUserId,
    updatePassenger
} from "../services/userService";
import wavingImg from "../images/waving.png";
import defaultProfile from "../images/default profile.jpg";
import {Checkbox, RadioGroup} from "@mui/material";

export default function Profile({userTypeId,userId}){
    const [busCrew,setBusCrew] = useState();
    const [passenger, setPassenger] = useState();
    const [busOwner, setBusOwner] = useState();
    const [profileImage, setProfileImage] = useState(defaultProfile);
    const [response, setResponse] = useState('');

    const [passengerId, setPassengerId] = useState('');
    const [name,setName] = useState('');
    const [address, setAddress] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [occupation, setOccupation] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [passengerNIC,setPassengerNIC] = useState('');
    const [isEmailSubscribed, setEmailSubscribed] = useState(false);
    const [isSMSSubscribed, setSMSSubscribed] = useState(false);

    const [errorMessage,setErrorMessage] = useState('');


    useEffect(() => {
        loadUserDetails();
    }, []);

    function loadUserDetails(){
        if(userTypeId === 2){
            findBusOwnerByUserId(userId).then(response => {
                setBusOwner(response.data);
            })

        }else if(userTypeId === 3){
            findPassengerByUserId(userId).then(response => {
                let p = response.data;
                setPassenger(response.data);
                setName(p.name);
                setAddress(p.address);
                setMobileNo(p.mobileNo);
                setPassengerNIC(p.nic);
                setOccupation(p.occupation);
                setEmail(p.user.email);
                setPassengerId(p.passengerId);
                setEmailSubscribed(p.emailSubscription);
                setSMSSubscribed(p.messageSubscription);

                setGender(p.gender);
            })

        }else if(userTypeId === 4 || userTypeId === 5){
            findBusCrewByUserId(userId).then(response => {
                setBusCrew(response.data);
            })
        }
    }

    function formatDate(date) {
        const dob = new Date(date);
        const year = dob.getFullYear();
        let month = dob.getMonth() + 1;
        let day = dob.getDate();

        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }

        return `${year}-${month}-${day}`;
    }

    function handleName(e) {
        setName(e.target.value);
    }

    function handleAddress(e) {
        setAddress(e.target.value);
    }

    function handleMobileNo(e) {
        setMobileNo(e.target.value);
    }

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handleGender(e) {
        setGender(e.target.value);
    }

    function handlePassengerNIC(e) {
        setPassengerNIC(e.target.value);
    }

    function handleEmailSubscription(e) {
        setEmailSubscribed(e.target.checked);
    }

    function handleSMSSubscription(e) {
        setSMSSubscribed(e.target.checked);
    }

    function handleOccupation(e) {
        setOccupation(e.target.value);
    }

    function saveOrUpdatePassenger() {


        let mobileNoRegex = /^\d*$/;

        if(name.trim() === "" || mobileNo.trim() === "" || passengerNIC === ""){
            setErrorMessage("Please fill the data mandatory data marked in asterisk mark.");
        }else if(!mobileNoRegex.test(mobileNo) && (mobileNo.length < 10 || mobileNo.length>10)) {
            setErrorMessage("Please enter 10 digits length mobile no.")
        }else{
            let passengerObj = {passengerId,name,address,gender,mobileNo,nic:passengerNIC,occupation,emailSubscription:isEmailSubscribed,messageSubscription:isSMSSubscribed,user: {userId,email}};
            console.log(passengerObj);
            updatePassenger(passengerObj).then(response => {
                setResponse(response.data);
                setErrorMessage('');
                loadUserDetails();
            })
        }


    }

    function resetPassengerDetails() {
        setErrorMessage('');
        setResponse('');
        loadUserDetails();
    }

    return (
        <div>

            {busOwner != null &&
                <div>
                    <label style={{textAlign:'left',fontSize:'25px',fontWeight:'bold'}}>Welcome {busOwner.user.userName} <img src={wavingImg}/></label>

                    <div className="boarder-style" style={{marginTop:'20px',display:'flex'}}>

                    </div>

                </div>
            }

            {passenger != null &&

                <div>
                    <div>
                        <label style={{textAlign:'left',fontSize:'25px',fontWeight:'bold'}}>Welcome {passenger.user.userName} <img src={wavingImg}/></label>
                    </div>

                    <div><h4>{response}</h4></div>
                    <div><h5 style={{color:'red'}}>{errorMessage}</h5></div>


                    <div style={{display:'flex'}}>


                        <div style={{width:'50%',flexDirection:'column'}}>

                            <input type="hidden" value={passengerId}/>

                            <div style={{display:'flex', width:'100%'}} className="field-holder">
                                <input className="form-input" type="text" id="name" required onChange={handleName} value={name != null ? name : ''}/>
                                <label className="form-label" htmlFor="name"><span style={{color:'red'}}>* </span>Name :</label>
                            </div>

                            <div style={{display:'flex', width:'100%'}} className="field-holder">
                                <input className="form-input" type="text" id="address" required onChange={handleAddress} value={address != null ? address : ''}/>
                                <label className="form-label" htmlFor="address">Address :</label>
                            </div>

                            <div style={{display:'flex', width:'100%'}} className="field-holder">
                                <input className="form-input" type="number" maxLength="10" id="mobileNo" required onChange={handleMobileNo} value={mobileNo != null ? mobileNo : ''}/>
                                <label className="form-label" htmlFor="mobileNo"><span style={{color:'red'}}>* </span>Mobile No :</label>
                            </div>

                            <div style={{display:'flex', width:'100%'}} className="field-holder">
                                <input className="form-input" type="text" id="passengerNIC" required onChange={handlePassengerNIC} value={passengerNIC != null ? passengerNIC : ''}/>
                                <label className="form-label" htmlFor="passengerNIC"><span style={{color:'red'}}>* </span>NIC :</label>
                            </div>






                        </div>

                        <div style={{width:'50%', flex:'1'}}>
                            <div style={{display:'flex', width:'100%'}} className="field-holder">
                                <input className="form-input" type="text" id="occupation" required onChange={handleOccupation} value={occupation != null ? occupation : ''}/>
                                <label className="form-label" htmlFor="occupation">Occupation :</label>
                            </div>



                            <div style={{display:'flex', width:'100%', marginBottom:'10px'}}>

                                <label htmlFor="email"><span style={{color:'red'}}>* </span>Email : </label>
                                <div>
                                    <label id="email">{email}</label>
                                </div>

                            </div>

                            <div className="field-holder" style={{textAlign:'left'}}>


                                <label style={{paddingBottom:'20px'}}  htmlFor="gender">Gender :</label>
                                <RadioGroup id="gender" style={{display: "flex",alignItems: 'flex-start', marginLeft:'20px'}} >
                                            <span style={{ padding:'15px'}}>
                                                <input type="radio" name="gender" value="Male" id="maleLabel" onChange={handleGender}  checked={ gender === 'Male'}/>
                                                <label htmlFor="maleLabel">Male</label>
                                                <input type="radio" name="gender" value="Female" id="femaleLabel" onChange={handleGender}   checked={ gender === 'Female'}/>
                                                <label htmlFor="femaleLabel">Female</label>
                                            </span>

                                </RadioGroup>


                            </div>

                            <div className="field-holder" style={{textAlign:'left'}}>


                                <label style={{paddingBottom:'20px'}} >Subscription :</label>
                                <div style={{display: "flex",alignItems: 'flex-start', marginLeft:'20px'}}>
                                    <span style={{ padding:'15px'}}>
                                                <input type="checkbox" name="subscription" value="email" id="emailLabel" onChange={(e) => setEmailSubscribed(e.target.checked)} checked={isEmailSubscribed}/>
                                                <label htmlFor="emailLabel">Email</label>
                                                <input type="checkbox" name="subscription" value="sms" id="smsLabel" onChange={(e) => setSMSSubscribed(e.target.checked)} checked={isSMSSubscribed} />
                                                <label htmlFor="smsLabel">SMS</label>
                                            </span>
                                </div>


                            </div>
                        </div>


                    </div>

                    <div >
                        <button style={{marginRight:'10px'}} onClick={saveOrUpdatePassenger}>Save</button>
                        <button style={{marginRight:'10px'}} onClick={resetPassengerDetails}>Reset</button>
                    </div>
                </div>
            }

            {busCrew != null &&
                <div>
                    <label style={{textAlign:'left',fontSize:'25px',fontWeight:'bold'}}>Welcome {busCrew.user.userName} <img src={wavingImg}/></label>

                    <div className="boarder-style" style={{marginTop:'20px',display:'flex'}}>

                        <div style={{display:'1', width:'50%',flexDirection:'column'}}>

                            <div style={{display:'flex', width:'100%'}}>
                                <label style={{textAlign:'left',padding:'20px',flex:'1',fontWeight:'bold'}}>Name :</label>
                                <label style={{textAlign:'left',padding:'20px',flex:'1'}}>{busCrew.name}</label>
                            </div>

                            <div style={{display:'flex', width:'100%'}}>
                                <label style={{textAlign:'left',padding:'20px',flex:'1',fontWeight:'bold'}}>Address :</label>
                                <label style={{textAlign:'left',padding:'20px',flex:'1'}}>{busCrew.address}</label>
                            </div>

                            <div style={{display:'flex', width:'100%'}}>
                                <label style={{textAlign:'left',padding:'20px',flex:'1',fontWeight:'bold'}}>Mobile No :</label>
                                <label style={{textAlign:'left',padding:'20px',flex:'1'}}>{busCrew.mobileNo}</label>
                            </div>

                            <div style={{display:'flex', width:'100%'}}>
                                <label style={{textAlign:'left',padding:'20px',flex:'1',fontWeight:'bold'}}>NIC :</label>
                                <label style={{textAlign:'left',padding:'20px',flex:'1'}}>{busCrew.nic}</label>
                            </div>
                            <div style={{display:'flex', width:'100%'}}>
                                <label style={{textAlign:'left',padding:'20px',flex:'1',fontWeight:'bold'}}>DOB :</label>
                                <label style={{textAlign:'left',padding:'20px',flex:'1'}}>{formatDate(busCrew.dob)}</label>
                            </div>

                            <div style={{display:'flex', width:'100%'}}>
                                <label style={{textAlign:'left',padding:'20px',flex:'1',fontWeight:'bold'}}>Age :</label>
                                <label style={{textAlign:'left',padding:'20px',flex:'1'}}>{busCrew.age}</label>
                            </div>

                            <div style={{display:'flex', width:'100%'}}>
                                <label style={{textAlign:'left',padding:'20px',flex:'1',fontWeight:'bold'}}>Occupation :</label>
                                <label style={{textAlign:'left',padding:'20px',flex:'1'}}>{busCrew.busCrewType.description}</label>
                            </div>


                            <div style={{display:'flex', width:'100%'}}>
                                <label style={{textAlign:'left',padding:'20px',flex:'1',fontWeight:'bold'}}>Travel Service :</label>
                                <label style={{textAlign:'left',padding:'20px',flex:'1'}}>{busCrew.busOwner.travelServiceName}</label>
                            </div>

                        </div>

                        <div style={{display:'1', width:'40%'}}>

                            <div style={{display:'flex', width:'100%'}}>
                                <label style={{textAlign:'left',padding:'20px',flex:'1',fontWeight:'bold'}}>Profile :</label>
                                <div className="image-preview">

                                    {busCrew.profileImage !== null ?
                                        <img src={busCrew.profileImage} alt="Profile" />
                                        :
                                        <img src={profileImage} alt="Profile"/>
                                    }

                                </div>
                            </div>

                            <div style={{display:'flex', width:'100%'}}>
                                <label style={{textAlign:'left',padding:'20px',flex:'1',fontWeight:'bold'}}>NTC No :</label>
                                <label style={{textAlign:'left',padding:'20px',flex:'1'}}>{busCrew.ntcNo}</label>
                            </div>

                            {busCrew.busCrewType.busCrewTypeId === 1 &&
                            <>
                                <div style={{display:'flex', width:'100%'}}>
                                    <label style={{textAlign:'left',padding:'20px',flex:'1',fontWeight:'bold'}}>License No :</label>
                                    <label style={{textAlign:'left',padding:'20px',flex:'1'}}>{busCrew.licenseNo}</label>
                                </div>

                                <div style={{display:'flex', width:'100%'}}>
                                    <label style={{textAlign:'left',padding:'20px',flex:'1',fontWeight:'bold'}}>Issue Date :</label>
                                    <label style={{textAlign:'left',padding:'20px',flex:'1'}}>{busCrew.issuesDate !== null ? formatDate(busCrew.issuesDate) : ''}</label>
                                </div>

                                <div style={{display:'flex', width:'100%'}}>
                                    <label style={{textAlign:'left',padding:'20px',flex:'1',fontWeight:'bold'}}>Expiry Date :</label>
                                    <label style={{textAlign:'left',padding:'20px',flex:'1'}}>{busCrew.expiryDate !== null ? formatDate(busCrew.expiryDate) : ''}</label>
                                </div>
                            </>}




                        </div>




                    </div>

                </div>
            }

        </div>
    )
}