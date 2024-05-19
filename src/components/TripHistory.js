import {useEffect, useState} from "react";
import {findScheduleByCrewUserId, findScheduleByCrewUserIdDate} from "../services/staffService";
import viewPassengersImg from "../images/seatSet.png";

export default function TripHistory({userId,userTypeId}){
    const [scheduleList, setScheduleList] = useState([]);
    const [searchDate, setSearchDate] = useState(null);
    const [errorMessage,setErrorMessage] = useState('');

    function formatDate(searchDate) {
        const date = new Date(searchDate);
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate()+1;

        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }

        return `${year}-${month}-${day}`;
    }

    function handleSearchDate(e) {
        setSearchDate(e.target.value);
    }

    function searchBusSchedule() {

        if(searchDate == null){
            setErrorMessage("Select date.")
        }else{
            findScheduleByCrewUserIdDate(userId,userTypeId,searchDate).then(response => {
                console.log(response.data);
                setScheduleList(response.data);
                setErrorMessage('');
            });
        }


    }

    return (

        <div>
            <h1>Schedule History</h1>

            <div className="boarder-style">
                <p style={{color:'red'}}>{errorMessage}</p>
                <label style={{padding :"10px"}} htmlFor="dateSearch">Trip Date:</label>
                <input className="form-text-input" type="date"  id="dateSearch" onChange={handleSearchDate} value={searchDate ? formatDate(searchDate) : ''}/>

                <button type="button" style={{backgroundImage : "linear-gradient(#164863, #164863)", marginLeft:"20px"}} onClick={searchBusSchedule}> Search </button>


            </div>

            {scheduleList.length > 0 ?
                <>
                    <div>
                        {scheduleList.map((schedule,index) => (
                            <div style={{width:'100%', border:'1px solid',borderRadius:'3px', padding:'10px', marginTop:'10px'}}>
                                <div style={{display:"flex", justifyContent:'space-between'}}>
                                    <div style={{flex:'1'}}>
                                        <h3 style={{textAlign:'left', marginLeft:'5%'}}>{schedule.schedule.origin} To {schedule.schedule.destination}</h3>
                                    </div>
                                    <div style={{flex:1}}>
                                        <h4 style={{textAlign:'right',marginRight:'5%',color:'darkred'}}>{schedule.isCancelled ? 'Cancelled' : 'Available'}</h4>
                                    </div>

                                </div>
                                <div style={{display:"flex", justifyContent:'space-between'}}>
                                    <div style={{flex:'1'}}>
                                        <label style={{fontWeight:'bold'}}>Start : </label>{schedule.schedule.tripStartTime}
                                    </div>
                                    <div style={{flex:'1'}}>
                                        <label style={{fontWeight:'bold'}}>End : </label>{schedule.schedule.tripEndTime}
                                    </div>
                                    <div style={{flex:'1'}}>

                                    </div>

                                </div>
                                <div style={{display:"flex", justifyContent:'space-between',marginTop:'10px',marginBottom:'10px'}}>
                                    <div style={{flex:'1'}}>
                                        <label style={{fontWeight:'bold'}}>Conductor : </label>{schedule.conductorName}
                                    </div>
                                    <div style={{flex:'1'}}>
                                        <label style={{fontWeight:'bold'}}>Driver : </label>{schedule.driverName}
                                    </div>
                                    <div style={{flex:'1'}}>
                                        <label style={{fontWeight:'bold'}}>Bus No : </label>{schedule.schedule.bus.plateNo}
                                    </div>

                                </div>
                                <div style={{display:"flex", justifyContent:'space-between',marginTop:'10px',marginBottom:'10px'}}>
                                    <div style={{flex:'1'}}>
                                        <label style={{fontSize: '25px',fontWeight:'bold'}}>Reservations : {schedule.availableSeats}</label>
                                        <img className="button-img" style={{height:'50px',width:'50px',padding:'5px'}} src={viewPassengersImg} title="View Passenger List"/>
                                    </div>
                                </div>

                            </div>
                        ))}

                    </div>
                </>
                :
                <>
                    <div style={{marginTop:'20px'}}>
                        No records available
                    </div>
                </>}
        </div>
    )
}