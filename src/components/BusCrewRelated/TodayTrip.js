import {useEffect, useState} from "react";
import viewPassengersImg from "../../images/seatSet.png";
import {findScheduleByCrewUserId} from "../../services/staffService";
import {findReservedSeatsByScheduleId} from "../../services/reservationService";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {updateTripEnding, updateTripStart} from "../../services/scheduleService";
export default function TodayTrip({userId}){
    const [todayScheduleList, setTodayScheduleList] = useState([]);
    const [showPassengerList,setShowPassengerList] = useState(false);
    const [activeScheduleId, setActiveScheduleId] = useState(null);
    const [bookedSeatList,setBookedSeatList] = useState([]);

    const [confirmTripStartDialogBox,setConfirmTripStartDialogBox] = useState(false);
    const [startTripId, setStartTripId] = useState(null);

    const [confirmTripEndDialogBox,setConfirmTripEndDialogBox] = useState(false);
    const [endTripId, setEndTripId] = useState(null);

    function loadTodaySchedule() {
        findScheduleByCrewUserId(userId).then(response => {
            console.log(response.data);
            setTodayScheduleList(response.data);
        })
    }

    useEffect(() => {
        loadTodaySchedule();
    }, []);

    function loadPassengerList(scheduleId) {
        setActiveScheduleId(scheduleId);
        findReservedSeatsByScheduleId(scheduleId).then(response => {
            setBookedSeatList(response.data)
        })
    }

    function confirmTripStart(scheduleId) {
        setStartTripId(scheduleId);
        setConfirmTripStartDialogBox(true);
    }

    function startTheTrip() {
        updateTripStart(startTripId).then(response => {
            setConfirmTripStartDialogBox(false);
            loadTodaySchedule();
        })

    }

    function confirmTripEnd(scheduleId) {
        setEndTripId(scheduleId);
        setConfirmTripEndDialogBox(true);
    }

    function endTheTrip() {
        updateTripEnding(endTripId).then(response => {
            setConfirmTripEndDialogBox(false);
            loadTodaySchedule();
        })
    }

    return (
        <div>
            <h1>Today's Schedule</h1>

            {todayScheduleList.length > 0 ?
            <>
                <div>
                    {todayScheduleList.map((schedule,index) => (
                        <div style={{width:'100%', border:'1px solid',borderRadius:'3px', padding:'10px', marginTop:'10px'}}>
                            <div style={{display:"flex", justifyContent:'space-between'}}>
                                <div style={{flex:'1'}}>
                                    <h3 style={{textAlign:'left', marginLeft:'5%'}}>{schedule.schedule.origin} To {schedule.schedule.destination}</h3>
                                </div>
                                <div style={{flex:1}}>
                                    {!schedule.schedule.started &&
                                        <input style={{marginRight:'5%', padding:'5px'}} type="button" value="Start" onClick={() => confirmTripStart(schedule.schedule.scheduleId)}/>

                                    }
                                    {schedule.schedule.started && !schedule.schedule.end &&
                                        <>
                                            <input style={{marginRight:'5%', padding:'5px',backgroundColor: 'Green'}} type="button" value="Started"/>
                                            <input style={{marginRight:'5%', padding:'5px'}} type="button" value="End" onClick={() => confirmTripEnd(schedule.schedule.scheduleId)}/>

                                        </>

                                    }

                                    {schedule.schedule.end &&
                                        <>

                                            <input style={{marginRight:'5%', padding:'5px',backgroundColor:'Red'}} type="button" value="Ended"/>

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
                                    <img className="button-img" style={{height:'50px',width:'50px',padding:'5px'}} src={viewPassengersImg} title="View Passenger List"
                                    onClick={() => loadPassengerList(schedule.schedule.scheduleId)}/>
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
                                    <tr>
                                        {bookedSeatList.length > 0 ?
                                        <>
                                            {bookedSeatList.map((seatReserve,index) => (
                                                <>
                                                    <td>{index+1}</td>
                                                    <td>{seatReserve.reservation.passenger.nic}</td>
                                                    <td>{seatReserve.reservation.passenger.mobileNo}</td>
                                                    <td>{seatReserve.reservation.boardingPoint}</td>
                                                    <td>{seatReserve.reservation.droppingPoint}</td>
                                                    <td>{seatReserve.seat.rowNo} - {seatReserve.seat.columnNo}</td>
                                                </>
                                            ))}

                                        </>
                                        :
                                        <>
                                            <td colSpan="6">-- No Reservations --</td>
                                        </>}
                                    </tr>
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
                <div>
                    You don't have assigned trip today.
                </div>
            </>}


            <Dialog open={confirmTripStartDialogBox}>
                <DialogTitle>Are you sure you want to start the trip? </DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button  style={{color:"white"}} onClick={startTheTrip}
                             autoFocus>
                        Okay
                    </Button>
                    <Button onClick={() => setConfirmTripStartDialogBox(false)}
                            style={{color:"white"}} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={confirmTripEndDialogBox}>
                <DialogTitle>Are you sure you want to end the trip? </DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button  style={{color:"white"}} onClick={endTheTrip}
                             autoFocus>
                        Okay
                    </Button>
                    <Button onClick={() => setConfirmTripEndDialogBox(false)}
                            style={{color:"white"}} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}