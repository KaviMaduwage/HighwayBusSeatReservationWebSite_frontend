import {useEffect, useState} from "react";
import viewPassengersImg from "../../images/seatSet.png";
import {findScheduleByCrewUserId} from "../../services/staffService";
export default function TodayTrip({userId}){
    const [todayScheduleList, setTodayScheduleList] = useState([]);

    useEffect(() => {
        findScheduleByCrewUserId(userId).then(response => {
            console.log(response.data);
            setTodayScheduleList(response.data);
        })
    }, []);

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
                <div>
                    You don't have assigned trip today.
                </div>
            </>}
        </div>
    )
}