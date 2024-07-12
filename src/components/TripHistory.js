import {useEffect, useState} from "react";
import {findScheduleByCrewUserId, findScheduleByCrewUserIdDate} from "../services/staffService";
import viewPassengersImg from "../images/seatSet.png";
import {findReservedSeatsByScheduleId} from "../services/reservationService";

export default function TripHistory({userId,userTypeId}){
    const [scheduleList, setScheduleList] = useState([]);
    const [searchDate, setSearchDate] = useState(null);
    const [errorMessage,setErrorMessage] = useState('');

    const [activeScheduleId, setActiveScheduleId] = useState(null);
    const [bookedSeatList,setBookedSeatList] = useState([]);

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

    function loadPassengerList(scheduleId) {
        setActiveScheduleId(scheduleId);
        findReservedSeatsByScheduleId(scheduleId).then(response => {
            setBookedSeatList(response.data)
        })
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

                                        {schedule.schedule.started && !schedule.schedule.end &&
                                            <>
                                                <label style={{marginRight:'5%', padding:'5px',backgroundColor: 'Green'}} >Started</label>

                                            </>

                                        }

                                        {schedule.schedule.end &&
                                            <>

                                                <label style={{marginRight:'5%', padding:'5px',backgroundColor:'Red'}}>Ended</label>

                                            </>

                                        }
                                        <label style={{textAlign:'right',marginRight:'5%',color:'darkred',fontWeight:'bold'}}>{schedule.isCancelled ? 'Cancelled' : 'Available'}</label>
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
                                        <img className="button-img" style={{height:'50px',width:'50px',padding:'5px'}} src={viewPassengersImg} title="View Passenger List" onClick={() => loadPassengerList(schedule.schedule.scheduleId)}/>
                                    </div>
                                </div>


                                {activeScheduleId === schedule.schedule.scheduleId &&
                                    <div>
                                        <h4> Available reservations</h4>

                                        <table>
                                            <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>NIC</th>
                                                <th>Mobile No</th>
                                                <th>Pickup Point</th>
                                                <th>Drop Point</th>
                                                <th>Seat (Row - Col)</th>
                                            </tr>
                                            </thead>

                                            <tbody>

                                                {bookedSeatList.length > 0 ?
                                                    <>
                                                        {bookedSeatList.map((seatReserve,index) => (
                                                            <tr>
                                                                <td>{index+1}</td>
                                                                <td>{seatReserve.reservation.passenger.nic}</td>
                                                                <td>{seatReserve.reservation.passenger.mobileNo}</td>
                                                                <td>{seatReserve.reservation.boardingPoint}</td>
                                                                <td>{seatReserve.reservation.droppingPoint}</td>
                                                                <td>{seatReserve.seat.rowNo} - {seatReserve.seat.columnNo}</td>
                                                            </tr>
                                                        ))}

                                                    </>
                                                    :
                                                    <>
                                                        <td colSpan="6">-- No Reservations --</td>
                                                    </>}

                                            </tbody>
                                        </table>


                                    </div>
                                }

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