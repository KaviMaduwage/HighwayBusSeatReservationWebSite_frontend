import {useEffect, useState} from "react";
import {createAlert, getAlertTypeList, getAllAlerts, getPassengerCurrentSchedule} from "../services/alertService";
import {RadioGroup} from "@mui/material";
import deleteImg from "../images/deleteAny.png";

export default function EmergencyAlerts({userTypeId,userId}){

    const [alertTypeList,setAlertTypeList] = useState([]);
    const [alertTypeId,setAlertTypeId] = useState('');
    const [reason,setReason] = useState('');
    const [notifyType, setNotifyType] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage,setSuccessMessage] = useState('');
    const [currentSchedule,setCurrentSchedule] = useState(null);

    const [alertList,setAlertList] = useState([]);


    function loadPassengerCurrentSchedule() {
        getPassengerCurrentSchedule(userTypeId,userId).then(response => {
            let schedule = response.data;
            if(schedule.scheduleId !== 0){
                setCurrentSchedule(response.data);
            }

        });
    }

    useEffect(() => {
        loadAlertTypes();
        loadAlerts();
        if(userTypeId === 3 || userTypeId === 4 || userTypeId === 5){
            loadPassengerCurrentSchedule(userTypeId,userId);
        }
    }, []);

    function loadAlerts() {
        getAllAlerts(userTypeId).then(response => {
                setAlertList(response.data);
        });
    }

    function loadAlertTypes() {
        getAlertTypeList().then(response => {
            setAlertTypeList(response.data);
        })
    }

    function sendAlert() {

        if((alertTypeId === '' ||alertTypeId === "0") && reason === ''){
            setErrorMessage('Please fill at least either alert type or reason');
        }else{
            let forAll = false;
            let forAdmin = true;
            let forTravelService = false;

            if(notifyType === 'all'){
                forAll = true;
            }else if(notifyType === 'travelService'){
                forTravelService = true;
            }

            let alert = {alertType : {alertTypeId},reason,forAll,forAdmin,forTravelService,createdBy:{userId}, schedule :{scheduleId: currentSchedule.scheduleId}};
            createAlert(alert).then(response => {
                    setSuccessMessage(response.data);
                    setErrorMessage('');
                    setReason('');
                    setAlertTypeId('');
                    setNotifyType('');
                    loadAlerts();
            })
        }
    }

    function handleAlertType(e) {
        setAlertTypeId(e.target.value);
    }

    function handleReason(e) {
        setReason(e.target.value);
    }

    function handleNotifyType(e) {
        setNotifyType(e.target.value);
    }

    function getDateOnly(createdDate) {
        const date = new Date(createdDate);
        // Get date in format: YYYY-MM-DD
        const formattedDate = date.toISOString().split('T')[0];

        return formattedDate;
    }

    function getTimeOnly(createdDate){
        const date = new Date(createdDate);

        // Get time in format: HH:mm:ss
        const formattedTime = date.toLocaleTimeString('en-GB', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).replace(/:/g, '.');
        return formattedTime;
    }
    return (
        <div>
            <h1>Emergency Alerts</h1>
            <h4 style={{color:'red'}}>{errorMessage}</h4>
            <h4 style={{color:'green'}}>{successMessage}</h4>

            {currentSchedule !== null &&
                <>
                    <h3>Travelling From {currentSchedule.origin} To {currentSchedule.destination}</h3>
                </>
            }
            <div className="boarder-style" style={{display:'flex',flexDirection:'row'}}>
                <div style={{display:'flex',flexDirection:'column',width:'25%'}}>

                    <label style={{marginBottom:'7px',fontWeight:'bold'}}>Alert Type:</label>
                    <select className="select" id="alertTypeId" onChange={handleAlertType} value={alertTypeId}>
                        <option value="0">Please select ...</option>
                        {alertTypeList.map((alertType) => (
                            <option key={alertType.alertTypeId} value={alertType.alertTypeId}>{alertType.description}</option>
                        ))}
                    </select>
                </div>

                <div style={{display:'flex',flexDirection:'column',width:'45%'}}>
                    <label style={{marginBottom:'7px',fontWeight:'bold'}}>Reason:</label>
                    <textarea className="form-text-input" style={{width:'90%',height:'100px'}} maxLength="150" onChange={handleReason} value={reason}>

                    </textarea>
                </div>
                <div style={{width:'20%'}}>
                    <label style={{marginBottom:'7px',fontWeight:'bold'}}>Notify:</label>

                        <div style={{display: "flex",alignItems: 'flex-start', marginLeft:'20px'}}><span style={{marginBottom:'10px'}}>
                                <input type="checkbox" name="notifyTypeAdmin" id="forAdmin" value="admin" onChange={handleNotifyType} checked disabled/>
                                <label style={{marginLeft:'10px'}} htmlFor="forAdmin">Admin</label>
                            </span>
                        </div>
                        <RadioGroup id="notifyType" style={{display: "flex",alignItems: 'flex-start', marginLeft:'20px'}} >
                            <span style={{marginBottom:'10px'}}>
                                <input type="radio" name="notifyType" id="forAll" value="all" onChange={handleNotifyType} checked={notifyType === 'all'}/>
                                <label style={{marginLeft:'10px'}} htmlFor="forAll">All</label>
                            </span>

                            <span style={{marginBottom:'10px'}}>
                                <input type="radio" name="notifyType" id="forTravelService" value="travelService" onChange={handleNotifyType} checked={notifyType === 'travelService'}/>
                                <label style={{marginLeft:'10px'}} htmlFor="forTravelService">Travel Service</label>
                            </span>

                        </RadioGroup>


                </div>
                <div style={{width:'10%', marginTop:'30px'}}>
                    <button onClick={sendAlert} disabled={currentSchedule !== null ? false : true}>Send</button>
                </div>
            </div>


            <div className="boarder-style" style={{marginTop:'20px',height:'500px',overflow:'auto'}}>
                {alertList.length > 0 ? (
                    <>
                        <div className="card-container">
                            {alertList.map((alert, index) => (

                                <div className="card" style={{width:'100%',padding:'5px'}} key={alert.alertId}>

                                    <div style={{display:'flex',flexDirection:'column',alignItems: 'flex-start',marginLeft:'6%',marginTop:'6px'}}>
                                        {alert.schedule !== null &&
                                            <label style={{fontStyle:'italic'}}>{alert.schedule.origin} - {alert.schedule.destination} | {alert.schedule.bus.busOwner.travelServiceName} | {alert.schedule.bus.plateNo} | {alert.schedule.tripStartTime} - {alert.schedule.tripEndTime}</label>
                                        }
                                        <h2>{alert.alertType.description}</h2>

                                        <label>{alert.reason}</label>
                                    </div>


                                    <div style={{display:'flex',flexDirection:'row'}}>
                                        <p style={{width:'30%'}}><span style={{color:'darkblue',fontWeight:'bold'}}>Date :</span> {getDateOnly(alert.createdDate)}</p>
                                        <p style={{width:'30%'}}><span style={{color:'darkblue',fontWeight:'bold'}}>Time :</span>{getTimeOnly(alert.createdDate)}</p>
                                        <p style={{width:'30%'}}><span style={{color:'darkblue',fontWeight:'bold'}}>Created By :</span>{alert.createdBy.userName}</p>
                                    </div>


                                </div>
                            ))}

                        </div>


                    </>


                ) : (
                    <div>
                        <h3>No Alerts for past 10 days.</h3>
                    </div>
                )}
            </div>
        </div>
    );
}