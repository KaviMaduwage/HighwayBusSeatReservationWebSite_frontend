import {useEffect, useRef, useState} from "react";
import {
    deleteMemberById,
    findMemberById,
    populateBusCrewTypes,
    populateStaffDetails,
    saveStaffMember, searchStaff, uploadImage
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
    const [profileImage, setProfileImage] = useState('');
    const [profileImagePath, setProfileImagePath] = useState(defaultProfile);
    const [errorDataMsg, setErrorDataMsg] = useState('');

    const [name, setName] = useState('');
    const [searchName, setSearchName] = useState('');
    const [searchCrewType, setSearchCrewType] = useState('');
    const [searchStatus, setSearchStatus] = useState('');
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
        setProfileImagePath(defaultProfile);




        setStatus('');
        setDob('');
        setExpiryDate(null);
        setIssueDate(null);
        setBusCrewId('');
        setErrorDataMsg('');
        if(showAddPanel){

        }
    }

    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImagePath(reader.result);
            };
            reader.readAsDataURL(file);
            setProfileImage(file);
        }else{
            setProfileImagePath(defaultProfile);
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
        console.log("busCrewType"+issueDate);
        let  selectedBusCrewType;
        let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
        let mobileNoRegex = /^\d*$/;

        if(name.trim() === "" || address.trim()==="" || email.trim()==="" || mobileNo.trim() ===""|| nic.trim() === ""|| busCrewType ==="" ||
            (busCrewType === "Driver" && (licenseNo.trim() === "" || (issueDate ==="" || issueDate === null) || (expiryDate==="" || expiryDate===null))) || dob ==="" || status.trim() === ""){
            setErrorDataMsg("Please fill all the mandatory data marked in asterisk(*) mark.");
        }else if(!emailRegex.test(email)){
            setErrorDataMsg("Please enter valid email address.");
        }else if(!mobileNoRegex.test(mobileNo) || (mobileNo.length < 10 || mobileNo.length>10)){
            setErrorDataMsg("Please enter 10 digits mobile no.");
        }else if(new Date(issueDate) > new Date(expiryDate)){
            setErrorDataMsg("Expiry date should be greater than the issue date.");
        }else if(new Date(dob) >= new Date()){
            setErrorDataMsg("Date of birth should be a past date.");
        } else{
            if(busCrewType === "Driver"){
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

            busCrew = {busCrewId, name,address,mobileNo,dob,nic,licenseNo,expiryDate,issuesDate: issueDate,ntcNo,status, busCrewType : selectedBusCrewType, user: user, busOwner:busOwner};



            const formData = new FormData();
            formData.append('file',profileImage);
            formData.append('busCrew',JSON.stringify(busCrew));

            saveStaffMember(formData).then((response) => {
                alert(response.data);
                loadStaff();
                setShowAddPanel(false);

            });

        }

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
        console.log(e.target.value);
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
            setErrorDataMsg('');
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
            setIssueDate(member.issuesDate);
            setBusCrewId(member.busCrewId);


        });
    }

    function formatDate(dateStr) {

        const date = new Date(dateStr);
        date.setDate(date.getDate() + 1);
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

    function searchStaffMember() {
        let crewTypeId = 0;
        if(searchCrewType === "Driver"){
            crewTypeId = 1;
        }else if(searchCrewType === "Conductor"){
            crewTypeId = 2;
        }

        const cookieData = Cookies.get('auth');
        let userId =0;
        if (cookieData) {

            let cookie = JSON.parse(cookieData)
            userId = cookie.userId;

        }else{
            console.log("no cookie");

        }
        searchStaff(searchName, crewTypeId, searchStatus,userId).then(response => {
            setBusCrewList(response.data);
        })

    }

    function handleSearchName(e) {
        setSearchName(e.target.value);
    }

    function handleSearchCrewType(e) {
        setSearchCrewType(e.target.value);
    }

    function handleSearchStatus(e) {
        setSearchStatus(e.target.value);
    }

    return (
        <div>
            <h1>Staff Management</h1>

            <div className="boarder-style">

                <label style={{padding :"10px"}} htmlFor="nameSearch">Name:</label>
                <input className="form-text-input"  id="nameSearch" onChange={handleSearchName} value={searchName}/>


                <label style={{padding :"10px"}} htmlFor="type">Type:</label>
                <select className="select" id="type" onChange={handleSearchCrewType} value={searchCrewType}>

                    <option>Please select...</option>
                    {busCrewTypes.map(busCrewType => (
                        <option key={busCrewType.busCrewTypeId}> {busCrewType.description} </option>
                    ))}

                </select>

                <label style={{padding :"10px"}} htmlFor="status">Status:</label>
                <select className="select" id="status" onChange={handleSearchStatus} value={searchStatus}>

                    <option value="">Please select...</option>
                    <option value="present">Present</option>
                    <option value="past">Past</option>

                </select>

                <button type="button" style={{backgroundImage : "linear-gradient(#164863, #164863)", marginLeft:"20px"}} onClick={searchStaffMember}> Search </button>

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
                        <p style={{color:'red'}}>{errorDataMsg}</p>

                        <div style={{display:'flex'}}>

                            <div style={{width:'50%'}}>
                                <input type="hidden" id="busCrewId" value={busCrewId}/>
                                <div className="field-holder">
                                    <input className="form-input" type="text" id="name" required onChange={handleName} value={name}/>
                                    <label className="form-label" htmlFor="name"><span style={{color:'red'}}> *</span> Name :</label>
                                </div>
                                <div className="field-holder">
                                    <input className="form-input" type="text" id="address" required onChange={handleAddress} value={address}/>
                                    <label className="form-label" htmlFor="address"><span style={{color:'red'}}> *</span> Address :</label>
                                </div>
                                <div className="field-holder">
                                    <input className="form-input" type="text" id="emailId" required onChange={handleEmail} value={email}/>
                                    <label className="form-label" htmlFor="emailId"><span style={{color:'red'}}> *</span> Email :</label>
                                </div>

                                <div className="field-holder">
                                    <input className="form-input" type="number" id="tel" inputMode="numeric" required onChange={handleTel} value={mobileNo}/>
                                    <label className="form-label" htmlFor="tel"><span style={{color:'red'}}> *</span> Mobile No :</label>
                                </div>

                                <div className="field-holder">
                                    <input className="form-input" type="text" id="nic" required onChange={handleNIC} value={nic}/>
                                    <label className="form-label" htmlFor="nic"><span style={{color:'red'}}> *</span> NIC :</label>
                                </div>

                                <div className="field-holder">
                                    <input className="form-input" type="text" id="ntcNo" required onChange={handleNtcNo} value={ntcNo}/>
                                    <label className="form-label" htmlFor="ntcNo">NTC No :</label>
                                </div>

                            </div>

                            <div style={{width:'50%', flex:'1'}}>
                                <div style={{display:'none'}}>

                                    <div className="field-holder" style={{textAlign:'left'}}>
                                        <label  htmlFor="profileImg">Profile Image : </label>
                                        <input   type="file" id="profileImg" onChange={handleImageChange} accept="image/png,image/jpeg"/>

                                    </div>
                                    {profileImagePath && (
                                        <div className="image-preview">
                                            <img src={profileImagePath} alt="Preview" />
                                        </div>
                                    )}
                                </div>

                                <div className="field-holder" style={{textAlign:'left'}}>


                                    <label style={{paddingBottom:'20px'}}  htmlFor="jobType"><span style={{color:'red'}}> *</span> Job Type :</label>
                                    <RadioGroup id="jobType" style={{display: "flex",alignItems: 'flex-start', marginLeft:'20px'}} >
                                        <span style={{ padding:'15px'}}>
                                            <input type="radio" name="jobType" value="Driver" id="driverLabel" onChange={handleJobType} onClick={() => setDriverLicensePanel(true) } checked={busCrewType === 'Driver'}/>
                                            <label htmlFor="driverLabel">Driver</label>
                                            <input type="radio" name="jobType" value="Conductor" id="driverLabel" onChange={handleJobType}  onClick={() => setDriverLicensePanel(false)} checked={busCrewType === 'Conductor'}/>
                                            <label htmlFor="driverLabel">Conductor</label>
                                        </span>

                                    </RadioGroup>


                                </div>

                                { driverLicenseDetailPanel &&
                                    <div>
                                        <div className="field-holder">
                                            <input className="form-input" type="text" id="licenseNo" required onChange={handleLicenseNo} value={licenseNo}/>
                                            <label className="form-label" htmlFor="licenseNo"><span style={{color:'red'}}> *</span> License No :</label>
                                        </div>

                                        <div className="field-holder">
                                            <input className="form-input" type="date" id="issueDate" required onChange={handleIssueDate} value={issueDate ? formatDate(issueDate) : ''}/>
                                            <label className="form-label" style={{top:'-25px', fontSize:'0.75rm'}} htmlFor="issueDate"><span style={{color:'red'}}> *</span> Issue Date :</label>
                                        </div>

                                        <div className="field-holder">
                                            <input className="form-input"  type="date" id="expiryDate" required onChange={handleExpiryDate} value={expiryDate ? formatDate(expiryDate) : ''}/>
                                            <label className="form-label" style={{top:'-25px', fontSize:'0.75rm'}} htmlFor="expiryDate"><span style={{color:'red'}}> *</span> Expiry Date :</label>
                                        </div>
                                    </div>

                                }

                                <div className="field-holder">
                                    <input className="form-input"  type="date" id="bd" required onChange={handleBD} value={dob ? formatDate(dob) : ''}/>
                                    <label className="form-label" style={{top:'-25px', fontSize:'0.75rm'}} htmlFor="bd"><span style={{color:'red'}}> *</span> Birth Date :</label>
                                </div>

                                <div className="field-holder" style={{textAlign:'left'}}>


                                    <label style={{paddingBottom:'20px'}}  htmlFor="status"><span style={{color:'red'}}> *</span> Status :</label>
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