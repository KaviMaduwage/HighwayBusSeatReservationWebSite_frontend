import {useEffect, useState} from "react";
import {findBusCrewByUserId, findBusOwnerByUserId, findPassengerByUserId} from "../services/userService";
import wavingImg from "../images/waving.png";
import defaultProfile from "../images/default profile.jpg";
import {RadioGroup} from "@mui/material";

export default function Profile({userTypeId,userId}){
    const [busCrew,setBusCrew] = useState();
    const [passenger, setPassenger] = useState();
    const [busOwner, setBusOwner] = useState();
    const [profileImage, setProfileImage] = useState(defaultProfile);

    const [passengerId, setPassengerId] = useState('');
    const [name,setName] = useState('');
    const [address, setAddress] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [occupation, setOccupation] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');


    useEffect(() => {
        if(userTypeId === 2){
            findBusOwnerByUserId(userId).then(response => {
                setBusOwner(response.data);
            })

        }else if(userTypeId === 3){
            findPassengerByUserId(userId).then(response => {
                setPassenger(response.data);
            })

        }else if(userTypeId === 4 || userTypeId === 5){
            findBusCrewByUserId(userId).then(response => {
                setBusCrew(response.data);
            })
        }
    }, []);

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
                <div >
                    <label style={{textAlign:'left',fontSize:'25px',fontWeight:'bold'}}>Welcome {passenger.user.userName} <img src={wavingImg}/></label>

                    <div style={{display:'1', width:'60%',flexDirection:'column'}}>

                        <div style={{display:'flex', width:'100%'}} className="field-holder">
                            <input className="form-input" type="text" id="name" required onChange={handleName} value={passenger.name != null ? passenger.name : ''}/>
                            <label className="form-label" htmlFor="name">Name :</label>
                        </div>

                        <div style={{display:'flex', width:'100%'}} className="field-holder">
                            <input className="form-input" type="text" id="address" required onChange={handleAddress} value={passenger.address != null ? passenger.address : ''}/>
                            <label className="form-label" htmlFor="address">Address :</label>
                        </div>

                        <div style={{display:'flex', width:'100%'}} className="field-holder">
                            <input className="form-input" type="number" maxLength="10" id="mobileNo" required onChange={handleMobileNo} value={passenger.mobileNo != null ? passenger.mobileNo : ''}/>
                            <label className="form-label" htmlFor="mobileNo">Mobile No :</label>
                        </div>

                        <div style={{display:'flex', width:'100%'}} className="field-holder">
                            <input className="form-input" type="email" maxLength="10" id="email" required onChange={handleEmail} value={passenger.user.email != null ? passenger.user.email : ''}/>
                            <label className="form-label" htmlFor="email">Email :</label>
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