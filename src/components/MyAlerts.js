import {useEffect, useState} from "react";
import {deleteAlertByAlertId, getAlertsByUserId} from "../services/alertService";
import deleteImg from "../images/deleteAny.png";

export default function MyAlerts({userTypeId,userId}){
    const [alertList,setAlertList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage,setSuccessMessage] = useState('');

    function loadUserCreatedAlerts(userId) {
        getAlertsByUserId(userId).then(response => {
            setAlertList(response.data);
        })
    }

    useEffect(() => {
        loadUserCreatedAlerts(userId);
    }, []);

    function getDateOnly(createdDate) {
        const date = new Date(createdDate);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate;
    }

    function getTimeOnly(createdDate){
        const date = new Date(createdDate);

        const today  = getTodayDate(new Date());
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        const formattedTime = `${hours} : ${minutes}`;
        return formattedTime;
    }

    function getTodayDate(date) {
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

    function get30minAfterCreatedTime(createdDate) {
        const date = new Date(createdDate);

        // Add 30 minutes
        date.setMinutes(date.getMinutes() + 30);

        // Get time in format: HH:mm
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        const formattedTime = `${hours}:${minutes}`;
        return formattedTime;
    }
    function isAlertDeletable(createdDate) {
        const date = new Date(createdDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;


        const today  = getTodayDate(new Date());
        const hours = String(new Date().getHours()).padStart(2, '0');
        const minutes = String(new Date().getMinutes()).padStart(2, '0');

        const formattedTime = `${hours}:${minutes}`;
        const thirtyMinAfterTime = get30minAfterCreatedTime(createdDate);

        if(formattedDate === today && thirtyMinAfterTime > formattedTime){
            return true;
        }else{
            return false;
        }

    }

    function deleteAlert(alertId,createdDate) {

        if(isAlertDeletable(createdDate)){

            deleteAlertByAlertId(alertId).then(response => {
                setSuccessMessage(response.data);
                loadUserCreatedAlerts(userId);

            })
        }else{
            setSuccessMessage('');
            setErrorMessage("Can't delete the alert because time limit exceeds.")
        }

    }

    return (
        <div>
            <h1>My Alerts</h1>

            <h3 style={{color:'darkgreen'}}>{successMessage}</h3>

            <div className="boarder-style" style={{marginTop:'20px',height:'500px',overflow:'auto'}}>
                <label style={{color:'darkred'}}>* You can delete an alert within 30 min from the created time.</label>
                {alertList.length > 0 ? (
                    <>
                        <div className="card-container">
                            {alertList.map((alert, index) => (

                                <div className="card" style={{width:'100%',padding:'5px'}} key={alert.alertId}>

                                    {isAlertDeletable(alert.createdDate) &&
                                        <img
                                            className="alert-card-delete-icon"
                                            src={deleteImg}
                                            alt="Delete" onClick={() => deleteAlert(alert.alertId,alert.createdDate)}

                                        />
                                    }


                                    <div style={{display:'flex',flexDirection:'column',alignItems: 'flex-start',marginLeft:'6%',marginTop:'6px'}}>
                                        {alert.schedule !== null &&
                                            <label style={{fontStyle:'italic'}}>{alert.schedule.origin} - {alert.schedule.destination} | {alert.schedule.bus.busOwner.travelServiceName} | {alert.schedule.bus.plateNo} | {alert.schedule.tripStartTime} - {alert.schedule.tripEndTime}</label>
                                        }
                                        <h2>{alert.alertType.description}</h2>

                                        <label>{alert.reason}</label>
                                    </div>


                                    <div style={{display:'flex',flexDirection:'row'}}>
                                        <p style={{width:'30%'}}><span style={{color:'darkblue',fontWeight:'bold'}}>Date : </span> {getDateOnly(alert.createdDate)}</p>
                                        <p style={{width:'30%'}}><span style={{color:'darkblue',fontWeight:'bold'}}>Time : </span>{getTimeOnly(alert.createdDate)}</p>
                                        <p style={{width:'30%'}}><span style={{color:'darkblue',fontWeight:'bold'}}>Created By : </span>{alert.createdBy.userName}</p>
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
    )

}