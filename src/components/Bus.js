import addImage from "../images/addItem.png";
import updateImg from "../images/updateItem.png";
import seatImg from "../images/seats.png";
import oneSeatImg from "../images/seat.png";
import driverSeat from "../images/driverSeat.png";
import {useEffect, useRef, useState} from "react";
import {getAllRoutes} from "../services/routeService";
import {
    findBusById,
    findSeatStructureByBusId,
    loadAllBusDetails,
    saveBus,
    saveSeatStructure
} from "../services/busService";


export default function Bus({userTypeId, userId}){

    const [responseMessage, setResponseMessage] = useState('');
    const [showAddPanel, setShowAddPanel] = useState(false);
    const [showSeatStructurePanel, setShowSeatStructurePanel] = useState(false);
    const addPanelRef = useRef(null);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([])

    const [busList, setBusList] = useState([]);
    const [busId, setBusId] = useState('');
    const [plateNo, setPlateNo] = useState('');
    const [permitNo, setPermitNo] = useState('');
    const [name, setName] = useState('');
    const [rows, setRows] = useState('');
    const [columns, setColumns] = useState('');
    const [seats, setSeats] = useState('');

    const [routeList, setRouteList] = useState([]);
    const [routeId, setRouteId] = useState('');
    const [errorDataMessage, setErrorDataMessage] = useState('');
    const [seatStructureErrorMsg,setSeatStructureErrorMsg] = useState('');


    useEffect(() => {
        if (showAddPanel) {
            addPanelRef.current.scrollIntoView({ behavior: 'smooth' });
        }

        getAllRoutes().then(response => {
            setRouteList(response.data);
        })
    }, [showAddPanel]);

    useEffect(() => {
       loadBusDetails();
    },[]);

    function showPanelAdd() {
        setShowAddPanel(true);
        setShowSeatStructurePanel(false);
        setErrorDataMessage('');
        setBusId('');
        setPlateNo('');
        setPermitNo('');
        setName('');
        setRows('');
        setColumns('');
        setSeats('');
        setRouteId('');
    }

    function viewBusDetail(busId) {
        console.log(busId);
        findBusById(busId).then(response => {
            let bus = response.data;

            setShowAddPanel(true);
            setShowSeatStructurePanel(false);
            setErrorDataMessage('');
            setBusId(bus.busId);
            setPlateNo(bus.plateNo);
            setPermitNo(bus.permitNo);
            setName(bus.name);
            setRows(bus.noOfRows);
            setColumns(bus.noOfColumns);
            setSeats(bus.noOfSeats);
            setRouteId(bus.route.routeId);
        })
    }

    function handlePlateNo(e) {
        setPlateNo(e.target.value);
    }

    function handlePermitNo(e) {
        setPermitNo(e.target.value);
    }

    function handleName(e) {
        setName(e.target.value);
    }

    function handleRows(e) {
        setRows(e.target.value);
    }

    function handleColumns(e) {
        setColumns(e.target.value);
    }

    function loadBusDetails() {
        loadAllBusDetails().then(response => {
            setBusList(response.data);
        })
    }

    function saveBusDetails() {
        console.log("col"+columns);
        if(name.trim()===""||plateNo.trim()===""||permitNo.trim()===""||routeId==='0'||columns===""||rows===""||seats===""){
            setErrorDataMessage("Please fill all the data.")
        }else{
            const route = {routeId};
            const bus = {busId, name, plateNo, permitNo,route,noOfRows: rows, noOfColumns:columns,noOfSeats:seats};

            saveBus(bus, userId).then(response => {
                setResponseMessage(response.data);
                setShowAddPanel(false);
                setShowSeatStructurePanel(false);
                loadBusDetails();
            })
        }




    }

    function handleRouteId(e) {
        setRouteId(e.target.value);
    }

    function handleSeats(e) {
        setSeats(e.target.value);
    }

    function showSeatStructure(busId) {
        setShowAddPanel(false);
        setBusId(busId);
        setShowSeatStructurePanel(true);

        findBusById(busId).then(response => {
            let bus = response.data;

            setRows(bus.noOfRows);
            setColumns(bus.noOfColumns);
            setSeats(bus.noOfSeats);

        });

        findSeatStructureByBusId(busId).then(response => {
            setSelectedSeats(response.data);
        })

    }

    // Function to handle seat click
    function addSeat(row, col) {
        const seatIndex = selectedSeats.findIndex(seat => seat.row === row + 1 && seat.col === col + 1);
        if (seatIndex === -1) {
            // If the seat is not already selected, add it to the selected seats
            setSelectedSeats([...selectedSeats, { row: row + 1, col: col + 1 }]);
        } else {
            // If the seat is already selected, remove it from the selected seats
            const updatedSelectedSeats = [...selectedSeats];
            updatedSelectedSeats.splice(seatIndex, 1);
            setSelectedSeats(updatedSelectedSeats);
        }
    }


    function isSeatSelected(row, col) {
        return selectedSeats.some(seat => seat.row === row + 1 && seat.col === col + 1);
    }


    function resetStructure() {
        setSelectedSeats([]);

    }

    function saveStructure() {
        if(selectedSeats.length ===0){
            setSeatStructureErrorMsg("Please select at lease 1 seat");
        }else{
            saveSeatStructure(selectedSeats, busId).then(response => {
                setResponseMessage(response.data);
                setShowSeatStructurePanel(false);
            });
        }


    }

    return (
        <div>
            <h1>Bus Detail Management</h1>
            <p>{responseMessage}</p>

            <div className="boarder-style" style={{marginTop:'30px'}}>
                <table>
                    <thead>
                    <tr>
                        <th>Plate No</th>
                        <th>Permit No</th>
                        <th>Name</th>
                        <th>No of Rows</th>
                        <th>No of Columns</th>
                        <th>No of Seats</th>
                        <th>Route No</th>
                        {userTypeId === 1 &&

                            <th>Travel Service Name</th>

                        }

                        {userTypeId === 2 ?
                            <th><img className="button-img" src={addImage} title="Add New Bus" alt="add" onClick={showPanelAdd}/></th>
                            :
                            <th></th>

                        }




                    </tr>
                    </thead>
                    <tbody>
                    {busList.length === 0 ?
                        ( <tr>
                            <td colSpan="8">-- No Data --</td>

                        </tr>)
                        :
                        ( busList.map(bus => (
                            <tr key={bus.busId}>
                                <td>{bus.plateNo}</td>
                                <td>{bus.permitNo}</td>
                                <td>{bus.name}</td>
                                <td>{bus.noOfRows}</td>
                                <td>{bus.noOfColumns}</td>
                                <td>{bus.noOfSeats}</td>
                                <td>{bus.route.routeNo}</td>

                                {userTypeId === 1 &&
                                    <td>
                                        {bus.busOwner.travelServiceName}
                                    </td>

                                }

                                <td>
                                    {(bus.busOwner.user.userId === userId || userTypeId === 1) &&
                                        <>
                                        <img style={{padding: "4px", marginRight:"3px"}} className="button-img" src={updateImg} title="Update Bus" alt="update" onClick={() => viewBusDetail(bus.busId)}/>
                                        <img style={{padding: "1px"}} className="button-img" src={seatImg} title="Seat Structure" alt="" onClick={() => showSeatStructure(bus.busId)}/>
                                        </>
                                }

                                </td>



                            </tr>
                        )))

                    }

                    </tbody>
                </table>

            </div>

            { showAddPanel && (
                <div className="boarder-style" style={{marginTop:'30px'}} id="addPanel" ref={addPanelRef}>
                    <div>
                        <p style={{color:'red'}}>{errorDataMessage}</p>

                        <input type="hidden" id="busId" value={busId}/>
                        <div className="field-holder">
                            <input className="form-input" type="text" id="plateNo" required onChange={handlePlateNo} value={plateNo}/>
                            <label className="form-label" htmlFor="plateNo">Plate No :</label>
                        </div>
                        <div className="field-holder">
                            <input className="form-input" type="text" id="permitNo" required onChange={handlePermitNo} value={permitNo}/>
                            <label className="form-label" htmlFor="permitNo">Permit No :</label>
                        </div>
                        <div className="field-holder">
                            <input className="form-input" type="text" id="name" required onChange={handleName} value={name}/>
                            <label className="form-label" htmlFor="name">Name :</label>
                        </div>

                        <div style={{display:"flex"}}>
                            <label style={{paddingRight :"10px",paddingTop :"7px"}} htmlFor="type">Route:</label>
                            <select className="select" id="type" style={{width:"400px"}} onChange={handleRouteId} value={routeId}>

                                <option value="0">Please select...</option>
                                {routeList.map(busRoute => (
                                    <option key={busRoute.routeId} value={busRoute.routeId} selected={routeId === busRoute.routeId}> {busRoute.routeNo} </option>
                                ))}

                            </select>

                        </div>


                        <div className="field-holder">
                            <input className="form-input" type="number" id="rows" min="0" required onChange={handleRows} value={rows}/>
                            <label className="form-label" htmlFor="rows">No of Rows :</label>
                        </div>
                        <div className="field-holder">
                            <input className="form-input" type="number"  id="columns" min="0" required onChange={handleColumns} value={columns}/>
                            <label className="form-label" htmlFor="columns">No of Columns :</label>
                        </div>
                        <div className="field-holder">
                            <input className="form-input" type="number"  id="seats" min="0" required onChange={handleSeats} value={seats}/>
                            <label className="form-label" htmlFor="seats">No of Seats :</label>
                        </div>
                    </div>

                    <div>

                        <span style={{padding:'10px'}}>
                            <button onClick={saveBusDetails}> Submit</button>
                        </span>


                        <span style={{padding:'10px'}}>
                                <button onClick={() => setShowAddPanel(false)}>Cancel</button>
                            </span>

                    </div>
                </div>
            )}


            {showSeatStructurePanel && (
                <div className="boarder-style" style={{marginTop:'30px',display: "flex", flexDirection: "column"}} id="addPanel" ref={addPanelRef}>
                    <h2>Seating Structure</h2>
                    <p style={{color:'red'}}>{seatStructureErrorMsg}</p>
                    <div className="seat-grid">

                        <div style={{display:"flex"}}>
                            <img style={{height:"18%", padding:"3px", marginTop:"10px"}} src={driverSeat} alt="driver seat"/>
                        </div>

                        {Array.from({ length: rows }, (_, row) => (
                            <div key={`row-${row}`} className="row">
                                {Array.from({ length: columns }, (_, col) => (
                                    <div
                                        key={`seat-${row}-${col}`}
                                        className={`seat ${isSeatSelected(row, col) ? 'selected' : ''}`}
                                        onClick={() => addSeat(row, col)}
                                    >

                                        {`${row+1}-${col+1}`}
                                        {isSeatSelected(row, col) && <img src={oneSeatImg} alt="Selected Seat" />}
                                    </div>


                                ))}
                            </div>
                        ))}


                    </div>

                    <div style={{marginTop:'10px', fontWeight:"bold"}}>
                        No of Selected Seats : {selectedSeats.length}
                    </div>

                    <div style={{marginTop:'10px'}}>
                        <span style={{padding:'10px'}}>
                            <button onClick={resetStructure}> Reset</button>
                        </span>

                        <span style={{padding:'10px'}}>
                            <button onClick={saveStructure}> Save</button>
                        </span>


                        <span style={{padding:'10px'}}>
                                <button onClick={() => setShowSeatStructurePanel(false)}>Cancel</button>
                            </span>

                    </div>
                </div>
            )
            }

        </div>
    )
}