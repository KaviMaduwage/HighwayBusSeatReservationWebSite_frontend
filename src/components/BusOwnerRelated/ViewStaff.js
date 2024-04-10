import {useEffect, useRef, useState} from "react";
import {
    deleteMemberById,
    findMemberById,
    populateBusCrewTypes,
    populateStaffDetails,
    saveStaffMember
} from "../../services/staffService";
import addImage from "../../images/add1.png";
import deleteStaff from "../../images/delete.png";
import editStaff from "../../images/update.png";
import viewStaff from "../../images/view.png";
import defaultProfile from "../../images/default profile.jpg";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, RadioGroup} from "@mui/material";
import Cookies from "js-cookie";

export default function ViewStaff(){
    const [busOwnerId, setBusOwnerId] = useState('');
    const [busCrewId, setBusCrewId] = useState('');

    const [busCrewTypes , setBusCrewTypes] = useState([]);
    const [busCrewList, setBusCrewList] = useState([]);
    const [showAddPanel, setShowAddPanel] = useState(false);
    const [driverLicenseDetailPanel, setDriverLicensePanel] = useState(false);
    const [profileImage, setProfileImage] = useState(defaultProfile);

    const [name, setName] = useState('');
    const [searchName, setSearchName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [dob, setDob] = useState('');
    const [nic, setNic] = useState('');
    const [busCrewType, setBusCrewType] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [ntcNo, setNtcNo] = useState('');
    const [licenseNo,setLicenseNo] = useState('');
    const [issueDate, setIssueDate] = useState(null);
    const [expiryDate, setExpiryDate] = useState(null);
    const [status, setStatus] = useState('');

    const [openDeleteDialogBox, setOpenDeleteDialogBox] = useState(false);
    const [deleteMemberId, setDeleteMemberId] = useState('');


    let busCrew = {};
    const addPanelRef = useRef(null);

    function loadBusCrewTypes() {
        populateBusCrewTypes().then(response => {
            console.log(response);
            setBusCrewTypes(response.data);
        })
    }
    useEffect(() => {
        loadBusCrewTypes();
        loadStaff();
    }, []);

    useEffect(() => {
        if (showAddPanel) {
            addPanelRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [showAddPanel]);
    function showPanelAdd() {

        setShowAddPanel(true);
        setName('');
        setAddress('');
        setEmail('');
        setMobileNo('');
        setNic('');
        setNtcNo('');
        setLicenseNo('');
        setBusCrewType('');
        setDriverLicensePanel(false);




        setStatus('');
        setDob('');
        setExpiryDate(null);
        setIssueDate(null);
        setBusCrewId('');
        if(showAddPanel){

        }
    }

    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }else{
            setProfileImage(defaultProfile);
        }
    }

    function loadStaff() {
        const cookieData = Cookies.get('auth');
        let user ={};
        if (cookieData) {

            let cookie = JSON.parse(cookieData)
            user = {userId :cookie.userId};

        }else{
            console.log("no cookie");

        }
        populateStaffDetails(user).then(response => {
            setBusCrewList(response.data);
        })
    }

    function saveCrewMember() {
        let  selectedBusCrewType;
        if(busCrewType === "driver"){
            selectedBusCrewType= {
                busCrewTypeId: 1,
                description: 'driver'
            }
        }else{
            selectedBusCrewType= {
                busCrewTypeId: 2,
                description: 'conductor'
            }
        }

        const user = {email : email};
        let busOwnerUser = {};
        let busOwner = {};
        const cookieData = Cookies.get('auth');

        if (cookieData) {
            console.log(JSON.parse(cookieData));
            let cookie = JSON.parse(cookieData)

            setBusOwnerId(cookie.userId)
            busOwnerUser = {userId :cookie.userId};
        }else{
            console.log("no cookie");
            busOwnerUser = null;
        }

        busOwner = {
            user:busOwnerUser

        }

        busCrew = {busCrewId, name,address,mobileNo,dob,nic,licenseNo,expiryDate,issueDate,ntcNo,status, busCrewType : selectedBusCrewType, user: user, busOwner:busOwner};


        console.log(busCrew);
        saveStaffMember(busCrew).then((response) => {
            alert(response.data);
            loadStaff();
            setShowAddPanel(false);

        })
    }

    function handleName(e) {
        setName(e.target.value);
    }

    function handleAddress(e) {
        setAddress(e.target.value)
    }


    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handleTel(e) {
        setMobileNo(e.target.value);
    }

    function handleNIC(e) {
        setNic(e.target.value);
    }

    function handleNtcNo(e) {
        setNtcNo(e.target.value);
    }

    function handleJobType(e) {
        setBusCrewType(e.target.value);
        console.log(busCrew);
    }

    function handleLicenseNo(e) {
        setLicenseNo(e.target.value);
    }

    function handleIssueDate(e) {
        setIssueDate(e.target.value);
    }

    function handleExpiryDate(e) {
        setExpiryDate(e.target.value);
    }

    function handleBD(e) {
        setDob(e.target.value);
    }

    function handleStatus(e) {
        setStatus(e.target.value);
        console.log(status);
    }

    function viewStaffMember(selectedMemberId){

        findMemberById(selectedMemberId).then(response => {

            let member = response.data;
            console.log(member);
            setShowAddPanel(true);
            setName(member.name);
            setAddress(member.address);
            setEmail(member.user.email);
            setMobileNo(member.mobileNo);
            setNic(member.nic);
            setNtcNo(member.ntcNo);
            setLicenseNo(member.licenseNo);
            setBusCrewType(member.busCrewType.description);

            if(member.busCrewType.description === 'Driver'){
                setDriverLicensePanel(true);
            }else{
                setDriverLicensePanel(false);
            }

            setStatus(member.status);
            setDob(member.dob);
            setExpiryDate(member.expiryDate);
            setIssueDate(member.issueDate);
            setBusCrewId(member.busCrewId);


        });
    }

    function formatDate(dateStr) {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }

        return `${year}-${month}-${day}`;
    }

    function deleteMemberConfirmation(busCrewId) {
        setOpenDeleteDialogBox(true);
        setDeleteMemberId(busCrewId);
    }

    function deleteStaffMember() {
        setOpenDeleteDialogBox(false);
        deleteMemberById(deleteMemberId).then(response => {

            alert(response.data);
            loadStaff();
        })
    }

    return (
        <div>
            <h1>Staff Management</h1>

            <div className="boarder-style">

                <label style={{padding :"10px"}} htmlFor="nameSearch">Name:</label>
                <input className="form-text-input"  id="nameSearch"/>


                <label style={{padding :"10px"}} htmlFor="type">Type:</label>
                <select className="select" id="type">

                    <option>Please select...</option>
                    {busCrewTypes.map(busCrewType => (
                        <option key={busCrewType.busCrewTypeId}> {busCrewType.description} </option>
                    ))}

                </select>

                <label style={{padding :"10px"}} htmlFor="status">Status:</label>
                <select className="select" id="status">

                    <option>Please select...</option>
                    <option value="current">Current</option>
                    <option value="past">Past</option>

                </select>

                <button type="button" style={{backgroundImage : "linear-gradient(#164863, #164863)", marginLeft:"20px"}}> Search </button>

            </div>



            <div className="boarder-style" style={{marginTop:'30px'}}>
                <table>
                    <thead>
                        <tr>
                            <th>NTC No</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>NIC</th>
                            <th>Mobile No</th>
                            <th>Age</th>
                            <th>Position</th>
                            <th><img className="button-img" src={addImage} title="Add New Crew Member" alt="add" onClick={showPanelAdd}/></th>


                        </tr>
                    </thead>
                    <tbody>
                    {busCrewList.length === 0 ?
                        ( <tr>
                            <td colSpan="7">-- No Data --</td>
                            <td></td>
                        </tr>)
                        :
                        ( busCrewList.map(busCrew => (
                            <tr key={busCrew.busCrewId}>
                                <td>{busCrew.ntcNo}</td>
                                <td>{busCrew.name}</td>
                                <td>{busCrew.address}</td>
                                <td>{busCrew.nic}</td>
                                <td>{busCrew.mobileNo}</td>
                                <td>{busCrew.age}</td>
                                <td>{busCrew.busCrewType.description}</td>
                                <td><img className="button-img" src={deleteStaff} title="Delete Crew Member" alt="delete" onClick={() => deleteMemberConfirmation(busCrew.busCrewId)}/>

                                    <img className="button-img" src={viewStaff} title="View/Update Crew Member" alt="view/update" onClick={() => viewStaffMember(busCrew.busCrewId)}/></td>
                            </tr>
                        )))

                    }

                    </tbody>
                </table>
            </div>

            { showAddPanel && (
                <div className="boarder-style" style={{marginTop:'30px'}} id="addPanel" ref={addPanelRef}>


                        <div style={{display:'flex'}}>

                            <div style={{width:'50%'}}>
                                <input type="hidden" id="busCrewId" value={busCrewId}/>
                                <div className="field-holder">
                                    <input className="form-input" type="text" id="name" required onChange={handleName} value={name}/>
                                    <label className="form-label" htmlFor="name">Name :</label>
                                </div>
                                <div className="field-holder">
                                    <input className="form-input" type="text" id="address" required onChange={handleAddress} value={address}/>
                                    <label className="form-label" htmlFor="address">Address :</label>
                                </div>
                                <div className="field-holder">
                                    <input className="form-input" type="text" id="emailId" required onChange={handleEmail} value={email}/>
                                    <label className="form-label" htmlFor="emailId">Email :</label>
                                </div>

                                <div className="field-holder">
                                    <input className="form-input" type="number" id="tel" inputMode="numeric" required onChange={handleTel} value={mobileNo}/>
                                    <label className="form-label" htmlFor="tel">Mobile No :</label>
                                </div>

                                <div className="field-holder">
                                    <input className="form-input" type="text" id="nic" required onChange={handleNIC} value={nic}/>
                                    <label className="form-label" htmlFor="nic">NIC :</label>
                                </div>

                                <div className="field-holder">
                                    <input className="form-input" type="text" id="ntcNo" required onChange={handleNtcNo} value={ntcNo}/>
                                    <label className="form-label" htmlFor="ntcNo">NTC No :</label>
                                </div>

                                <div className="field-holder" style={{textAlign:'left'}}>


                                    <label style={{paddingBottom:'20px'}}  htmlFor="jobType">Job Type :</label>
                                    <RadioGroup id="jobType" style={{display: "flex",alignItems: 'flex-start', marginLeft:'20px'}} >
                                        <span style={{ padding:'15px'}}>
                                            <input type="radio" name="jobType" value="driver" id="driverLabel" onChange={handleJobType} onClick={() => setDriverLicensePanel(true) } checked={busCrewType === 'driver'}/>
                                            <label htmlFor="driverLabel">Driver</label>
                                            <input type="radio" name="jobType" value="conductor" id="driverLabel" onChange={handleJobType}  onClick={() => setDriverLicensePanel(false)} checked={busCrewType === 'conductor'}/>
                                            <label htmlFor="driverLabel">Conductor</label>
                                        </span>

                                    </RadioGroup>


                                </div>

                                { driverLicenseDetailPanel &&
                                    <div>
                                        <div className="field-holder">
                                            <input className="form-input" type="text" id="licenseNo" required onChange={handleLicenseNo} value={licenseNo}/>
                                            <label className="form-label" htmlFor="licenseNo">License No :</label>
                                        </div>

                                        <div className="field-holder">
                                            <input className="form-input" type="date" id="issueDate" required onChange={handleIssueDate} value={issueDate ? formatDate(issueDate) : ''}/>
                                            <label className="form-label" style={{top:'-25px', fontSize:'0.75rm'}} htmlFor="issueDate">Issue Date :</label>
                                        </div>

                                        <div className="field-holder">
                                            <input className="form-input"  type="date" id="expiryDate" required onChange={handleExpiryDate} value={expiryDate ? formatDate(expiryDate) : ''}/>
                                            <label className="form-label" style={{top:'-25px', fontSize:'0.75rm'}} htmlFor="expiryDate">Expiry Date :</label>
                                        </div>
                                    </div>

                                }
                            </div>

                            <div style={{width:'50%', flex:'1'}}>
                                <div className="field-holder" style={{textAlign:'left'}}>
                                    <label  htmlFor="profileImg">Profile Image : </label>
                                    <input   type="file" id="profileImg" onChange={handleImageChange} />

                                </div>
                                {profileImage && (
                                    <div className="image-preview">
                                        <img src={profileImage} alt="Preview" />
                                    </div>
                                )}

                                <div className="field-holder">
                                    <input className="form-input"  type="date" id="bd" required onChange={handleBD} value={dob ? formatDate(dob) : ''}/>
                                    <label className="form-label" style={{top:'-25px', fontSize:'0.75rm'}} htmlFor="bd">Birth Date :</label>
                                </div>

                                <div className="field-holder" style={{textAlign:'left'}}>


                                    <label style={{paddingBottom:'20px'}}  htmlFor="status">Status :</label>
                                    <RadioGroup id="status" style={{display: "flex",alignItems: 'flex-start', marginLeft:'20px'}} >
                                        <span style={{ padding:'15px'}}>
                                            <input type="radio" name="status" value="present" id="presentLabel" onChange={handleStatus} checked={status === 'present'}/>
                                            <label htmlFor="presentLabel">Present</label>
                                            <input type="radio" name="status" value="past" id="pastLabel" onChange={handleStatus} checked={status === 'past'}/>
                                            <label htmlFor="pastLabel">Past</label>
                                        </span>

                                    </RadioGroup>


                                </div>

                            </div>

                        </div>

                        <div>
                            <span style={{padding:'10px'}}>
                                <button onClick={saveCrewMember}> Submit</button>
                            </span>
                            <span style={{padding:'10px'}}>
                                <button onClick={() => setShowAddPanel(false)}>Cancel</button>
                            </span>

                        </div>


                </div>
            )}

            <Dialog open={openDeleteDialogBox}>
                <DialogTitle>Do you want to delete the selected staff member?</DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button  style={{color:"white"}} onClick={deleteStaffMember}
                             autoFocus>
                        Okay
                    </Button>
                    <Button onClick={() => setOpenDeleteDialogBox(false)}
                          style={{color:"white"}} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}