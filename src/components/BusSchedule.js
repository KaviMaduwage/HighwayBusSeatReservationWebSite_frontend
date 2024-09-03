import {useEffect, useRef, useState} from "react";
import { useNavigate} from 'react-router-dom';
import citiesData from "../data/cities.json";
import {getAllRoutes} from "../services/routeService";
import addImage from "../images/addItem.png";
import deleteScheduleImg from "../images/deleteSchedule.png";
import viewSchedule from "../images/updateSchedule.png";
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import ReactDatetimeClass from "react-datetime";
import getOnImg from "../images/getOnBus.png";
import getOffImg from "../images/getOffBus.png";
import {
    findSeatStructureByBusId,
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
import availableSeatImg from "../images/seat.png";
import blockedSeatImg from "../images/blockedSeatImg.png";
import bookedSeatImg from "../images/bookedSeatImg.png";
import {
    addReservationToCart,
    blockSeat,
    findBlockedSeatsByScheduleId, findReservedSeatsByScheduleId,
    unblockSelectedSeat
} from "../services/reservationService";
import driverSeat from "../images/driverSeat.png";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

export default function BusSchedule({userTypeId,userId}){
    const [searchDate, setSearchDate] = useState();
    const [cities, setCities] = useState([]);
    const [searchOrigin, setSearchOrigin] = useState('');
    const [searchDestination, setSearchDestination] = useState('');
    const [routeList, setRouteList] = useState([]);
    const [searchRouteId, setSearchRouteId] = useState('');
    const [showAddPanel, setShowAddPanel] = useState(false);
    const [reservationPanel, setReservationPanel] = useState(false);
    const reservationPanelRef = useRef(null);
    const [scheduleList, setScheduleList] = useState([]);
    const addPanelRef = useRef(null);
    const [inputDestination, setInputDestination] = useState('');
    const [inputOrigin, setInputOrigin] = useState('');
    const [reserveScheduleId, setReserveScheduleId] = useState('');
    const [oneTicketPrice, setOneTicketPrice] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [searchErrorMessage, setSearchErrorMessage] = useState('');
    const [formErrorMessage, setFormErrorMessage] = useState('');
    const [reservationErrorMsg,setReservationErrorMsg] = useState('');

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

    const [busRows,setBusRows] = useState('');
    const [busColumns, setBusColumns] = useState('');
    const [selectedSeats, setSelectedSeats] = useState([])
    const [bookedSeatList, setBookedSeatList] = useState([]);
    const [onGoingSeatList, setOnGoingSeatList] = useState([]);
    const [passengerSelectedSeats, setPassengerSelectedSeats] = useState([]);
    const [passengerSelectedSeatsStr, setPassengerSelectedSeatsStr] = useState('');
    const [openAddToCartDialogBox,setAddToCartDialogBox] = useState(false);

    const [pickUpPoint, setPickUpPoint] = useState('');
    const [dropOffPoint, setDropOffPoint] = useState('');
    const [remark, setRemark] = useState('');

    const navigate = useNavigate();

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

    function findBookedSeats(reserveScheduleId) {
        findReservedSeatsByScheduleId(reserveScheduleId).then(response => {
            setBookedSeatList(response.data)
        })
    }

    function fetchSeatsCurrentStatus() {
        findBlockedSeatsByScheduleId(reserveScheduleId).then(response => {
                    setOnGoingSeatList(response.data);
                    setSelectedSeatsDescription(response.data);

                    findBookedSeats(reserveScheduleId);
                });
    }

    useEffect(() => {
        if(reservationPanel){
            fetchSeatsCurrentStatus();

            const intervalId = setInterval(fetchSeatsCurrentStatus, 10 * 60 * 1000);


            return () => clearInterval(intervalId);

        }

    }, [reservationPanel]);

    // const fetchSeatsCurrentStatus = async () => {
    //
    //     findBlockedSeatsByScheduleId(reserveScheduleId).then(response => {
    //         setOnGoingSeatList(response.data);
    //     });
    //
    //
    // };


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

        loadScheduleList(getTodayDate(new Date()));


    }, []);
    function searchBusSchedule() {
        if(searchDate){
            findBusScheduleByDateTownAndRoute(searchDate,searchOrigin,searchDestination,searchRouteId).then(response => {
                setScheduleList(response.data);
            });
        }else{
            setSearchErrorMessage("Search date is mandatory. Please select the date.")
        }


    }

    function handleSearchDate(e) {
        setSearchDate(e.target.value);
    }

    function formatDate(searchDate) {
        const date = new Date(searchDate);
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
        setFormErrorMessage('');
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

    function handlePickUpPoint(e) {
        setPickUpPoint(e.target.value);
    }

    function handleDropOffPoint(e) {
        setDropOffPoint(e.target.value);
    }

    function handleRemark(e) {
        setRemark(e.target.value);
    }


    function scheduleTrip() {
        console.log("busId"+busId);
        if(dateInput===null || price==="" || inputOrigin==='0'|| inputDestination==='0' ||inputEndingTime===null
            ||inputStartingTime===null || (busId==='0' || busId==='')){
            setFormErrorMessage("Please fill all the mandatory data marked in asterisk mark(*).")
        }else{
            const bus ={busId:busId};
            const schedule = {scheduleId:scheduleId,tripDateStr:dateInput,origin:inputOrigin,destination:inputDestination,tripStartTime:inputStartingTime,
                tripEndTime:inputEndingTime, ticketPrice:price, bus:bus};

            saveSchedule(schedule, driverId,conductorId).then(response => {
                setResponseMessage(response.data);
                setShowAddPanel(false);

                loadScheduleList(formatDate(dateInput));
            });
        }


    }

    function updateSchedule(scheduleId) {
        findScheduleById(scheduleId).then(response => {
            let schedule = response.data;
            setShowAddPanel(true);
            setFormErrorMessage('');
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

    function showReservationPanel(scheduleId) {
        setReservationPanel(true);
        setReservationErrorMsg('');
        setShowAddPanel(false);
        setReserveScheduleId(scheduleId);
        setRemark('');
        setDropOffPoint('');
        setPickUpPoint('');

        findScheduleById(scheduleId).then(response => {
            let schedule = response.data;
            setBusRows(schedule.schedule.bus.noOfRows);
            setBusColumns(schedule.schedule.bus.noOfColumns);
            setOneTicketPrice(schedule.schedule.ticketPrice);

            findSeatStructureByBusId(schedule.schedule.bus.busId).then(response => {
                setSelectedSeats(response.data);
            });

            findBlockedSeatsByScheduleId(schedule.schedule.scheduleId).then(response => {
                setOnGoingSeatList(response.data);
                setSelectedSeatsDescription(response.data);
            })

        });
    }

    function isSeatSelected(row, col) {
        return selectedSeats.some(seat => seat.row === row + 1 && seat.col === col + 1);
    }

    function bookSeat(row, col) {

        const seatIndex = onGoingSeatList.findIndex(seat => seat.row === row+1 && seat.col === col+1);
        if(seatIndex === -1){
            setPassengerSelectedSeats([...passengerSelectedSeats, { row: row+1 , col: col+1, userId:userId}]);

            blockSeat(userId,reserveScheduleId,row+1,col+1).then(response =>{
                setOnGoingSeatList(response.data);
                setSelectedSeatsDescription(response.data);
            })

        }

    }

    function isBookedByUser(row,col){
        return onGoingSeatList.some(seat => seat.row === row + 1 && seat.col === col + 1 && seat.user.userId === userId);
    }

    function isSeatBlocked(row, col) {
        return onGoingSeatList.some(seat => seat.row === row + 1 && seat.col === col + 1);
    }

    function isSeatBooked(row, col) {
        console.log("booked:"+bookedSeatList);
        return bookedSeatList.some(revSeat => revSeat.seat.rowNo === row + 1 && revSeat.seat.columnNo === col + 1);
    }

    function setSelectedSeatsDescription(seatList) {
        let str = '';
        let count = 0;
        seatList.filter(seat => seat.schedule.scheduleId === reserveScheduleId && seat.user.userId === userId)
            .forEach(seat => {
                str += seat.row + " - " + seat.col + ",";
                count++;
            });

        setPassengerSelectedSeatsStr(str);
        let totalCost = oneTicketPrice*count;
        setTotalCost(totalCost);

    }

    function unblockSeat(row, col) {

        const seatIndex = onGoingSeatList.findIndex(seat => seat.row === row+1 && seat.col === col+1 && seat.user.userId === userId);
        if(seatIndex !== -1){
            const updatedSelectedSeats = [...onGoingSeatList];
            updatedSelectedSeats.splice(seatIndex, 1);

            unblockSelectedSeat(userId,reserveScheduleId,row+1,col+1).then(response => {
                setOnGoingSeatList(response.data);
                setSelectedSeatsDescription(response.data);
            })

        }




    }
    function showAddToCartConfirmation() {
        if(onGoingSeatList.length===0){
            setReservationErrorMsg("Please select at lease one seat.");
        }else if(onGoingSeatList.length>5){
            setReservationErrorMsg("You can only book only maximum 5 seats.Remove other seats.")
        }
        else{
            setAddToCartDialogBox(true);
        }

    }

    function addToCart() {
        addReservationToCart(reserveScheduleId,userId,pickUpPoint,dropOffPoint,remark).then(response => {
            setAddToCartDialogBox(false);
            setReservationPanel(false);
            setResponseMessage(response.data);
            loadScheduleList(getTodayDate(new Date()));
        })
        
    }


    function isBookingAvailable(tripDateStr, tripStartTime) {
        const tripDate = new Date(tripDateStr+" "+tripStartTime);
        const today = new Date();


        const lastTime = new Date(tripDate.getTime() - 2 * 60 * 60 * 1000);

        return lastTime > today;
    }

    return (
        <div>
            <h1>Bus Schedule</h1>



            <div className="boarder-style">
                <p style={{color:'red'}}>{searchErrorMessage}</p>

                <label style={{padding :"10px"}} htmlFor="dateSearch">Trip Date:</label>
                {userTypeId === 3 ?
                    (
                    <input className="form-text-input" type="date"  id="dateSearch" onChange={handleSearchDate} value={searchDate ? formatDate(searchDate) : ''} min={getTodayDate(new Date())}/>

                    )
                :
                    <input className="form-text-input" type="date"  id="dateSearch" onChange={handleSearchDate} value={searchDate ? formatDate(searchDate) : ''}/>
                }


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
                        {userTypeId === 1 || userTypeId === 2 ?

                            <th><img className="button-img" src={addImage} title="Add New Schedule" alt="add" onClick={showPanelAdd}/></th>
                            :
                            <th></th>
                        }


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
                                    {(userTypeId === 3  && schedule.seatsAvailable !== 0 && isBookingAvailable(schedule.schedule.tripDateStr,schedule.schedule.tripStartTime)) && (
                                        <div>
                                            <input type="button" value="Book" onClick={() => showReservationPanel(schedule.schedule.scheduleId)}/>
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

            <p>{responseMessage}</p>

            {showAddPanel && (
                <div className="boarder-style" style={{marginTop:'30px'}} ref={addPanelRef}>
                    <p style={{color:'red'}}>{formErrorMessage}</p>
                    <div style={{display:"flex"}}>



                        <div style={{textAlign: "left", width:"50%"}}>
                            <input type="hidden" id="scheduleId" value={scheduleId}/>

                            <div style={{padding:'10px', display:"flex"}}>

                                <label style={{padding :"10px",width:"150px"}} htmlFor="dateInput"><span style={{color:'red'}}>*</span>Trip Date:</label>
                                <input style={{width:"43%"}} className="form-text-input" type="date"  id="dateInput" onChange={handleInputDate} value={dateInput ? formatDate(dateInput) : ''} min={getTodayDate(new Date())}/>

                            </div>

                            <div style={{padding:'10px', display:"flex"}}>
                                <label style={{padding :"10px",width:"150px"}} htmlFor="originInput"><span style={{color:'red'}}>*</span>Origin:</label>
                                <select style={{width:"43%"}} className="select" id="originInput" onChange={handleInputOrigin} value={inputOrigin} >

                                    <option value="0">Please select...</option>
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
                                <label style={{padding :"10px",width:"150px"}} htmlFor="destinationInput"><span style={{color:'red'}}>*</span>Destination:</label>
                                <select style={{width:"43%"}} className="select" id="destinationInput" onChange={handleInputDestination} value={inputDestination} >

                                    <option value="0">Please select...</option>
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
                                <label style={{padding :"10px",width:"150px"}} htmlFor="startTimeInput"><span style={{color:'red'}}>*</span>Starting Time:</label>

                                <ReactDatetimeClass


                                    dateFormat={false}
                                    timeFormat="hh:mm A"
                                    inputProps={{ className: 'form-input', style:{padding:"10px", height:"fit-content", width:"200px"} }}
                                    value={inputStartingTime}
                                    onChange={handleStartingTime}>

                                </ReactDatetimeClass>

                            </div>

                            <div  style={{padding:'10px', display:"flex"}}>
                                <label style={{padding :"10px",width:"150px"}} htmlFor="endTimeInput"><span style={{color:'red'}}>*</span>End Time:</label>

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
                                <label style={{padding :"10px",width:"150px"}} htmlFor="busId"><span style={{color:'red'}}>*</span>Bus:</label>

                                <select style={{width:"43%"}} className="select" id="busId" onChange={handleBusId} value={busId} >

                                    <option value="0">Please select...</option>
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
                                    <label style={{padding :"10px",width:"150px"}} htmlFor="priceAmount"><span style={{color:'red'}}>*</span>Price (Rs.) :</label>
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

            {reservationPanel && (
                <div className="boarder-style" style={{marginTop:'30px'}} ref={reservationPanelRef}>
                    <p style={{color:'red'}}>{reservationErrorMsg}</p>
                    <div style={{display:'flex', flexDirection:'row', padding:'30px'}}>
                        <div style={{width:'30%'}}>
                            <label>Available Seat : </label>
                            <img style={{backgroundColor: '#eaeaea',padding:'5px'}} src={availableSeatImg} alt="Available Seat"/>
                        </div>
                        <div style={{width:'30%'}}>
                            <label>Booked Seat : </label>
                            <img style={{backgroundColor: '#eaeaea',padding:'5px'}} src={bookedSeatImg} alt="Booked Seat"/>
                        </div>
                        <div style={{width:'30%'}}>
                            <label>Blocked Seat : </label>
                            <img style={{backgroundColor: '#eaeaea',padding:'5px'}} src={blockedSeatImg} alt="Blocked Seat"/>
                        </div>
                    </div>

                    <div style={{display:'flex',flexDirection:'row'}}>
                        <div className="seat-grid" style={{width:'70%'}}>
                            <div style={{display:"flex"}}>
                                <img style={{height:"18%", padding:"3px", marginTop:"10px"}} src={driverSeat} alt="driver seat"/>
                            </div>

                            {Array.from({ length: busRows }, (_, row) => (
                                <div key={`row-${row}`} className="row">
                                    {Array.from({ length: busColumns }, (_, col) => (
                                        <div
                                            key={`seat-${row}-${col}`}
                                            className='seat'
                                        >

                                            {isSeatSelected(row, col) && (

                                                <div>
                                                    {isSeatBlocked(row, col) ? (

                                                        <div style={{ backgroundColor: isBookedByUser(row, col) ? '#011f4b' : '#eaeaea' }}>
                                                            {`${row+1}-${col+1}`}
                                                            <img src={blockedSeatImg} alt="Blocked Seat" onClick={() => unblockSeat(row,col)} />
                                                        </div>
                                                    ) : (

                                                        <div>

                                                            {isSeatBooked(row, col) ? (
                                                                // If the seat is booked
                                                                <div>
                                                                    {`${row+1}-${col+1}`}
                                                                    <img src={bookedSeatImg} alt="Booked Seat"/>
                                                                </div>
                                                            ) : (
                                                                // If the seat is available
                                                                <div>

                                                                    {`${row + 1}-${col + 1}`}
                                                                    <img src={availableSeatImg} alt="Available Seat" onClick={() => bookSeat(row, col)} />
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>


                                    ))}
                                </div>
                            ))}

                        </div>

                        <div style={{width:'30%', padding:'2px'}}>
                            <div>
                                <label style={{fontWeight:'bold'}}>Selected Seats : </label><br/>
                                <label style={{color:'tan'}}>{passengerSelectedSeatsStr}</label>
                            </div>

                            <div>
                                <label style={{fontWeight:'bold'}}>Price : </label><br/>
                                <label style={{color:'tan', fontSize:'40px'}}>Rs. {totalCost}/=</label>
                            </div>

                            <div style={{padding:'20px', display:'flex'}}>
                                <img src={getOnImg} alt="Pick Up Point" style={{marginRight:'8px'}}/>
                                <select style={{width:"90%"}} className="select" id="pickUpPoint" onChange={handlePickUpPoint} value={pickUpPoint} >

                                    <option>Please select...</option>
                                    {cities.map(city => (
                                        (
                                            <option key={city.id} value={city.value}>
                                                {city.name}
                                            </option>
                                        )



                                    ))}

                                </select>

                            </div>

                            <div style={{padding:'20px', display:'flex'}}>
                                <img src={getOffImg} alt="Drop Point" style={{marginRight:'8px'}}/>
                                <select style={{width:"90%"}} className="select" id="dropOffPoint" onChange={handleDropOffPoint} value={dropOffPoint} >

                                    <option>Please select...</option>
                                    {cities.map(city => (
                                        (
                                            <option key={city.id} value={city.value}>
                                                {city.name}
                                            </option>
                                        )



                                    ))}

                                </select>

                            </div>

                            <div style={{padding:'20px'}}>
                                <label htmlFor="remark">Remark : </label>
                                <input style={{width:'70%'}} className="form-text-input" type="text"  id="remark" onChange={handleRemark} value={remark}/>


                            </div>


                        </div>

                    </div>

                    <div style={{marginTop:'20px'}}>
                        <span style={{padding:'10px'}}>
                                <button onClick={showAddToCartConfirmation}> Add To Cart</button>
                            </span>

                        {/*<span style={{padding:'10px'}}>*/}
                        {/*        <button> Pay</button>*/}
                        {/*    </span>*/}
                    </div>




                </div>
            )}

            <Dialog open={openAddToCartDialogBox}>
                <DialogTitle>Complete the payment before 30 min. Otherwise cart data will be deleted.Do you want to proceed? </DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button  style={{color:"white"}} onClick={addToCart}
                             autoFocus>
                        Okay
                    </Button>
                    <Button onClick={() => setAddToCartDialogBox(false)}
                            style={{color:"white"}} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}