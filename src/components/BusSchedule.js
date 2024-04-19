import {useEffect, useRef, useState} from "react";
import citiesData from "../data/cities.json";
import {getAllRoutes} from "../services/routeService";
import addImage from "../images/addItem.png";
import deleteScheduleImg from "../images/deleteSchedule.png";
import viewSchedule from "../images/updateSchedule.png";
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import ReactDatetimeClass from "react-datetime";
import {
    loadAllBusDetails,
    loadAllBusDetailsInTravelService,
    loadConductorsInTravelService,
    loadDriversInTravelService
} from "../services/busService";
import {
    findBusScheduleByDateTownAndRoute, findScheduleById,
    loadScheduleByDate,
    saveSchedule
} from "../services/scheduleService";

export default function BusSchedule({userTypeId,userId}){
    const [searchDate, setSearchDate] = useState();
    const [cities, setCities] = useState([]);
    const [searchOrigin, setSearchOrigin] = useState('');
    const [searchDestination, setSearchDestination] = useState('');
    const [routeList, setRouteList] = useState([]);
    const [searchRouteId, setSearchRouteId] = useState('');
    const [showAddPanel, setShowAddPanel] = useState(false);
    const [scheduleList, setScheduleList] = useState([]);
    const addPanelRef = useRef(null);
    const [inputDestination, setInputDestination] = useState('');
    const [inputOrigin, setInputOrigin] = useState('');

    const initialEndingTime = new Date();
    initialEndingTime.setHours(10, 0, 0, 0);

    const [inputStartingTime, setInputStartingTime] = useState(null);
    const [inputEndingTime, setInputEndingTime] = useState(null);
    const [busId,setBusId] = useState('');
    const [busList, setBusList] = useState([]);
    const [driverList, setDriverList] = useState([]);
    const [conductorList, setConductorList] = useState([]);
    const [driverId, setDriverId] = useState('');
    const [conductorId,setConductorId] = useState('');
    const [price, setPrice] = useState('');
    const [responseMessage,setResponseMessage] = useState('');
    const [scheduleId, setScheduleId] = useState('');

    const [dateInput, setDateInput] = useState(null);

    useEffect(() => {
        if (showAddPanel) {
            addPanelRef.current.scrollIntoView({ behavior: 'smooth' });
        }

        if(userTypeId === 1){
            loadAllBusDetails().then(response => {
                setBusList(response.data);
            });


        }else if(userTypeId === 2){
            loadAllBusDetailsInTravelService(userId).then(response => {
                setBusList(response.data);
            });
            loadDriversInTravelService(userId).then(response => {
                setDriverList(response.data);

            });

            loadConductorsInTravelService(userId).then(response => {
                setConductorList(response.data);

            })
        }

    }, [showAddPanel]);


    function loadScheduleList(date) {
        loadScheduleByDate(date).then(response => {
            setScheduleList(response.data);
        })
    }



    useEffect(() => {
        setCities(citiesData);

        getAllRoutes().then(response => {
            setRouteList(response.data);
        });
        console.log(new Date());
        loadScheduleList(getTodayDate(new Date()));


    }, []);
    function searchBusSchedule() {
        findBusScheduleByDateTownAndRoute(searchDate,searchOrigin,searchDestination,searchRouteId).then(response => {
            setScheduleList(response.data);
        })

    }

    function handleSearchDate(e) {
        setSearchDate(e.target.value);
    }

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

    function handleSearchOrigin(e) {
        setSearchOrigin(e.target.value);
        setInputOrigin(e.target.value);
    }

    function handleSearchDestination(e) {
        setSearchDestination(e.target.value);
        setInputDestination(e.target.value);
    }

    function handleRouteId(e) {
        setSearchRouteId(e.target.value);
    }

    function showPanelAdd() {
        setShowAddPanel(true);
        setDateInput(null);
        setScheduleId('');
        setInputOrigin('');
        setInputDestination('');
        setInputStartingTime(null);
        setInputEndingTime(null);
        setBusId('');
        setDriverId('');
        setConductorId('');
        setPrice('');
    }

    function handleInputDate(e) {
        setDateInput(e.target.value);
    }

    function handleInputDestination(e) {
        setInputDestination(e.target.value);
    }

    function handleInputOrigin(e) {
        setInputOrigin(e.target.value);
    }

    function handleStartingTime(selectedTime) {

        const formattedTime = selectedTime.format('hh:mm A');
        setInputStartingTime(formattedTime);
    }

    function handleEndTime(selectedTime) {
        const formattedTime = selectedTime.format('hh:mm A');
        setInputEndingTime(formattedTime);

    }

    function handleBusId(e) {
        setBusId(e.target.value);
    }

    function handleDriverId(e) {
        setDriverId(e.target.value);
    }

    function handleConductorId(e) {
        setConductorId(e.target.value);
    }

    function handlePrice(e) {
        setPrice(e.target.value);
    }

    function scheduleTrip() {

        const bus ={busId:busId};
        const schedule = {scheduleId:scheduleId,tripDateStr:dateInput,origin:inputOrigin,destination:inputDestination,tripStartTime:inputStartingTime,
            tripEndTime:inputEndingTime, ticketPrice:price, bus:bus};

        saveSchedule(schedule, driverId,conductorId).then(response => {
            setResponseMessage(response.data);
            setShowAddPanel(false);

            loadScheduleList(formatDate(dateInput));
        })
    }

    function updateSchedule(scheduleId) {
        findScheduleById(scheduleId).then(response => {
            let schedule = response.data;
            setShowAddPanel(true);
            setScheduleId(schedule.schedule.scheduleId);
            setDateInput(schedule.schedule.tripDateStr);
            setInputOrigin(schedule.schedule.origin);
            setInputDestination(schedule.schedule.destination);
            setInputStartingTime(schedule.schedule.tripStartTime);
            setInputEndingTime(schedule.schedule.tripEndTime);
            setBusId(schedule.schedule.bus.busId);
            setDriverId(schedule.driverId);
            setConductorId(schedule.conductorId);
            setPrice(schedule.schedule.ticketPrice);
        });
        
    }

    function deleteSchedule(scheduleId) {

    }

    function cancelSchedule(scheduleId) {
        return undefined;
    }

    return (
        <div>
            <h1>Bus Schedule</h1>

            <p>{responseMessage}</p>

            <div className="boarder-style">

                <label style={{padding :"10px"}} htmlFor="dateSearch">Trip Date:</label>
                <input className="form-text-input" type="date"  id="dateSearch" onChange={handleSearchDate} value={searchDate ? formatDate(searchDate) : ''}/>


                <label style={{padding :"10px"}} htmlFor="type">Origin:</label>
                <select className="select" id="type" onChange={handleSearchOrigin} value={searchOrigin}>

                    <option value="0">Please select...</option>
                    {cities.map(city => (
                        <option key={city.id} value={city.value}>
                            {city.name}
                        </option>
                    ))}

                </select>

                <label style={{padding :"10px"}} htmlFor="type">Destination:</label>
                <select className="select" id="type" onChange={handleSearchDestination} value={searchDestination}>

                    <option value="0">Please select...</option>
                    {cities.map(city => (
                        <option key={city.id} value={city.value}>
                            {city.name}
                        </option>
                    ))}

                </select>
                <div>

                    <label style={{paddingRight :"10px"}} htmlFor="route">Route:</label>
                    <select className="select" id="route" onChange={handleRouteId} value={searchRouteId}>

                        <option value="0">Please select...</option>
                        {routeList.map(busRoute => (
                            <option key={busRoute.routeId} value={busRoute.routeId} > {busRoute.routeNo} </option>
                        ))}

                    </select>
                    <button type="button" style={{backgroundImage : "linear-gradient(#164863, #164863)", marginLeft:"20px"}} onClick={searchBusSchedule}> Search </button>

                </div>
            </div>

            <div className="boarder-style" style={{marginTop:'30px'}}>
                <table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th style={{width:'10%'}}>Departure Time</th>
                        <th style={{width:'10%'}}>Arrival Time</th>
                        <th>Trip Status</th>
                        <th style={{width:'10%'}}>Available Seats</th>
                        <th>Price (Rs.)</th>
                        <th><img className="button-img" src={addImage} title="Add New Schedule" alt="add" onClick={showPanelAdd}/></th>


                    </tr>
                    </thead>
                    <tbody>
                    {scheduleList.length === 0 ?
                        ( <tr>
                            <td colSpan="8">-- No Data --</td>
                            <td></td>
                        </tr>)
                        :
                        ( scheduleList.map(schedule => (
                            <tr key={schedule.schedule.scheduleId}>
                                <td>{schedule.schedule.tripDateStr}</td>
                                <td>{schedule.schedule.origin}</td>
                                <td>{schedule.schedule.destination}</td>
                                <td>{schedule.schedule.tripStartTime}</td>
                                <td>{schedule.schedule.tripEndTime}</td>
                                <td>{schedule.schedule.isCancelled ? 'Cancelled' : 'Available'}</td>
                                <td>{schedule.seatsAvailable}</td>
                                <td>{schedule.schedule.ticketPrice}</td>
                                

                                <td>
                                    {(userTypeId === 3  && schedule.seatsAvailable !== 0) && (
                                        <div>
                                            <input type="button" value="Book"/>
                                        </div>
                                    )}

                                    {(userTypeId === 1 || userTypeId === 2) && (
                                        <div>
                                            <img style={{padding:'3px'}} className="button-img" src={deleteScheduleImg} title="Delete Schedule" alt="delete" onClick={() => deleteSchedule(schedule.schedule.scheduleId)}/>

                                            <img style={{padding:'3px'}} className="button-img" src={viewSchedule} title="Update Schedule" alt="update" onClick={() => updateSchedule(schedule.schedule.scheduleId)}/>


                                        </div>
                                    )}

                                </td>
                            </tr>
                        )))

                    }

                    </tbody>
                </table>
            </div>

            {showAddPanel && (
                <div className="boarder-style" style={{marginTop:'30px'}} ref={addPanelRef}>
                    <div style={{display:"flex"}}>



                        <div style={{textAlign: "left", width:"50%"}}>
                            <input type="hidden" id="scheduleId" value={scheduleId}/>

                            <div style={{padding:'10px', display:"flex"}}>

                                <label style={{padding :"10px",width:"150px"}} htmlFor="dateInput">Trip Date:</label>
                                <input style={{width:"43%"}} className="form-text-input" type="date"  id="dateInput" onChange={handleInputDate} value={dateInput ? formatDate(dateInput) : ''}/>

                            </div>

                            <div style={{padding:'10px', display:"flex"}}>
                                <label style={{padding :"10px",width:"150px"}} htmlFor="originInput">Origin:</label>
                                <select style={{width:"43%"}} className="select" id="originInput" onChange={handleInputOrigin} value={inputOrigin} >

                                    <option>Please select...</option>
                                    {cities.map(city => (
                                        (inputOrigin === city.name) ? (
                                            <option key={city.id} value={city.value} selected>
                                                {city.name}
                                            </option>
                                        ) : (
                                            <option key={city.id} value={city.value}>
                                                {city.name}
                                            </option>
                                        )
                                    ))}

                                </select>
                            </div>

                            <div style={{padding:'10px', display:"flex"}}>
                                <label style={{padding :"10px",width:"150px"}} htmlFor="destinationInput">Destination:</label>
                                <select style={{width:"43%"}} className="select" id="destinationInput" onChange={handleInputDestination} value={inputDestination} >

                                    <option>Please select...</option>
                                    {cities.map(city => (

                                        (inputDestination === city.name) ? (
                                            <option key={city.id} value={city.value} selected>
                                                {city.name}
                                            </option>
                                        ) : (
                                            <option key={city.id} value={city.value}>
                                                {city.name}
                                            </option>
                                        )



                                    ))}

                                </select>
                            </div>

                            <div  style={{padding:'10px', display:"flex"}}>
                                <label style={{padding :"10px",width:"150px"}} htmlFor="startTimeInput">Starting Time:</label>

                                <ReactDatetimeClass


                                    dateFormat={false}
                                    timeFormat="hh:mm A"
                                    inputProps={{ className: 'form-input', style:{padding:"10px", height:"fit-content", width:"200px"} }}
                                    value={inputStartingTime}
                                    onChange={handleStartingTime}>

                                </ReactDatetimeClass>

                            </div>

                            <div  style={{padding:'10px', display:"flex"}}>
                                <label style={{padding :"10px",width:"150px"}} htmlFor="endTimeInput">End Time:</label>

                                <ReactDatetimeClass


                                    dateFormat={false}
                                    timeFormat="hh:mm A"
                                    inputProps={{ className: 'form-input', style:{padding:"10px", height:"fit-content", width:"200px"} }}
                                    value={inputEndingTime}
                                    onChange={handleEndTime}>

                                </ReactDatetimeClass>

                            </div>
                        </div>


                        <div style={{textAlign: "left", width:"50%", flex:"1"}}>

                            <div style={{padding:'10px', display:"flex"}}>
                                <label style={{padding :"10px",width:"150px"}} htmlFor="busId">Bus:</label>

                                <select style={{width:"43%"}} className="select" id="busId" onChange={handleBusId} value={busId} >

                                    <option>Please select...</option>
                                    {busList.map(bus => (

                                        (busId === bus.busId) ? (
                                            <option key={bus.busId} value={bus.busId} selected>
                                                {bus.plateNo}
                                            </option>
                                        ) : (
                                            <option key={bus.busId} value={bus.busId}>
                                                {bus.plateNo}
                                            </option>
                                        )
                                    ))}

                                </select>

                            </div>

                            <div>
                                <div style={{padding:'10px', display:"flex"}}>
                                    <label style={{fontWeight:"bold"}}>Bus Crew :</label>
                                </div>

                                <div style={{padding:'10px', display:"flex"}}>
                                    <label style={{padding :"10px",width:"150px"}} htmlFor="driverId">Driver :</label>

                                    <select style={{width:"43%"}} className="select" id="driverId" onChange={handleDriverId} value={driverId}>

                                        <option value="0">Please select...</option>
                                        {driverList.map(busCrew => (

                                            (driverId === busCrew.busCrewId) ? (
                                                <option key={busCrew.busCrewId} value={busCrew.busCrewId} selected>
                                                    {busCrew.ntcNo} - {busCrew.name}
                                                </option>
                                            ) : (
                                                <option key={busCrew.busCrewId} value={busCrew.busCrewId}>
                                                    {busCrew.ntcNo} - {busCrew.name}
                                                </option>
                                            )
                                        ))}

                                    </select>
                                </div>

                                <div style={{padding:'10px', display:"flex"}}>
                                    <label style={{padding :"10px",width:"150px"}} htmlFor="conductorId">Conductor :</label>

                                    <select style={{width:"43%"}} className="select" id="conductorId" onChange={handleConductorId} value={conductorId}>

                                        <option value="0">Please select...</option>
                                        {conductorList.map(busCrew => (

                                            (driverId === busCrew.busCrewId) ? (
                                                <option key={busCrew.busCrewId} value={busCrew.busCrewId} selected>
                                                    {busCrew.ntcNo} - {busCrew.name}
                                                </option>
                                            ) : (
                                                <option key={busCrew.busCrewId} value={busCrew.busCrewId}>
                                                    {busCrew.ntcNo} - {busCrew.name}
                                                </option>
                                            )
                                        ))}

                                    </select>
                                </div>

                                <div style={{padding:'10px', display:"flex"}}>
                                    <label style={{padding :"10px",width:"150px"}} htmlFor="priceAmount">Price (Rs.) :</label>
                                    <input style={{padding:"10px",width:"43%",height:"40px"}} className="form-input" type="number" id="priceAmount" inputMode="numeric" required onChange={handlePrice} value={price}/>
                                </div>
                            </div>


                        </div>

                    </div>


                    <div style={{marginTop:"10px"}}>
                            <span style={{padding:'10px'}}>
                                <button onClick={scheduleTrip}> Schedule</button>
                            </span>

                        {scheduleId !== '' &&
                            <span style={{padding:'10px'}}>
                                <button onClick={cancelSchedule(scheduleId)}>Cancel</button>
                            </span>
                        }

                        <span style={{padding:'10px'}}>
                                <button onClick={() => setShowAddPanel(false)}>Close</button>
                            </span>


                    </div>

                </div>
            )}
        </div>
    )
}